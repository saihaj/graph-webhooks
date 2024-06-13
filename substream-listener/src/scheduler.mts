import { Job, Queue, Worker } from "bullmq";
import { Redis } from "ioredis";
import pTimeout from "p-timeout";
import { type Logger } from "pino";
import * as prometheus from "./prometheus.mjs";
import { createGrpcWebTransport } from "@connectrpc/connect-node";
import {
  applyParams,
  createAuthInterceptor,
  createModuleHashHex,
  createRegistry,
  createRequest,
} from "@substreams/core";
import { readPackage } from "@substreams/manifest";
import { BlockEmitter } from "@substreams/node";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Svix } from "svix";
import { Address } from "viem";
import { bullMqRedis } from "./prometheus.mjs";
import { SVIX_HOST_URL, SVIX_TOKEN } from "./utils.mjs";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const svix = new Svix(SVIX_TOKEN, {
  serverUrl: SVIX_HOST_URL,
});

const spkgPath = path.join(
  __dirname,
  "..",
  "..",
  "erc721-substream",
  "erc-721-v0.1.0.spkg",
);

export const clientCommandMessageReg =
  /ERR unknown command ['`]\s*client\s*['`]/;

type Input = {
  startBlock: number;
  appId: string;
  contractAddress: Address;
  token: string;
  substreamsEndpoint: string;
  outputModule: string;
};

export function createScheduler(config: {
  logger: Logger;
  redis: {
    host: string;
    port: number;
    password: string | undefined;
  };
  queueName: string;
}) {
  let redisConnection: Redis | null;
  let queue: Queue<Input> | null;
  let stopped = false;
  const logger = config.logger;

  function onError(source: string) {
    return (error: Error) => {
      logger.error({ error }, `onError called from ${source}`);
    };
  }

  function onFailed(job: Job<Input> | undefined, error: Error) {
    logger.debug(
      `Job %s failed after %s attempts, reason: %s`,
      job?.name,
      job?.attemptsMade,
      job?.failedReason,
    );
    logger.error(error);
  }

  async function initQueueAndWorkers() {
    if (!redisConnection) {
      logger.error("Redis connection not initialized");
      return;
    }

    queue = new Queue(config.queueName, {
      connection: redisConnection,
    });

    // Wait for Queues to be ready
    await queue.waitUntilReady();

    const worker = new Worker<Input>(
      config.queueName,
      async (job) => {
        const jobLogger = logger.child({
          jobId: job.id,
          jobName: job.name,
        });
        const cursorKey = `cursor:${job.name}:${job.id}`.toLowerCase();

        jobLogger.info(
          {
            payload: job.data,
          },
          "Processing job",
        );
        const {
          contractAddress,
          token,
          startBlock,
          appId,
          outputModule,
          substreamsEndpoint,
        } = job.data;

        const substreamPackage = await readPackage(spkgPath);

        if (!substreamPackage.modules) {
          throw new Error("No modules found in substream package");
        }

        jobLogger.debug(
          { contractAddress },
          "Applying params to substream package",
        );
        applyParams(
          [`map_transfers=${contractAddress}`],
          substreamPackage.modules.modules,
        );

        const moduleHash = await createModuleHashHex(
          substreamPackage.modules,
          outputModule,
        );
        jobLogger.debug({ moduleHash }, "Module hash");

        const registry = createRegistry(substreamPackage);
        const transport = createGrpcWebTransport({
          baseUrl: substreamsEndpoint,
          httpVersion: "2",
          // @ts-ignore - not sure what the issue is here
          interceptors: [createAuthInterceptor(token)],
          jsonOptions: {
            // @ts-ignore - not sure what the issue is here
            typeRegistry: registry,
          },
        });

        const startCursor =
          (await redisConnection?.get(cursorKey)) || undefined;
        logger.debug({ startCursor }, "Starting from cursor");
        const request = createRequest({
          substreamPackage,
          outputModule,
          startBlockNum: startBlock,
          startCursor,
        });

        // NodeJS Events
        // @ts-ignore - not sure what the issue is here
        const emitter = new BlockEmitter(transport, request, registry);

        // Setup tracing of metrics for Prometheus
        logger.trace({}, "Setting up Prometheus metrics");
        prometheus.onPrometheusMetrics(emitter, {
          substreamsEndpoint,
          contractAddress,
          moduleHash,
          appId,
        });

        emitter.on("cursor", async (cursor) => {
          if (cursor) {
            await redisConnection?.set(cursorKey, cursor);
          }
        });

        // Stream Blocks
        emitter.on("anyMessage", async (message, cursor, clock) => {
          const transfers = (message.transfers || []) as any[];

          const events = transfers.map((transfer) => {
            return svix.message.create(appId, {
              eventType: "erc721.transfer",
              payload: {
                type: "erc721.transfer",
                ...transfer,
              },
            });
          });

          try {
            await Promise.all(events);
          } catch (e) {
            jobLogger.error({ error: e }, "Error sending events to Svix");
          }
        });

        // Start the stream
        emitter.start();

        return new Promise((resolve, reject) => {
          // End of Stream
          emitter.on("close", (error) => {
            if (error) {
              jobLogger.error({ error }, "Error closing stream");
              reject(error);
            }
            resolve("Stream closed");
          });

          // Fatal Error
          emitter.on("fatalError", (error) => {
            jobLogger.fatal({ error }, "Fatal error in stream");
            reject(error);
          });
        });
      },
      {
        connection: redisConnection,
        concurrency: 1,
      },
    );

    worker.on("drained", () => {
      logger.info("Worker drained");
    });

    worker.on("completed", (job) => {
      logger.info(
        {
          payload: job.data,
        },
        "Job completed",
      );
    });

    worker.on("error", (err) => {
      onError("worker:error")(err);
    });

    worker.on("failed", (job, err) => {
      onFailed(job, err);
    });

    // Wait for Workers
    await worker.waitUntilReady();

    logger.info("BullMQ started");
  }

  async function start() {
    redisConnection = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis?.password,
      connectionName: config.queueName,
      retryStrategy(times) {
        return Math.min(times * 500, 2000);
      },
      reconnectOnError(error) {
        onError("redis:reconnectOnError")(error);
        if (clientCommandMessageReg.test(error.message)) {
          return false;
        }
        return 1;
      },
      db: 0,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    redisConnection.on("error", (err) => {
      onError("redis:error")(err);
      bullMqRedis.inc({ status: "error" }, 1);
    });

    redisConnection.on("connect", () => {
      logger.info("Redis connection established");
      bullMqRedis.inc({ status: "connect" }, 1);
    });

    redisConnection.on("ready", async () => {
      logger.info("Redis connection ready... creating queues and workers...");
      await initQueueAndWorkers();
      bullMqRedis.inc({ status: "ready" }, 1);
    });

    redisConnection.on("close", () => {
      logger.info("Redis connection closed");
      bullMqRedis.inc({ status: "close" }, 1);
    });

    redisConnection.on("reconnecting", (timeToReconnect?: number) => {
      logger.info("Redis reconnecting in %s", timeToReconnect);
      bullMqRedis.inc({ status: "reconnecting" }, 1);
    });

    redisConnection.on("end", async () => {
      logger.info("Redis ended - no more reconnections will be made");
      bullMqRedis.inc({ status: "end" }, 1);
      await stop();
    });
  }

  async function stop() {
    logger.info("Started Usage shutdown...");

    stopped = true;

    logger.info("Clearing BullMQ...");
    try {
      if (queue) {
        queue.removeAllListeners();
        await pTimeout(queue.close(), {
          milliseconds: 5000,
          message: "BullMQ close timeout",
        });
      }
    } catch (e) {
      logger.error("Failed to stop queues", e);
    } finally {
      queue = null;
      logger.info("BullMQ stopped");
    }

    if (redisConnection) {
      logger.info("Stopping Redis...");

      try {
        redisConnection.disconnect(false);
      } catch (e) {
        logger.error("Failed to stop Redis connection", e);
      } finally {
        redisConnection = null;
        queue = null;
        logger.info("Redis stopped");
      }
    }

    logger.info("Exiting");
    process.exit(0);
  }

  async function schedule(webhook: Input) {
    if (!queue) {
      throw new Error("Queue not initialized");
    }

    const name =
      `${webhook.appId}:${webhook.contractAddress}:${webhook.startBlock}`.toLowerCase();

    return queue.add(name, webhook, {
      // we want to retry the job if it fails
      removeOnFail: false,
      // we always keep listening for new blocks
      removeOnComplete: false,
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    });
  }

  return {
    schedule,
    start,
    stop,
    readiness() {
      if (stopped) {
        return false;
      }

      return queue !== null && redisConnection?.status === "ready";
    },
  };
}

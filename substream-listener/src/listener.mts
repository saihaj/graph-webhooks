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
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import promClient from "prom-client";
import { Svix } from "svix";
import { isAddress } from "viem";
import { parseEnv } from "znv";
import { z } from "zod";
import { logger } from "./logger.mjs";
import * as prometheus from "./prometheus.mjs";
import { SVIX_HOST_URL, SVIX_TOKEN } from "./utils.mjs";
import { createRedis } from "./redis.mjs";
import { App } from "uWebSockets.js";

const {
  START_BLOCK,
  APP_ID,
  CONTRACT_ADDRESS,
  TOKEN,
  SUBSTREAMS_ENDPOINT,
  OUTPUT_MODULE,
} = parseEnv(process.env, {
  START_BLOCK: z.number().default(0),
  APP_ID: z.string(),
  CONTRACT_ADDRESS: z.string().refine(isAddress),
  TOKEN: z.string(),
  SUBSTREAMS_ENDPOINT: z.string().transform((v) => v.toLowerCase()),
  OUTPUT_MODULE: z.string(),
});

const jobLogger = logger.child({ module: `webhook-listener-${APP_ID}` });

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const svix = new Svix(SVIX_TOKEN, {
  serverUrl: SVIX_HOST_URL,
});

const hashedEndpoint = createHash("sha256")
  .update(SUBSTREAMS_ENDPOINT)
  .digest("hex");

const spkgPath = path.join(
  __dirname,
  "..",
  "..",
  "erc721-substream",
  "erc-721-v0.1.0.spkg",
);

const cursorKey = `cursor:${APP_ID}:${hashedEndpoint}`.toLowerCase();

const redisConnection = await createRedis({
  appId: APP_ID,
  logger: jobLogger,
});

jobLogger.info(
  {
    contractAddress: CONTRACT_ADDRESS,
    startBlock: START_BLOCK,
    appId: APP_ID,
    outputModule: OUTPUT_MODULE,
    substreamsEndpoint: SUBSTREAMS_ENDPOINT,
    cursorKey,
  },
  "Processing job",
);

const substreamPackage = await readPackage(spkgPath);

if (!substreamPackage.modules) {
  throw new Error("No modules found in substream package");
}

jobLogger.debug(
  { contractAddress: CONTRACT_ADDRESS },
  "Applying params to substream package",
);
applyParams(
  [`map_transfers=${CONTRACT_ADDRESS}`],
  substreamPackage.modules.modules,
);

const moduleHash = await createModuleHashHex(
  substreamPackage.modules,
  OUTPUT_MODULE,
);
jobLogger.debug({ moduleHash }, "Module hash");

const registry = createRegistry(substreamPackage);
const transport = createGrpcWebTransport({
  baseUrl: SUBSTREAMS_ENDPOINT,
  httpVersion: "2",
  // @ts-ignore - not sure what the issue is here
  interceptors: [createAuthInterceptor(TOKEN)],
  jsonOptions: {
    // @ts-ignore - not sure what the issue is here
    typeRegistry: registry,
  },
});

const startCursor = (await redisConnection?.get(cursorKey)) || undefined;
logger.debug({ startCursor }, "Starting from cursor");
const request = createRequest({
  substreamPackage,
  outputModule: OUTPUT_MODULE,
  startBlockNum: START_BLOCK,
  startCursor,
});

// NodeJS Events
// @ts-ignore - not sure what the issue is here
const emitter = new BlockEmitter(transport, request, registry);

// Setup tracing of metrics for Prometheus
logger.trace({}, "Setting up Prometheus metrics");
prometheus.onPrometheusMetrics(emitter, {
  substreamsEndpoint: SUBSTREAMS_ENDPOINT,
  contractAddress: CONTRACT_ADDRESS,
  moduleHash,
  appId: APP_ID,
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
    return svix.message.create(APP_ID, {
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

// End of Stream
emitter.on("close", (error) => {
  if (error) {
    jobLogger.error({ error }, "Error closing stream");
  }
});

// Fatal Error
emitter.on("fatalError", (error) => {
  jobLogger.fatal({ error }, "Fatal error in stream");
});

// Start the stream
emitter.start();

const metricServer = App()
  .get("/metrics", async (res) => {
    res.writeHeader("Content-Type", prometheus.registry.contentType);
    res.end(await prometheus.registry.metrics());
  })
  .get("/ready", (res) => {
    const isReady = redisConnection?.status === "ready";
    res.writeStatus(isReady ? "200" : "503");
    res.end(isReady ? "OK" : "Not ready");
  })
  .get("/health", (res) => {
    res.writeStatus("200");
    res.end("OK");
  })
  .listen(10_254, () => {
    promClient.collectDefaultMetrics({
      labels: { instance: `webhook-listener-${APP_ID}` },
    });
    logger.info(`Metrics exposed on http://localhost:10254/metrics`);
  });

async function cleanup() {
  await Promise.all([stop(), metricServer.close()]);
}

process.on("SIGINT", async () => {
  logger.info("Received SIGINT - stopping...");
  await cleanup();
});

process.on("SIGTERM", async () => {
  logger.info("Received SIGTERM - stopping...");
  await cleanup();
});

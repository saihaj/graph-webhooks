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
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Svix } from "svix";
import { logger as baseLogger } from "./logger.mjs";
import * as prometheus from "./prometheus.mjs";
import {
  SVIX_HOST_URL,
  SVIX_TOKEN,
  START_BLOCK,
  APP_ID,
  CONTRACT_ADDRESS,
  TOKEN,
  SUBSTREAMS_ENDPOINT,
  OUTPUT_MODULE,
} from "./utils.mjs";
import { createRedis } from "./redis.mjs";
import { App } from "uWebSockets.js";

const logger = baseLogger.child({
  module: `substream-listener-${APP_ID}`,
});

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

const cursorKey = `cursor:${APP_ID}`.toLowerCase();

const redisConnection = await createRedis({
  appId: APP_ID,
  logger,
});

logger.info(
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

logger.debug(
  { contractAddress: CONTRACT_ADDRESS },
  "Applying params to substream package",
);
applyParams(
  // TODO: handle params better
  [`map_transfers=${CONTRACT_ADDRESS}`],
  substreamPackage.modules.modules,
);

const moduleHash = await createModuleHashHex(
  substreamPackage.modules,
  OUTPUT_MODULE,
);
logger.debug({ moduleHash }, "Module hash");

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
emitter.on("anyMessage", async (message) => {
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
    logger.error({ error: e }, "Error sending events to Svix");
  }
});

// End of Stream
emitter.on("close", (error) => {
  logger.error({ error }, "Error closing stream");
  prometheus.substream_emitter.inc({ status: "close", app_id: APP_ID });
  // we always want K8s to restart the pod if the stream closes
  process.exit(1);
});

// Fatal Error
emitter.on("fatalError", (error) => {
  logger.fatal({ error }, "Fatal error in stream");
  prometheus.substream_emitter.inc({ status: "error", app_id: APP_ID });
  // we always want K8s to restart the pod if the stream closes
  process.exit(1);
});

// Start the stream
emitter.start();
prometheus.substream_emitter.inc({ status: "start", app_id: APP_ID });

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
    prometheus.promClient.collectDefaultMetrics({
      labels: { instance: `substream-listener-${APP_ID}`, app_id: APP_ID },
    });
    logger.info(`Metrics exposed on http://localhost:10254/metrics`);
  });

async function cleanup() {
  await Promise.all([metricServer.close()]);
}

process.on("SIGINT", async () => {
  logger.info("Received SIGINT - stopping...");
  await cleanup();
});

process.on("SIGTERM", async () => {
  logger.info("Received SIGTERM - stopping...");
  await cleanup();
});

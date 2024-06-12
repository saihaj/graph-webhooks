import {
  applyParams,
  createModuleHashHex,
  createRegistry,
  createRequest,
} from "@substreams/core";
import { readPackage } from "@substreams/manifest";
import { BlockEmitter } from "@substreams/node";
import { createNodeTransport } from "@substreams/node/createNodeTransport";
import { Address } from "viem";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Svix } from "svix";
import * as prometheus from "./prometheus.mjs";
import { logger as mainLogger } from "./logger.mjs";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const svix = new Svix(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI3NjcxODYsImV4cCI6MjAyODEyNzE4NiwibmJmIjoxNzEyNzY3MTg2LCJpc3MiOiJzdml4LXNlcnZlciIsInN1YiI6Im9yZ18yM3JiOFlkR3FNVDBxSXpwZ0d3ZFhmSGlyTXUifQ.Gnj4vMl0qls2Q6ks690ZEUAW7h6VsgUHc6iwFWNPa1I",
  {
    serverUrl: "http://localhost:8071",
  },
);

const BASE_URL = "https://mainnet.eth.streamingfast.io:443";
const OUTPUT_MODULE = "map_transfers";

const spkgPath = path.join(
  __dirname,
  "..",
  "..",
  "erc721-substream",
  "erc-721-v0.1.0.spkg",
);

const logger = mainLogger.child({ module: "send-webhook" });

export async function sendWebhook({
  startBlock,
  appId,
  contractAddress,
  token,
}: {
  startBlock: number;
  appId: string;
  contractAddress: Address;
  token: string;
}) {
  const substreamPackage = await readPackage(spkgPath);

  if (!substreamPackage.modules) {
    throw new Error("No modules found in substream package");
  }

  logger.debug({ contractAddress }, "Applying params to substream package");
  applyParams(
    [`map_transfers=${contractAddress}`],
    substreamPackage.modules.modules,
  );

  const moduleHash = await createModuleHashHex(
    substreamPackage.modules,
    OUTPUT_MODULE,
  );
  logger.debug({ moduleHash }, "Module hash");

  const registry = createRegistry(substreamPackage);
  const transport = createNodeTransport(BASE_URL, token, registry);
  const request = createRequest({
    substreamPackage,
    outputModule: OUTPUT_MODULE,
    startBlockNum: startBlock,
  });

  // NodeJS Events
  const emitter = new BlockEmitter(transport, request, registry);

  // Setup tracing of metrics for Prometheus
  logger.trace({}, "Setting up Prometheus metrics");
  prometheus.onPrometheusMetrics(emitter, {
    substreamsEndpoint: BASE_URL,
    contractAddress,
    moduleHash,
  });

  // Stream Blocks
  emitter.on("anyMessage", async (message, cursor, clock) => {
    const transfers = (message.transfers || []) as any[];

    const a = transfers.map((transfer) => {
      return svix.message.create(appId, {
        eventType: "erc721.transfer",
        payload: {
          type: "erc721.transfer",
          ...transfer,
        },
      });
    });

    try {
      await Promise.all(a);
    } catch (e) {
      console.log(e);
    }
  });

  // End of Stream
  emitter.on("close", (error) => {
    if (error) {
      logger.error({ error }, "Error closing stream");
    }
    console.timeEnd("🆗 close");
  });

  // Fatal Error
  emitter.on("fatalError", (error) => {
    logger.fatal({ error }, "Fatal error in stream");
  });

  logger.info(
    { contractAddress, appId, startBlock, moduleHash },
    "Starting stream",
  );

  emitter.start();
}

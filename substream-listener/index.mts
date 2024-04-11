import {
  createModuleHashHex,
  createRegistry,
  createRequest,
} from "@substreams/core";
import { readPackage } from "@substreams/manifest";
import { BlockEmitter } from "@substreams/node";
import { createNodeTransport } from "@substreams/node/createNodeTransport";
import { Svix } from "svix";

if (!process.env.SUBSTREAMS_API_KEY) {
  throw new Error("SUBSTREAMS_API_KEY is require");
}

const token = process.env.SUBSTREAMS_API_KEY;
const baseUrl = "https://mainnet.eth.streamingfast.io:443";

// User parameters
const manifest =
  "https://github.com/streamingfast/substreams-template/releases/download/v0.2.0/substreams-template-v0.2.0.spkg";
const outputModule = "map_transfers";
const startBlockNum = 12292922;
const stopBlockNum = "+3";

// Read Substream
const substreamPackage = await readPackage(manifest);
if (!substreamPackage.modules) {
  throw new Error("No modules found in substream package");
}
const moduleHash = await createModuleHashHex(
  substreamPackage.modules,
  outputModule
);

const registry = createRegistry(substreamPackage);
const transport = createNodeTransport(baseUrl, token, registry);
const request = createRequest({
  substreamPackage,
  outputModule,
  startBlockNum,
  stopBlockNum,
});

// NodeJS Events
const emitter = new BlockEmitter(transport, request, registry);

// Session Trace ID
emitter.on("session", (session) => {
  console.dir(session);
});

const svix = new Svix(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI3NjcxODYsImV4cCI6MjAyODEyNzE4NiwibmJmIjoxNzEyNzY3MTg2LCJpc3MiOiJzdml4LXNlcnZlciIsInN1YiI6Im9yZ18yM3JiOFlkR3FNVDBxSXpwZ0d3ZFhmSGlyTXUifQ.Gnj4vMl0qls2Q6ks690ZEUAW7h6VsgUHc6iwFWNPa1I",
  {
    serverUrl: "http://localhost:8071",
  }
);

// Stream Blocks
emitter.on("anyMessage", async (message, cursor, clock) => {
  const transfers = (message.transfers || []) as any[];

  const a = transfers.map((transfer) => {
    return svix.message.create("app_2exohe87NfSjZUVqMoHQPtLLgoy", {
      eventType: "erc721.transfer",
      payload: {
        type: "erc721,transfer",
        ...transfer,
      },
    });
  });

  await Promise.all(a);
});

// End of Stream
emitter.on("close", (error) => {
  if (error) {
    console.error(error);
  }
  console.timeEnd("🆗 close");
});

// Fatal Error
emitter.on("fatalError", (error) => {
  console.error(error);
});

console.log("✅ start");
console.time("🆗 close");

console.log("✅ start");
console.time("🆗 close");
emitter.start();

// Cancel after 3 seconds
setTimeout(() => {
  emitter.cancelFn?.();
}, 3000);

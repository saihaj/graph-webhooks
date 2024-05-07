import {
  applyParams,
  createModuleHashHex,
  createRegistry,
  createRequest,
} from "@substreams/core";
import { readPackage } from "@substreams/manifest";
import { BlockEmitter } from "@substreams/node";
import { createNodeTransport } from "@substreams/node/createNodeTransport";
import path from "node:path";
import { Svix } from "svix";
import { createRouter, Response } from "fets";
import { App } from "uWebSockets.js";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const svix = new Svix(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI3NjcxODYsImV4cCI6MjAyODEyNzE4NiwibmJmIjoxNzEyNzY3MTg2LCJpc3MiOiJzdml4LXNlcnZlciIsInN1YiI6Im9yZ18yM3JiOFlkR3FNVDBxSXpwZ0d3ZFhmSGlyTXUifQ.Gnj4vMl0qls2Q6ks690ZEUAW7h6VsgUHc6iwFWNPa1I",
  {
    serverUrl: "http://localhost:8071",
  }
);

const TOKEN = (() => {
  if (!process.env.STREAMINGFAST_KEY) {
    throw new Error("STREAMINGFAST_KEY is require");
  }

  return process.env.STREAMINGFAST_KEY;
})();
const BASE_URL = "https://mainnet.eth.streamingfast.io:443";
const OUTPUT_MODULE = "map_transfers";

const spkgPath = path.join(
  __dirname,
  "..",
  "erc721-substream",
  "erc-721-v0.1.0.spkg"
);

async function sendWebhook({
  startBlock,
  appId,
}: {
  startBlock: number;
  appId: string;
}) {
  const substreamPackage = await readPackage(spkgPath);

  if (!substreamPackage.modules) {
    throw new Error("No modules found in substream package");
  }

  applyParams(
    ["map_transfers=0xA1D4657e0E6507D5a94d06DA93E94dC7C8c44b51"],
    substreamPackage.modules.modules
  );

  const registry = createRegistry(substreamPackage);
  const transport = createNodeTransport(BASE_URL, TOKEN, registry);
  const request = createRequest({
    substreamPackage,
    outputModule: OUTPUT_MODULE,
    startBlockNum: startBlock,
    stopBlockNum: startBlock + 1000,
  });

  // NodeJS Events
  const emitter = new BlockEmitter(transport, request, registry);

  // Session Trace ID
  emitter.on("session", (session) => {
    console.dir(session);
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

  console.time("🆗 close");
  emitter.start();

  // Cancel after 3 seconds
  setTimeout(() => {
    emitter.cancelFn?.();
  }, 3000);
}

// Creating a new router
const router = createRouter()
  // Use `.route` method to create a new /greetings route
  .route({
    path: "/register-webhook",
    method: "POST",
    // Defining the response schema
    schemas: {
      request: {
        json: {
          type: "object",
          properties: {
            appId: {
              type: "string",
              format: "uuid",
            },
            startBlock: {
              type: "integer",
            },
          },
        },
      },
      responses: {
        // The status code
        200: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
          required: ["message"],
          additionalProperties: false,
        },
      },
    },
    async handler(req) {
      // Extracting the appId and startBlock from the request
      const { appId, startBlock } = await req.json();

      // Sending the webhook
      sendWebhook({ appId, startBlock });

      // If the status code is not specified, it defaults to 200
      return Response.json({
        message: "Webhook registered",
      });
    },
  });

App()
  .any("/*", router)
  .listen(4040, () => {
    console.info(`Server is listening on http://localhost:4040`);
  });

// sendWebhook({
//   appId: "72d9f03b-62b0-4b02-9136-039d0aa20d30",
//   startBlock: 13707413,
// });

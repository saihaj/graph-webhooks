import { createRouter, Response } from "fets";
import { App } from "uWebSockets.js";
import { Address, isAddress } from "viem";
import promClient from "prom-client";
import {
  invalidHttpRequests,
  registry,
  successfulHttpRequests,
} from "./prometheus.mjs";
import { logger } from "./logger.mjs";
import { createScheduler } from "./scheduler.mjs";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./utils.mjs";

const { schedule, unschedule, start, stop, readiness } = createScheduler({
  queueName: "substream-sink-scheduler",
  logger: logger.child({ module: "substream-sink-scheduler" }),
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
});

const BASE_URL = "https://mainnet.eth.streamingfast.io:443";
const OUTPUT_MODULE = "map_transfers";

// Creating a new router
const router = createRouter({
  base: "/v1",
})
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
            contractAddress: {
              type: "string",
            },
            substreamsToken: {
              type: "string",
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
        400: {
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
      const json = await req.json().catch((error) => {
        logger.error(error, "Invalid JSON payload");
        return null;
      });

      if (!json) {
        invalidHttpRequests.inc();
        return Response.json(
          { message: "Invalid JSON payload" },
          { status: 400 },
        );
      }

      // Extracting the appId and startBlock from the request
      const { appId, startBlock, contractAddress, substreamsToken } = json;

      if (!appId) {
        invalidHttpRequests.inc();
        logger.error({ payload: json }, "Missing appId");
        return Response.json({ message: "appId is required" }, { status: 400 });
      }

      if (startBlock == null) {
        invalidHttpRequests.inc();
        logger.error({ payload: json }, "Missing startBlock");
        return Response.json(
          { message: "startBlock is required" },
          { status: 400 },
        );
      }

      if (!contractAddress) {
        invalidHttpRequests.inc();
        logger.error({ payload: json }, "Missing contractAddress");
        return Response.json(
          { message: "contractAddress is required" },
          { status: 400 },
        );
      }

      if (!substreamsToken) {
        invalidHttpRequests.inc();
        logger.error({ payload: json }, "Missing substreamsToken");
        return Response.json(
          { message: "substreamsToken is required" },
          { status: 400 },
        );
      }

      if (!isAddress(contractAddress)) {
        invalidHttpRequests.inc();
        logger.error({ payload: json }, "Missing contractAddress");
        return Response.json(
          { message: "contractAddress is invalid" },
          { status: 400 },
        );
      }

      const job = await schedule({
        appId,
        startBlock,
        contractAddress: contractAddress.toLowerCase() as Address,
        token: substreamsToken,
        outputModule: OUTPUT_MODULE,
        substreamsEndpoint: BASE_URL,
      });

      successfulHttpRequests.inc();
      logger.info({ job }, "Webhook registered");

      // If the status code is not specified, it defaults to 200
      return Response.json({
        message: "Webhook registered",
      });
    },
  })
  .route({
    path: "/unregister-webhook",
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
        400: {
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
      const json = await req.json().catch((error) => {
        logger.error(error, "Invalid JSON payload");
        return null;
      });

      if (!json) {
        invalidHttpRequests.inc();
        return Response.json(
          { message: "Invalid JSON payload" },
          { status: 400 },
        );
      }

      const { appId } = json;

      if (!appId) {
        invalidHttpRequests.inc();
        logger.error({ payload: json }, "Missing appId");
        return Response.json({ message: "appId is required" }, { status: 400 });
      }

      const status = await unschedule({
        appId,
      });

      successfulHttpRequests.inc();
      logger.info({ status }, "Webhook unregistered");

      return Response.json({
        message: "Webhook unregistered",
        status,
      });
    },
  })
  .route({
    path: "/health",
    method: "GET",
    async handler() {
      return Response.json({ status: "ok" }, { status: 200 });
    },
  })
  .route({
    path: "/ready",
    method: "GET",
    handler() {
      const isReady = readiness();

      return Response.json(
        { status: isReady ? "ok" : "not ready" },
        {
          status: isReady ? 200 : 503,
        },
      );
    },
  });

const webhookServer = App()
  .any("/*", router)
  .listen(4040, async () => {
    await start();
    logger.info("Server is listening on http://localhost:4040/v1/docs");
  });

const metricServer = App()
  .get("/metrics", async (res) => {
    res.writeHeader("Content-Type", registry.contentType);
    res.end(await registry.metrics());
  })
  .listen(10_254, () => {
    promClient.collectDefaultMetrics({
      labels: { instance: "substream-listener" },
    });
    logger.info(`Metrics exposed on http://localhost:10254/metrics`);
  });

async function cleanup() {
  await Promise.all([stop(), webhookServer.close(), metricServer.close()]);
}

process.on("SIGINT", async () => {
  logger.info("Received SIGINT - stopping...");
  await cleanup();
});

process.on("SIGTERM", async () => {
  logger.info("Received SIGTERM - stopping...");
  await cleanup();
});

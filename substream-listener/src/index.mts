import { createRouter, Response } from "fets";
import { App } from "uWebSockets.js";
import { isAddress } from "viem";
import { sendWebhook } from "./send-webhook.mjs";
import {
  invalidHttpRequests,
  registry,
  successfulHttpRequests,
} from "./prometheus.mjs";
import { logger } from "./logger.mjs";

// Creating a new router
const router = createRouter({
  base: "/v1",
})
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

      // Sending the webhook
      await Promise.all([
        sendWebhook({
          appId,
          startBlock,
          contractAddress: contractAddress.toLowerCase(),
          token: substreamsToken,
        }),
      ]);

      successfulHttpRequests.inc();
      logger.info({ payload: json }, "Webhook registered");

      // If the status code is not specified, it defaults to 200
      return Response.json({
        message: "Webhook registered",
      });
    },
  });

App()
  .any("/*", router)
  .listen(4040, () => {
    logger.info("Server is listening on http://localhost:4040/v1/docs");
  });

App()
  .get("/metrics", async (res) => {
    res.writeHeader("Content-Type", registry.contentType);
    res.end(await registry.metrics());
  })
  .listen(10_254, () => {
    logger.info(`Metrics exposed on http://localhost:10254/metrics`);
  });

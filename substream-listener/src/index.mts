import { createRouter, Response } from "fets";
import { App } from "uWebSockets.js";
import { isAddress } from "viem";
import { sendWebhook } from "./send-webhook.mjs";
import { registry } from "./prometheus.mjs";

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
      // Extracting the appId and startBlock from the request
      const { appId, startBlock, contractAddress, substreamsToken } =
        await req.json();

      if (!appId) {
        return Response.json({ message: "appId is required" }, { status: 400 });
      }

      if (startBlock == null) {
        return Response.json(
          { message: "startBlock is required" },
          { status: 400 },
        );
      }

      if (!contractAddress) {
        return Response.json(
          { message: "contractAddress is required" },
          { status: 400 },
        );
      }

      if (!substreamsToken) {
        return Response.json(
          { message: "substreamsToken is required" },
          { status: 400 },
        );
      }

      if (!isAddress(contractAddress)) {
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

      // If the status code is not specified, it defaults to 200
      return Response.json({
        message: "Webhook registered",
      });
    },
  });

App()
  .any("/*", router)
  .listen(4040, () => {
    console.info(`Server is listening on http://localhost:4040/v1/docs`);
  });

App()
  .get("/metrics", async (res) => {
    res.writeHeader("Content-Type", registry.contentType);
    res.end(await registry.metrics());
  })
  .listen(10_254, () => {
    console.info(`Metrics exposed on http://localhost:10254/metrics`);
  });

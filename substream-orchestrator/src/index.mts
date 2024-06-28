import { createRouter, Response } from "fets";
import { App } from "uWebSockets.js";
import { isAddress } from "viem";
import {
  invalidHttpRequests,
  registry,
  successfulHttpRequests,
  promClient,
  unsuccessfulHttpRequests,
} from "./prometheus.mjs";
import { logger } from "./logger.mjs";
import {
  DOCKER_TAG,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  SVIX_HOST_URL,
  SVIX_TOKEN,
} from "./utils.mjs";
import k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sBatchApi = kc.makeApiClient(k8s.BatchV1Api);

const BASE_URL = "https://mainnet.eth.streamingfast.io:443";
const OUTPUT_MODULE = "map_transfers";

const projectName = (appId: string) => `webhook-project-${appId}`;

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
          required: [
            "appId",
            "startBlock",
            "contractAddress",
            "substreamsToken",
          ],
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

      const env: k8s.V1EnvVar[] = [
        {
          name: "APP_ID",
          value: appId,
        },
        {
          name: "START_BLOCK",
          value: startBlock.toString(),
        },
        {
          name: "CONTRACT_ADDRESS",
          value: contractAddress.toString(),
        },
        {
          name: "SUBSTREAMS_ENDPOINT",
          value: BASE_URL,
        },
        {
          name: "OUTPUT_MODULE",
          value: OUTPUT_MODULE,
        },
        { name: "TOKEN", value: substreamsToken },
        {
          name: "REDIS_HOST",
          value: REDIS_HOST,
        },
        {
          name: "REDIS_PORT",
          value: REDIS_PORT.toString(),
        },
        {
          name: "SVIX_HOST_URL",
          value: SVIX_HOST_URL,
        },
        {
          name: "SVIX_TOKEN",
          value: SVIX_TOKEN,
        },
      ];

      if (REDIS_PASSWORD) {
        env.push({
          name: "REDIS_PASSWORD",
          value: REDIS_PASSWORD,
        });
      }

      const name = projectName(appId);

      try {
        const job = await k8sBatchApi.createNamespacedJob("default", {
          metadata: {
            name,
            labels: {
              app: "webhook-listener",
              "pod-template-hash": appId,
            },
          },
          spec: {
            template: {
              metadata: {
                annotations: {
                  "prometheus.io/path": "/metrics",
                  "prometheus.io/port": "10254",
                  "prometheus.io/scrape": "true",
                },
                labels: {
                  app: "webhook-listener",
                  "pod-template-hash": appId,
                },
                name,
              },
              spec: {
                imagePullSecrets: [
                  {
                    // This is configured by Pulumi in the cluster
                    name: "image-pull-secret",
                  },
                ],
                containers: [
                  {
                    name: "webhook-listener",
                    imagePullPolicy: "Always",
                    image: `ghcr.io/saihaj/graph-webhooks/substream-listener:${DOCKER_TAG}`,
                    env,
                    ports: [
                      {
                        containerPort: 10254,
                        protocol: "TCP",
                        name: "metrics",
                      },
                    ],
                    readinessProbe: {
                      httpGet: {
                        path: "/ready",
                        port: 10254,
                        scheme: "HTTP",
                      },
                    },
                    livenessProbe: {
                      httpGet: {
                        path: "/health",
                        port: 10254,
                        scheme: "HTTP",
                      },
                    },
                  },
                ],
                restartPolicy: "OnFailure",
              },
            },
          },
        });

        logger.info({ job: job.body }, "Created job");

        successfulHttpRequests.inc();
        logger.info({}, "Webhook registered");

        // If the status code is not specified, it defaults to 200
        return Response.json({
          message: "Webhook registered",
        });
      } catch (error) {
        logger.error({ error }, "Error registering webhook");
        unsuccessfulHttpRequests.inc();
        return Response.json(
          {
            message: "Error registering webhook",
          },
          { status: 400 },
        );
      }
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
          required: ["appId"],
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

      const name = projectName(appId);
      try {
        const patch = await k8sBatchApi.patchNamespacedJob(
          name,
          "default",
          [
            {
              op: "replace",
              path: "/spec/suspend",
              value: true,
            },
          ],
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          {
            headers: {
              "Content-type": k8s.PatchUtils.PATCH_FORMAT_JSON_PATCH,
            },
          },
        );

        logger.info({ patch: patch.body }, "Unregistered webhook");
        successfulHttpRequests.inc();

        return Response.json({
          message: "Webhook unregistered",
          body: patch.body,
        });
      } catch (error) {
        logger.error({ error }, "Error unregistering webhook");
        unsuccessfulHttpRequests.inc();
        return Response.json(
          {
            message: "Error unregistering webhook",
          },
          { status: 400 },
        );
      }
    },
  })
  .route({
    path: "/health",
    method: "GET",
    async handler() {
      return Response.json({ status: "ok" }, { status: 200 });
    },
  });

const webhookServer = App()
  .any("/*", router)
  .listen(4040, async () => {
    logger.info("Server is listening on http://localhost:4040/v1/docs");
  });

const metricServer = App()
  .get("/metrics", async (res) => {
    res.writeHeader("Content-Type", registry.contentType);
    res.end(await registry.metrics());
  })
  .listen(10_254, () => {
    promClient.collectDefaultMetrics({
      labels: { instance: "substream-orchestrator" },
    });
    logger.info(`Metrics exposed on http://localhost:10254/metrics`);
  });

async function cleanup() {
  await Promise.all([webhookServer.close(), metricServer.close()]);
}

process.on("SIGINT", async () => {
  logger.info("Received SIGINT - stopping...");
  await cleanup();
});

process.on("SIGTERM", async () => {
  logger.info("Received SIGTERM - stopping...");
  await cleanup();
});

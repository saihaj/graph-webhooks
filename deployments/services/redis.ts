import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as kx from "@pulumi/kubernetesx";
import { normalizeEnv, PodBuilder } from "../utils/pod-builder";
import * as random from "@pulumi/random";
import { serviceLocalHost } from "../utils/helpers";

const PORT = 6379;

class Redis {
  constructor(
    protected options: {
      env?: kx.types.Container["env"];
      password: pulumi.Output<string>;
    },
    protected provider: k8s.Provider
  ) {}

  deploy({
    limits,
  }: {
    limits: k8s.types.input.core.v1.ResourceRequirements["limits"];
  }) {
    const name = "redis-store";

    const env = normalizeEnv(this.options.env ?? {}).concat([
      {
        name: "REDIS_PASSWORD",
        value: this.options.password,
      },
      {
        name: "POD_NAME",
        valueFrom: {
          fieldRef: {
            fieldPath: "metadata.name",
          },
        },
      },
    ]);

    const cm = new kx.ConfigMap(
      "redis-scripts",
      {
        data: {
          "readiness.sh": pulumi.interpolate`#!/bin/bash
response=$(timeout -s SIGTERM 3 $1 redis-cli -h localhost -a ${this.options.password} -p ${PORT} ping)
if [ "$response" != "PONG" ]; then
  echo "$response"
  exit 1
fi
        `,
          "liveness.sh": pulumi.interpolate`#!/bin/bash
response=$(timeout -s SIGTERM 3 $1 redis-cli -h localhost -a ${this.options.password} -p ${PORT} ping)
if [ "$response" != "PONG" ] && [ "$response" != "LOADING Redis is loading the dataset in memory" ]; then
  echo "$response"
  exit 1
fi
        `,
        },
      },
      {
        provider: this.provider,
      }
    );

    const volumeMounts = [cm.mount("/scripts")];

    const pb = new PodBuilder({
      restartPolicy: "Always",
      containers: [
        {
          name,
          image: "docker.io/redis:7.0.15-alpine3.20",
          env,
          volumeMounts,
          ports: [{ containerPort: PORT, protocol: "TCP" }],
          resources: {
            limits,
          },
          livenessProbe: {
            initialDelaySeconds: 3,
            periodSeconds: 10,
            failureThreshold: 10,
            timeoutSeconds: 3,
            exec: {
              command: ["/bin/sh", "/scripts/liveness.sh"],
            },
          },
          readinessProbe: {
            initialDelaySeconds: 5,
            periodSeconds: 8,
            failureThreshold: 5,
            timeoutSeconds: 3,
            exec: {
              command: ["/bin/sh", "/scripts/readiness.sh"],
            },
          },
        },
      ],
    });

    const metadata: k8s.types.input.meta.v1.ObjectMeta = {
      annotations: {},
    };

    const deployment = new kx.Deployment(
      name,
      {
        spec: pb.asExtendedDeploymentSpec(
          {
            replicas: 1,
            strategy: {
              type: "RollingUpdate",
              rollingUpdate: {
                maxSurge: 1,
                maxUnavailable: 0,
              },
            },
          },
          {
            annotations: metadata.annotations,
          }
        ),
      },
      {
        provider: this.provider,
      }
    );

    new k8s.policy.v1.PodDisruptionBudget(
      "redis-pdb",
      {
        spec: {
          minAvailable: 1,
          selector: deployment.spec.selector,
        },
      },
      {
        provider: this.provider,
      }
    );

    const service = deployment.createService({});

    return { deployment, service, port: PORT };
  }
}

export function createRedis({ provider }: { provider: k8s.Provider }) {
  const password = new random.RandomPassword("guild-redis-password", {
    length: 32,
    special: false,
  });

  const redisApi = new Redis(
    {
      password: password.result,
    },
    provider
  ).deploy({
    limits: {
      memory: "512Mi",
      cpu: "1000m",
    },
  });

  return {
    deployment: redisApi.deployment,
    service: redisApi.service,
    config: {
      host: serviceLocalHost(redisApi.service),
      port: redisApi.port,
      password: password.result,
    },
  };
}

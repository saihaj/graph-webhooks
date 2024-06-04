import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import * as pulumi from "@pulumi/pulumi";
import { isDefined } from "./helpers";
import { normalizeEnv, PodBuilder } from "./pod-builder";

export class ServiceDeployment {
  constructor(
    protected name: string,
    protected options: {
      imagePullSecret?: k8s.core.v1.Secret;
      env?: kx.types.Container["env"];
      args?: kx.types.Container["args"];
      image: string;
      port?: number;
      livenessProbe?: string;
      readinessProbe?: string;
      memoryLimit?: string;
      cpuLimit?: string;
      volumes?: k8s.types.input.core.v1.Volume[];
      volumeMounts?: k8s.types.input.core.v1.VolumeMount[];
      /**
       * Enables /metrics endpoint on port 10254
       */
      exposesMetrics?: boolean;
      replicas?: number;
      pdb?: boolean;
      autoScaling?: {
        minReplicas?: number;
        maxReplicas: number;
        cpu: {
          limit: string;
          cpuAverageToScale: number;
        };
      };
      command?: string[];
    },
    protected provider: pulumi.ProviderResource,
    protected dependencies?: Array<pulumi.Resource | undefined | null>,
    protected parent?: pulumi.Resource | null
  ) {}

  deployAsJob() {
    const { pb } = this.createPod(true);

    const job = new kx.Job(
      this.name,
      {
        spec: pb.asJobSpec(),
      },
      {
        dependsOn: this.dependencies?.filter(isDefined),
        provider: this.provider,
      }
    );

    return { job };
  }

  createPod(asJob: boolean) {
    const port = this.options.port || 3000;
    const additionalEnv: any[] = normalizeEnv(this.options.env);

    let livenessProbe: k8s.types.input.core.v1.Probe | undefined = undefined;
    let readinessProbe: k8s.types.input.core.v1.Probe | undefined = undefined;

    if (this.options.livenessProbe) {
      livenessProbe = {
        initialDelaySeconds: 5,
        periodSeconds: 10,
        failureThreshold: 5,
        timeoutSeconds: 15,
        httpGet: {
          path: this.options.livenessProbe,
          port,
        },
      };
    }

    if (this.options.readinessProbe) {
      readinessProbe = {
        initialDelaySeconds: 5,
        periodSeconds: 30,
        failureThreshold: 5,
        timeoutSeconds: 15,
        httpGet: {
          path: this.options.readinessProbe,
          port,
        },
      };
    }

    if (this.options.exposesMetrics) {
      additionalEnv.push({ name: "PROMETHEUS_METRICS", value: "1" });
    }

    const pb = new PodBuilder({
      restartPolicy: asJob ? "Never" : "Always",
      imagePullSecrets: this.options.imagePullSecret
        ? [{ name: this.options.imagePullSecret.metadata.name }]
        : undefined,
      terminationGracePeriodSeconds: 60,
      volumes: this.options.volumes,
      containers: [
        {
          livenessProbe,
          readinessProbe,
          volumeMounts: this.options.volumeMounts,
          imagePullPolicy: "Always",
          env: [
            { name: "PORT", value: String(port) },
            {
              name: "POD_NAME",
              valueFrom: {
                fieldRef: {
                  fieldPath: "metadata.name",
                },
              },
            },
          ].concat(additionalEnv),
          name: this.name,
          image: this.options.image,
          resources: this.options?.autoScaling?.cpu.limit
            ? {
                limits: {
                  cpu: this.options?.autoScaling?.cpu.limit,
                },
              }
            : undefined,
          args: this.options.args,
          ports: {
            http: port,
            ...(this.options.exposesMetrics
              ? {
                  metrics: 10_254,
                }
              : {}),
          },
          command: this.options.command,
        },
      ],
    });

    return { pb };
  }

  deploy() {
    const { pb } = this.createPod(false);

    const metadata: k8s.types.input.meta.v1.ObjectMeta = {
      annotations: {},
    };

    if (this.options.exposesMetrics) {
      metadata.annotations = {
        "prometheus.io/port": "10254",
        "prometheus.io/path": "/metrics",
        "prometheus.io/scrape": "true",
      };
    }

    const deployment = new kx.Deployment(
      this.name,
      {
        spec: pb.asExtendedDeploymentSpec(
          {
            replicas: this.options.replicas ?? 1,
            strategy: {
              type: "RollingUpdate",
              rollingUpdate: {
                maxSurge: this.options.replicas ?? 1,
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
        dependsOn: this.dependencies?.filter(isDefined),
        parent: this.parent ?? undefined,
        provider: this.provider,
      }
    );

    if (this.options.pdb) {
      new k8s.policy.v1.PodDisruptionBudget(
        `${this.name}-pdb`,
        {
          spec: {
            minAvailable: 1,
            selector: deployment.spec.selector,
          },
        },
        { provider: this.provider }
      );
    }

    const service = deployment.createService({});

    if (this.options.autoScaling) {
      new k8s.autoscaling.v2.HorizontalPodAutoscaler(
        `${this.name}-autoscaler`,
        {
          apiVersion: "autoscaling/v2",
          kind: "HorizontalPodAutoscaler",
          metadata: {},
          spec: {
            scaleTargetRef: {
              name: deployment.metadata.name,
              kind: deployment.kind,
              apiVersion: deployment.apiVersion,
            },
            metrics: [
              {
                type: "Resource",
                resource: {
                  name: "cpu",
                  target: {
                    type: "Utilization",
                    averageUtilization:
                      this.options.autoScaling.cpu.cpuAverageToScale,
                  },
                },
              },
            ],
            minReplicas:
              this.options.autoScaling.minReplicas ||
              this.options.replicas ||
              1,
            maxReplicas: this.options.autoScaling.maxReplicas,
          },
        },
        {
          dependsOn: [deployment, service],
          provider: this.provider,
        }
      );
    }

    return { deployment, service };
  }
}

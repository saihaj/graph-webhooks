/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type IntOrString = string | number;

export interface Values {
  /**
   * Usually used when using Opentelemetry-collector as a subchart.
   */
  enabled?: boolean;
  global?: {};
  /**
   * Override name of the chart used in Kubernetes object names.
   */
  nameOverride?: string;
  /**
   * Override fully qualified app name.
   */
  fullnameOverride?: string;
  mode: "daemonset" | "deployment" | "statefulset" | "";
  presets?: {
    logsCollection?: {
      /**
       * Specifies whether the collector should collect logs.
       */
      enabled?: boolean;
      /**
       * Specifies whether the collector should collect its own logs.
       */
      includeCollectorLogs?: boolean;
      /**
       * Specifies whether logs checkpoints should be stored in /var/lib/otelcol/ host directory.
       */
      storeCheckpoints?: boolean;
    };
    hostMetrics?: {
      /**
       * Specifies whether the collector should collect host metrics.
       */
      enabled?: boolean;
    };
    kubeletMetrics?: {
      /**
       * Specifies whether the collector should collect kubelet metrics.
       */
      enabled?: boolean;
    };
    kubernetesAttributes?: {
      /**
       * Specifies whether the collector should add Kubernetes metdata to resource attributes.
       */
      enabled?: boolean;
    };
    kubernetesEvents?: {
      /**
       * Specifies whether the collector should collect Kubernetes objects.
       */
      enabled?: boolean;
    };
    clusterMetrics?: {
      /**
       * Specifies whether the collector should collect cluster metrics.
       */
      enabled?: boolean;
    };
  };
  configMap?: {
    /**
     * Specifies whether a configMap should be created (true by default).
     */
    create?: boolean;
  };
  /**
   * Configuration that applies to both standalone and agent collector. Overwritable by standalone and agent specific configs.
   */
  config?: {};
  /**
   * Image use in both standalone and agent configs
   */
  image?: {
    repository?: string;
    tag?: string;
    digest?: string;
    pullPolicy?: "IfNotPresent" | "Always" | "Never";
  };
  imagePullSecrets?: {}[];
  /**
   * OpenTelemetry Collector executable
   */
  command?: {
    name?: string;
    extraArgs?: string[];
  };
  serviceAccount?: {
    create: boolean;
    annotations?: {};
    name?: string;
  };
  clusterRole?: {
    create: boolean;
    annotations?: {};
    name?: string;
    rules?: {}[];
    clusterRoleBinding?: {
      annotations?: {};
      name?: string;
    };
  };
  podSecurityContext?: {};
  securityContext?: {};
  nodeSelector?: {};
  tolerations?: {}[];
  affinity?: {};
  topologySpreadConstraints?: {}[];
  priorityClassName?: string;
  extraContainers?: {
    name: string;
    [k: string]: unknown;
  }[];
  initContainers?: {
    name: string;
    [k: string]: unknown;
  }[];
  extraEnvs?: {}[];
  extraConfigMapMounts?: {}[];
  extraHostPathMounts?: {}[];
  secretMounts?: {}[];
  extraVolumes?: {}[];
  extraVolumeMounts?: {}[];
  ports?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` ".*".
     */
    [k: string]: {
      enabled: boolean;
      containerPort?: number;
      servicePort?: number;
      hostPort?: number;
      nodePort?: number;
      protocol?: string;
      appProtocol?: string;
    };
  };
  containerLogs?: {
    enabled: boolean;
  };
  resources?: {
    limits?: {
      cpu?: string | number;
      memory?: string;
    };
    requests?: {
      cpu?: string | number;
      memory?: string;
    };
  };
  lifecycleHooks?: {
    postStart?: {
      [k: string]: unknown;
    };
    preStop?: {
      [k: string]: unknown;
    };
  };
  podAnnotations?: {};
  podLabels?: {};
  hostNetwork?: boolean;
  dnsPolicy?:
    | "ClusterFirst"
    | "ClusterFirstWithHostNet"
    | "Default"
    | "None"
    | "";
  replicaCount?: number;
  revisionHistoryLimit?: number;
  annotations?: {};
  service?: {
    type?: "ClusterIP" | "NodePort" | "LoadBalancer" | "ExternalName";
    clusterIP?: string;
    loadBalancerIP?: string;
    loadBalancerSourceRanges?: string[];
    annotations?: {};
  };
  ingress?: {
    enabled: boolean;
    ingressClassName?: string;
    annotations?: {};
    hosts?: {
      host?: string;
      paths: {
        path: string;
        pathType: "Exact" | "Prefix" | "ImplementationSpecific";
        port: number;
      }[];
    }[];
    tls?: {
      secretName?: string;
      hosts?: string[];
    }[];
    additionalIngresses?: {
      name: string;
      ingressClassName?: string;
      annotations?: {};
      hosts?: {
        host?: string;
        paths: {
          path: string;
          pathType: "Exact" | "Prefix" | "ImplementationSpecific";
          port: number;
        }[];
      }[];
      tls?: {
        secretName?: string;
        hosts?: string[];
      }[];
    }[];
  };
  podMonitor?: {
    enabled: boolean;
    metricsEndpoints?: {}[];
    extraLabels?: {};
  };
  serviceMonitor?: {
    enabled: boolean;
    metricsEndpoints?: {}[];
    extraLabels?: {};
  };
  podDisruptionBudget?: {
    enabled: boolean;
  };
  autoscaling?: {
    enabled: boolean;
    minReplicas?: number;
    maxReplicas?: number;
    targetCPUUtilizationPercentage?: number;
  };
  rollout?: {
    rollingUpdate?: {
      maxSurge?: IntOrString;
      maxUnavailable?: IntOrString;
    };
    strategy: "OnDelete" | "Recreate" | "RollingUpdate";
  };
  prometheusRule?: {
    enabled: boolean;
    groups?: {}[];
    defaultRules?: {
      enabled: boolean;
    };
    extraLabels?: {};
  };
  statefulset?: {
    volumeClaimTemplates?: {}[];
    podManagementPolicy?: string;
  };
  networkPolicy?: {
    enabled?: boolean;
    annotations?: {};
    /**
     * List of sources which should be able to access the collector. See the standard NetworkPolicy 'spec.ingress.from' definition for more information: https://kubernetes.io/docs/reference/kubernetes-api/policy-resources/network-policy-v1/. If left empty, ingress traffic will be permitted on to all enabled ports from all sources.
     */
    allowIngressFrom?: {}[];
    /**
     * Additional ingress rules to apply to the policy. See the standard NetworkPolicy 'spec.ingress' definition for more information: https://kubernetes.io/docs/reference/kubernetes-api/policy-resources/network-policy-v1/
     */
    extraIngressRules?: {}[];
    /**
     * Optional egress configuration, see the standard NetworkPolicy 'spec.egress' definition for more information: https://kubernetes.io/docs/reference/kubernetes-api/policy-resources/network-policy-v1/
     */
    egressRules?: {}[];
  };
}

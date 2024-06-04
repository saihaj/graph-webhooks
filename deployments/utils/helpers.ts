import { DeploymentEnvironment } from "./types";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

export function isProduction(
  deploymentEnv: DeploymentEnvironment | string
): boolean {
  return isDeploymentEnvironment(deploymentEnv)
    ? deploymentEnv.ENVIRONMENT === "production" ||
        deploymentEnv.ENVIRONMENT === "prod"
    : deploymentEnv === "production" || deploymentEnv === "prod";
}

export function isStaging(
  deploymentEnv: DeploymentEnvironment | string
): boolean {
  return isDeploymentEnvironment(deploymentEnv)
    ? deploymentEnv.ENVIRONMENT === "staging"
    : deploymentEnv === "staging";
}

export function isDeploymentEnvironment(
  value: any
): value is DeploymentEnvironment {
  return (
    value &&
    typeof value === "object" &&
    typeof value["ENVIRONMENT"] === "string"
  );
}

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export const PROVISIONER_TAG = "Saihaj (via Pulumi)";

export function serviceLocalHost(service: k8s.types.input.core.v1.Service) {
  return pulumi.all([service.metadata]).apply(([metadata]) => {
    return `${metadata?.name}.${metadata?.namespace || "default"}.svc.cluster.local`;
  });
}

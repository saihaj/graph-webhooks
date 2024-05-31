import * as azure from "@pulumi/azure-native";
import { PROVISIONER_TAG } from "../utils/helpers";

export function createRedis({
  envName,
  resourceGroup,
  subnet,
}: {
  envName: string;
  resourceGroup: azure.resources.ResourceGroup;
  subnet: azure.network.Subnet;
}) {
  const server = new azure.cache.Redis(`graphwebhooks${envName}redis`, {
    enableNonSslPort: true,
    minimumTlsVersion: azure.cache.TlsVersion.TlsVersion_1_2,
    resourceGroupName: resourceGroup.name,
    publicNetworkAccess: "Enabled",
    redisVersion: "6",
    sku: {
      name: "Basic",
      family: azure.cache.SkuFamily.C,
      capacity: 2,
    },
    // subnetId: subnet.id, // Only in premium sku we can configure vnet
    tags: {
      provisionedBy: PROVISIONER_TAG,
    },
  });

  return {
    server,
  };
}

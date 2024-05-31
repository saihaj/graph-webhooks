import * as azure from "@pulumi/azure-native";
import * as az from "@pulumi/azure";
import * as random from "@pulumi/random";
import { PROVISIONER_TAG } from "../utils/helpers";

export function createPostgres({
  envName,
  resourceGroup,
  subnet,
}: {
  envName: string;
  resourceGroup: azure.resources.ResourceGroup;
  subnet: azure.network.Subnet;
}) {
  const name = `graphwebhooks${envName}`;
  const username = "guilduser";
  const password = new random.RandomPassword("guild-database-password", {
    length: 32,
    special: false,
  });

  const server = new az.postgresql.Server(name, {
    name,
    resourceGroupName: resourceGroup.name,
    skuName: "GP_Gen5_2",
    storageMb: 262144, // 256 GB (1024 * 256)
    backupRetentionDays: 7,
    geoRedundantBackupEnabled: false,
    autoGrowEnabled: true,
    administratorLogin: username,
    administratorLoginPassword: password.result,
    version: "11",
    sslEnforcementEnabled: true,
    tags: {
      provisionedBy: PROVISIONER_TAG,
    },
  });

  const network = new az.postgresql.VirtualNetworkRule("aks-pg-vnet-rule", {
    name: "aks-pg-vnet-rule",
    resourceGroupName: resourceGroup.name,
    serverName: server.name,
    subnetId: subnet.id,
    ignoreMissingVnetServiceEndpoint: true,
  });

  return {
    server,
    username,
    password,
    network,
  };
}

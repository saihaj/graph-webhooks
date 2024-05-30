import * as azure from "@pulumi/azure-native";
import * as az from "@pulumi/azure";
import * as random from "@pulumi/random";
import { PROVISIONER_TAG } from "../utils/helpers";

export function createPostgres({
  envName,
  resourceGroup,
}: {
  envName: string;
  resourceGroup: azure.resources.ResourceGroup;
}) {
  const name = `thegraphwebhooks${envName}`;
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

  const database = new az.postgresql.Database("example", {
    name: "postgres",
    resourceGroupName: resourceGroup.name,
    serverName: server.name,
    charset: "UTF8",
    collation: "English_United States.1252",
  });

  return {
    server,
    database,
    username,
    password,
  };
}

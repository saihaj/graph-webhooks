import * as azure from "@pulumi/azure-native";
import * as az from "@pulumi/azure";
import * as random from "@pulumi/random";

export function createPostgres({
  envName,
  resourceGroup,
}: {
  envName: string;
  resourceGroup: azure.resources.ResourceGroup;
}) {
  const name = `thegraph-webhooks-${envName}`;
  const username = "guild-user";
  const password = new random.RandomPassword("guild-database-password", {
    length: 16,
    special: false,
  });

  const server = new az.postgresql.Server(name, {
    name,
    resourceGroupName: resourceGroup.name,
    skuName: "B_Gen5_2",
    storageMb: 5120,
    backupRetentionDays: 7,
    geoRedundantBackupEnabled: false,
    autoGrowEnabled: true,
    administratorLogin: username,
    administratorLoginPassword: password.result,
    version: "9.5",
    sslEnforcementEnabled: true,
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

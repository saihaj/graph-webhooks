import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
import * as azuread from "@pulumi/azuread";
import { createAksCluster } from "./services/aks-cluster";
import { PROVISIONER_TAG } from "./utils/helpers";
import { CertManager } from "./services/cert-manager";
import { createPostgres } from "./services/postgres";
import { ServiceDeployment } from "./utils/service-deployment";
import { Proxy } from "./services/reverse-proxy";
import { createRedis } from "./services/redis";

// Reduce noise in logs for `pulumi up`
process.env.PULUMI_K8S_SUPPRESS_HELM_HOOK_WARNINGS = "1";

const imagesTag = process.env.DOCKER_IMAGE_TAG || "latest";

const config = new pulumi.Config("graph-webhooks");
const envName = pulumi.getStack();

const rootDns = config.require("dnsZone");
const appDns = config.require("appDns");
const appHostname = `${appDns}.${rootDns}`;
const nodeCount = config.getNumber("clusterNodeCount") || 1;
const subscriptionId = config.require("subscriptionId");

// Create Azure AD Application
const adApp = new azuread.Application("graph-webhooks", {
  displayName: "graph-webhooks",
});

const servicePrincipal = new azuread.ServicePrincipal("graph-webhooks-sp", {
  clientId: adApp.clientId,
});

const servicePrincipalPassword = new azuread.ServicePrincipalPassword(
  "graph-webhooks-sp-password",
  {
    servicePrincipalId: servicePrincipal.id,
  },
);

// Create a new resource group
const resourceGroup = new azure.resources.ResourceGroup("the-graph-webhooks", {
  tags: {
    provisionedBy: PROVISIONER_TAG,
  },
});

// Create an AKS cluster
const { cluster, provider, kubeConfig, publicIp, subnet } = createAksCluster({
  envName,
  resourceGroup,
  nodeCount,
  servicePrincipal,
  servicePrincipalPassword,
});

export const { tlsIssueName } = new CertManager(
  provider,
).deployCertManagerAndIssuer();

const { server, username, password } = createPostgres({
  envName,
  resourceGroup,
  subnet,
});

const {
  deployment: redisDeployment,
  service: redisService,
  config: redisConfig,
} = createRedis({
  provider,
});

const reverseProxy = new Proxy(tlsIssueName, provider, publicIp);

const databaseConnectionString = pulumi.interpolate`postgresql://${username}%40${server.name}:${password}@${server.fqdn}:5432/postgres`;
const redisConnectionString = pulumi.interpolate`redis://${redisConfig.host}:${redisConfig.port}`;

const svixServer = new ServiceDeployment(
  "svix-server",
  {
    image: "docker.io/svix/svix-server",
    readinessProbe: "/api/v1/health", // TODO: figure out correct path
    livenessProbe: "/api/v1/health", // TODO: figure out correct path
    replicas: 1,
    port: 8071,
    env: [
      { name: "SVIX_JWT_SECRET", value: "helphelphelp" },
      {
        name: "SVIX_DB_DSN",
        value: databaseConnectionString,
      },
      {
        name: "SVIX_REDIS_DSN",
        value: redisConnectionString,
      },
    ],
  },
  provider,
  [redisDeployment, redisService],
);

const deploySvix = svixServer.deploy();

reverseProxy
  .registerService({ record: appHostname }, [
    {
      name: "svix-server",
      path: "/",
      service: deploySvix.service,
    },
  ])
  .deployProxy({
    replicas: 1,
  })
  .get();

export const kubeconfig = pulumi.secret(kubeConfig);
export const clusterName = cluster.name;
export const databaseConnection = pulumi.secret(databaseConnectionString);

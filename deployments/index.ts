import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
import * as azuread from "@pulumi/azuread";
import { createAksCluster } from "./services/aks-cluster";
import { PROVISIONER_TAG } from "./utils/helpers";
import { CertManager } from "./services/cert-manager";

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
  applicationId: adApp.clientId,
});

const servicePrincipalPassword = new azuread.ServicePrincipalPassword(
  "graph-webhooks-sp-password",
  {
    servicePrincipalId: servicePrincipal.id,
  }
);

// Create a new resource group
const resourceGroup = new azure.resources.ResourceGroup("the-graph-webhooks", {
  tags: {
    provisionedBy: PROVISIONER_TAG,
  },
});

// Create an AKS cluster
const { cluster, provider, kubeConfig } = createAksCluster({
  envName,
  resourceGroup,
  nodeCount,
  servicePrincipal,
  servicePrincipalPassword,
  subscriptionId,
});

export const { tlsIssueName } = new CertManager(
  provider
).deployCertManagerAndIssuer();

export const kubeconfig = kubeConfig;
export const clusterName = cluster.name;

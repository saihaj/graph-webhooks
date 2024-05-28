import * as azure from "@pulumi/azure-native";

// Create a new resource group
const resourceGroup = new azure.resources.ResourceGroup("the-graph-webhooks", {
  tags: {
    provisionedBy: "Saihaj",
  },
});

// Create an AKS cluster
const cluster = new azure.containerservice.ManagedCluster("thegraphwebhooks", {
  resourceGroupName: resourceGroup.name,
  agentPoolProfiles: [
    {
      count: 2,
      vmSize: "Standard_DS2_v2",
      name: "agentpool",
      mode: "System",
    },
  ],
  dnsPrefix: "thegraphwebhooks",
  kubernetesVersion: "1.30",
  tags: {
    provisionedBy: "Saihaj",
  },
});

export const clusterName = cluster.name;

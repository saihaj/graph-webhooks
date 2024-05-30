import * as azure from "@pulumi/azure-native";
import * as azuread from "@pulumi/azuread";
import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";
import { PROVISIONER_TAG } from "../utils/helpers";

export function createAksCluster({
  envName,
  resourceGroup,
  nodeCount,
  servicePrincipal,
  servicePrincipalPassword,
  subscriptionId,
}: {
  envName: string;
  resourceGroup: azure.resources.ResourceGroup;
  servicePrincipal: azuread.ServicePrincipal;
  servicePrincipalPassword: azuread.ServicePrincipalPassword;
  subscriptionId: string;
  nodeCount: number;
}) {
  const virtualNetwork = new azure.network.VirtualNetwork(
    `graphwebhooks-${envName}-vnet`,
    {
      resourceGroupName: resourceGroup.name,
      addressSpace: {
        addressPrefixes: ["10.0.0.0/16"],
      },
      tags: {
        provisionedBy: PROVISIONER_TAG,
      },
    }
  );

  const subnet = new azure.network.Subnet(`graphwebhooks-${envName}-subnet`, {
    resourceGroupName: resourceGroup.name,
    virtualNetworkName: virtualNetwork.name,
    addressPrefixes: ["10.0.0.0/24"],
  });

  const cluster = new azure.containerservice.ManagedCluster(
    `graphwebhooks-${envName}`,
    {
      resourceGroupName: resourceGroup.name,
      agentPoolProfiles: [
        {
          count: nodeCount,
          vmSize: "Standard_DS2_v2",
          name: "agentpool",
          mode: "System",
          osType: azure.containerservice.OSType.Linux,
          vnetSubnetID: subnet.id,
        },
      ],
      servicePrincipalProfile: {
        clientId: servicePrincipal.clientId,
        secret: servicePrincipalPassword.value,
      },
      enableRBAC: true,
      networkProfile: {
        networkPlugin: "azure",
        serviceCidr: "10.10.0.0/16",
        dnsServiceIP: "10.10.0.10",
      },
      dnsPrefix: `graphwebhooks-${envName}`,
      kubernetesVersion: "1.29.2",
      tags: {
        provisionedBy: PROVISIONER_TAG,
      },
    }
  );

  const kubeConfig = pulumi
    .output([resourceGroup.name, cluster.name])
    .apply(async ([resourceGroupName, resourceName]) => {
      const creds =
        await azure.containerservice.listManagedClusterUserCredentials({
          resourceGroupName,
          resourceName,
        });

      const encoded = creds.kubeconfigs[0].value;

      return Buffer.from(encoded, "base64").toString("utf-8");
    });

  const provider = new k8s.Provider(`graphwebhooks-${envName}-provider`, {
    kubeconfig: kubeConfig,
  });

  return { cluster, provider, kubeConfig };
}

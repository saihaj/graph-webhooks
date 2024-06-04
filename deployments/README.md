# Graph Webhooks Infrastructure

This directory contains the deployment configurations for the Graph Webhooks service, Pulumi is used to
deploy the infrastructure.

### Deploying locally

1. Install [Pulumi CLI](https://www.pulumi.com/docs/cli/)
2. Install [`az` CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
3. `pulumi login` to your Pulumi account and make sure you are part of
   [theguild](https://app.pulumi.com/theguild).
4. To deploy to `dev`: `pulumi up --stack graph-webhooks/dev`

**NOTE: If you are an ADMIN DO NOT RUN `pulumi destroy`**

#### What is Pulumi?

Pulumi is an open source infrastructure as a code tool for creating, deploying and managing cloud
infrastructure.

#### Why Pulumi over Terraform?

Pulumi is a cross-platform SDK that can also integrate any Terraform module. Having Pulumi with
TypeScript makes it easier to manage the infrastructure as a code compared to Terraform where we
need to learn a new language.

#### Is it safe to commit secrets?

Yes! Pulumi helps to manage secrets and encrypts them. To encrypt a secret you can use
`pulumi set secret HAHA --secret`. You can read more how secrets are managed in
[Pulumi Architecture docs](https://www.pulumi.com/docs/concepts/secrets/).

#### Connecting to Kubernetes cluster

1. Grab the `kubeconfig` for the cluster as follows:
   `pulumi stack output kubeconfig --show-secrets > kubeconfig`
2. Set this environment variable for your local to use the `kubeconfig` to connect with cluster
   `export KUBECONFIG=$PWD/kubeconfig`
3. Now you can run `kubectl get nodes` to see if you can see the nodes in the cluster.

# `graph-webhooks`

Building a Webhook Data Service using [Substreams](https://substreams.dev). Goal is to allow users to create webhooks from a web interface and receive data from those webhooks in real-time.

## Overview

We are utilize [SVIX](https://www.svix.com) to send webhooks data users. The `management-api` stitches various services together to create and manage webhooks with a unified GraphQL API.

Here is a high-level overview of what different directories in this repository do:

- [**`web`**](./web/): Web interface for creating and managing webhooks. Built with React, [`shadcn/ui`](https://ui.shadcn.com), Vite and Relay.
- [**`management-api`**](./management-api/): API that does the orchestration of webhooks, connects the web interface to the data service and manages the webhook lifecycle. Built on [Cloudflare Workers](https://developers.cloudflare.com/workers/), with [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server), [Drizzle for Sqlite on D1](https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1)
- [**`erc721-substream`**](./erc721-substream/): A [parametrized substream](https://substreams.streamingfast.io/documentation/develop/parameterized-modules) that tracks ERC721 token transfers for a given contract. Inspired from [this example](https://github.com/streamingfast/substreams-eth-token-transfers).
- [**`substream-listener`**](./substream-listener/): A Node.js service that subscribes an Event Stream from a Substream for a webhook user project and pushes the data to SVIX project configured for the User.
- [**`utils`**](./substream-listener/): Shared utilities and types between the different services.

## Running the project

1. Install following
   1. [Node.js](https://nodejs.org/en/download/)
   2. [Substreams CLI](https://substreams.streamingfast.io/documentation/consume/installing-the-cli)
   3. [`pnpm`](https://pnpm.io/installation)
2. Run `pnpm install` in the root of the repository to install dependencies.
3. Run `pnpm dev` in the root of the repository to start the development servers.

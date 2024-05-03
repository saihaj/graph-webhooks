import { project } from "db";
import { builder } from "./utils";

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || "World"}`,
    }),
  }),
});

const Chain = builder.enumType("Chain", {
  values: ["ETH_MAINNET"] as const,
});

const Project =
  builder.objectRef<Pick<typeof project.$inferSelect, "id" | "name">>(
    "Project"
  );
builder.objectType(Project, {
  description: "A project that tracks a contract on a chain",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createProject: t.fieldWithInput({
      type: Project,
      input: {
        name: t.input.string({
          required: true,
          description: "The name of the project to create",
        }),
        contractAddress: t.input.field({
          type: "EthAddress",
          description: "The address of the contract to track",
          required: true,
        }),
        webhookUrl: t.input.field({
          type: "URL",
          description: "The URL to send webhook events to",
          required: false,
        }),
        startBlock: t.input.int({
          description: "The block number to start tracking from",
          required: false,
        }),
        chain: t.input.field({
          type: Chain,
          description: "The chain to track the contract on",
          required: true,
        }),
      },
      resolve: (parent, { input }) => {},
    }),
  }),
});

export const schema = builder.toSchema();

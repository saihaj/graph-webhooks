import { project } from "../db-schema";
import { builder } from "./utils";
import { z } from "zod";
import { isAddress } from "viem/utils";

const SUPPORTED_CHAINS = ["ETH_MAINNET"] as const;

const Chain = builder.enumType("Chain", {
  values: SUPPORTED_CHAINS,
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

const ConfigurationSchema = z.object({
  webhookUrl: z.string().url(),
  startBlock: z.number().default(0),
  chain: z.enum(SUPPORTED_CHAINS),
  contractAddress: z
    .string()
    .transform((v) => v.toLowerCase())
    .refine(isAddress),
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
      resolve: async (parent, { input }, { db }) => {
        const configuration = await ConfigurationSchema.safeParseAsync({
          ...input,
          webhookUrl: input.webhookUrl?.toString(),
        });
        if (!configuration.success) {
          throw new Error("Invalid configuration");
        }

        const createProject = await db
          .insert(project)
          .values({
            name: input.name,
            configuration: configuration.data,
            creator: 1,
            organization: 1,
          })
          .returning();

        return createProject[0]!;
      },
    }),
  }),
});

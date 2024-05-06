import { project } from "../db-schema";
import { builder } from "./utils";
import { z } from "zod";
import { isAddress } from "viem/utils";
import { v4 as uuidv4 } from "uuid";

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
      resolve: async (_parent, { input }, { db, svix, SVIX_TOKEN }) => {
        const configuration = await ConfigurationSchema.safeParseAsync({
          ...input,
          webhookUrl: input.webhookUrl?.toString(),
        });

        if (!configuration.success) {
          throw new Error("Invalid configuration");
        }
        const id = uuidv4();

        const svixApp = await svix["/api/v1/app/"].post({
          headers: {
            Authorization: `Bearer ${SVIX_TOKEN}`,
          },
          json: {
            // TODO: use the user and org id part of the name
            // format is: <name>-<chain>-<org>-<user>
            name: `${input.name}-${input.chain}-1`,
            rateLimit: 100,
            uid: id,
          },
        });

        if (!svixApp.ok) {
          throw new Error("Failed to create svix app");
        }

        const createProject = await db
          .insert(project)
          .values({
            name: input.name,
            configuration: configuration.data,
            creator: 1, // TODO: get from the context user
            id,
            organization: 1, // TODO: get from the context user
          })
          .returning();

        return createProject[0]!;
      },
    }),
  }),
});

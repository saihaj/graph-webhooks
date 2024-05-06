import { project } from "../db-schema";
import { builder, notEmpty } from "./utils";
import { z } from "zod";
import { isAddress } from "viem/utils";
import { v4 as uuidv4 } from "uuid";
import { and, asc, eq, gt, or, sql } from "drizzle-orm";

const SUPPORTED_CHAINS = ["ETH_MAINNET"] as const;

const Chain = builder.enumType("Chain", {
  values: SUPPORTED_CHAINS,
});

const Project =
  builder.objectRef<Pick<typeof project.$inferSelect, "id" | "name">>(
    "Project"
  );

builder.node(Project, {
  id: {
    resolve: (obj) => obj.id,
  },
  name: "Project",
  description: "A project that tracks a contract on a chain",
  fields: (t) => ({
    name: t.exposeString("name"),
  }),
  loadOne: (id, { db }) =>
    db
      .select()
      .from(project)
      .where(eq(project.id, id))
      .limit(1)
      .then((res) => res[0]),
  loadMany: (ids, { db }) =>
    db
      .select()
      .from(project)
      .where(sql`${project.id} IN (${ids})`),
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

builder.queryField("projects", (t) => {
  return t.connection({
    type: Project,
    description: "List of projects",
    resolve: async (_parent, { first, after }, { db }) => {
      const limit = first ?? 10;

      const cursor = after
        ? {
            createdAt: new Date(after.split("__")[0]),
            id: after.split("__")[1],
          }
        : null;

      const projects = await db
        .select()
        .from(project)
        .where(
          // make sure to add indices for the columns that you use for cursor
          cursor
            ? or(
                gt(project.createdAt, cursor.createdAt),
                and(
                  eq(project.createdAt, cursor.createdAt),
                  gt(project.id, cursor.id)
                )
              )
            : undefined
        )
        .limit(limit + 1)
        .orderBy(asc(project.createdAt), asc(project.id));

      const mapped = projects
        .slice(0, limit)
        .map((project) => {
          return {
            cursor: `${project.createdAt}__${project.id}`,
            node: project,
          };
        })
        .filter(notEmpty);

      return {
        pageInfo: {
          hasNextPage: projects.length > mapped.length,
          hasPreviousPage: false, // TODO: adjust
          startCursor: mapped[0].cursor,
          endCursor: mapped[mapped.length - 1].cursor,
        },
        edges: mapped,
      };
    },
  });
});

builder.relayMutationField(
  "createProject",
  {
    inputFields: (t) => ({
      name: t.string({
        required: true,
        description: "The name of the project to create",
      }),
      contractAddress: t.field({
        type: "EthAddress",
        description: "The address of the contract to track",
        required: true,
      }),
      webhookUrl: t.field({
        type: "URL",
        description: "The URL to send webhook events to",
        required: false,
      }),
      startBlock: t.int({
        description: "The block number to start tracking from",
        required: false,
      }),
      chain: t.field({
        type: Chain,
        description: "The chain to track the contract on",
        required: true,
      }),
    }),
  },
  {
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
        throw new Error("Failed to create SVIX app");
      }

      const createdProj = await db
        .insert(project)
        .values({
          name: input.name,
          configuration: configuration.data,
          creator: 1, // TODO: get from the context user
          id,
          organization: 1, // TODO: get from the context user
        })
        .returning();

      return createdProj[0];
    },
  },
  {
    outputFields: (t) => ({
      project: t.field({
        type: Project,
        description: "The created project",
        resolve: (res) => res,
      }),
    }),
  }
);

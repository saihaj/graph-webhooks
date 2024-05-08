import { project } from "../db-schema";
import { builder, notEmpty } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { ProjectConfigurationSchema, SUPPORTED_CHAINS } from "utils";
import { and, asc, eq, gt, or, sql } from "drizzle-orm";

const Chain = builder.enumType("Chain", {
  values: SUPPORTED_CHAINS,
});

const Project = builder.objectRef<typeof project.$inferSelect>("Project");

builder.node(Project, {
  id: {
    resolve: (obj) => obj.id,
  },
  name: "Project",
  description: "A project that tracks a contract on a chain",
  fields: (t) => ({
    name: t.exposeString("name"),
    chain: t.field({
      type: Chain,
      resolve: (obj) =>
        ProjectConfigurationSchema.parse(obj.configuration).chain,
    }),
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
                  gt(project.id, cursor.id),
                ),
              )
            : undefined,
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
      const configuration = await ProjectConfigurationSchema.safeParseAsync({
        ...input,
        webhookUrl: input.webhookUrl?.toString(),
      });

      if (!configuration.success) {
        throw new Error("Invalid configuration");
      }
      const id = uuidv4();

      const projectName = `${id}-${input.chain}`;

      const svixApp = await svix["/api/v1/app/"].post({
        headers: {
          Authorization: `Bearer ${SVIX_TOKEN}`,
        },
        json: {
          name: projectName,
          uid: id,
        },
      });

      if (!svixApp.ok) {
        throw new Error("Failed to create SVIX app");
      }

      const registerEndpoint = await svix[
        "/api/v1/app/{app_id}/endpoint/"
      ].post({
        headers: {
          Authorization: `Bearer ${SVIX_TOKEN}`,
        },
        params: {
          app_id: id,
        },
        json: {
          url: configuration.data.webhookUrl,
          version: 1,
          description: `Webhook for project ${projectName}`,
          disabled: false,
          rateLimit: 10,
        },
      });

      if (!registerEndpoint.ok) {
        throw new Error("Failed to register webhook");
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

      const registerSubstream = await fetch(
        "http://localhost:4040/v1/register-webhook",
        {
          method: "POST",
          body: JSON.stringify({
            appId: id,
            startBlock: input.startBlock,
            contractAddress: input.contractAddress,
          }),
        },
      );

      const j = await registerSubstream.json();
      console.log(j);

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
  },
);

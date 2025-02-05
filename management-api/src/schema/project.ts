import { project, usersToOrgs } from "../db-schema";
import { builder, isObject, notEmpty } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { ProjectConfigurationSchema, SUPPORTED_CHAINS } from "utils";
import { and, asc, eq, gt, or, sql } from "drizzle-orm";
import { decodeGlobalID } from "@pothos/plugin-relay";
import {
  InputShapeFromFields,
  InputFieldMap,
  MaybePromise,
} from "@pothos/core";
import { Context } from "context";
import { GraphQLResolveInfo } from "graphql";

const Chain = builder.enumType("Chain", {
  values: SUPPORTED_CHAINS,
});

const ProjectState = builder.enumType("ProjectState", {
  values: ["ACTIVE", "PAUSED"] as const,
});

const Project = builder.objectRef<typeof project.$inferSelect>("Project");

const Message = builder.objectRef<{
  id: string;
  eventType: string;
  payload: object;
  timestamp: Date;
}>("ProjectWebhookMessage");

builder.node(Message, {
  isTypeOf: isObject,
  id: {
    resolve: (obj) => obj.id,
  },
  name: "ProjectWebhookMessage",
  description: "A message sent to a webhook",
  fields: (t) => ({
    eventType: t.exposeString("eventType"),
    payload: t.expose("payload", {
      type: "JSON",
    }),
    timestamp: t.expose("timestamp", {
      type: "Timestamp",
    }),
  }),
});

builder.node(Project, {
  isTypeOf: isObject,
  id: {
    resolve: (obj) => obj.id,
  },
  name: "Project",
  description: "A project that tracks a contract on a chain",
  fields: (t) => ({
    state: t.field({
      type: ProjectState,
      description: "The state of the project",
      resolve: (obj) => (obj.active ? "ACTIVE" : "PAUSED"),
    }),
    name: t.exposeString("name"),
    chain: t.field({
      type: Chain,
      resolve: (obj) =>
        ProjectConfigurationSchema.parse(obj.configuration).chain,
    }),
    endpoint: t.field({
      type: "URL",
      resolve: (obj) =>
        ProjectConfigurationSchema.parse(obj.configuration).webhookUrl,
    }),
    messages: t.connection({
      type: Message,
      description: "Messages sent to the webhook",
      resolve: async (obj, { first, after }, { svix, SVIX_TOKEN }) => {
        const { id: projectId } = obj;
        const limit = first ?? 10;
        const iterator = after ? after : undefined;

        const api = await svix["/api/v1/app/{app_id}/msg/"].get({
          headers: {
            Authorization: `Bearer ${SVIX_TOKEN}`,
          },
          params: {
            app_id: projectId,
          },
          query: {
            limit,
            iterator,
          },
        });

        if (!api.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await api.json();

        const endCursor = data.data[data.data.length - 1]?.id;

        return {
          pageInfo: {
            hasNextPage: data.done === false,
            hasPreviousPage: false, // TODO: adjust
            startCursor: data.iterator,
            endCursor,
          },
          edges: data.data.map((message) => {
            return {
              cursor: message.id,
              node: {
                id: message.id,
                eventType: message.eventType,
                payload: message.payload,
                timestamp: new Date(message.timestamp),
              },
            };
          }),
        };
      },
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

const ProjectsEdge = builder.edgeObject({
  name: "QueryProjectsConnectionEdge",
  type: Project,
});

const ProjectsConnection = builder.connectionObject(
  {
    name: "QueryProjectsConnection",
    type: Project,
  },
  ProjectsEdge,
);

builder.queryField("projects", (t) => {
  return t.field({
    type: ProjectsConnection,
    description: "List of projects",
    authScopes: {
      isAuthenticated: true,
    },
    args: {
      ...t.arg.connectionArgs(),
    },
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
          startCursor: mapped[0]?.cursor,
          endCursor: mapped[mapped.length - 1]?.cursor,
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
    authScopes: {
      isAuthenticated: true,
    },
    resolve: async (
      _parent,
      { input },
      {
        db,
        authUserId,
        svix,
        SVIX_TOKEN,
        SF_TOKEN,
        GUILD_ADMIN_TOKEN,
        SUBSTREAM_LISTENER_HOST,
      },
    ) => {
      if (!authUserId) {
        throw new Error("User not authenticated");
      }

      const configuration = await ProjectConfigurationSchema.safeParseAsync({
        ...input,
        webhookUrl: input.webhookUrl?.toString(),
      });

      if (!configuration.success) {
        throw new Error("Invalid configuration");
      }

      // For now we just have one organization that is user's default.
      // TODO: rework this in future to handle multiple organizations
      const org = await db.query.usersToOrgs.findFirst({
        where: eq(usersToOrgs.userId, authUserId),
      });

      if (!org) {
        throw new Error("User is not part of any organization");
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

      // TODO: use fets client
      const registerSubstream = await fetch(
        `${SUBSTREAM_LISTENER_HOST}/v1/register-webhook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Guild-Admin": GUILD_ADMIN_TOKEN,
          },
          body: JSON.stringify({
            appId: id,
            startBlock: input.startBlock,
            contractAddress: input.contractAddress,
            substreamsToken: SF_TOKEN,
          }),
        },
      );

      if (!registerSubstream.ok) {
        throw new Error("Failed to register project");
      }

      const createdProj = await db
        .insert(project)
        .values({
          name: input.name,
          configuration: configuration.data,
          creator: authUserId,
          id,
          organization: org.orgId,
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
      projectEdge: t.field({
        type: ProjectsEdge,
        resolve: (res) => {
          return {
            cursor: `${res.createdAt}__${res.id}`,
            node: res,
          };
        },
      }),
    }),
  },
);

builder.relayMutationField(
  "updateProjectState",
  {
    description: "Update the status of a project",
    inputFields: (t) => ({
      id: t.string({
        required: true,
        description: "The ID of the project to update",
      }),
      state: t.field({
        type: ProjectState,
        required: true,
        description: "The new state of the project",
      }),
    }),
  },
  {
    authScopes: {
      isAuthenticated: true,
    },
    resolve: async (
      _parent,
      { input: { id, state } },
      { db, authUserId, GUILD_ADMIN_TOKEN, SUBSTREAM_LISTENER_HOST },
    ) => {
      if (!authUserId) {
        throw new Error("User not authenticated");
      }

      const projectId = decodeGlobalID(id).id;

      const dbProject = await db.query.project.findFirst({
        // TODO: when we allow orgs to have multiple projects, then we should ensure for the org relationship and roles
        where: and(eq(project.id, projectId), eq(project.creator, authUserId)),
      });

      if (!dbProject) {
        throw new Error("Project not found");
      }

      switch (state) {
        case "PAUSED": {
          // TODO: use fets client
          const registerSubstream = await fetch(
            `${SUBSTREAM_LISTENER_HOST}/v1/unregister-webhook`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Guild-Admin": GUILD_ADMIN_TOKEN,
              },
              body: JSON.stringify({
                appId: projectId,
              }),
            },
          );

          if (!registerSubstream.ok) {
            throw new Error("Failed to pause project");
          }

          const updatedProject = await db
            .update(project)
            .set({
              active: false,
            })
            .where(eq(project.id, projectId))
            .returning();

          return updatedProject[0];
        }
        case "ACTIVE": {
          const registerSubstream = await fetch(
            `${SUBSTREAM_LISTENER_HOST}/v1/resume-webhook`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Guild-Admin": GUILD_ADMIN_TOKEN,
              },
              body: JSON.stringify({
                appId: projectId,
              }),
            },
          );

          if (!registerSubstream.ok) {
            throw new Error("Failed to resume project");
          }

          const updatedProject = await db
            .update(project)
            .set({
              active: true,
            })
            .where(eq(project.id, projectId))
            .returning();

          return updatedProject[0];
        }
        default:
          throw new Error("Invalid state");
      }
    },
  },
  {
    outputFields: (t) => ({
      project: t.field({
        type: Project,
        description: "The updated project",
        resolve: (res) => res,
      }),
    }),
  },
);

builder.queryField("project", (t) => {
  return t.field({
    type: Project,
    description: "Get a project by ID",
    authScopes: {
      isAuthenticated: true,
    },
    args: {
      id: t.arg.string({
        required: true,
        description: "The ID of the project to fetch",
      }),
    },
    resolve: async (_parent, { id }, { db }) => {
      const { id: projectId } = decodeGlobalID(id);

      return db
        .select()
        .from(project)
        .where(eq(project.id, projectId))
        .limit(1)
        .then((res) => res[0]);
    },
  });
});

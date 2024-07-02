import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { drizzle } from "drizzle-orm/d1";
import { Env } from "./context";
import { svixClient } from "./svix-api";
import { createRemoteJWKSet, jwtVerify } from "jose";
import * as dbSchema from "./db-schema";
import { eq } from "drizzle-orm";

const yoga = createYoga<Env>({
  schema,
  maskedErrors: false,
  context: async (ctx) => {
    const db = drizzle(ctx.DB, {
      schema: dbSchema,
    });

    const authorization = ctx.request.headers.get("authorization");
    if (!authorization) {
      throw new Error("Missing Authorization header");
    }

    const jwt = authorization.split(" ")[1];

    let authUserId: string | null = null;

    if (jwt) {
      const { payload } = await jwtVerify(
        jwt, // The raw Bearer Token extracted from the request header
        createRemoteJWKSet(new URL(`${ctx.LOGTO_HOST}/oidc/jwks`)), // generate a jwks using jwks_uri inquired from Logto server
        {
          issuer: `${ctx.LOGTO_HOST}/oidc`,
          audience: ctx.JWT_AUDIENCE,
        },
      );

      authUserId = payload.sub || null;

      if (!authUserId) {
        throw new Error("Missing sub in token");
      }

      const user = await db.query.user.findFirst({
        where: eq(dbSchema.user.id, authUserId),
      });

      if (!user) {
        const createOrg = await db
          .insert(dbSchema.organization)
          .values({
            name: `${authUserId}'s Projects`,
          })
          .returning();

        const createdOrg = createOrg[0];

        if (!createdOrg) {
          throw new Error("Unable to create organization");
        }

        const createUser = await db
          .insert(dbSchema.user)
          .values({
            id: authUserId,
          })
          .returning();

        const createdUser = createUser[0];

        if (!createdUser) {
          throw new Error("Unable to create user");
        }

        await db.insert(dbSchema.usersToOrgs).values({
          userId: createdUser.id,
          orgId: createdOrg.id,
        });
      }
    }

    return {
      ...ctx,
      svix: svixClient({
        endpoint: ctx.SVIX_HOST,
        GUILD_ADMIN_TOKEN: ctx.GUILD_ADMIN_TOKEN,
      }),
      authUserId,
      db,
    };
  },
});

export default { fetch: yoga.fetch };

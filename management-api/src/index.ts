import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { drizzle } from "drizzle-orm/d1";
import { Env } from "context";
import { svixClient } from "svix-api";

const yoga = createYoga<Env>({
  schema,
  maskedErrors: false,
  context: (ctx) => {
    return {
      ...ctx,
      svix: svixClient({
        endpoint: ctx.SVIX_HOST,
        GUILD_ADMIN_TOKEN: ctx.GUILD_ADMIN_TOKEN,
      }),
      db: drizzle(ctx.DB),
    };
  },
});

export default { fetch: yoga.fetch };

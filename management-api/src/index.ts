import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { drizzle } from "drizzle-orm/d1";

interface Env {
  DB: D1Database;
}

const yoga = createYoga<Env>({
  schema,
  maskedErrors: false,
  context: (ctx) => {
    return {
      db: drizzle(ctx.DB),
    };
  },
});

export default { fetch: yoga.fetch };

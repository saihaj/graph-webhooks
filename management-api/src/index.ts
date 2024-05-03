import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const yoga = createYoga({
  schema,
});

self.addEventListener("fetch", yoga);

import { builder } from "./utils";
import "./project";
import "./user";

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

builder.mutationType({});

export const schema = builder.toSchema();

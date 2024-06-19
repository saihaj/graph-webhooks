import { user } from "../db-schema";
import { builder } from "./utils";

const User = builder.objectRef<Pick<typeof user.$inferSelect, "id">>("User");
builder.objectType(User, {
  description: "User of the system",
  fields: (t) => ({
    id: t.exposeID("id"),
  }),
});

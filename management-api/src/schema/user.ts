import { organization, user, usersToOrgs } from "../db-schema";
import { builder } from "./utils";

const User =
  builder.objectRef<Pick<typeof user.$inferSelect, "id" | "name">>("User");
builder.objectType(User, {
  description: "User of the system",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
  }),
});

// TODO: temporary for testing, we will need to swap this with login
builder.mutationField("createUser", (t) =>
  t.fieldWithInput({
    type: User,
    input: {
      name: t.input.string({
        required: true,
        description: "Name of the user",
      }),
    },
    resolve: async (_parent, { input }, { db }) => {
      const createOrg = await db
        .insert(organization)
        .values({
          name: `${input.name}'s Project`,
        })
        .returning();

      const createdOrg = createOrg[0];

      if (!createdOrg) {
        throw new Error("Unable to create organization");
      }

      const createUser = await db
        .insert(user)
        .values({
          name: input.name,
        })
        .returning();

      const createdUser = createUser[0];

      if (!createdUser) {
        throw new Error("Unable to create user");
      }

      await db.insert(usersToOrgs).values({
        userId: createdUser.id,
        orgId: createdOrg.id,
      });

      return createdUser;
    },
  }),
);

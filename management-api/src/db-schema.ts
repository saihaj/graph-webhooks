import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { relations, sql } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
});

export const usersRelations = relations(user, ({ many }) => ({
  organizations: many(organization),
}));

export const organization = sqliteTable("organization", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
});

export const organizationRelations = relations(organization, ({ many }) => ({
  users: many(user),
}));

/**
 * User can be part of multiple organizations
 * Organization can have multiple users
 */
export const usersToOrgs = sqliteTable(
  "users_to_organizations",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
    orgId: integer("organization_id")
      .notNull()
      .references(() => organization.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.orgId] }),
  })
);

export const usersToOrganizationRelations = relations(
  usersToOrgs,
  ({ one }) => ({
    organization: one(organization, {
      fields: [usersToOrgs.groupId],
      references: [organization.id],
    }),
    user: one(user, {
      fields: [usersToOrgs.userId],
      references: [user.id],
    }),
  })
);

export const project = sqliteTable("project", {
  id: text("id").primaryKey().$defaultFn(v4),
  name: text("name").notNull(),
  // we store a zod processed objects. Allowing us more flexibility in the future
  configuration: text("configuration", { mode: "json" }).notNull(),
  creator: integer("creator_id")
    .references(() => user.id)
    .notNull(),
  organization: integer("organization_id")
    .references(() => organization.id)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
});

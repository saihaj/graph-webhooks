import { drizzle } from "drizzle-orm/d1";
import { type svixClient } from "./svix-api";
import type * as dbSchema from "./db-schema";

export interface Env {
  DB: D1Database;
  SVIX_TOKEN: string;
  SVIX_HOST: string;
  SF_TOKEN: string;
  GUILD_ADMIN_TOKEN: string;
  SUBSTREAM_LISTENER_HOST: string;
  LOGTO_HOST: string;
  JWT_AUDIENCE: string;
}

export interface Context extends Env {
  db: ReturnType<typeof drizzle<typeof dbSchema>>;
  svix: ReturnType<typeof svixClient>;
  authUserId: string | null;
}

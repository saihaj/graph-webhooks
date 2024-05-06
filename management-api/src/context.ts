import { drizzle } from "drizzle-orm/d1";
import { svixClient } from "./svix-api";

export interface Env {
  DB: D1Database;
  SVIX_TOKEN: string;
  SVIX_HOST: string;
}

export interface Context extends Env {
  db: ReturnType<typeof drizzle>;
  svix: ReturnType<typeof svixClient>;
}

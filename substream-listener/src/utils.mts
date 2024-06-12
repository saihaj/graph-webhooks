import { parseEnv } from "znv";
import { z } from "zod";

export const {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  SVIX_TOKEN,
  SVIX_HOST_URL,
} = parseEnv(process.env, {
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  SVIX_TOKEN: z.string(),
  SVIX_HOST_URL: z.string().default("http://localhost:8071"),
});

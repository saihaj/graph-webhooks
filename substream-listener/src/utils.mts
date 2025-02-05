import { isAddress } from "viem";
import { parseEnv } from "znv";
import { z } from "zod";

export const {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  SVIX_TOKEN,
  SVIX_HOST_URL,
  START_BLOCK,
  APP_ID,
  CONTRACT_ADDRESS,
  TOKEN,
  SUBSTREAMS_ENDPOINT,
  OUTPUT_MODULE,
} = parseEnv(process.env, {
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  SVIX_TOKEN: z.string(),
  SVIX_HOST_URL: z.string().default("http://localhost:8071"),
  START_BLOCK: z.number().default(0),
  APP_ID: z.string(),
  CONTRACT_ADDRESS: z.string().refine(isAddress),
  TOKEN: z.string(),
  SUBSTREAMS_ENDPOINT: z.string().transform((v) => v.toLowerCase()),
  OUTPUT_MODULE: z.string(),
});

import { z } from "zod";
import { isAddress } from "viem/utils";

export const SUPPORTED_CHAINS = ["ETH_MAINNET"] as const;

export const ProjectConfigurationSchema = z.object({
  webhookUrl: z.string().url(),
  startBlock: z.coerce.number().default(0),
  chain: z.enum(SUPPORTED_CHAINS),
  contractAddress: z
    .string()
    .transform((v) => v.toLowerCase())
    .refine(isAddress),
});

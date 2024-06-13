import { createClient, NormalizeOAS } from "fets";
import openapi from "./svix-openapi";

export const svixClient = ({
  endpoint,
  GUILD_ADMIN_TOKEN,
}: {
  endpoint: string;
  GUILD_ADMIN_TOKEN: string;
}) =>
  createClient<NormalizeOAS<typeof openapi>>({
    endpoint,
    globalParams: {
      headers: {
        "X-Guild-Admin": GUILD_ADMIN_TOKEN,
      },
    },
  });

import { createClient, NormalizeOAS } from "fets";
import openapi from "./svix-openapi";

export const svixClient = (endpoint: string) =>
  createClient<NormalizeOAS<typeof openapi>>({
    endpoint,
  });

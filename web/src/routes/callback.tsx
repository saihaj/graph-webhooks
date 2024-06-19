import { createFileRoute } from "@tanstack/react-router";
import { useHandleSignInCallback } from "@logto/react";
import z from "zod";

function Callback() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { isLoading } = useHandleSignInCallback(async () => {
    await navigate({ to: search.redirect || "/projects" });
  });

  // When it's working in progress
  if (isLoading) {
    return <div>Redirecting...</div>;
  }
}

export const Route = createFileRoute("/callback")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: Callback,
});

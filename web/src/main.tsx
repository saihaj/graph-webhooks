import "./global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { LogtoProvider, LogtoConfig, Prompt } from "@logto/react";
import { RelayEnvironmentProvider } from "react-relay";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-provider";
import { GRAPHQL_ENDPOINT, environment } from "./relay";
import { useAuth } from "./hooks/useAuth";

const config: LogtoConfig = {
  endpoint: "https://hokigy.logto.app/",
  appId: "a7785a6c5co2nfj9asvsx",
  prompt: Prompt.Login,
  resources: [GRAPHQL_ENDPOINT],
};

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: null,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LogtoProvider config={config}>
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider defaultTheme="dark" storageKey="graph-webhooks">
          <InnerApp />
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </LogtoProvider>
  </React.StrictMode>,
);

import path from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { relay } from "./vite-plugin-relay";

export default defineConfig({
  plugins: [react(), TanStackRouterVite(), relay()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

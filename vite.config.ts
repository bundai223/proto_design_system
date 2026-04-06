import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function normalizeBasePath(value: string | undefined) {
  if (!value || value === "/") {
    return "/";
  }

  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}

function resolvePagesBasePath() {
  const explicitBasePath = process.env.PAGES_BASE_PATH ?? process.env.VITE_BASE_PATH;
  if (explicitBasePath) {
    return normalizeBasePath(explicitBasePath);
  }

  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (process.env.GITHUB_ACTIONS === "true" && repositoryName) {
    return normalizeBasePath(repositoryName);
  }

  return "/proto_design_system/";
}

export default defineConfig({
  root: "demo",
  base: resolvePagesBasePath(),
  plugins: [react()],
  build: {
    outDir: "../dist/demo",
    emptyOutDir: true,
  },
});

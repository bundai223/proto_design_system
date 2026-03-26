import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: false,
    include: ["*.test.ts", "src/**/*.test.ts"],
    environment: "node",
  },
});

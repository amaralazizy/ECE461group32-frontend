import { defineConfig } from "vitest/config";
// import viteConfig from './vite.config';

export default defineConfig({
  test: {
    environment: "jsdom",
    // include: ["backend/src/rating/tests__/**.test.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx", "e2e-tests/**/*.test.ts", "e2e-tests/**/*.test.tsx"],
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'html'],
      reportsDirectory: "./coverage", // Optional, specify output directory
      include: ["src"],
      exclude: [
        "tests/**",
        "**/node_modules/**",
        "**/dist/**",
        "**/.idea/**",
        "**/.git/**",
        "**/.cache/**",
        "**/lib/**",
        "**/*.css",
        "**/*.json",
        "**/*.md",
        "**/*.yml",
        "**/*.config.js",
        "**/*.config.ts",
        "**/*.d.ts",
        "**/src/main.tsx"
      ],
      thresholds: {
        statements: 90,
        functions: 100,
        lines: 90
      },
      ignoreEmptyLines: true,
      reportOnFailure: true
    },
    hookTimeout: 30000
  }
});

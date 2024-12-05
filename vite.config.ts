import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import istanbul from "vite-plugin-istanbul";

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: ["src/*/.{ts,tsx}"], // Include all TypeScript and TSX files in src
      exclude: ["node_modules", "tests", "coverage"], // Exclude specific folders
      extension: [".ts", ".tsx"],
      requireEnv: false
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});

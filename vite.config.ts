/// <reference types="vite/client" />
/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTest.js"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@useCase": path.resolve(__dirname, "./src/useCase"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@interface": path.resolve(__dirname, "./src/interface"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});

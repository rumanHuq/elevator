/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    port: 8000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
});

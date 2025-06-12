import { defineConfig } from "vite";
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphql/, ""),
      },
    },
  },
});

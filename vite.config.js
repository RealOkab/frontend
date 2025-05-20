/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 10000,
    allowedHosts: ["klinchem-enterprise.onrender.com"],
  },
  base: "/klinchem/signIn",
  build: {
    minify: "terser",
    rollupOptions: {
      treeshake: true,
    },
  },
});

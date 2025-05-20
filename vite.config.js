/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cleanPlugin from "vite-plugin-clean";
// https://vite.dev/config/
export default defineConfig({
  mode: "production",
  plugins: [
    react(),
    cleanPlugin({
      targetFiles: ["dist", "test"], // Cleans both 'dist' and 'test' directories
    }),
  ],
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

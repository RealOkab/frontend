/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 10000,
    allowedHosts: ["klinchem-enterprise.onrender.com"],
  },
  base: "/klinchem/signIn",
  build: {
    minify: true,
  },
});

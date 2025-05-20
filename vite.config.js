/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress", // or 'gzip'
      ext: ".br", // or '.gz'
      threshold: 1024, // Compress files larger than 1KB
      deleteOriginFile: false, // Set to true if you want to remove original files
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 10000,
    allowedHosts: ["klinchem-enterprise-frontend.onrender.com"],
  },
  base: "/klinchem/",
});

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import terser from "@rollup/plugin-terser";
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), ""); // Load environment variables

  return {
    mode: "production",
    define: {
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV || "production"),
    },
    plugins: [react(), terser()],
    server: {
      host: "0.0.0.0",
      port: env.VITE_PORT || 10000, // Use `VITE_PORT` instead of `process.env.PORT`
      allowedHosts: ["klinchem-enterprise.onrender.com"],
    },
    base: "/",
    build: {
      minify: "terser",
      rollupOptions: {
        treeshake: true,
        plugins: [terser()],
        input: {
          main: "./src/main.jsx", // Ensure main.js is included
          index: "index.html", // Keep index.html in the build
        },
        output: {
          entryFileNames: "assets/[name].js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name].[ext]",
        },
        outDir: "dist",
        assetsDir: "assets",
      },

      manifest: true,
    },
  };
});

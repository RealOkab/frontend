import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import terser from "@rollup/plugin-terser";
export default defineConfig(({ mode }) => {
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
    base: "/klinchem/signIn",
    build: {
      minify: "terser",
      rollupOptions: {
        treeshake: true,
        plugins: [terser()],
      },
    },
  };
});

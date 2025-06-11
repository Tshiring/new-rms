import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "src/components"),
      // lib: path.resolve(__dirname, "src/lib"),
      // assets: path.resolve(__dirname, "src/assets"),
      // constants: path.resolve(__dirname, "src/constants"),
      // router: path.resolve(__dirname, "src/router"),
      // hooks: path.resolve(__dirname, "src/hooks"),
      // store: path.resolve(__dirname, "src/store"),
      // api: path.resolve(__dirname, "src/api"),
    },
  },
});

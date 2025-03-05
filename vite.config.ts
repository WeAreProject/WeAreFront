import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://rest-api-weare-production.up.railway.app",
        changeOrigin: true,
        secure: true, // Cambia a false si el backend usa HTTPS con certificado no válido
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

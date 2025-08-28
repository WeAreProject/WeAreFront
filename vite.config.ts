import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,          // permite acceso desde otros dispositivos
    port: 3000,          // puerto de tu app
    strictPort: true,    
    cors: true,          // permite cualquier host (solo desarrollo)
    allowedHosts: true, // permite cualquier host externo, útil para Ngrok
    proxy: {
      "/api": {
        target: "http://localhost:5000", // backend local
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
  },
});

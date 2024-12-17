import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"], // Exclui dependências específicas do bundle de otimização
  },
  build: {
    chunkSizeWarningLimit: 1000, // Suprime o aviso de chunks grandes
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Divide os chunks para otimização
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("chart.js")) return "chartjs-vendor";
            return "vendor";
          }
        },
      },
    },
  },
});

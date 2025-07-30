import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss() ],
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycby3dY_HXuuzo2IDRWrsPS-VkWlU5pximHG1h-KcbA1CX9OUP19F_BfflYBMd5zRXYh4/exec',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});

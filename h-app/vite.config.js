import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    legacy(),
  ],
  base: "./",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: true,

  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/antd')) {
            return 'antd'; 
          }
        },
        chunkFileNames: '[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000, 
  },
  optimizeDeps: {
    include: ['antd', '@ant-design/icons'],
    exclude: ['some-server-only-package'],
  },
});
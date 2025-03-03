import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
            return 'antd'; // Create a separate chunk for antd
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit
  },
  optimizeDeps: {
    include: ['antd', '@ant-design/icons'],
    exclude: ['some-server-only-package'],
  },
});
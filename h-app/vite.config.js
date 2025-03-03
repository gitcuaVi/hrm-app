import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix lỗi __dirname khi dùng ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
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
    target: 'esnext',
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {

        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('antd')) return 'antd';
            if (id.includes('react')) return 'react-vendor';
            return 'vendor';
          }
        },
      },
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
  
});

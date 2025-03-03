import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ant-design/icons/es': '@ant-design/icons/lib',
    },
  },

  server: {
    hmr: process.env.NODE_ENV === 'production' ? false : true,
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
      jsx: "automatic", // 🔥 Fix lỗi JSX
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
});

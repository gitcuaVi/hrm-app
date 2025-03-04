import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Dùng SWC thay vì react thường
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
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
            return 'antd'; // Tách antd thành một chunk riêng
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Tăng giới hạn chunk size cảnh báo
  },
  optimizeDeps: {
    include: ['antd', '@ant-design/icons'],
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Алиас для src
    },
  },
  // Раскомментируйте и настройте, если приложение размещено не в корне домена
  // base: '/HC_test_refactoring/',
});
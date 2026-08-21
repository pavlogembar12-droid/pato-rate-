import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Keeps all existing "@/client/..." imports working unchanged —
      // they originally pointed at src/client, now they point at src/.
      '@/client': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    host: '0.0.0.0'
  }
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    __API_BASE_URL__: JSON.stringify(
      mode === 'production'
        ? 'https://ssecom.onrender.com'
        : ''
    ),
  },
  build: {
    minify: 'esbuild',
    outDir: 'dist',
    sourcemap: false,
  },
}))

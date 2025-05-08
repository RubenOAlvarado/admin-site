import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.API_BASE_URL': JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'http://caddy/api'
        : 'http://localhost/api'
    )
  },
  base: '/admin/',
  server: {
    port: 3000,
  },
  build: {
    outDir: './dist/admin',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [react(), tailwindcss()],
})

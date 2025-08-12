import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api/v1.0': {
        target: 'http://solosync.us-east-1.elasticbeanstalk.com',
        changeOrigin: true,
      }
    }
  }
})

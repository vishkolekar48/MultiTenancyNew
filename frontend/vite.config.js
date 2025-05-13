import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/jokes': 'http://localhost:4000',
      '/api/medician': 'http://localhost:3000',
    },
  },
  
  plugins: [react()],
})

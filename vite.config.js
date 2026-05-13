import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    port: 3000,
    proxy: {
        // Ensure your proxy still targets the backend's port (e.g., 5000)
        '/api': {
          target: 'http://localhost:5000', 
          changeOrigin: true,
        },
    },
  }
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // OPTIMIZATION: Split vendor chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put React and Router in their own chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // Put heavy UI libraries in another
            return 'vendor-libs';
          }
        },
      },
    },
  },
  server: { 
    port: 3000,
    proxy: {
        '/api': {
          target: 'http://localhost:5000', 
          changeOrigin: true,
        },
    },
  }
});



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: { 
//     port: 3000,
//     proxy: {
//         // Ensure your proxy still targets the backend's port (e.g., 5000)
//         '/api': {
//           target: 'http://localhost:5000', 
//           changeOrigin: true,
//         },
//     },
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for docker/render.com
    strictPort: true,
    port: process.env.PORT || 3000, // Use PORT from environment or default to 3000
    allowedHosts: [
      'finance-planner-q8nv.onrender.com',
      '.onrender.com' // This will allow all subdomains on onrender.com
    ]
  }
})

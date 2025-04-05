import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Optional alias, ensure paths are correctly resolved
    },
  },
  server: {
    port: 3000, // Ensure the server starts without conflicts
  },
})

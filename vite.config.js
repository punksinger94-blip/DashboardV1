import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DashboardV1/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

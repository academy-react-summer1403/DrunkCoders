import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@config': path.resolve(__dirname, './src/config'),
      '@store': path.resolve(__dirname, './src/store'),
      '@core': path.resolve(__dirname, './src/core'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/city-base-craps/',
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-styled-components"]
      }
    })
  ]
});


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dead-internet-theory-article-2/',
  server: {
    port: 3000,
    open: true
  }
})


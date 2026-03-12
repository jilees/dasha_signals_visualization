import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Замени 'dasha-signals-visualization' на название своего репозитория
  base: '/dasha-signals-visualization/',
})

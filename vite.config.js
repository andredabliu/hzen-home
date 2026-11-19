import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' para o build abrir em qualquer pasta ou subdiretório do servidor
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
})

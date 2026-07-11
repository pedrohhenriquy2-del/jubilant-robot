import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos: funciona tanto no GitHub Pages (subpasta do repo)
  // quanto em domínio próprio (raiz), sem precisar trocar depois.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Página de vendas dedicada do produto Mix-01
        mix01: resolve(__dirname, 'mix-01.html'),
      },
    },
  },
})

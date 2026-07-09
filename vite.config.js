import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos: funciona tanto no GitHub Pages (subpasta do repo)
  // quanto em domínio próprio (raiz), sem precisar trocar depois.
  base: './',
  plugins: [react(), tailwindcss()],
})

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
        // Páginas de vendas dedicadas de cada produto
        mix01: resolve(__dirname, 'mix-01.html'),
        kitAvancado: resolve(__dirname, 'kit-avancado.html'),
        protetorSolarPs01: resolve(__dirname, 'protetor-solar-ps-01.html'),
        gelLimpezaGl01: resolve(__dirname, 'gel-limpeza-gl-01.html'),
      },
    },
  },
})

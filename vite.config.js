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
        kitRotina: resolve(__dirname, 'kit-rotina.html'),
        protetorSolarPs01: resolve(__dirname, 'protetor-solar-ps-01.html'),
        gelLimpezaGl01: resolve(__dirname, 'gel-limpeza-gl-01.html'),
        cremeHidratanteCh02: resolve(__dirname, 'creme-hidratante-ch-02.html'),
        tonicoAl7: resolve(__dirname, 'tonico-al-7.html'),
        // Página de vendas da Black Friday (Sérum Mix-01)
        blackFriday: resolve(__dirname, 'black-friday.html'),
        // Loja completa (antiga página inicial)
        loja: resolve(__dirname, 'loja.html'),
        // Trocas, devoluções, procedência e privacidade
        politicas: resolve(__dirname, 'politicas.html'),
        // Página de links para a bio do Instagram/TikTok
        links: resolve(__dirname, 'links.html'),
      },
    },
  },
})

# Selune Oficial — Landing Page

Landing page da **Selune Oficial**, clínica de estética facial (limpeza de
pele) em Unaí, MG. Construída com Vite + React, Tailwind CSS v4 e Framer
Motion, com foco em conversão via WhatsApp.

## Rodando o projeto localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Outros comandos:

```bash
npm run build     # gera build de produção em /dist
npm run preview   # serve o build de produção localmente
npm run lint      # roda o oxlint
```

## Estrutura

```
src/
  components/       # uma seção por arquivo (Header, Hero, About, Services, ...)
    icons/           # ícones customizados não presentes no lucide-react
  constants.js       # TODOS os textos, contatos, serviços, depoimentos e FAQ
  App.jsx            # composição das seções na ordem da página
  index.css          # tema Tailwind (cores, fontes) + estilos globais
```

Praticamente todo o conteúdo editável do site está centralizado em
`src/constants.js` — normalmente não é necessário alterar os componentes
para trocar textos, links ou dados de contato.

## O que precisa ser substituído antes de publicar

Tudo abaixo está marcado com comentários `// TROCAR` ou `<!-- TROCAR -->`
no código:

- **Número de WhatsApp** — `WHATSAPP_NUMBER` em `src/constants.js` (formato
  `55DDDNÚMERO`, só dígitos). Também exibir o número formatado em
  `CONTACT.whatsappDisplay`.
- **Endereço completo** — `CONTACT.address` em `src/constants.js`.
- **Instagram** — `CONTACT.instagram` (link) e `CONTACT.instagramHandle`
  em `src/constants.js`.
- **Mapa do Google Maps** — `CONTACT.mapsEmbedSrc` em `src/constants.js`
  (gerar o embed real em Google Maps → Compartilhar → Incorporar mapa).
- **Fotos** — todos os blocos com fundo degradê e o texto
  `[ Foto ... ]` são placeholders: Hero (`src/components/Hero.jsx`), Sobre
  (`src/components/About.jsx`) e Galeria (`src/components/Gallery.jsx`).
  Substituir por `<img src="..." />` com as fotos reais.
- **Imagem Open Graph** — `og:image` em `index.html` (recomendado
  1200x630px), usada quando o link do site é compartilhado no WhatsApp/redes.
- **Serviços, depoimentos e FAQ** — revisar os textos de exemplo em
  `src/constants.js` (`SERVICES`, `TESTIMONIALS`, `FAQ_ITEMS`) e ajustar
  para os procedimentos, valores e depoimentos reais.
- **Selo de confiança** — `TRUST_BADGE` em `src/constants.js` (ex: "+300
  clientes atendidas em Unaí-MG").
- **Favicon** — `public/favicon.svg` está com o ícone padrão do Vite.

## Stack

- [Vite](https://vite.dev/) + React
- [Tailwind CSS v4](https://tailwindcss.com/) (config via `@theme` em
  `src/index.css`, sem `tailwind.config.js`)
- [Framer Motion](https://motion.dev/) para animações de entrada (`whileInView`)
- [Lucide React](https://lucide.dev/) para ícones

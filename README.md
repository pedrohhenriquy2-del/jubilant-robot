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

## O que já foi preenchido

- **WhatsApp**: `(38) 99965-9366`
- **Endereço**: exibido só como "Unaí, Minas Gerais" (sem rua/bairro, a
  pedido do cliente).
- **Instagram**: `@seluneoficialoficial.com.br`
- **Fotos da Galeria** — 5 fotos reais em `public/gallery/` referenciadas em
  `GALLERY_IMAGES` (`src/constants.js`).
- **Foto do Hero** — `public/hero-produto.jpeg` (produto usado nos
  procedimentos).
- **Foto do Sobre** — `public/about-clinica.webp`.
- **Fotos dos Depoimentos** — 4 fotos reais de clientes em
  `public/testimonials/`.
- **Fonte dos títulos** — Jost (trocada a pedido do cliente).
- **Meta Pixel (Facebook)** — ID `61591657476960` configurado em
  `index.html`, com evento de conversão `Contact` disparado em todos os
  botões do WhatsApp (`trackWhatsAppClick` em `src/constants.js`).
- **Favicon** — monograma "S" em `public/favicon.svg`.
- **Imagem Open Graph** — `public/og-image.jpg` (1200x630, recorte da foto
  da seção Sobre), referenciada em `index.html`.
- **Mapa do Google Maps** — `CONTACT.mapsEmbedSrc` agora busca pelo nome
  "Selune Oficial" + endereço (mais preciso que só o endereço).
- **Seção de Produtos** — nova seção `src/components/Products.jsx`, com
  catálogo em `PRODUCTS` (`src/constants.js`). Cada produto tem nome, preço
  e um link de pagamento real do Mercado Pago (criado manualmente no
  painel deles, em "Cobranças → Criar link de pagamento"). Para adicionar
  um novo produto, adicione um item em `PRODUCTS` com `name`, `price` e
  `paymentLink`. Fotos ainda são placeholder até as fotos reais chegarem.

## O que ainda precisa ser substituído antes de publicar de verdade

Tudo abaixo está marcado com comentários `// TROCAR` ou `<!-- TROCAR -->`
no código:

- **Pin exato do Google Maps** — `CONTACT.mapsEmbedSrc` em `src/constants.js`
  ainda é uma busca por nome + endereço, não o pin exato da clínica. Para o
  pin exato, gerar o embed real em Google Maps → Compartilhar → Incorporar
  mapa e colar aqui.
- **Textos dos depoimentos** — os nomes (Camila, Fernanda, Juliana,
  Patrícia) e os textos em `TESTIMONIALS` (`src/constants.js`) ainda são de
  exemplo, mesmo já usando fotos reais das clientes — revisar para bater com
  o que cada uma realmente disse.
- **Serviços e FAQ** — revisar os textos de exemplo em `src/constants.js`
  (`SERVICES`, `FAQ_ITEMS`) e ajustar para os procedimentos e valores reais
  (o FAQ hoje não informa preço, só manda chamar no WhatsApp).
- **Selo de confiança** — `TRUST_BADGE` em `src/constants.js` (ex: "+300
  clientes atendidas em Unaí-MG") — confirmar se o número é real.

## Publicação (GitHub Pages + domínio próprio)

O site é publicado automaticamente pelo workflow
`.github/workflows/deploy-pages.yml` a cada push em `main`. O domínio
`selune-oficial.com.br` já está configurado no código (`public/CNAME` e as
meta tags de `og:image`/`og:url` em `index.html`) — falta só apontar o DNS
e habilitar no GitHub (dois passos que só o dono da conta consegue fazer):

### 1. Apontar o DNS no Registro.br (ou onde o domínio foi registrado)

Na Zona DNS do domínio, cadastre:
- 4 registros **A** para o domínio raiz (`selune-oficial.com.br`) apontando
  para os IPs do GitHub Pages:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Um registro **CNAME** para `www` apontando para
  `pedrohhenriquy2-del.github.io`

### 2. Habilitar no GitHub

1. Vá em **Settings → Pages** do repositório → em "Custom domain" digite
   `selune-oficial.com.br` e salve (o GitHub vai reconhecer o arquivo `CNAME`
   já commitado).
2. Aguarde a propagação do DNS (de minutos a até 24h) e depois marque
   **"Enforce HTTPS"** — o GitHub emite o certificado automaticamente assim
   que detectar o domínio apontado corretamente.

## Stack

- [Vite](https://vite.dev/) + React
- [Tailwind CSS v4](https://tailwindcss.com/) (config via `@theme` em
  `src/index.css`, sem `tailwind.config.js`)
- [Framer Motion](https://motion.dev/) para animações de entrada (`whileInView`)
- [Lucide React](https://lucide.dev/) para ícones

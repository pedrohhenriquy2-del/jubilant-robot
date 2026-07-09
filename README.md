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
- **Endereço**: Rua Dr. Natal Rabelo, s/n — Bairro Sagrada Família, Unaí - MG
- **Instagram**: `@seluneoficialoficial.com.br`
- **Fotos da Galeria** — 5 fotos reais em `public/gallery/` referenciadas em
  `GALLERY_IMAGES` (`src/constants.js`).
- **Foto do Hero** — `public/hero-produto.jpeg` (produto usado nos
  procedimentos).
- **Foto do Sobre** — `public/about-clinica.webp`.
- **Fotos dos Depoimentos** — 4 fotos reais de clientes em
  `public/testimonials/`.
- **Fonte dos títulos** — Jost (trocada a pedido do cliente).

## O que ainda precisa ser substituído antes de publicar de verdade

Tudo abaixo está marcado com comentários `// TROCAR` ou `<!-- TROCAR -->`
no código:

- **Mapa do Google Maps** — `CONTACT.mapsEmbedSrc` em `src/constants.js` usa
  uma busca pelo endereço como aproximação. Para o pin exato, gerar o embed
  real em Google Maps → Compartilhar → Incorporar mapa e colar aqui.
- **Imagem Open Graph** — `og:image` em `index.html` (recomendado
  1200x630px, ainda não existe o arquivo), usada quando o link do site é
  compartilhado no WhatsApp/redes.
- **Textos dos depoimentos** — os nomes (Camila, Fernanda, Juliana,
  Patrícia) e os textos em `TESTIMONIALS` (`src/constants.js`) ainda são de
  exemplo, mesmo já usando fotos reais das clientes — revisar para bater com
  o que cada uma realmente disse.
- **Serviços e FAQ** — revisar os textos de exemplo em `src/constants.js`
  (`SERVICES`, `FAQ_ITEMS`) e ajustar para os procedimentos e valores reais
  (o FAQ hoje não informa preço, só manda chamar no WhatsApp).
- **Selo de confiança** — `TRUST_BADGE` em `src/constants.js` (ex: "+300
  clientes atendidas em Unaí-MG").
- **Favicon** — `public/favicon.svg` está com o ícone padrão do Vite.

## Publicação (Vercel + domínio Registro.br)

O projeto é um site estático (SPA sem rotas client-side), então o deploy na
Vercel é direto — sem configuração extra além do padrão do Vite.

### 1. Publicar na Vercel

1. Acesse [vercel.com](https://vercel.com) e crie uma conta gratuita
   fazendo login com o GitHub.
2. Clique em **Add New → Project** e importe o repositório
   `pedrohhenriquy2-del/jubilant-robot`.
3. A Vercel detecta automaticamente o framework **Vite** — mantenha:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Clique em **Deploy**. Em ~1 minuto o site fica no ar em um endereço do
   tipo `jubilant-robot.vercel.app`.
5. A partir daí, todo push no branch `main` gera um novo deploy automático.

### 2. Comprar o domínio no Registro.br

1. Acesse [registro.br](https://registro.br) e registre o domínio desejado
   (ex: `seluneoficial.com.br`).
2. No painel do Registro.br, acesse o domínio → **Editar Zona DNS** (ou
   "DNS" / "Servidores DNS").

### 3. Apontar o domínio para a Vercel

1. No painel da Vercel, abra o projeto → **Settings → Domains** → adicione
   o domínio comprado no Registro.br.
2. A Vercel vai mostrar os registros DNS necessários, tipicamente:
   - Um registro **A** apontando para `76.76.21.21` (domínio raiz, ex:
     `seluneoficial.com.br`)
   - Um registro **CNAME** apontando para `cname.vercel-dns.com` (para o
     subdomínio `www`)
   - *(a Vercel sempre mostra os valores atualizados na tela — use os que
     aparecerem lá, pois podem mudar)*
3. Volte à Zona DNS do Registro.br e cadastre esses registros exatamente
   como a Vercel indicou.
4. Aguarde a propagação do DNS (de minutos a até 24h). A Vercel emite o
   certificado HTTPS automaticamente assim que detectar o domínio
   apontado corretamente.

## Stack

- [Vite](https://vite.dev/) + React
- [Tailwind CSS v4](https://tailwindcss.com/) (config via `@theme` em
  `src/index.css`, sem `tailwind.config.js`)
- [Framer Motion](https://motion.dev/) para animações de entrada (`whileInView`)
- [Lucide React](https://lucide.dev/) para ícones

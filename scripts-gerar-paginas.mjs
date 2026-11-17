// Gera um HTML por produto (título, descrição e imagem próprios para Google e WhatsApp).
// Rode: node scripts-gerar-paginas.mjs
import { readFileSync, writeFileSync } from "fs";
const det = readFileSync("src/detalhes.js", "utf8");
const cons = readFileSync("src/constants.js", "utf8");
const head = readFileSync("index.html", "utf8");
const pixel = head.slice(head.indexOf("    <!-- Meta Pixel Code -->"), head.indexOf("    <!-- End Meta Pixel Code -->") + 36);
const fontes = head.split("\n").filter((l) => l.includes("fonts.g") || l.includes("preconnect")).join("\n");
const bloco = cons.slice(cons.indexOf("export const NOVOS_PRODUTOS"));
const codigos = [...det.matchAll(/^  (SEL[A-Z]+): \{\n    slug: "([^"]+)",\n    titulo: "([^"]+)",\n    resumo:\s*"([^"]+)"/gm)];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const entradas = [];
for (const [, cod, slug, titulo, resumo] of codigos) {
  const i = bloco.indexOf(`ipayCode: "${cod}"`);
  const trecho = bloco.slice(bloco.lastIndexOf("{\n    id:", i), i);
  const nome = trecho.match(/shortName: "([^"]+)"/)[1];
  const preco = Number(trecho.match(/price: ([\d.]+)/)[1]).toFixed(2).replace(".", ",");
  const foto = (bloco.slice(i).match(/photo: `\$\{ASSET_BASE\}([^`]+)`/) || [])[1];
  const t = `${nome} por R$ ${preco} | Selune Oficial`;
  const desc = `${titulo}. ${resumo}`.slice(0, 300);
  writeFileSync(`${slug}.html`, `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${esc(t)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="theme-color" content="#FBF8F4" />
    <link rel="canonical" href="https://selune-oficial.com.br/${slug}.html" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="Selune Oficial" />
    <meta property="og:title" content="${esc(nome)} · R$ ${preco} com frete grátis" />
    <meta property="og:description" content="${esc(titulo)}. Original, com nota fiscal. Pix ou cartão." />
    <meta property="og:url" content="https://selune-oficial.com.br/${slug}.html" />
    <meta property="og:image" content="https://selune-oficial.com.br/${foto}" />
    <meta property="product:price:amount" content="${preco.replace(",", ".")}" />
    <meta property="product:price:currency" content="BRL" />
    <link rel="preload" as="image" href="./${foto}" fetchpriority="high" />
${fontes}
    <script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Product",name:nome,image:`https://selune-oficial.com.br/${foto}`,description:resumo,brand:{"@type":"Brand",name:(trecho.match(/brand: "([^"]+)"/)||[])[1]},offers:{"@type":"Offer",price:preco.replace(",","."),priceCurrency:"BRL",availability:"https://schema.org/InStock",url:`https://selune-oficial.com.br/${slug}.html`}})}</script>
${pixel}
  </head>
  <body>
    <div id="root" data-produto="${cod}"></div>
    <script type="module" src="/src/produto.jsx"></script>
    <script src="./checkout-infinitepay.js?v=11" defer></script>
  </body>
</html>
`);
  entradas.push(slug);
  console.log(slug, nome, preco, foto);
}
writeFileSync("paginas-produto.json", JSON.stringify(entradas, null, 2) + "\n");

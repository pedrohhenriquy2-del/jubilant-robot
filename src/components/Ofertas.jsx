import { Lock, Truck } from "lucide-react";
import { VITRINE, formatPrice, trackProductClick } from "../constants";
import { paginaDe } from "../detalhes";

// Ofertas em destaque logo abaixo do banner: o lançamento (GHK-Cu) e o kit
// antissinais. "Comprar agora" vai direto para o pagamento.
const GHK = VITRINE.find((p) => p.ipayCode === "SELGHK");
const KIT = VITRINE.find((p) => p.ipayCode === "SELKITFI");

const CARTOES = [
  {
    p: GHK,
    selo: "Lançamento",
    titulo: "Sérum GHK-Cu",
    sub: "Peptídeo de cobre + colágeno + ácido hialurônico",
    pontos: ["Bella Femme · 30 ml com conta-gotas", "Uso facial, de manhã e à noite"],
    referencia: "Séruns de GHK-Cu chegam a R$ 82 nas farmácias",
  },
  {
    p: KIT,
    selo: "Kit antissinais",
    titulo: "Kit Firmeza",
    sub: "Sérum GHK-Cu + Creme Antissinais Vitamina C + Colágeno",
    pontos: ["Sérum 30 ml + creme 50 g", "Mais barato do que comprar separado"],
    referencia: KIT && formatPrice(KIT.compareAtPrice),
    riscado: true,
  },
];

export default function Ofertas() {
  return (
    <section id="ofertas" className="bg-cream pt-12 pb-4 md:pt-20 md:pb-6" aria-labelledby="ofertas-titulo">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Ofertas da semana</p>
          <h2 id="ofertas-titulo" className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">
            Comece por aqui
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-ink-soft">
            O lançamento da Selune e o kit que combina com ele, com frete grátis para todo o Brasil.
          </p>
        </header>

        <div className="mt-8 grid gap-4 md:gap-6 md:grid-cols-2">
          {CARTOES.filter((c) => c.p).map((c) => (
            <article
              key={c.p.id}
              className="relative grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] gap-4 overflow-hidden rounded-3xl border border-beige bg-white p-4 sm:p-5 shadow-[0_22px_50px_-34px_rgba(74,52,38,.55)]"
            >
              <a href={paginaDe(c.p.ipayCode)} className="relative block self-start overflow-hidden rounded-2xl bg-offwhite aspect-square" aria-label={`Ver detalhes: ${c.titulo}`}>
                {c.p.photos ? (
                  <span className="grid h-full w-full grid-cols-2 items-center gap-1 p-2">
                    {c.p.photos.map((f) => (
                      <img key={f} src={f} alt="" width="300" height="300" loading="lazy" className="w-full h-auto" />
                    ))}
                  </span>
                ) : (
                  <img src={c.p.photo} alt={c.p.name} width="400" height="400" loading="lazy" className="h-full w-full object-contain" />
                )}
              </a>
              <div className="flex min-w-0 flex-col">
                <span className={`self-start rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] ${c.selo === "Lançamento" ? "bg-ink text-cream" : "bg-gold-light text-ink"}`}>
                  {c.selo}
                </span>
                <h3 className="mt-2 font-display text-xl sm:text-2xl leading-tight text-ink">
                  <a href={paginaDe(c.p.ipayCode)} className="hover:underline underline-offset-4 decoration-gold-light">{c.titulo}</a>
                </h3>
                <p className="mt-1 text-[13px] sm:text-sm leading-snug text-ink-soft">{c.sub}</p>
                <ul className="mt-2 hidden sm:grid gap-1 text-xs text-ink-soft">
                  {c.pontos.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-2xl font-bold text-ink">{formatPrice(c.p.price)}</span>
                  {c.referencia && (
                    <span className={`text-xs text-ink-soft ${c.riscado ? "line-through" : ""}`}>{c.referencia}</span>
                  )}
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-gold">
                  <Truck size={13} aria-hidden="true" /> Frete grátis · 5% off no Pix
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-[1fr_auto] gap-2">
                <a
                  href={c.p.paymentLink}
                  data-ipay={c.p.ipayCode}
                  data-name={c.p.name}
                  data-value={c.p.price}
                  onClick={trackProductClick}
                  className="inline-flex min-h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-3.5 text-[13px] sm:text-sm font-semibold uppercase tracking-[0.06em] text-white shadow-[0_12px_26px_-14px_rgba(74,52,38,.9)] hover:bg-accent-dark transition-colors"
                >
                  <Lock size={15} aria-hidden="true" /> Comprar agora
                </a>
                <a href={paginaDe(c.p.ipayCode)} className="inline-flex min-h-13 items-center justify-center rounded-full border border-beige-dark px-4 text-sm font-medium text-ink hover:border-ink transition-colors">
                  Detalhes
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

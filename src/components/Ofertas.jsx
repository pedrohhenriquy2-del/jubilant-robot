import { Lock, Star, Truck } from "lucide-react";
import { PRODUCTS, formatPrice, trackProductClick } from "../constants";

// Ofertas em destaque logo abaixo do banner: o produto mais pedido (Mix-01)
// e o kit da Black Friday. "Comprar agora" vai direto para o pagamento.
const MIX = PRODUCTS.find((p) => p.id === 1);
const KIT = PRODUCTS.find((p) => p.id === 7);

const CARTOES = [
  {
    p: MIX,
    selo: "O mais pedido da Selune",
    titulo: "Sérum Mix-01",
    sub: "Para pele oleosa, cravos, poros e manchinhas",
    pontos: ["4 ativos: niacinamida, ácido glicólico, tranexâmico e salicílico", "30 ml · algumas gotas à noite"],
    referencia: "R$ 74 nas farmácias",
    nota: true,
  },
  {
    p: KIT,
    selo: "Black Friday",
    titulo: "Kit Rotina Selune",
    sub: "Sérum Mix-01 + Protetor Solar PS-01 FPS 60",
    pontos: ["À noite trata, de manhã protege", "Mais barato do que comprar separado"],
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
            Os dois pedidos preferidos das nossas clientes, com frete grátis para todo o Brasil.
          </p>
        </header>

        <div className="mt-8 grid gap-4 md:gap-6 md:grid-cols-2">
          {CARTOES.filter((c) => c.p).map((c) => (
            <article
              key={c.p.id}
              className="relative grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr] gap-4 overflow-hidden rounded-3xl border border-beige bg-white p-4 sm:p-5 shadow-[0_22px_50px_-34px_rgba(74,52,38,.55)]"
            >
              <a href={c.p.salesPageUrl} className="relative block self-start overflow-hidden rounded-2xl bg-offwhite aspect-square" aria-label={`Ver detalhes: ${c.titulo}`}>
                <img src={c.p.photo} alt={c.p.name} width="400" height="400" loading="lazy" className="h-full w-full object-contain" />
              </a>
              <div className="flex min-w-0 flex-col">
                <span className={`self-start rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] ${c.selo === "Black Friday" ? "bg-ink text-cream" : "bg-gold-light text-ink"}`}>
                  {c.selo}
                </span>
                <h3 className="mt-2 font-display text-xl sm:text-2xl leading-tight text-ink">
                  <a href={c.p.salesPageUrl} className="hover:underline underline-offset-4 decoration-gold-light">{c.titulo}</a>
                </h3>
                <p className="mt-1 text-[13px] sm:text-sm leading-snug text-ink-soft">{c.sub}</p>
                <ul className="mt-2 hidden sm:grid gap-1 text-xs text-ink-soft">
                  {c.pontos.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
                {c.nota && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-ink-soft" aria-label="Avaliação 5 de 5 nas avaliações de clientes">
                    <span className="flex" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </span>
                    <a href="#avaliacoes" className="underline underline-offset-2">avaliações de clientes</a>
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-2xl font-bold text-ink">{formatPrice(c.p.price)}</span>
                  {c.referencia && (
                    <span className={`text-xs text-ink-soft ${c.riscado ? "line-through" : ""}`}>{c.referencia}</span>
                  )}
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-gold">
                  <Truck size={13} aria-hidden="true" /> Frete grátis · Pix ou cartão
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-[1fr_auto] gap-2">
                <a
                  href={c.p.paymentLink}
                  data-ipay={c.p.ipayCode || "PPU38CQHM7L"}
                  data-name={c.p.name}
                  data-value={c.p.price}
                  onClick={trackProductClick}
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white shadow-[0_12px_26px_-14px_rgba(74,52,38,.9)] hover:bg-accent-dark transition-colors"
                >
                  <Lock size={15} aria-hidden="true" /> Comprar agora
                </a>
                <a href={c.p.salesPageUrl} className="inline-flex min-h-13 items-center justify-center rounded-full border border-beige-dark px-4 text-sm font-medium text-ink hover:border-ink transition-colors">
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

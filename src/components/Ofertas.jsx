import { Lock, Truck } from "lucide-react";
import { VITRINE, formatPrice, precoPix, trackProductClick } from "../constants";
import { paginaDe } from "../detalhes";

// Ofertas em destaque logo abaixo do banner: só a linha rosa mosqueta
// (kit de Black Friday + os 3 produtos). "Comprar agora" vai direto para o pagamento.
const OLEO = VITRINE.find((p) => p.ipayCode === "SELOLEO");
const SABRM = VITRINE.find((p) => p.ipayCode === "SELSABRM");
const ESF = VITRINE.find((p) => p.ipayCode === "SELESF");
const KITRM = VITRINE.find((p) => p.ipayCode === "SELKITRM");

const CARTOES = [
  {
    p: KITRM,
    selo: "Black Friday",
    titulo: "Kit Rosa Mosqueta",
    sub: "Sabonete + Esfoliante + Óleo · limpa, esfolia e finaliza",
    pontos: ["3 produtos da linha rosa mosqueta", "Você economiza R$ 32,86"],
    referencia: KITRM && formatPrice(KITRM.compareAtPrice),
    riscado: true,
  },
  {
    p: OLEO,
    selo: "Rosa mosqueta",
    titulo: "Óleo de Rosa Mosqueta",
    sub: "Apinil · frasco de 30 ml com bico aplicador",
    pontos: ["Óleo de rosa mosqueta", "Algumas gotas na pele limpa e seca"],
  },
  {
    p: SABRM,
    selo: "Rosa mosqueta",
    titulo: "Sabonete Facial Rosa Mosqueta",
    sub: "Dermachem · com ácido hialurônico, 100 ml",
    pontos: ["Para pele sensível e extrasseca (embalagem)", "Limpeza do rosto"],
  },
  {
    p: ESF,
    selo: "Rosa mosqueta",
    titulo: "Esfoliante Facial Rosa Mosqueta",
    sub: "Dermachem · com casca de coco, 100 g",
    pontos: ["Para pele sensível e extrasseca (embalagem)", "Use na frequência indicada no rótulo"],
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
            O Kit Rosa Mosqueta de Black Friday e a linha completa, com frete grátis para todo o Brasil.
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
                  <span className={`grid h-full w-full ${c.p.photos.length > 2 ? "grid-cols-3" : "grid-cols-2"} items-center gap-1 p-2`}>
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
                <p className="mt-0.5 text-sm font-semibold text-accent">ou {formatPrice(precoPix(c.p.price))} no Pix</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-gold">
                  <Truck size={13} aria-hidden="true" /> Frete grátis
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

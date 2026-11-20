import { Check, Lock, ShieldCheck, Truck } from "lucide-react";
import { VITRINE, formatPrice, precoPix, trackProductClick } from "../constants";
import { paginaDe } from "../detalhes";

// Ofertas da semana: só os kits da linha rosa mosqueta.
// "Comprar agora" vai direto para o pagamento.
const KITRM = VITRINE.find((p) => p.ipayCode === "SELKITRM");
const KITGL = VITRINE.find((p) => p.ipayCode === "SELKITGL");

const CARTOES = [
  {
    p: KITRM,
    selo: "Black Friday",
    titulo: "Kit Rosa Mosqueta",
    sub: "Sabonete + Esfoliante + Óleo · limpa, esfolia e finaliza",
    itens: ["Sabonete Facial Rosa Mosqueta · 100 ml", "Esfoliante Facial Rosa Mosqueta · 100 g", "Óleo de Rosa Mosqueta Apinil · 30 ml"],
    passos: ["Limpa", "Esfolia", "Finaliza"],
  },
  {
    p: KITGL,
    selo: "Kit rosa mosqueta",
    titulo: "Kit Glow Rosa Mosqueta",
    sub: "Mousse Micelar + Sérum + Creme · rotina rosa mosqueta",
    itens: ["Mousse Micelar Rosa Mosqueta · 150 ml", "Sérum Rosa Mosqueta · 30 ml", "Creme Rosa Mosqueta + Colágeno · 50 g"],
    passos: ["Limpa", "Trata", "Hidrata"],
  },
];

export default function Ofertas() {
  return (
    <section id="ofertas" className="bg-cream pt-12 pb-4 md:pt-20 md:pb-6" aria-labelledby="ofertas-titulo">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Ofertas da semana</p>
          <h2 id="ofertas-titulo" className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">
            Sua rotina completa, num pedido só
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-ink-soft">
            Tudo combina e tudo chega junto. Escolha o seu kit de rosa mosqueta com preço de Black Friday e frete grátis até 01/12.
          </p>
        </header>

        <div className="mt-8 grid gap-5 md:gap-6 md:grid-cols-2">
          {CARTOES.filter((c) => c.p).map((c) => {
            const economia = c.p.compareAtPrice - c.p.price;
            const off = Math.round((economia / c.p.compareAtPrice) * 100);
            return (
              <article
                key={c.p.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-beige bg-white shadow-[0_26px_60px_-38px_rgba(74,52,38,.6)]"
              >
                <a href={paginaDe(c.p.ipayCode)} className="relative block bg-[#ECE2D6]" aria-label={`Ver detalhes: ${c.titulo}`}>
                  <img src={c.p.cover} alt="" width="1000" height="1000" loading="lazy" className="block aspect-[5/4] w-full object-cover object-[50%_45%]" />
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-cream">{c.selo}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] sm:text-xs font-bold text-white">−{off}%</span>
                  <span className="grid grid-cols-3 gap-3 border-t border-beige bg-offwhite px-5 py-2.5 text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
                    {c.passos.map((t, i) => (
                      <span key={t}>{i + 1} · {t}</span>
                    ))}
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-[30px] sm:text-[34px] leading-[1.05] text-ink">
                    <a href={paginaDe(c.p.ipayCode)} className="hover:underline underline-offset-4 decoration-gold-light">{c.titulo}</a>
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{c.sub}</p>

                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">O que vem no kit</p>
                  <ul className="mt-2 grid gap-1.5 text-sm text-ink">
                    {c.itens.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" /> {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-2xl bg-offwhite p-4">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm text-ink-soft line-through">{formatPrice(c.p.compareAtPrice)}</span>
                      <span className="text-3xl font-bold text-ink">{formatPrice(c.p.price)}</span>
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-accent">ou {formatPrice(precoPix(c.p.price))} no Pix (5% off)</p>
                    <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-ink-soft">
                      <span className="text-gold font-semibold">Você economiza {formatPrice(economia)}</span>
                      <span className="flex items-center gap-1"><Truck size={13} aria-hidden="true" /> Frete grátis</span>
                    </p>
                  </div>

                  <a
                    href={c.p.paymentLink}
                    data-ipay={c.p.ipayCode}
                    data-name={c.p.name}
                    data-value={c.p.price}
                    onClick={trackProductClick}
                    className="mt-4 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_14px_28px_-14px_rgba(74,52,38,.9)] hover:bg-accent-dark transition-colors"
                  >
                    <Lock size={15} aria-hidden="true" /> Comprar agora
                  </a>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs text-ink-soft">
                    <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-gold" aria-hidden="true" /> Original, com nota fiscal</span>
                    <a href={paginaDe(c.p.ipayCode)} className="font-semibold text-ink underline underline-offset-4 decoration-gold-light">Ver detalhes</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

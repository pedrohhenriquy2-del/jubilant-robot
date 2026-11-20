import { useState } from "react";
import { Lock, RotateCcw, Sparkles } from "lucide-react";
import { VITRINE, formatPrice, precoPix } from "../constants";
import { paginaDe } from "../detalhes";
import { adicionar } from "../cart";

// "Descubra a sua rotina": uma pergunta, um kit indicado. Gera curiosidade e tira a dúvida
// de quem não sabe por onde começar. O texto descreve a rotina, sem prometer resultado.
const OPCOES = [
  {
    id: "repuxa",
    emoji: "🌹",
    rotulo: "Repuxa e fica sem maciez",
    kit: "SELKITRM",
    porque: "Uma rotina de 3 passos com rosa mosqueta: limpa, esfolia e finaliza com óleo. Feita para quem gosta de pele macia ao toque.",
  },
  {
    id: "brilho",
    emoji: "💧",
    rotulo: "Brilha e fica oleosa",
    kit: "SELKITOL",
    porque: "Limpeza com ácido salicílico, hidratação leve e protetor de toque seco. A rotina completa para pele oleosa.",
  },
  {
    id: "opaca",
    emoji: "✨",
    rotulo: "Fica opaca, sem viço",
    kit: "SELKITGL",
    porque: "Mousse micelar, sérum e creme da linha rosa mosqueta. Uma rotina de cuidado para o seu momento de autocuidado.",
  },
  {
    id: "firmeza",
    emoji: "🪞",
    rotulo: "Quero cuidar da firmeza",
    kit: "SELKITFI",
    porque: "Sérum de peptídeo de cobre (GHK-Cu), o ativo do momento, com creme de vitamina C e colágeno.",
  },
];

export default function Rotina() {
  const [escolha, setEscolha] = useState(null);
  const op = OPCOES.find((o) => o.id === escolha);
  const kit = op && VITRINE.find((p) => p.ipayCode === op.kit);

  return (
    <section id="rotina" className="bg-ink py-14 text-cream md:py-20" aria-labelledby="rotina-titulo">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <header className="text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-light">
            <Sparkles size={14} aria-hidden="true" /> Teste de 5 segundos
          </p>
          <h2 id="rotina-titulo" className="mt-3 font-display text-4xl leading-[1.05] md:text-5xl [text-wrap:balance]">
            Qual é a <em className="text-gold-light">sua</em> rotina?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-cream/75 md:text-base">
            Responda uma pergunta e veja o kit que combina com você. No fim do dia, a sua pele…
          </p>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4" role="radiogroup" aria-label="Como a sua pele fica no fim do dia">
          {OPCOES.map((o) => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={escolha === o.id}
              onClick={() => setEscolha(o.id)}
              className={`flex min-h-[92px] flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-4 text-center text-sm font-semibold transition-all ${
                escolha === o.id
                  ? "border-gold bg-cream text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,.7)]"
                  : "border-cream/20 bg-cream/5 text-cream hover:border-gold-light/60 hover:bg-cream/10"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">{o.emoji}</span>
              {o.rotulo}
            </button>
          ))}
        </div>

        <div aria-live="polite">
          {kit && (
            <article key={kit.ipayCode} className="rotina-resultado mt-6 grid overflow-hidden rounded-3xl bg-cream text-ink md:grid-cols-[1fr_1.1fr]">
              <a href={paginaDe(kit.ipayCode)} className="block bg-offwhite" aria-label={`Ver detalhes: ${kit.shortName}`}>
                <img src={kit.cover || kit.photo} alt={kit.name} width="1000" height="1000" loading="lazy" className="aspect-[5/4] h-full w-full object-cover md:aspect-auto" />
              </a>
              <div className="p-5 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">A sua rotina é</p>
                <h3 className="mt-1 font-display text-[34px] leading-none md:text-4xl">{kit.shortName}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{op.porque}</p>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl font-bold">{formatPrice(kit.price)}</span>
                  {kit.compareAtPrice && <span className="text-sm text-ink-soft line-through">{formatPrice(kit.compareAtPrice)}</span>}
                  <span className="w-full text-sm font-semibold text-accent">ou {formatPrice(precoPix(kit.price))} no Pix · frete grátis</span>
                </div>
                <div className="mt-5 grid gap-2.5">
                  <button
                    type="button"
                    onClick={() => adicionar(kit.ipayCode)}
                    className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-accent-dark"
                  >
                    <Lock size={16} aria-hidden="true" /> Quero essa rotina
                  </button>
                  <div className="flex items-center justify-between text-xs">
                    <a href={paginaDe(kit.ipayCode)} className="font-semibold text-ink underline decoration-gold underline-offset-4">Ver o que vem no kit</a>
                    <button type="button" onClick={() => setEscolha(null)} className="inline-flex items-center gap-1 text-ink-soft">
                      <RotateCcw size={13} aria-hidden="true" /> Refazer
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

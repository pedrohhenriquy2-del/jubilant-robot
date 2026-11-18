import { Droplets, Sparkles, Droplet, Hourglass, Sun, ArrowRight } from "lucide-react";
import { NECESSIDADES, filtrar, produtosDo } from "../loja";

const ICONES = { oleosa: Droplets, manchas: Sparkles, hidratacao: Droplet, antissinais: Hourglass, protecao: Sun };
const CORES = {
  oleosa: "bg-[#EAF1EE]",
  manchas: "bg-[#F6EADF]",
  hidratacao: "bg-[#E7EEF2]",
  antissinais: "bg-[#F1E6EA]",
  protecao: "bg-[#F8F0D9]",
};

// Atalhos por necessidade da pele: levam direto para a vitrine já filtrada.
export default function Necessidades() {
  return (
    <section className="bg-white py-12 md:py-16 border-y border-beige" aria-labelledby="nec-titulo">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Compre pela necessidade</p>
          <h2 id="nec-titulo" className="mt-2 font-display text-3xl md:text-5xl text-ink [text-wrap:balance]">O que a sua pele pede hoje?</h2>
        </header>
        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {NECESSIDADES.map((n, k) => {
            const Icone = ICONES[n.id];
            const qtd = produtosDo(n.id).length;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => filtrar(n.id)}
                className={`group flex flex-col items-start gap-3 rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5 ${CORES[n.id]} ${k === NECESSIDADES.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink">
                  <Icone size={20} aria-hidden="true" />
                </span>
                <span className="font-display text-lg leading-tight text-ink">{n.rotulo}</span>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-ink-soft group-hover:text-ink">
                  {qtd} {qtd === 1 ? "produto" : "produtos"} <ArrowRight size={14} aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { VITRINE } from "../constants";
import ProductCard from "./ProductCard";

const PASSOS = ["Todos", "Limpeza", "Sérum", "Hidratante", "Protetor"];

// Vitrine: produtos avulsos com filtro por passo da rotina, depois os kits.
export default function Products() {
  const [filtro, setFiltro] = useState("Todos");
  const avulsos = VITRINE.filter((p) => p.category !== "Kits");
  const kits = VITRINE.filter((p) => p.category === "Kits");
  const lista = filtro === "Todos" ? avulsos : avulsos.filter((p) => p.category === filtro);

  return (
    <>
      <section id="produtos" className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <header className="text-center">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Produtos em destaque</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">Monte a sua rotina</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-ink-soft">
              Limpeza, sérum, hidratante e protetor solar. Escolha pelo passo que falta na sua rotina.
            </p>
          </header>

          <div className="mt-7 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filtrar por passo da rotina">
            {PASSOS.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filtro === c}
                onClick={() => setFiltro(c)}
                className={`shrink-0 min-h-10 rounded-full border px-5 text-sm font-medium transition-colors ${
                  filtro === c ? "border-accent bg-accent text-white" : "border-beige-dark bg-white text-ink hover:border-ink"
                }`}
              >
                {c === "Protetor" ? "Protetor solar" : c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
            {lista.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="kits" className="bg-offwhite py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <header className="text-center">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Kits Selune</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">A rotina completa, pronta</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-ink-soft">
              Três passos que combinam, em um pedido só e por menos do que comprando separado.
            </p>
          </header>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kits.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

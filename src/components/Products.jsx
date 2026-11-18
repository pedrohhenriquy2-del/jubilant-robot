import { useEffect, useState } from "react";
import { VITRINE } from "../constants";
import { CATEGORIAS, NECESSIDADES, produtosDo } from "../loja";
import ProductCard from "./ProductCard";

// Vitrine: filtro por tipo de produto ou por necessidade da pele, depois os kits.
export default function Products() {
  const [filtro, setFiltro] = useState("Todos");
  const kits = VITRINE.filter((p) => p.category === "Kits");
  const lista = produtosDo(filtro);
  const titulo =
    (NECESSIDADES.find((n) => n.id === filtro) || {}).rotulo ||
    (filtro === "Todos" ? "Todos os produtos" : (CATEGORIAS.find((c) => c.id === filtro) || {}).rotulo);

  useEffect(() => {
    const f = (e) => setFiltro(e.detail);
    window.addEventListener("selune:filtro", f);
    return () => window.removeEventListener("selune:filtro", f);
  }, []);

  const chip = (id, rotulo) => (
    <button
      key={id}
      type="button"
      aria-pressed={filtro === id}
      onClick={() => setFiltro(id)}
      className={`shrink-0 min-h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
        filtro === id ? "border-accent bg-accent text-white" : "border-beige-dark bg-white text-ink hover:border-ink"
      }`}
    >
      {rotulo}
    </button>
  );

  return (
    <>
      <section id="produtos" className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <header className="text-center">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Loja Selune</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">Monte a sua rotina</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-ink-soft">
              Filtre pelo tipo de produto ou pela necessidade da sua pele.
            </p>
          </header>

          <div className="mt-7 grid gap-2">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Tipo de produto">
              {CATEGORIAS.map((c) => chip(c.id, c.rotulo))}
            </div>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Necessidade da pele">
              {NECESSIDADES.map((n) => chip(n.id, n.rotulo))}
            </div>
          </div>

          <p className="mt-6 text-sm text-ink-soft" role="status">
            <span className="font-semibold text-ink">{titulo}</span> · {lista.length} {lista.length === 1 ? "produto" : "produtos"}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
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
              Produtos que combinam, em um pedido só e por menos do que comprando separado.
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

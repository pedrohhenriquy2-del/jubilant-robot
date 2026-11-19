import { useEffect, useState } from "react";
import { CATEGORIAS, NECESSIDADES, produtosDo } from "../loja";
import ProductCard from "./ProductCard";

// Vitrine: filtro por tipo de produto ou por necessidade da pele (kits primeiro em "Todos").
export default function Products() {
  const [filtro, setFiltro] = useState("Todos");
  const lista = produtosDo(filtro);
  const titulo =
    (NECESSIDADES.find((n) => n.id === filtro) || {}).rotulo ||
    (filtro === "Todos" ? "Todos os produtos" : (CATEGORIAS.find((c) => c.id === filtro) || {}).rotulo);

  // Deixa o filtro escolhido sempre visível nas fileiras que rolam de lado.
  useEffect(() => {
    document.querySelectorAll("#produtos [data-fileira]").forEach((row) => {
      const b = row.querySelector('[aria-pressed="true"]');
      if (b) row.scrollTo({ left: b.offsetLeft - row.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
    });
  }, [filtro]);

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
      <section id="produtos" className="bg-cream py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <header className="text-center">
            <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Loja Selune</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">Monte a sua rotina</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm md:text-base text-ink-soft">
              Filtre pelo tipo de produto ou pela necessidade da sua pele.
            </p>
          </header>

          <div className="mt-7 grid gap-2">
            <div className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Tipo de produto" data-fileira>
              {CATEGORIAS.map((c) => chip(c.id, c.rotulo))}
            </div>
            <div className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Necessidade da pele" data-fileira>
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

    </>
  );
}

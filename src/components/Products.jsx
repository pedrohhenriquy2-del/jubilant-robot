import { useState } from "react";
import { Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import { PRODUCTS, trackProductClick, formatPrice } from "../constants";

// Filtros por categoria, como nas grandes lojas de beleza.
const CATEGORIES = ["Todos", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

export default function Products() {
  const [cat, setCat] = useState("Todos");
  const list = cat === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <section id="produtos" className="py-8 md:py-14 bg-cream">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-4 mb-4 md:mb-6">
          <div>
            <h2 className="text-xl md:text-3xl text-ink font-bold tracking-tight">
              Skincare Principia
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              {PRODUCTS.length} produtos originais · frete grátis
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div
          role="tablist"
          aria-label="Filtrar por categoria"
          className="-mx-4 px-4 md:mx-0 md:px-0 flex gap-2 overflow-x-auto pb-1 mb-5 md:mb-8 [scrollbar-width:none]"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                cat === c
                  ? "bg-ink text-cream border-ink"
                  : "bg-white text-ink border-beige-dark hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grade de produtos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
          {list.map((product) => {
            const href = product.salesPageUrl || product.paymentLink;
            return (
              <article key={product.id} className="group flex flex-col">
                <a href={href} className="relative block aspect-square w-full bg-white border border-beige rounded-md overflow-hidden">
                  {product.badge && (
                    <span className="absolute top-2 left-2 z-10 bg-ink px-2 py-0.5 text-[10px] md:text-[11px] uppercase tracking-wide text-cream font-semibold">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.photo}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-3 md:p-5 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </a>
                <div className="pt-3 flex flex-col flex-1">
                  <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.12em] text-ink">
                    Principia
                  </p>
                  <a href={href} className="mt-1 text-sm md:text-[15px] text-ink leading-snug line-clamp-2 hover:underline">
                    {product.shortName}
                  </a>
                  <p className="mt-1 text-xs text-ink-soft line-clamp-1">{product.tagline}</p>
                  <p className="mt-2 text-base md:text-lg font-bold text-ink">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-[11px] md:text-xs text-ink-soft">Frete grátis</p>
                  <a
                    href={href}
                    onClick={trackProductClick}
                    className="mt-3 inline-flex items-center justify-center rounded-md bg-ink px-3 py-2.5 text-sm font-semibold text-cream hover:bg-gold transition-colors"
                  >
                    Comprar
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Vantagens */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 border-t border-beige pt-6 md:pt-8">
          {[
            { Icon: Truck, t: "Frete grátis", d: "Para todo o Brasil, em 3 a 7 dias úteis" },
            { Icon: BadgeCheck, t: "Originais com nota fiscal", d: "Produtos Principia lacrados" },
            { Icon: ShieldCheck, t: "Compra segura", d: "Pix ou cartão · 7 dias para desistir" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="flex items-center gap-3">
              <Icon size={22} className="text-ink shrink-0" />
              <div>
                <p className="text-sm font-semibold text-ink">{t}</p>
                <p className="text-xs text-ink-soft">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

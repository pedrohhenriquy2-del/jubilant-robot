import { ShoppingBag } from "lucide-react";
import { formatPrice, precoPix } from "../constants";
import { DETALHES, paginaDe } from "../detalhes";
import { adicionar } from "../cart";

// Cartão de produto: foto grande, nome claro, preço visível e um botão só.
export default function ProductCard({ p, compacto = false }) {
  const d = DETALHES[p.ipayCode] || {};
  const href = paginaDe(p.ipayCode);
  const fotos = p.photos || [p.photo];
  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-beige overflow-hidden transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(74,52,38,.45)]">
      <a href={href} className={`relative block bg-white overflow-hidden ${fotos.length > 1 ? "aspect-[4/3]" : "aspect-square"}`} aria-label={`Ver detalhes: ${p.shortName}`}>
        {fotos.length > 1 ? (
          <div className="absolute inset-0 grid grid-cols-3 items-center px-2">
            {fotos.map((f) => (
              <img key={f} src={f} alt="" loading="lazy" width="400" height="400" className="w-full h-auto scale-[1.35]" />
            ))}
          </div>
        ) : (
          <img
            src={p.photo}
            alt={p.name}
            loading="lazy"
            width="800"
            height="800"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/95 border border-gold-light px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
            {p.badge}
          </span>
        )}
      </a>
      <div className="flex flex-1 flex-col gap-1 md:gap-1.5 p-3.5 md:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{p.brand === "Selune" ? "Kit Selune" : p.brand}</p>
        <h3 className="font-display text-[17px] md:text-[22px] leading-tight text-ink">
          <a href={href} className="hover:underline underline-offset-4 decoration-gold-light">{p.shortName}</a>
        </h3>
        {!compacto && <p className="hidden md:block text-sm text-ink-soft leading-snug">{d.titulo || p.tagline}</p>}
        <p className="text-xs text-ink-soft">{p.tagline}</p>
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-ink">{formatPrice(p.price)}</span>
          {p.compareAtPrice && (
            <span className="text-sm text-ink-soft line-through" aria-label={`Separados: ${formatPrice(p.compareAtPrice)}`}>
              {formatPrice(p.compareAtPrice)}
            </span>
          )}
        </div>
        <p className="text-xs font-semibold text-accent">ou {formatPrice(precoPix(p.price))} no Pix</p>
        <p className="text-[11px] font-medium text-gold">Frete grátis</p>
        {p.compareAtPrice && (
          <p className="text-xs font-semibold text-gold">
            Economize {formatPrice(p.compareAtPrice - p.price)} em relação aos itens separados
          </p>
        )}
        <div className="mt-3 grid gap-2">
          <button
            type="button"
            onClick={() => adicionar(p.ipayCode)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-3 text-[13px] md:text-sm leading-tight font-semibold tracking-wide text-white hover:bg-accent-dark transition-colors"
          >
            <ShoppingBag size={16} aria-hidden="true" className="hidden sm:block" />
            Adicionar ao carrinho
          </button>
          {!compacto && (
            <a href={href} className="inline-flex min-h-11 items-center justify-center rounded-full border border-beige-dark px-4 text-sm font-medium text-ink hover:border-ink transition-colors">
              Ver detalhes
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

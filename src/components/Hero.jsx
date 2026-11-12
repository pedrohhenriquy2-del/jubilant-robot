import { ShoppingBag } from "lucide-react";
import { PRODUCTS, trackProductClick, formatPrice } from "../constants";

// Topo da Loja no estilo das grandes lojas de beleza: banner da oferta com botão de compra direto.
export default function Hero() {
  const base = import.meta.env.BASE_URL;
  const mix = PRODUCTS.find((p) => p.id === 1);
  return (
    <section id="inicio" className="bg-cream pt-4 md:pt-6">
      <h1 className="sr-only">Selune Oficial: skincare Principia original com frete grátis</h1>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <a
          href={`${base}mix-01.html`}
          className="block overflow-hidden rounded-t-md border border-b-0 border-beige bg-ink"
          aria-label={`Ver oferta: Principia Sérum Mix-01 por ${formatPrice(mix.price)} com frete grátis`}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={`${base}banners/black-friday-1080.webp?v=3789`} width="1080" height="1080" />
            <img
              src={`${base}banners/black-friday-1600.webp?v=3789`}
              alt={`Black Friday Selune: Principia Sérum Mix-01 por ${formatPrice(mix.price)}, frete grátis, Pix ou cartão`}
              width="1600"
              height="640"
              className="w-full h-auto block"
            />
          </picture>
        </a>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center rounded-b-md border border-t-0 border-beige bg-white p-3 md:p-4">
          <a
            href={mix.paymentLink}
            onClick={trackProductClick}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3.5 text-base font-bold text-white hover:bg-accent-dark transition-colors"
          >
            <ShoppingBag size={19} />
            Comprar agora por {formatPrice(mix.price)}
          </a>
          <a
            href={`${base}mix-01.html`}
            className="inline-flex items-center justify-center rounded-md border border-beige-dark px-5 py-3.5 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            Ver detalhes do Mix-01
          </a>
        </div>
      </div>
    </section>
  );
}

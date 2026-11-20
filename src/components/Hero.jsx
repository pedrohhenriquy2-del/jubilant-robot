import { ArrowDown } from "lucide-react";
import { VITRINE, PRODUCTS, formatPrice } from "../constants";

const BF_FIM = new Date("2026-12-01T23:59:59-03:00").getTime();

// Banner principal: imagem dos produtos + título de desejo + benefício + um botão.
export default function Hero() {
  const base = import.meta.env.BASE_URL;
  const menor = Math.min(...[...VITRINE, ...PRODUCTS.filter((p) => p.id === 1)].map((p) => p.price));
  return (
    <section id="inicio" className="relative overflow-hidden bg-offwhite">
      <picture>
        <source media="(min-width: 768px)" srcSet={`${base}banners/hero-premium.webp`} width="1600" height="900" />
        <img
          src={`${base}banners/hero-premium-mob.webp`}
          alt="Sérum de ácido hialurônico, ampola de centella, protetor solar FPS 60, mousse micelar e sérum rosa mosqueta sobre um pedestal bege"
          width="900"
          height="675"
          fetchpriority="high"
          className="block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover md:object-right"
        />
      </picture>
      <div className="relative -mt-8 md:mt-0 rounded-t-[28px] md:rounded-none bg-cream md:bg-transparent">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="anima px-1 pt-7 pb-9 text-center md:max-w-[520px] md:py-28 lg:py-36 md:text-left">
          {Date.now() < BF_FIM && <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-cream">
            Black Friday · frete grátis até 01/12
          </p>}
          <h1 className="mt-4 font-display text-[34px] leading-[1.06] md:text-6xl lg:text-[64px] text-ink [text-wrap:balance]">
            Skincare que funciona, com preço que cabe no bolso.
          </h1>
          <p className="mx-auto md:mx-0 mt-4 max-w-md text-[15px] md:text-lg leading-relaxed text-ink-soft">
            Produtos originais e lacrados, com nota fiscal, a partir de {formatPrice(menor)}. Frete grátis para todo o Brasil e atendimento de verdade no WhatsApp.
          </p>
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap md:justify-start sm:justify-center">
            <a
              href="#ofertas"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_-14px_rgba(62,18,34,.8)] hover:bg-accent-dark transition-colors"
            >
              Ver ofertas <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href="#produtos"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-ink/25 bg-white/70 px-8 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:border-ink transition-colors"
            >
              Monte sua rotina
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs font-medium text-ink-soft">
            <li>✓ Originais com nota fiscal</li>
            <li>✓ Entrega em 3 a 7 dias úteis</li>
            <li>✓ 7 dias para desistir</li>
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}

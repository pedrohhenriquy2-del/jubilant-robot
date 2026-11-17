import { ArrowDown } from "lucide-react";
import { VITRINE, formatPrice } from "../constants";

// Banner principal: imagem dos produtos + título de desejo + benefício + um botão.
export default function Hero() {
  const base = import.meta.env.BASE_URL;
  const menor = Math.min(...VITRINE.map((p) => p.price));
  return (
    <section id="inicio" className="relative overflow-hidden bg-offwhite">
      <picture>
        <source media="(min-width: 768px)" srcSet={`${base}banners/hero-premium.webp`} width="1600" height="900" />
        <img
          src={`${base}banners/hero-premium-mob.webp`}
          alt="Sérum de ácido hialurônico, ampola de centella, protetor solar FPS 60, mousse micelar e sérum rosa mosqueta sobre um pedestal bege"
          width="900"
          height="900"
          fetchpriority="high"
          className="block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover md:object-right"
        />
      </picture>
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <div className="anima -mt-10 md:mt-0 rounded-t-3xl md:rounded-none bg-cream md:bg-transparent px-1 pt-7 pb-9 text-center md:max-w-[520px] md:py-28 lg:py-36 md:text-left">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Skincare Selune Oficial</p>
          <h1 className="mt-3 font-display text-[40px] leading-[1.02] md:text-6xl lg:text-[68px] text-ink [text-wrap:balance]">
            Sua pele merece uma rotina especial.
          </h1>
          <p className="mx-auto md:mx-0 mt-4 max-w-md text-[15px] md:text-lg leading-relaxed text-ink-soft">
            Produtos de skincare selecionados para transformar o seu momento de autocuidado em algo simples e especial. A partir de {formatPrice(menor)}, com frete grátis.
          </p>
          <a
            href="#produtos"
            className="mt-7 inline-flex min-h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_-14px_rgba(74,52,38,.8)] hover:bg-accent-dark transition-colors"
          >
            Quero conhecer os produtos <ArrowDown size={16} aria-hidden="true" />
          </a>
          <ul className="mt-6 flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs font-medium text-ink-soft">
            <li>✓ Produtos originais</li>
            <li>✓ Nota fiscal</li>
            <li>✓ Pix ou cartão</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

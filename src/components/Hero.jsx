import { useEffect, useRef, useState } from "react";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, trackProductClick, formatPrice } from "../constants";

// Topo da Loja: carrossel de fotos do Mix-01 com botão de compra direto.
export default function Hero() {
  const base = import.meta.env.BASE_URL;
  const mix = PRODUCTS.find((p) => p.id === 1);
  const preco = formatPrice(mix.price);
  const kit = PRODUCTS.find((p) => p.id === 7);
  const precoKit = formatPrice(kit.price);
  const slides = [
    {
      // Oferta de Black Friday do kit: tirar este slide depois de 01/12.
      wide: "banners/kit-rotina-1600.webp",
      mob: "banners/kit-rotina-1080.webp",
      alt: `Black Friday Selune: Kit Rotina Selune, Sérum Mix-01 + Protetor Solar PS-01, por ${precoKit}, frete grátis até 01/12`,
      href: "kit-rotina.html",
    },
    {
      wide: "banners/black-friday-1600.webp",
      mob: "banners/black-friday-1080.webp",
      alt: `Black Friday Selune: Principia Sérum Mix-01 por ${preco}, frete grátis, Pix ou cartão`,
    },
    {
      wide: "banners/mix01-original-1600.webp",
      mob: "banners/mix01-original-1080.webp",
      alt: "Principia Sérum Mix-01: frasco de 30 ml com caixa lacrada, original, com nota fiscal e frete grátis",
    },
    {
      wide: "banners/mix01-formula-1600.webp",
      mob: "banners/mix01-formula-1080.webp",
      alt: "Lateral da caixa do Mix-01: dermatologicamente testado, não testado em animais, sem parabenos, sulfatos, silicones, fragrância, corantes e glúten",
    },
  ];

  const trilho = useRef(null);
  const [atual, setAtual] = useState(0);
  const [parado, setParado] = useState(false);
  const emKit = atual === 0;

  function irPara(i) {
    const el = trilho.current;
    if (!el) return;
    const n = (i + slides.length) % slides.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  }

  function aoRolar() {
    const el = trilho.current;
    if (!el || !el.clientWidth) return;
    setAtual(Math.round(el.scrollLeft / el.clientWidth));
  }

  // Passa sozinho a cada 5 s, até a cliente mexer no carrossel.
  useEffect(() => {
    const calmo =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (parado || calmo) return;
    const t = setInterval(() => irPara(atual + 1), 5000);
    return () => clearInterval(t);
  }, [atual, parado]);

  return (
    <section id="inicio" className="bg-cream pt-0 md:pt-6">
      <h1 className="sr-only">Selune Oficial: skincare Principia original com frete grátis</h1>
      <div className="mx-auto max-w-6xl px-0 md:px-6">
        <div
          className="relative overflow-hidden md:rounded-t-md md:border md:border-b-0 md:border-beige bg-ink"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Ofertas da Selune Oficial"
          onPointerDown={() => setParado(true)}
          onMouseEnter={() => setParado(true)}
          onFocus={() => setParado(true)}
        >
          <div
            ref={trilho}
            onScroll={aoRolar}
            className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((s, i) => (
              <a
                key={s.wide}
                href={`${base}${s.href || "mix-01.html"}`}
                className="block w-full shrink-0 snap-center overflow-hidden"
                aria-label={`Foto ${i + 1} de ${slides.length}: ${s.alt}`}
              >
                <picture>
                  <img
                    src={`${base}${s.wide}?v=2495`}
                    alt={s.alt}
                    width="1600"
                    height="640"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding={i === 0 ? "sync" : "async"}
                    className="w-full h-auto block scale-[1.06] md:scale-100"
                  />
                </picture>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => irPara(atual - 1)}
            aria-label="Foto anterior"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => irPara(atual + 1)}
            aria-label="Próxima foto"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
          >
            <ChevronRight size={22} />
          </button>

          <div className="flex justify-center gap-1 bg-white md:bg-transparent md:absolute md:bottom-1 md:inset-x-0">
            {slides.map((s, i) => (
              <button
                key={s.wide}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={atual === i}
                className="group flex h-8 items-center px-1"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all ${
                    atual === i ? "w-6 bg-ink md:bg-white" : "w-2.5 bg-ink/25 md:bg-white/50 group-hover:bg-ink/50 md:group-hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center md:rounded-b-md md:border md:border-t-0 md:border-beige bg-white px-4 pb-4 pt-1 md:p-4">
          {/* Os botões acompanham o slide: no primeiro (kit), vendem o kit. */}
          <a
            key={emKit ? "kit" : "mix"}
            href={emKit ? kit.paymentLink : mix.paymentLink}
            data-ipay={emKit ? kit.ipayCode : undefined}
            onClick={trackProductClick}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3.5 text-base font-bold text-white hover:bg-accent-dark transition-colors"
          >
            <ShoppingBag size={19} />
            {emKit ? `Comprar o kit por ${precoKit}` : `Comprar agora por ${preco}`}
          </a>
          <a
            href={`${base}${emKit ? "kit-rotina.html" : "mix-01.html"}`}
            className="inline-flex items-center justify-center rounded-md border border-beige-dark px-5 py-3.5 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            {emKit ? "Ver detalhes do kit" : "Ver detalhes do Mix-01"}
          </a>
        </div>
      </div>
    </section>
  );
}

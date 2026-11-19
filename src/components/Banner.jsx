import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VITRINE, formatPrice } from "../constants";
import { paginaDe } from "../detalhes";

const BF_FIM = new Date("2026-12-01T23:59:59-03:00").getTime();
const base = import.meta.env.BASE_URL;
const GHK = VITRINE.find((p) => p.ipayCode === "SELGHK");
const KITOL = VITRINE.find((p) => p.ipayCode === "SELKITOL");
const MENOR = Math.min(...VITRINE.map((p) => p.price));

// Banner rotativo da página inicial: três ofertas, troca sozinho a cada 6 s,
// pausa quando a pessoa interage, aceita deslizar no celular e as setas.
function slides() {
  const bf = Date.now() < BF_FIM;
  return [
    {
      id: "bf",
      selo: bf ? "Black Friday · frete grátis até 01/12" : "Frete grátis",
      titulo: "Skincare original, com frete grátis para todo o Brasil",
      texto: `Sérum, limpeza, hidratante e protetor solar a partir de ${formatPrice(MENOR)}. Com nota fiscal em todo pedido.`,
      foto: `${base}banners/hero-premium-mob.webp`,
      larga: true,
      href: "#ofertas",
      cta: "Ver ofertas",
      fundo: "bg-ink",
      claro: true,
    },
    {
      id: "ghk",
      selo: "Lançamento",
      titulo: "Sérum GHK-Cu Peptídeo de Cobre",
      texto: "O ativo do momento: peptídeo de cobre, colágeno e ácido hialurônico em 30 ml.",
      preco: GHK.price,
      foto: GHK.photo,
      href: paginaDe("SELGHK"),
      cta: "Conhecer o GHK-Cu",
      fundo: "bg-[#E7EEF2]",
    },
    {
      id: "kitol",
      selo: "Kit pele oleosa",
      titulo: "Kit Pele Oleosa",
      texto: "Sabonete de ácido salicílico + sérum de ácido hialurônico + protetor FPS 60, num pedido só.",
      preco: KITOL.price,
      de: KITOL.compareAtPrice,
      fotos: KITOL.photos,
      href: paginaDe("SELKITOL"),
      cta: "Ver o kit",
      fundo: "bg-offwhite",
    },
  ];
}

export default function Banner() {
  const lista = useRef(slides()).current;
  const [i, setI] = useState(0);
  const [pausa, setPausa] = useState(false);
  const toque = useRef(null);

  useEffect(() => {
    if (pausa || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % lista.length), 6000);
    return () => clearInterval(t);
  }, [pausa, lista.length]);

  const ir = (n) => {
    setPausa(true);
    setI((n + lista.length) % lista.length);
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      aria-roledescription="carrossel"
      aria-label="Ofertas em destaque"
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current == null) return;
        const dx = e.changedTouches[0].clientX - toque.current;
        if (Math.abs(dx) > 40) ir(i + (dx < 0 ? 1 : -1));
        toque.current = null;
      }}
    >
      <h1 className="sr-only">Selune Oficial: loja online de skincare original, com nota fiscal e frete grátis</h1>
      <div className="flex transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${i * 100}%)` }}>
        {lista.map((s, n) => (
          <div
            key={s.id}
            className={`w-full shrink-0 ${s.fundo}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${n + 1} de ${lista.length}: ${s.titulo}`}
            aria-hidden={n !== i}
          >
            <div className="mx-auto grid max-w-6xl items-center gap-2 px-5 pt-6 pb-12 md:grid-cols-2 md:gap-10 md:px-6 md:py-14">
              <a href={s.href} tabIndex={n === i ? 0 : -1} className="order-1 md:order-2 mx-auto block w-[62%] max-w-[300px] md:w-full md:max-w-[420px]" aria-hidden="true">
                {s.fotos ? (
                  <span className="grid aspect-square w-full grid-cols-3 items-center gap-1 rounded-[28px] bg-white p-3 shadow-[0_24px_60px_-30px_rgba(0,0,0,.45)]">
                    {s.fotos.map((f) => (
                      <img key={f} src={f} alt="" width="300" height="300" loading="lazy" className="w-full h-auto scale-125" />
                    ))}
                  </span>
                ) : (
                  <img src={s.foto} alt="" width="600" height={s.larga ? 450 : 600} fetchpriority={n === 0 ? "high" : "auto"} loading={n === 0 ? "eager" : "lazy"} className={`w-full rounded-[28px] bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,.45)] ${s.larga ? "aspect-[4/3] object-cover" : "aspect-square object-contain p-3"}`} />
                )}
              </a>
              <div className={`order-2 md:order-1 text-center md:text-left ${s.claro ? "text-cream" : "text-ink"}`}>
                <p className={`inline-block rounded-full px-3 py-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] ${s.claro ? "bg-cream text-ink" : "bg-ink text-cream"}`}>{s.selo}</p>
                <h2 className="mt-3 font-display text-[30px] leading-[1.05] md:text-5xl [text-wrap:balance]">{s.titulo}</h2>
                <p className={`mx-auto md:mx-0 mt-2 max-w-md text-sm md:text-lg leading-relaxed ${s.claro ? "text-cream/80" : "text-ink-soft"}`}>{s.texto}</p>
                {s.preco && <p className="mt-3 flex items-baseline justify-center md:justify-start gap-2">
                  <span className="text-3xl md:text-4xl font-bold">{formatPrice(s.preco)}</span>
                  {s.de && <span className={`text-sm line-through ${s.claro ? "text-cream/60" : "text-ink-soft"}`}>{formatPrice(s.de)}</span>}
                </p>}
                <p className={`mt-1 text-xs ${s.claro ? "text-cream/70" : "text-ink-soft"}`}>Frete grátis · 5% off no Pix</p>
                <a
                  href={s.href}
                  tabIndex={n === i ? 0 : -1}
                  className={`mt-5 inline-flex min-h-13 w-full sm:w-auto items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
                    s.claro ? "bg-cream text-ink hover:bg-white" : "bg-accent text-white hover:bg-accent-dark"
                  }`}
                >
                  {s.cta}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => ir(i - 1)} aria-label="Oferta anterior" className="absolute left-3 top-1/2 hidden -translate-y-1/2 md:inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow">
        <ChevronLeft size={22} />
      </button>
      <button type="button" onClick={() => ir(i + 1)} aria-label="Próxima oferta" className="absolute right-3 top-1/2 hidden -translate-y-1/2 md:inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow">
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {lista.map((s, n) => (
          <button
            key={s.id}
            type="button"
            onClick={() => ir(n)}
            aria-label={`Ver oferta ${n + 1}: ${s.titulo}`}
            aria-current={n === i}
            className={`h-2.5 rounded-full transition-all ${n === i ? "w-7 bg-gold" : "w-2.5 bg-ink-soft/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

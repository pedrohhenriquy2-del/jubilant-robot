import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Lock, Truck, Receipt, ShieldCheck, RotateCcw, Check, ChevronDown, MessageCircle } from "lucide-react";
import { VITRINE, formatPrice, trackProductClick, buildWhatsAppLink, trackWhatsAppClick } from "../constants";
import { DETALHES, paginaDe } from "../detalhes";
import { adicionar } from "../cart";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import ProductCard from "./ProductCard";

function Pergunta({ q, a, aberta }) {
  return (
    <details className="group border-b border-beige" open={aberta}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-ink [&::-webkit-details-marker]:hidden">
        {q}
        <ChevronDown size={18} className="shrink-0 text-gold transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <p className="pb-4 text-sm leading-relaxed text-ink-soft">{a}</p>
    </details>
  );
}

export default function ProductPage({ codigo }) {
  const p = VITRINE.find((x) => x.ipayCode === codigo);
  const d = DETALHES[codigo];
  const fotos = p.photos || [p.photo];
  const [foto, setFoto] = useState(0);
  const [barra, setBarra] = useState(false);
  const botoes = useRef(null);
  const kit = d.kit && VITRINE.find((x) => x.ipayCode === d.kit);
  const relacionados = d.combina.map((c) => VITRINE.find((x) => x.ipayCode === c)).filter(Boolean);
  const incluso = (d.incluso || []).map((c) => VITRINE.find((x) => x.ipayCode === c)).filter(Boolean);

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "ViewContent", { content_name: p.name, content_ids: [String(p.id)], content_type: "product", value: p.price, currency: "BRL" });
    }
    const el = botoes.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const o = new IntersectionObserver(([e]) => setBarra(!e.isIntersecting && e.boundingClientRect.top < 0));
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const comprar = (
    <a
      href={p.paymentLink}
      data-ipay={p.ipayCode}
      onClick={trackProductClick}
      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-accent bg-white px-6 text-sm font-semibold uppercase tracking-[0.12em] text-accent hover:bg-offwhite transition-colors"
    >
      <Lock size={16} aria-hidden="true" /> Comprar agora
    </a>
  );

  return (
    <>
      <Header naLoja={false} />
      <main className="bg-cream pb-24 md:pb-0">
        <nav className="mx-auto max-w-6xl px-4 pt-4 text-xs text-ink-soft md:px-6" aria-label="Você está em">
          <a href={import.meta.env.BASE_URL} className="hover:text-ink">Início</a>
          <span className="mx-1.5">/</span>
          <a href={`${import.meta.env.BASE_URL}#${p.category === "Kits" ? "kits" : "produtos"}`} className="hover:text-ink">{p.category === "Kits" ? "Kits" : p.category}</a>
          <span className="mx-1.5">/</span>
          <span className="text-ink">{p.shortName}</span>
        </nav>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 pt-4 md:grid-cols-2 md:gap-12 md:px-6 md:pt-8">
          <div className="md:sticky md:top-24 md:self-start">
            <div className="overflow-hidden rounded-3xl border border-beige bg-white">
              <img src={fotos[foto]} alt={p.name} width="800" height="800" fetchpriority="high" className="aspect-square w-full object-contain" />
            </div>
            {fotos.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {fotos.map((f, i) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFoto(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={foto === i}
                    className={`overflow-hidden rounded-xl border bg-white ${foto === i ? "border-ink" : "border-beige"}`}
                  >
                    <img src={f} alt="" width="160" height="160" loading="lazy" className="aspect-square w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{p.brand === "Selune" ? "Kit Selune" : p.brand}</p>
            <h1 className="mt-2 font-display text-[34px] leading-[1.05] text-ink md:text-5xl [text-wrap:balance]">{p.shortName}</h1>
            <p className="mt-2 text-base text-ink md:text-lg">{d.titulo}</p>
            <p className="mt-1 text-sm text-ink-soft">{p.tagline}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-ink">{formatPrice(p.price)}</span>
              {p.compareAtPrice && <span className="text-base text-ink-soft line-through">{formatPrice(p.compareAtPrice)}</span>}
            </div>
            {p.compareAtPrice ? (
              <p className="mt-1 text-sm font-semibold text-gold">
                Você economiza {formatPrice(p.compareAtPrice - p.price)} em relação a comprar os 3 separados
              </p>
            ) : null}
            <p className="mt-1 text-sm text-ink-soft">No Pix ou no cartão · frete grátis para todo o Brasil</p>

            <div ref={botoes} className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => adicionar(p.ipayCode)}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-16px_rgba(74,52,38,.9)] hover:bg-accent-dark transition-colors"
              >
                <ShoppingBag size={17} aria-hidden="true" /> Adicionar ao carrinho
              </button>
              {comprar}
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-2 text-xs text-ink">
              {[
                [ShieldCheck, "Original e lacrado"],
                [Receipt, "Nota fiscal"],
                [Truck, "Frete grátis · 3 a 7 dias úteis"],
                [RotateCcw, "7 dias para desistir"],
              ].map(([I, t]) => (
                <li key={t} className="flex items-center gap-2 rounded-xl bg-offwhite px-3 py-2.5">
                  <I size={16} className="shrink-0 text-gold" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">{d.resumo}</p>

            {incluso.length > 0 && (
              <div className="mt-6">
                <h2 className="font-display text-2xl text-ink">O que vem no kit</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {incluso.map((x) => (
                    <li key={x.id}>
                      <a href={paginaDe(x.ipayCode)} className="flex items-center gap-3 rounded-2xl border border-beige bg-white p-2 pr-4 hover:border-beige-dark">
                        <img src={x.photo} alt="" width="56" height="56" className="h-14 w-14 rounded-xl object-contain" />
                        <span className="min-w-0 flex-1 text-sm font-medium text-ink">{x.shortName}<span className="block text-xs font-normal text-ink-soft">{x.tagline}</span></span>
                        <span className="text-xs text-ink-soft line-through">{formatPrice(x.price)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 rounded-3xl border border-gold-light bg-white p-5 md:p-6">
              <h2 className="font-display text-2xl text-ink">Segundo a embalagem</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {d.embalagem.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-ink">
                    <Check size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink-soft">Informações impressas pelo fabricante. A Selune revende o produto e não altera a fórmula.</p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl text-ink">Ingredientes em destaque</h2>
                <p className="mt-2 text-sm text-ink-soft">{d.composicao}</p>
                <p className="mt-1 text-xs text-ink-soft">A lista completa de ingredientes está no rótulo.</p>
              </div>
              <div>
                <h2 className="font-display text-2xl text-ink">Características</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {d.caracteristicas.map((c) => (
                    <li key={c} className="rounded-full border border-beige-dark px-3 py-1 text-xs text-ink">{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-display text-2xl text-ink">Como usar</h2>
              <ol className="mt-3 flex flex-col gap-3">
                {d.uso.map((u, i) => (
                  <li key={u} className="flex gap-3 text-sm text-ink">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-offwhite font-display text-base text-gold">{i + 1}</span>
                    <span className="pt-1">{u}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-ink-soft">
                {d.indicacao} Faça um teste numa pequena área da pele antes do primeiro uso. Em caso de irritação, suspenda e procure um dermatologista.
              </p>
            </div>
          </div>
        </section>

        {kit && (
          <section className="mx-auto mt-14 max-w-6xl px-4 md:px-6">
            <div className="grid items-center gap-5 rounded-3xl bg-offwhite p-5 md:grid-cols-[1fr_1.2fr] md:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Leve a rotina completa</p>
                <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">{kit.shortName}</h2>
                <p className="mt-2 text-sm text-ink-soft">{kit.description}</p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  {formatPrice(kit.price)} <span className="font-normal text-ink-soft line-through">{formatPrice(kit.compareAtPrice)}</span>
                  <span className="block text-gold">Economia de {formatPrice(kit.compareAtPrice - kit.price)} sobre os 3 separados</span>
                </p>
              </div>
              <div className="max-w-sm md:justify-self-end">
                <ProductCard p={kit} compacto />
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto mt-14 max-w-6xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl text-ink md:text-4xl">Combina com</h2>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 md:gap-6">
            {relacionados.map((x) => (
              <ProductCard key={x.id} p={x} compacto />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 grid max-w-6xl gap-10 px-4 pb-16 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-display text-3xl text-ink">Dúvidas sobre este produto</h2>
            <div className="mt-3">
              <Pergunta aberta q="É original?" a="Sim. Compramos de distribuidor com nota fiscal e enviamos lacrado, na embalagem do fabricante, com nota fiscal eletrônica no seu nome." />
              <Pergunta q="Serve para a minha pele?" a={`${d.indicacao} Se tiver alguma condição de pele ou dúvida, fale com seu dermatologista ou chame a gente no WhatsApp antes de comprar.`} />
              <Pergunta q="Quando chega?" a="O frete é grátis para todo o Brasil e o prazo é de 3 a 7 dias úteis. O código de rastreio chega pelo WhatsApp." />
              <Pergunta q="Como pago?" a="Pix ou cartão de crédito, no checkout seguro da InfinitePay. Não precisa criar conta." />
              <Pergunta q="Posso devolver?" a="Sim. Você tem 7 dias depois de receber para desistir da compra. É só chamar no WhatsApp." />
            </div>
          </div>
          <div className="rounded-3xl border border-beige bg-white p-6 md:p-8">
            <h2 className="font-display text-3xl text-ink">Envio e devolução</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
              <li className="flex gap-2.5"><Truck size={18} className="shrink-0 text-gold" aria-hidden="true" /> Frete grátis para todo o Brasil, prazo de 3 a 7 dias úteis.</li>
              <li className="flex gap-2.5"><Receipt size={18} className="shrink-0 text-gold" aria-hidden="true" /> Nota fiscal eletrônica em todo pedido.</li>
              <li className="flex gap-2.5"><RotateCcw size={18} className="shrink-0 text-gold" aria-hidden="true" /> 7 dias para desistir após o recebimento. Produto com defeito ou avaria: trocamos.</li>
            </ul>
            <a href={`${import.meta.env.BASE_URL}politicas.html#trocas`} className="mt-4 inline-block text-sm font-medium text-ink underline underline-offset-4 decoration-gold">Ler a política completa</a>
            <a
              href={buildWhatsAppLink(`Olá! Tenho uma dúvida sobre ${p.shortName}.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink text-sm font-semibold text-ink"
            >
              <MessageCircle size={17} aria-hidden="true" /> Tirar dúvida no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-beige bg-cream/95 px-4 pt-3 backdrop-blur transition-transform duration-300 md:hidden ${barra ? "translate-y-0" : "translate-y-full"}`}
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-ink-soft">{p.shortName}</p>
            <p className="text-lg font-bold text-ink">{formatPrice(p.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => adicionar(p.ipayCode)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white"
          >
            <ShoppingBag size={16} aria-hidden="true" /> Adicionar
          </button>
        </div>
      </div>

      <Footer naLoja={false} />
      <CartDrawer />
    </>
  );
}

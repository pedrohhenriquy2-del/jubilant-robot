import { useCallback, useEffect, useState } from "react";
import { Menu, X, ShoppingBag, MessageCircle, Search } from "lucide-react";
import { BRAND, LOGO_WORDMARK, NAV_LINKS, WHATSAPP_LINK, trackWhatsAppClick } from "../constants";
import { useCarrinho, abrirCarrinho } from "../cart";
import { CATEGORIAS, NECESSIDADES, filtrar } from "../loja";
import Busca from "./Busca";

import { porFase } from "../oferta";

// Frases que passam na faixa do topo (letreiro): mudam sozinhas na Black Friday, no Natal e depois.
const FAIXA_BF = [
  "Black Friday da Selune",
  "Frete grátis para todo o Brasil",
  "Kit Rosa Mosqueta por R$ 59,90",
  "5% off no Pix",
  "Nota fiscal em todo pedido",
];
const FAIXA_NATAL = [
  "Peça até 14/12 e receba antes do Natal",
  "Frete grátis para todo o Brasil",
  "Kit Rosa Mosqueta: presente pronto",
  "5% off no Pix",
  "Nota fiscal em todo pedido",
];
const FAIXA = ["Frete grátis para todo o Brasil", "5% off no Pix", "Nota fiscal em todo pedido", "7 dias para desistir"];

// Barra superior + cabeçalho. No celular: menu à esquerda, logo no centro, sacola à direita.
export default function Header({ naLoja = true }) {
  const [menu, setMenu] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [busca, setBusca] = useState(false);
  const { qtd } = useCarrinho();
  const base = import.meta.env.BASE_URL;
  const link = (h) => (naLoja ? h : `${base}${h}`);
  const frases = porFase({ bf: FAIXA_BF, natal: FAIXA_NATAL, normal: FAIXA });
  const fecharBusca = useCallback(() => setBusca(false), []);

  useEffect(() => {
    const f = () => setRolou(window.scrollY > 12);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <a
        href={link("#ofertas")}
        className="faixa-topo group block overflow-hidden bg-accent py-2 text-[11px] md:text-xs font-medium uppercase tracking-[0.16em] text-cream"
        aria-label={frases.join(" · ")}
      >
        <span className="faixa-trilho flex w-max" aria-hidden="true">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0 items-center">
              {[...frases, ...frases].map((f, j) => (
                <span key={j} className="flex items-center whitespace-nowrap">
                  <span className="px-4 md:px-6">{f}</span>
                  <span className="text-gold-light">✦</span>
                </span>
              ))}
            </span>
          ))}
        </span>
      </a>
      <header
        className={`sticky top-0 z-50 border-b border-beige bg-cream/95 backdrop-blur transition-shadow ${rolou ? "shadow-[0_6px_24px_-18px_rgba(62,18,34,.6)]" : ""}`}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center">
            <button
              type="button"
              aria-label={menu ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menu}
              className="-ml-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Menu principal">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={link(l.href)} className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft hover:text-ink transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <a href={naLoja ? "#inicio" : base} className="justify-self-center" aria-label={`${BRAND.name}, página inicial`}>
            <img src={LOGO_WORDMARK} alt={BRAND.name} width="140" height="40" className="h-9 md:h-10 w-auto" />
          </a>

          <div className="flex items-center justify-end gap-0.5 md:gap-3">
            <button
              type="button"
              onClick={() => setBusca(true)}
              aria-label="Buscar produtos"
              className="inline-flex h-11 w-11 items-center justify-center text-ink md:w-auto md:gap-2 md:rounded-full md:border md:border-beige-dark md:px-4 md:text-sm md:font-medium md:hover:border-ink"
            >
              <Search size={21} aria-hidden="true" /> <span className="hidden md:inline">Buscar</span>
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              aria-label="Falar no WhatsApp"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-beige-dark px-4 py-2 text-sm font-medium text-ink hover:border-ink transition-colors"
            >
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp
            </a>
            <button
              type="button"
              onClick={() => abrirCarrinho(true)}
              aria-label={`Abrir carrinho, ${qtd} ${qtd === 1 ? "item" : "itens"}`}
              className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center text-ink"
            >
              <ShoppingBag size={23} />
              {qtd > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-white">
                  {qtd}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav
          aria-label="Categorias"
          className="border-t border-beige/70"
        >
          <ul className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 py-2 md:justify-center md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <li className="shrink-0">
              <a href={link("#ofertas")} className="inline-flex min-h-9 items-center rounded-full bg-ink px-3.5 text-[13px] font-semibold text-cream">
                Ofertas
              </a>
            </li>
            {[...CATEGORIAS.filter((c) => c.id !== "Todos"), ...NECESSIDADES.map((n) => ({ id: n.id, rotulo: n.curto }))].map((c) => (
              <li key={c.id} className="shrink-0">
                {naLoja ? (
                  <button
                    type="button"
                    onClick={() => filtrar(c.id)}
                    className="inline-flex min-h-9 items-center rounded-full px-3.5 text-[13px] font-medium text-ink hover:bg-offwhite"
                  >
                    {c.rotulo}
                  </button>
                ) : (
                  <a href={`${base}#produtos`} className="inline-flex min-h-9 items-center rounded-full px-3.5 text-[13px] font-medium text-ink hover:bg-offwhite">
                    {c.rotulo}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {menu && (
          <nav className="lg:hidden border-t border-beige bg-cream px-4 pb-4" aria-label="Menu">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={link(l.href)}
                onClick={() => setMenu(false)}
                className="block border-b border-beige py-3.5 font-display text-xl text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink text-sm font-semibold text-ink"
            >
              <MessageCircle size={17} aria-hidden="true" /> Falar no WhatsApp
            </a>
          </nav>
        )}
      </header>
      <Busca aberta={busca} fechar={fecharBusca} naLoja={naLoja} />
    </>
  );
}

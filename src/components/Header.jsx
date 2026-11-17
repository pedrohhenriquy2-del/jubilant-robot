import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";
import { BRAND, LOGO_WORDMARK, NAV_LINKS, WHATSAPP_LINK, trackWhatsAppClick } from "../constants";
import { useCarrinho, abrirCarrinho } from "../cart";

// Barra superior + cabeçalho. No celular: menu à esquerda, logo no centro, sacola à direita.
export default function Header({ naLoja = true }) {
  const [menu, setMenu] = useState(false);
  const [rolou, setRolou] = useState(false);
  const { qtd } = useCarrinho();
  const base = import.meta.env.BASE_URL;
  const link = (h) => (naLoja ? h : `${base}${h}`);

  useEffect(() => {
    const f = () => setRolou(window.scrollY > 12);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      <a
        href={link("#produtos")}
        className="block bg-accent px-4 py-2 text-center text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] text-cream"
      >
        Frete grátis para todo o Brasil · Pix ou cartão · Nota fiscal
      </a>
      <header
        className={`sticky top-0 z-50 border-b border-beige bg-cream/95 backdrop-blur transition-shadow ${rolou ? "shadow-[0_6px_24px_-18px_rgba(74,52,38,.6)]" : ""}`}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center">
            <button
              type="button"
              aria-label={menu ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menu}
              className="-ml-2 inline-flex h-11 w-11 items-center justify-center text-ink md:hidden"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <nav className="hidden md:flex items-center gap-7" aria-label="Menu principal">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={link(l.href)} className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-soft hover:text-ink transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <a href={naLoja ? "#inicio" : base} className="justify-self-center" aria-label={`${BRAND.name}, página inicial`}>
            <img src={LOGO_WORDMARK} alt={BRAND.name} width="140" height="40" className="h-9 md:h-10 w-auto" />
          </a>

          <div className="flex items-center justify-end gap-1 md:gap-3">
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

        {menu && (
          <nav className="md:hidden border-t border-beige bg-cream px-4 pb-4" aria-label="Menu">
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
    </>
  );
}

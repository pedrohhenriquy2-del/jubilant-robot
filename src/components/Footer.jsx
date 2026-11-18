import { MessageCircle } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import {
  BRAND,
  LOGO_WORDMARK_WHITE,
  FOOTER_LINKS,
  CONTACT,
  LEGAL,
  WHATSAPP_LINK,
  trackWhatsAppClick,
} from "../constants";

export default function Footer({ naLoja = true }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2F2018] text-cream/80 pt-14 pb-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center text-center md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={LOGO_WORDMARK_WHITE}
              alt={BRAND.name}
              loading="lazy"
              className="h-11 w-auto"
            />
            <p className="text-sm text-cream/60 mt-1">{BRAND.tagline}</p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={naLoja ? link.href : `${import.meta.env.BASE_URL}${link.href}`}
              className="text-sm text-cream/70 hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="h-10 w-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            aria-label="WhatsApp"
            className="h-10 w-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>

      <ul className="mx-auto max-w-6xl px-6 mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-cream/80">
        <li>Nota fiscal eletrônica em todo pedido</li>
        <li>Produtos originais, comprados de distribuidor com nota fiscal</li>
        {/* Quando cada marca for conferida em consultas.anvisa.gov.br, dá para trocar por "regularizados na ANVISA". */}
        <li>ANVISA: peça no WhatsApp o número de notificação de qualquer produto</li>
        <li>Pagamento seguro por cartão ou boleto</li>
        <li>7 dias para desistir</li>
      </ul>

      <div className="mx-auto max-w-6xl px-6 mt-6 pt-6 border-t border-cream/10 text-center space-y-3">
        <p className="text-xs text-cream/70 max-w-2xl mx-auto">{LEGAL.about}</p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {LEGAL.policies.map((l) => (
            <a key={l.href} href={l.href} className="inline-block py-2 text-xs text-cream/70 underline hover:text-cream">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-cream/50">
          © {year} {BRAND.name} · CNPJ {LEGAL.cnpj} · WhatsApp {CONTACT.whatsappDisplay}
        </p>
      </div>
    </footer>
  );
}

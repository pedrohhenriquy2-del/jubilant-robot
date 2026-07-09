import { MessageCircle } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { BRAND, FOOTER_LINKS, CONTACT, WHATSAPP_LINK } from "../constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/80 py-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-display text-xl text-cream">{BRAND.name}</p>
          <p className="text-sm text-cream/60 mt-1">{BRAND.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
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
            aria-label="WhatsApp"
            className="h-10 w-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-8 pt-6 border-t border-cream/10">
        <p className="text-xs text-cream/50">
          © {year} {BRAND.name}. Todos os direitos reservados. Unaí, MG.
        </p>
      </div>
    </footer>
  );
}

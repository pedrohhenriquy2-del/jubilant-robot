import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK, trackWhatsAppClick } from "../constants";

// Chamada para a cliente pedir orientação antes de comprar.
export default function Guidance() {
  return (
    <section id="orientacao" className="bg-white border-y border-beige">
      <div className="mx-auto max-w-4xl px-4 md:px-6 py-8 md:py-10 flex flex-col md:flex-row items-center gap-5 md:gap-8 text-center md:text-left">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-ink">
            Não sabe o que escolher? Fale com a gente!
          </h2>
          <p className="mt-2 text-sm md:text-base text-ink-soft leading-relaxed">
            Conte como é a sua pele e o que te incomoda. A gente indica o produto que faz sentido para você, sem empurrar o que você não precisa.
          </p>
        </div>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppClick}
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-md bg-[#1F8F4E] px-6 py-3.5 text-base font-bold text-white hover:bg-[#187540] transition-colors"
        >
          <MessageCircle size={20} />
          Pedir orientação no WhatsApp
        </a>
      </div>
    </section>
  );
}

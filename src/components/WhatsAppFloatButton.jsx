import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK, trackWhatsAppClick } from "../constants";

// `esconderEm`: seletor de uma seção onde o botão some no celular,
// para não ficar por cima dos botões "Comprar" dos produtos.
export default function WhatsAppFloatButton({ esconderEm }) {
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    if (!esconderEm || typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const alvo = document.querySelector(esconderEm);
    if (!alvo) return;
    const celular = window.matchMedia("(max-width: 767px)");
    const obs = new IntersectionObserver(
      ([e]) => setOculto(celular.matches && e.isIntersecting),
      { rootMargin: "0px 0px -15% 0px" }
    );
    obs.observe(alvo);
    return () => obs.disconnect();
  }, [esconderEm]);

  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      aria-label="Falar no WhatsApp"
      aria-hidden={oculto || undefined}
      tabIndex={oculto ? -1 : undefined}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={oculto ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
      transition={{ delay: oculto ? 0 : 0.8, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ pointerEvents: oculto ? "none" : undefined }}
      className="fixed bottom-6 right-6 z-50 flex h-14 items-center justify-center gap-2 rounded-full bg-nude-dark px-4 text-cream shadow-xl hover:bg-gold transition-colors md:pl-4 md:pr-5"
    >
      <MessageCircle size={26} className="shrink-0" />
      <span className="hidden md:inline text-sm font-medium whitespace-nowrap">
        Fale conosco
      </span>
    </motion.a>
  );
}

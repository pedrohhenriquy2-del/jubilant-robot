import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK, trackWhatsAppClick } from "../constants";

export default function WhatsAppFloatButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      aria-label="Falar no WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 items-center justify-center gap-2 rounded-full bg-nude-dark px-4 text-cream shadow-xl hover:bg-gold transition-colors md:pl-4 md:pr-5"
    >
      <MessageCircle size={26} className="shrink-0" />
      <span className="hidden md:inline text-sm font-medium whitespace-nowrap">
        Fale conosco
      </span>
    </motion.a>
  );
}

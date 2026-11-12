import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK, trackWhatsAppClick } from "../constants";

export default function Contact() {
  return (
    <section id="contato" className="py-10 md:py-16 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-ink text-cream px-6 py-10 md:px-16 md:py-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Na dúvida sobre qual escolher?
          </h2>
          <p className="text-cream/70 max-w-md mx-auto mb-6">
            Chame no WhatsApp e indicamos o produto certo para a sua pele.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center gap-2 rounded-full bg-gold-light px-8 py-4 text-ink font-medium hover:bg-cream transition-colors"
          >
            <MessageCircle size={20} />
            Fale agora no WhatsApp
          </a>
        </motion.div>


      </div>
    </section>
  );
}

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
            Fale com uma pessoa de verdade antes de comprar
          </h2>
          <p className="text-cream/70 max-w-md mx-auto mb-6">
            Tire suas dúvidas sobre os produtos, o envio ou o pagamento. A gente responde pelo WhatsApp <span className="whitespace-nowrap">(38) 99965-9366</span>.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F8F4E] px-8 py-4 text-white text-lg font-bold hover:bg-[#187540] transition-colors"
          >
            <MessageCircle size={20} />
            Chamar no WhatsApp
          </a>
        </motion.div>


      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { CONTACT, WHATSAPP_LINK, trackWhatsAppClick } from "../constants";

export default function Contact() {
  return (
    <section id="contato" className="py-20 md:py-28 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] bg-ink text-cream px-8 py-14 md:px-16 md:py-16 text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Está pronta para dar esse cuidado à sua pele?
          </h2>
          <p className="text-cream/70 max-w-lg mx-auto mb-8">
            Fale agora com a gente e agende sua sessão de limpeza de pele em
            Unaí-MG. Vagas limitadas por semana para garantir atendimento
            individualizado.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="inline-flex items-center gap-2 rounded-full bg-gold-light px-8 py-4 text-ink font-medium hover:bg-gold transition-colors"
          >
            <MessageCircle size={20} />
            Fale agora no WhatsApp
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center flex flex-col items-center"
          >
            <div className="flex flex-col items-center gap-2">
              <MapPin size={22} className="text-nude-dark shrink-0" />
              <div>
                <p className="font-medium text-ink">Endereço</p>
                <p className="text-ink-soft">{CONTACT.address}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Clock size={22} className="text-nude-dark shrink-0" />
              <div>
                <p className="font-medium text-ink">Horário de atendimento</p>
                {CONTACT.hours.map((h) => (
                  <p key={h.day} className="text-ink-soft">
                    {h.day}: {h.time}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <InstagramIcon size={22} className="text-nude-dark shrink-0" />
              <div>
                <p className="font-medium text-ink">Redes sociais</p>
                <div className="flex justify-center gap-4 mt-1">
                  {/* TROCAR: link real do Instagram em constants.js */}
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-soft hover:text-nude-dark transition-colors"
                  >
                    {CONTACT.instagramHandle}
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsAppClick}
                    className="text-ink-soft hover:text-nude-dark transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-beige aspect-[4/3]"
          >
            {/* TROCAR: mapsEmbedSrc em constants.js pelas coordenadas reais */}
            <iframe
              title="Localização da Selune Oficial em Unaí-MG"
              src={CONTACT.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

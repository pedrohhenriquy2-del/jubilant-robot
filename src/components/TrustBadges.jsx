import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, GraduationCap, HeartHandshake } from "lucide-react";
import { SAFETY_BADGES } from "../constants";

const ICONS = { ShieldCheck, BadgeCheck, GraduationCap, HeartHandshake };

export default function TrustBadges() {
  return (
    <section className="py-16 md:py-20 bg-cream border-y border-beige">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            Compromisso
          </span>
          <h2 className="text-3xl md:text-4xl text-ink font-semibold">
            Segurança e qualidade em cada detalhe
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_BADGES.map((badge, i) => {
            const Icon = ICONS[badge.icon];
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
                className="rounded-2xl bg-offwhite border border-beige p-6 text-center flex flex-col items-center"
              >
                <div className="h-11 w-11 rounded-full bg-beige flex items-center justify-center mb-4">
                  <Icon size={20} className="text-nude-dark" />
                </div>
                <h3 className="text-sm font-medium text-ink mb-2">
                  {badge.title}
                </h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

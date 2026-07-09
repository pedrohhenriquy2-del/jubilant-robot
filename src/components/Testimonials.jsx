import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../constants";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl text-ink font-semibold">
            Quem já viveu a experiência Selune
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="rounded-2xl bg-cream p-7 border border-beige"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="text-ink-soft leading-relaxed mb-5">
                "{t.text}"
              </p>
              <span className="text-sm font-medium text-ink">
                {t.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

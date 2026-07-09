import { motion } from "framer-motion";
import { Sparkles, Droplet, Leaf, Sun, Heart, ShieldCheck } from "lucide-react";
import { SERVICES } from "../constants";

const ICONS = { Sparkles, Droplet, Leaf, Sun, Heart, ShieldCheck };

export default function Services() {
  return (
    <section id="servicos" className="py-20 md:py-28 bg-offwhite">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            Serviços
          </span>
          <h2 className="text-3xl md:text-4xl text-ink font-semibold">
            Procedimentos feitos para a saúde da sua pele
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="rounded-2xl bg-cream p-7 border border-beige hover:border-nude/60 hover:shadow-lg transition-all"
              >
                <div className="h-11 w-11 rounded-full bg-beige flex items-center justify-center mb-5">
                  <Icon size={20} className="text-nude-dark" />
                </div>
                <h3 className="text-lg font-medium text-ink mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

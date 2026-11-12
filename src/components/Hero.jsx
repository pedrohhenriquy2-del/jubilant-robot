import { motion } from "framer-motion";
import { Sparkles, Heart, ShoppingBag } from "lucide-react";
import { TRUST_BADGE } from "../constants";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative pt-8 pb-8 md:pt-16 md:pb-20 bg-gradient-to-b from-offwhite to-cream overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-beige/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            <Sparkles size={13} />
            Loja de skincare · Produtos Principia
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-ink font-semibold">
            Oleosidade, cravos e poros dilatados?{" "}
            <span className="text-nude-dark italic">Isso tem solução.</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-ink-soft max-w-md">
            Skincare Principia original, com nota fiscal e frete grátis para
            todo o Brasil. Monte sua rotina em casa, sem complicação.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#produtos"
              className="inline-flex items-center gap-2 rounded-full bg-nude-dark px-7 py-3.5 text-sm font-medium text-cream hover:bg-gold transition-colors shadow-lg shadow-nude/20"
            >
              <ShoppingBag size={17} />
              Ver produtos
            </a>
            <div className="hidden md:inline-flex items-center gap-2 rounded-full bg-beige/60 px-4 py-2">
              <Heart size={15} className="text-nude-dark" />
              <span className="text-xs md:text-sm text-ink-soft font-medium">
                {TRUST_BADGE}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden md:block"
        >
          <div className="aspect-[4/5] w-full rounded-[2rem] bg-white border border-beige flex items-center justify-center shadow-lg shadow-ink/5 overflow-hidden p-3">
            <img
              src={`${import.meta.env.BASE_URL}hero-produto.webp`}
              alt="Principia Sérum Mix-01"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-2xl bg-offwhite -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

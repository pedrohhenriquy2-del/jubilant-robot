import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { TRUST_BADGE } from "../constants";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-offwhite to-cream overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left flex flex-col items-center md:items-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-beige/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-5">
            <Sparkles size={13} />
            Estética facial
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ink font-semibold">
            Sua pele merece cuidado, leveza e{" "}
            <span className="text-nude-dark italic">renovação de verdade</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-ink-soft max-w-md">
            Na nossa loja Selune Oficial, cada sessão de limpeza de pele é pensada para
            devolver o equilíbrio, o viço e a saúde da sua pele — com técnica,
            cuidado e um espaço feito para o seu bem-estar.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-beige/60 px-4 py-2">
            <Heart size={15} className="text-nude-dark" />
            <span className="text-xs md:text-sm text-ink-soft font-medium">
              {TRUST_BADGE}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="aspect-[4/5] w-full rounded-[2rem] bg-gradient-to-br from-beige via-beige-dark to-nude/60 flex items-center justify-center shadow-xl overflow-hidden p-3">
            <video
              src={`${import.meta.env.BASE_URL}hero-produto-video.mp4`}
              poster={`${import.meta.env.BASE_URL}hero-produto.jpeg`}
              controls
              playsInline
              preload="metadata"
              className="max-w-full max-h-full rounded-2xl"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-2xl bg-gold-light/70 -z-10" />
        </motion.div>
      </div>
    </section>
  );
}

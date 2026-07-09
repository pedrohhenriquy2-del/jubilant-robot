import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "../constants";

export default function Gallery() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            Resultados
          </span>
          <h2 className="text-3xl md:text-4xl text-ink font-semibold">
            Ambiente e resultados que falam por si
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="aspect-square rounded-xl overflow-hidden bg-beige"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

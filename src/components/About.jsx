import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1 relative"
        >
          <div className="aspect-square w-full rounded-[2rem] overflow-hidden shadow-md">
            <img
              src={`${import.meta.env.BASE_URL}about-clinica.webp`}
              alt="Aplicação de tratamento facial profissional"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2 text-center flex flex-col items-center"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            Sobre a Selune
          </span>
          <h2 className="text-3xl md:text-4xl text-ink font-semibold mb-6">
            Cuidado facial pensado para você, no Brasil
          </h2>
          <p className="text-ink-soft leading-relaxed mb-4">
            A Selune Oficial nasceu para oferecer um cuidado facial próximo,
            acessível e de resultado real, com produtos Principia pensados
            para cada tipo de pele.
          </p>
          <p className="text-ink-soft leading-relaxed">
            Selecionamos cada fórmula com cuidado, unindo ativos eficazes a
            uma experiência de compra simples e transparente — para que você
            monte, em casa, a rotina de skincare ideal para a sua pele.
            Enviamos para todo o Brasil.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

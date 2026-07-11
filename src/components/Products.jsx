import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { PRODUCTS, trackProductClick } from "../constants";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Products() {
  return (
    <section id="produtos" className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            Produtos
          </span>
          <h2 className="text-3xl md:text-4xl text-ink font-semibold">
            Skincare para continuar o cuidado em casa
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="rounded-2xl bg-offwhite border border-beige overflow-hidden flex flex-col text-center items-center"
            >
              {product.photo ? (
                <div className="aspect-square w-full bg-white flex items-center justify-center p-6">
                  <img
                    src={product.photo}
                    alt={product.name}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                // TROCAR: substituir pelo placeholder pela foto real do produto
                <div className="aspect-square w-full bg-gradient-to-br from-beige to-beige-dark/70 flex items-center justify-center">
                  <span className="text-ink-soft/50 text-xs text-center px-6">
                    [ Foto do produto ]
                  </span>
                </div>
              )}
              <div className="p-6 flex flex-col items-center flex-1 w-full">
                <h3 className="text-base font-medium text-ink mb-2">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-ink-soft mb-4">
                    {product.description}
                  </p>
                )}
                {product.video && (
                  <video
                    src={product.video}
                    poster={product.photo}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-xl mb-5 max-h-72"
                  />
                )}
                <p className="text-lg font-semibold text-nude-dark mb-5 mt-auto">
                  {formatPrice(product.price)}
                </p>
                <a
                  href={product.salesPageUrl || product.paymentLink}
                  onClick={trackProductClick}
                  className="inline-flex items-center gap-2 rounded-full bg-nude-dark px-6 py-3 text-sm font-medium text-cream hover:bg-gold transition-colors"
                >
                  <ShoppingBag size={16} />
                  Comprar
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

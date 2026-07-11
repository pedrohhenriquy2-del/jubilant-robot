import { motion } from "framer-motion";
import { ShoppingBag, Check, MessageCircle } from "lucide-react";
import {
  BRAND,
  WHATSAPP_LINK,
  PRODUCTS,
  trackWhatsAppClick,
  trackProductClick,
} from "./constants";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

const product = PRODUCTS[0];

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const BENEFITS = [
  {
    title: "Niacinamida 5%",
    text: "Controla a oleosidade e ajuda a reduzir a aparência dos poros.",
  },
  {
    title: "Ácido Glicólico 4%",
    text: "Renova a textura da pele e traz mais viço e luminosidade.",
  },
  {
    title: "Ácido Tranexâmico 3%",
    text: "Ajuda a uniformizar o tom da pele e atenuar manchas.",
  },
  {
    title: "Ácido Salicílico 2%",
    text: "Atua na acne e ajuda a desobstruir os poros.",
  },
];

const FAQ = [
  {
    q: "Serve para qualquer tipo de pele?",
    a: "É indicado principalmente para peles oleosas, mistas e com tendência a acne, poros dilatados e textura irregular.",
  },
  {
    q: "Como devo usar?",
    a: "Aplique algumas gotas no rosto limpo, de preferência à noite. Comece com uso a cada dois dias para avaliar a sensibilidade da sua pele. Use protetor solar durante o dia.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "O pagamento é feito de forma segura pelo Mercado Pago, com cartão ou PIX.",
  },
  {
    q: "Tenho dúvidas antes de comprar, como falo com vocês?",
    a: "É só chamar no WhatsApp — respondemos rapidinho.",
  },
];

export default function ProductSalesPage() {
  return (
    <div className="bg-cream text-ink">
      <header className="border-b border-beige">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-xl text-ink">
            {BRAND.name}
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="text-sm text-ink-soft hover:text-nude-dark transition-colors"
          >
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-14 pb-10 md:pt-20 md:pb-14 text-center flex flex-col items-center"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
            Principia Skincare
          </span>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight max-w-2xl">
            {product.name}
          </h1>
          <p className="mt-5 text-ink-soft max-w-lg">
            {product.description}
          </p>

          <div className="mt-8 aspect-square w-full max-w-sm bg-white rounded-2xl shadow-md flex items-center justify-center p-8">
            <img
              src={product.photo}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <p className="mt-8 text-3xl font-semibold text-nude-dark">
            {formatPrice(product.price)}
          </p>
          <a
            href={product.paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackProductClick}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-nude-dark px-10 py-4 text-base font-medium text-cream hover:bg-gold transition-colors shadow-lg shadow-nude/20"
          >
            <ShoppingBag size={20} />
            Comprar agora
          </a>
          <p className="mt-3 text-xs text-ink-soft">
            Pagamento seguro via Mercado Pago — cartão ou PIX
          </p>
        </motion.section>

        {product.video && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="pb-16 flex flex-col items-center"
          >
            <video
              src={product.video}
              poster={product.photo}
              controls
              playsInline
              preload="metadata"
              className="w-full max-w-xs rounded-2xl shadow-md"
            />
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="pb-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            O que essa fórmula faz pela sua pele
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl bg-offwhite border border-beige p-6 flex gap-4"
              >
                <div className="h-9 w-9 rounded-full bg-beige flex items-center justify-center shrink-0">
                  <Check size={18} className="text-nude-dark" />
                </div>
                <div>
                  <p className="font-medium text-ink mb-1">{b.title}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="pb-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            Dúvidas frequentes
          </h2>
          <div className="text-left space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-beige pb-6">
                <p className="font-medium text-ink mb-2">{item.q}</p>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="pb-20"
        >
          <div className="rounded-[2rem] bg-ink text-cream px-8 py-14 text-center flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Pronta para cuidar da sua pele?
            </h2>
            <p className="text-cream/70 max-w-md mb-8">
              {formatPrice(product.price)} — pagamento seguro pelo Mercado Pago.
            </p>
            <a
              href={product.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackProductClick}
              className="inline-flex items-center gap-2 rounded-full bg-gold-light px-8 py-4 text-ink font-medium hover:bg-gold transition-colors"
            >
              <ShoppingBag size={20} />
              Comprar agora
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="mt-4 inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors"
            >
              <MessageCircle size={16} />
              Prefiro tirar dúvidas no WhatsApp antes
            </a>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-beige py-8 text-center">
        <p className="text-xs text-ink-soft">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos
          reservados.
        </p>
      </footer>

      <WhatsAppFloatButton />
    </div>
  );
}

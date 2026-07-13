import { motion } from "framer-motion";
import {
  ShoppingBag,
  Droplet,
  Sparkles,
  ShieldCheck,
  Sun,
  MessageCircle,
  Lock,
  CreditCard,
  QrCode,
  Barcode,
  BadgeCheck,
} from "lucide-react";
import {
  BRAND,
  LOGO,
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
    icon: Droplet,
    title: "Niacinamida 5%",
    text: "Controla a oleosidade e ajuda a reduzir a aparência dos poros.",
  },
  {
    icon: Sparkles,
    title: "Ácido Glicólico 4%",
    text: "Renova a textura da pele e traz mais viço e luminosidade.",
  },
  {
    icon: ShieldCheck,
    title: "Ácido Tranexâmico 3%",
    text: "Ajuda a uniformizar o tom da pele e atenuar manchas.",
  },
  {
    icon: Sun,
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
    a: "O pagamento é feito em ambiente seguro, com cartão, PIX ou boleto.",
  },
  {
    q: "Tenho dúvidas antes de comprar, como falo com vocês?",
    a: "É só chamar no WhatsApp — respondemos rapidinho.",
  },
];

function BuyButton({ className = "", children = "Comprar agora" }) {
  return (
    <a
      href={product.paymentLink}
      onClick={trackProductClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-nude-dark text-cream font-medium hover:bg-gold transition-colors shadow-lg shadow-nude/20 ${className}`}
    >
      <ShoppingBag size={20} />
      {children}
    </a>
  );
}

export default function ProductSalesPage() {
  return (
    <div className="bg-cream text-ink">
      <header className="border-b border-beige sticky top-0 z-40 bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src={LOGO}
              alt={BRAND.name}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-display text-xl text-ink hidden sm:inline">
              {BRAND.name}
            </span>
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

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-offwhite to-cream">
          <div className="mx-auto max-w-5xl px-6 py-14 md:py-20 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
                Principia Skincare
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                {product.name}
              </h1>
              <p className="mt-5 text-ink-soft max-w-md mx-auto md:mx-0">
                {product.description}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-beige/60 px-4 py-2">
                <Sparkles size={14} className="text-nude-dark" />
                <span className="text-xs text-ink-soft font-medium">
                  Novidade na Selune Oficial
                </span>
              </div>

              <p className="mt-8 text-3xl md:text-4xl font-semibold text-nude-dark">
                {formatPrice(product.price)}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center md:items-start gap-4">
                <BuyButton className="px-10 py-4 text-base w-full sm:w-auto" />
              </div>

              <div className="mt-5 flex items-center justify-center md:justify-start gap-2 text-ink-soft">
                <QrCode size={18} />
                <CreditCard size={18} />
                <Barcode size={18} />
                <span className="text-xs">Pix, cartão ou boleto</span>
              </div>

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Lock size={14} className="text-nude-dark" />
                  Ambiente seguro
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck size={14} className="text-nude-dark" />
                  Pagamento processado em ambiente seguro
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="aspect-square w-full rounded-[2rem] bg-gradient-to-br from-beige via-beige-dark to-nude/60 flex items-center justify-center shadow-xl overflow-hidden p-10">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-gold-light/70 -z-10" />
            </motion.div>
          </div>
        </section>

        {/* Video */}
        {product.video && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="py-16 md:py-20 bg-offwhite"
          >
            <div className="mx-auto max-w-5xl px-6 text-center">
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
                Veja de perto
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold mb-10">
                Conheça o Mix-01 em detalhes
              </h2>
              <div className="mx-auto max-w-xs rounded-2xl overflow-hidden shadow-xl border border-beige">
                <video
                  src={product.video}
                  poster={product.photo}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full block"
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-20 bg-cream"
        >
          <div className="mx-auto max-w-5xl px-6 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
              Fórmula
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">
              O que essa fórmula faz pela sua pele
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="rounded-2xl bg-offwhite border border-beige p-6 flex gap-4 hover:border-nude/60 hover:shadow-lg transition-all"
                  >
                    <div className="h-11 w-11 rounded-full bg-beige flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-nude-dark" />
                    </div>
                    <div>
                      <p className="font-medium text-ink mb-1">{b.title}</p>
                      <p className="text-sm text-ink-soft leading-relaxed">
                        {b.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-20 bg-offwhite"
        >
          <div className="mx-auto max-w-2xl px-6 text-center">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
              Dúvidas
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">
              Perguntas frequentes
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
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-20 bg-cream"
        >
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-[2rem] bg-ink text-cream px-8 py-14 text-center flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Pronta para cuidar da sua pele?
              </h2>
              <p className="text-cream/70 max-w-md mb-2">
                {formatPrice(product.price)} — pagamento em ambiente seguro.
              </p>
              <div className="flex items-center justify-center gap-2 text-cream/60 mb-6">
                <QrCode size={16} />
                <CreditCard size={16} />
                <Barcode size={16} />
                <span className="text-xs">Pix, cartão ou boleto</span>
              </div>
              <a
                href={product.paymentLink}
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
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-beige py-8 text-center pb-24 md:pb-8">
        <p className="text-xs text-ink-soft">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos
          reservados.
        </p>
      </footer>

      {/* Barra fixa de compra no mobile */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-cream/95 backdrop-blur border-t border-beige px-4 py-3 flex items-center justify-between gap-4">
        <span className="text-lg font-semibold text-nude-dark">
          {formatPrice(product.price)}
        </span>
        <BuyButton className="px-6 py-3 text-sm">Comprar</BuyButton>
      </div>

      {/* Escondido no mobile pra não sobrepor a barra fixa de compra */}
      <div className="hidden md:block">
        <WhatsAppFloatButton />
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Droplet,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
  MessageCircle,
  Lock,
  CreditCard,
  QrCode,
  Wallet,
  BadgeCheck,
  Truck,
  Gift,
} from "lucide-react";
import {
  BRAND,
  LEGAL,
  CONTACT,
  LOGO_WORDMARK,
  PRODUCTS,
  buildWhatsAppLink,
  trackWhatsAppClick,
  trackProductClick,
  formatPrice,
} from "./constants";
import WhatsAppFloatButton from "./components/WhatsAppFloatButton";

const ICONS = { Droplet, Sparkles, ShieldCheck, Sun, Moon };

function BuyButton({ product, className = "", children = "Comprar agora" }) {
  return (
    <a
      href={product.paymentLink}
      data-ipay={product.ipayCode}
      onClick={trackProductClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 ${className}`}
    >
      <ShoppingBag size={20} />
      {children}
    </a>
  );
}

export default function ProductSalesPage({ productId = 1 }) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const productWhatsAppLink = buildWhatsAppLink(
    `Olá! Tenho uma dúvida sobre o ${product.name} 🌿`
  );

  return (
    <div className="bg-cream text-ink">
      <header className="border-b border-beige sticky top-0 z-40 bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href={`${import.meta.env.BASE_URL}`} className="flex items-center gap-2.5">
            <img
              src={LOGO_WORDMARK}
              alt={BRAND.name}
              className="h-9 w-auto"
            />
          </a>
          <a
            href={productWhatsAppLink}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative order-first md:order-last"
            >
              <div className="aspect-square w-full rounded-[2rem] bg-white border border-beige flex items-center justify-center shadow-lg shadow-ink/5 overflow-hidden p-10">
                {product.video ? (
                  <video
                    src={product.video}
                    poster={product.photo}
                    controls
                    playsInline
                    preload="metadata"
                    className="max-w-full max-h-full rounded-2xl drop-shadow-lg"
                  />
                ) : (
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-offwhite -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center"
            >
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-nude-dark font-medium mb-4">
                Principia Skincare
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                {product.name}
              </h1>
              <p className="mt-5 text-ink-soft max-w-md mx-auto">
                {product.description}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-beige/60 px-4 py-2">
                <Sparkles size={14} className="text-nude-dark" />
                <span className="text-xs text-ink-soft font-medium">
                  {product.badge || "Selune Oficial"}
                </span>
              </div>

              {product.compareAtPrice && (
                <p className="mt-4 text-sm text-ink-soft">
                  Separados: <s>{formatPrice(product.compareAtPrice)}</s>
                </p>
              )}
              <p className={`${product.compareAtPrice ? "mt-1" : "mt-4"} text-3xl md:text-4xl font-bold text-accent`}>
                {formatPrice(product.price)}
              </p>
              {product.offerNote && (
                <p className="mt-2 text-sm font-semibold text-ink">{product.offerNote}</p>
              )}
              {product.bonus && (
                <div className="mt-4 mx-auto max-w-sm flex items-start gap-3 rounded-2xl border border-beige bg-white p-4 text-left">
                  <Gift size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{product.bonus.title}</p>
                    <p className="text-xs text-ink-soft leading-relaxed">{product.bonus.text}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <BuyButton product={product} className="px-10 py-4 text-base w-full sm:w-auto" />
              </div>

              <a
                href={productWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft hover:text-nude-dark transition-colors"
              >
                <MessageCircle size={15} className="shrink-0" />
                <span>Prefiro tirar dúvidas no WhatsApp</span>
              </a>

              <div className="mt-5 flex items-center justify-center gap-2 text-ink-soft">
                <QrCode size={18} />
                <CreditCard size={18} />
                <Wallet size={18} />
                <span className="text-xs">Pix ou cartão</span>
              </div>

              <p className="mt-3 text-xs text-ink-soft max-w-sm mx-auto">
                Ao finalizar, você recebe um código no WhatsApp para confirmar a compra. É a proteção antifraude da InfinitePay.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Lock size={14} className="text-nude-dark" />
                  Compra segura · 7 dias para desistir
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck size={14} className="text-nude-dark" />
                  Nota fiscal em todo pedido
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck size={14} className="text-nude-dark" />
                  Frete grátis · entrega em 3 a 7 dias úteis
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Foto do produto */}
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
              Conheça o {product.shortName} em detalhes
            </h2>
            <div className="mx-auto max-w-xs rounded-2xl overflow-hidden shadow-xl border border-beige">
              <img
                src={product.photo}
                alt={product.name}
                loading="lazy"
                className="w-full block"
              />
            </div>
          </div>
        </motion.section>

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
            <div className="grid sm:grid-cols-2 gap-6 text-center">
              {product.benefits.map((b) => {
                const Icon = ICONS[b.icon];
                return (
                  <div
                    key={b.title}
                    className="rounded-2xl bg-offwhite border border-beige p-6 flex flex-col items-center gap-3 hover:border-nude/60 hover:shadow-lg transition-all"
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
            <div className="text-center space-y-6">
              {product.salesFaq.map((item) => (
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
                {formatPrice(product.price)} com frete grátis e nota fiscal.
              </p>
              <div className="flex items-center justify-center gap-2 text-cream/60 mb-6">
                <QrCode size={16} />
                <CreditCard size={16} />
                <Wallet size={16} />
                <span className="text-xs">Pix ou cartão</span>
              </div>
              <a
                href={product.paymentLink}
                data-ipay={product.ipayCode}
                onClick={trackProductClick}
                className="inline-flex items-center gap-2 rounded-full bg-gold-light px-8 py-4 text-ink font-medium hover:bg-cream transition-colors"
              >
                <ShoppingBag size={20} />
                Comprar agora
              </a>
              <a
                href={productWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors"
              >
                <MessageCircle size={16} className="shrink-0" />
                <span>Prefiro tirar dúvidas no WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-beige py-8 text-center pb-24 md:pb-8 px-6 space-y-3">
        <p className="text-xs text-ink-soft max-w-2xl mx-auto">{LEGAL.about}</p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {LEGAL.policies.map((l) => (
            <a key={l.href} href={l.href} className="inline-block py-2 text-xs text-ink-soft underline hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-ink-soft">
          © {new Date().getFullYear()} {BRAND.name} · CNPJ {LEGAL.cnpj} · WhatsApp {CONTACT.whatsappDisplay}
        </p>
      </footer>

      {/* Barra fixa de compra no mobile */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-cream/95 backdrop-blur border-t border-beige px-4 py-3 flex items-center justify-between gap-4">
        <span className="text-lg font-bold text-accent">
          {formatPrice(product.price)}
        </span>
        <BuyButton product={product} className="px-6 py-3 text-sm">Comprar</BuyButton>
      </div>

      {/* Escondido no mobile pra não sobrepor a barra fixa de compra */}
      <div className="hidden md:block">
        <WhatsAppFloatButton />
      </div>
    </div>
  );
}

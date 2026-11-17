import { ShoppingBag, Truck, ReceiptText, CreditCard } from "lucide-react";
import { PRODUCTS } from "../constants";

// Banner de abertura: mensagem principal + fotos dos produtos da loja.
// As fotos vêm da lista de produtos, então acompanham a troca de marcas.
export default function Hero() {
  const fotos = PRODUCTS.filter((p) => p.image).slice(0, 4);
  return (
    <section id="inicio" className="bg-cream">
      <h1 className="sr-only">Selune Oficial: skincare original com preço acessível</h1>
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-14 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
            Selune Oficial · loja online de skincare
          </p>
          <p className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.08] text-balance">
            Cuidado de pele que cabe no seu bolso ✨
          </p>
          <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed max-w-md mx-auto md:mx-0">
            Produtos originais de marcas confiáveis, com preço claro do começo ao fim. Sem taxa escondida no final da compra.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="#produtos"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-base font-bold text-white hover:bg-accent-dark transition-colors"
            >
              <ShoppingBag size={19} />
              Ver produtos e preços
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-ink-soft">
            <li className="inline-flex items-center gap-1.5"><Truck size={16} className="text-accent" />Frete grátis</li>
            <li className="inline-flex items-center gap-1.5"><ReceiptText size={16} className="text-accent" />Nota fiscal</li>
            <li className="inline-flex items-center gap-1.5"><CreditCard size={16} className="text-accent" />Pix ou cartão</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {fotos.map((p) => (
            <a
              key={p.id}
              href={p.salesPageUrl || "#produtos"}
              className="aspect-square rounded-xl bg-white border border-beige flex items-center justify-center p-4 hover:border-ink/30 transition-colors"
              aria-label={`Ver ${p.shortName}`}
            >
              <img src={p.image} alt={p.name} width="300" height="300" loading="eager" className="max-h-full w-auto object-contain" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

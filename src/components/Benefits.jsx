import { ShieldCheck, Receipt, Truck, CreditCard, MessageCircle, RotateCcw } from "lucide-react";

// Diferenciais: tudo aqui é verificável (nota fiscal, frete, pagamento, prazo de desistência).
const ITENS = [
  { icone: ShieldCheck, titulo: "Originais e lacrados", texto: "Comprados de distribuidor e enviados na embalagem do fabricante." },
  { icone: Receipt, titulo: "Nota fiscal em todo pedido", texto: "Nota fiscal eletrônica, com CNPJ, em todas as compras." },
  { icone: Truck, titulo: "Frete grátis", texto: "Para todo o Brasil, com código de rastreio no WhatsApp." },
  { icone: CreditCard, titulo: "5% off no Pix", texto: "Ou cartão parcelado e boleto, no checkout seguro da Yampi, sem precisar criar conta." },
  { icone: MessageCircle, titulo: "Atendimento humano", texto: "Uma pessoa da Selune responde suas dúvidas no WhatsApp." },
  { icone: RotateCcw, titulo: "7 dias para desistir", texto: "Direito de arrependimento garantido pelo Código do Consumidor." },
];

export default function Benefits() {
  return (
    <section className="bg-white py-14 md:py-20 border-y border-beige" aria-labelledby="dif-titulo">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Por que a Selune</p>
          <h2 id="dif-titulo" className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">Compra simples, do clique à sua porta</h2>
        </header>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-10">
          {ITENS.map(({ icone: I, titulo, texto }) => (
            <li key={titulo} className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-light bg-cream text-gold">
                <I size={21} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-sm md:text-base font-semibold text-ink">{titulo}</h3>
              <p className="mt-1 text-xs md:text-sm leading-relaxed text-ink-soft">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

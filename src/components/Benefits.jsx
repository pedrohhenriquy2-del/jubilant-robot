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
  // Faixa curta de garantias: o essencial para decidir, sem rolar.
  const curtos = [
    { ...ITENS[0], sub: "Direto do distribuidor" },
    { ...ITENS[1], titulo: "Nota fiscal", sub: "Em todo pedido" },
    { ...ITENS[3], sub: "Ou cartão e boleto" },
    { ...ITENS[5], sub: "Troca pelo WhatsApp" },
  ];
  return (
    <section className="bg-white py-6 md:py-8 border-y border-beige" aria-label="Garantias da compra">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-3 gap-y-4 px-4 md:grid-cols-4 md:px-6">
        {curtos.map(({ icone: I, titulo, sub }) => (
          <li key={titulo} className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-light bg-cream text-gold">
              <I size={17} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[13px] md:text-sm font-semibold text-ink">{titulo}</span>
              <span className="mt-0.5 text-[11px] md:text-xs text-ink-soft">{sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

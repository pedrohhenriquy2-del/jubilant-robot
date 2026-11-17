import { MessageCircle, Truck, CreditCard, Clock } from "lucide-react";
import { WHATSAPP_LINK, CONTACT, trackWhatsAppClick } from "../constants";

// Entrega, pagamento e atendimento: responde as últimas dúvidas antes do checkout.
export default function Contact() {
  const blocos = [
    { icone: Truck, titulo: "Entrega", texto: "Frete grátis para todo o Brasil. Prazo de 3 a 7 dias úteis, com rastreio pelo WhatsApp." },
    { icone: CreditCard, titulo: "Pagamento", texto: "Pix ou cartão de crédito no checkout seguro da Cartpanda. Nota fiscal em todo pedido." },
    { icone: Clock, titulo: "Atendimento", texto: `WhatsApp ${CONTACT.whatsappDisplay}, todos os dias. Trocas e desistência em até 7 dias.` },
  ];
  return (
    <section id="contato" className="bg-cream py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {blocos.map(({ icone: I, titulo, texto }) => (
            <div key={titulo} className="rounded-2xl border border-beige bg-white p-6">
              <I size={22} strokeWidth={1.6} className="text-gold" aria-hidden="true" />
              <h3 className="mt-3 font-display text-2xl text-ink">{titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{texto}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-accent px-6 py-10 text-center text-cream md:px-16 md:py-14">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">Não sabe o que escolher?</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl [text-wrap:balance]">Fale com uma pessoa de verdade antes de comprar</h2>
          <p className="mx-auto mt-3 max-w-md text-sm md:text-base text-cream/75">
            Conte como é a sua pele e a sua rotina. A gente indica os produtos e tira as dúvidas sobre envio e pagamento.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="mt-6 inline-flex min-h-14 items-center gap-2 rounded-full bg-cream px-8 text-sm font-semibold uppercase tracking-[0.12em] text-accent hover:bg-white transition-colors"
          >
            <MessageCircle size={18} aria-hidden="true" /> Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

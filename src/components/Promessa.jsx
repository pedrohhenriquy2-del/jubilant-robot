import { MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { buildWhatsAppLink } from "../constants";

// Promessa da marca: emoção + confiança, só com fatos que a Selune cumpre.
const ITENS = [
  {
    icone: ShieldCheck,
    titulo: "Original de verdade",
    texto: "Cada produto vem lacrado, comprado de distribuidor, com nota fiscal em todo pedido.",
  },
  {
    icone: MessageCircle,
    titulo: "Gente de verdade",
    texto: "No WhatsApp quem responde é uma pessoa da Selune, antes e depois da sua compra.",
  },
  {
    icone: RotateCcw,
    titulo: "Compra sem medo",
    texto: "Recebeu e não era o que esperava? Você tem 7 dias para desistir. É só chamar a gente.",
  },
];

export default function Promessa() {
  return (
    <section className="bg-offwhite py-12 md:py-16" aria-labelledby="promessa-titulo">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">A promessa Selune</p>
          <h2 id="promessa-titulo" className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">
            Cuidar da pele é um momento seu. <em className="text-gold">O resto, a gente cuida.</em>
          </h2>
        </header>
        <ul className="mt-8 grid gap-3 md:grid-cols-3 md:gap-6">
          {ITENS.map(({ icone: I, titulo, texto }) => (
            <li key={titulo} className="flex gap-4 rounded-2xl border border-beige bg-white p-5 md:flex-col md:p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-light bg-cream text-gold">
                <I size={22} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-2xl leading-tight text-ink">{titulo}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{texto}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center">
          <a
            href={buildWhatsAppLink("Olá! Tenho uma dúvida antes de comprar na Selune.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink px-6 text-sm font-semibold text-ink hover:bg-ink hover:text-cream transition-colors"
          >
            <MessageCircle size={16} aria-hidden="true" /> Tirar uma dúvida no WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}

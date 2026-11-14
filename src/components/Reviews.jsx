import { Star } from "lucide-react";

// Avaliações reais de clientes Selune (as mesmas da página do Mix-01).
const AVALIACOES = [
  { nome: "Lauane Aparecida", foto: "products/cliente-lauane.jpg", texto: "Acabou com a minha oleosidade. Achei o máximo!" },
  { nome: "Ingrid Freitas", foto: "products/cliente-ingrid.jpg", texto: "Vi diferença já nos três primeiros dias de uso." },
  { nome: "Rosemire", foto: "products/cliente-rosemire.jpg", texto: "É bom e funciona." },
];

export default function Reviews() {
  const base = import.meta.env.BASE_URL;
  return (
    <section id="avaliacoes" className="py-10 md:py-14 bg-white border-y border-beige">
      <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
        <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
          Clientes Selune
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl text-ink font-extrabold tracking-tight">
          Quem usa, aprova
        </h2>
        <p className="mt-2 text-sm md:text-base text-ink-soft">
          O que dizem as clientes que já usam o Sérum Mix-01.
        </p>

        <div className="mt-6 md:mt-8 grid gap-3 md:gap-6 md:grid-cols-3 text-left">
          {AVALIACOES.map((a) => (
            <figure key={a.nome} className="rounded-xl border border-beige bg-cream p-5 flex flex-col gap-3">
              <div className="flex gap-1" role="img" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-[#F5B301] text-[#F5B301]" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-[15px] md:text-base text-ink leading-snug">“{a.texto}”</blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <img src={`${base}${a.foto}`} alt="" width="40" height="40" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-ink">{a.nome}</span>
                  <span className="text-xs text-ink-soft">Cliente Selune</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

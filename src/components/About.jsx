import { LEGAL } from "../constants";

// Sobre a marca: quem é a Selune, sem prometer o que não fazemos.
export default function About() {
  const base = import.meta.env.BASE_URL;
  return (
    <section id="sobre" className="bg-offwhite py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-14 md:px-6">
        <div className="overflow-hidden rounded-3xl">
          <img src={`${base}banners/hero-premium-mob.webp`} alt="" width="900" height="900" loading="lazy" className="w-full h-auto" />
        </div>
        <div className="text-center md:text-left">
          <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-gold">Sobre a Selune</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl text-ink [text-wrap:balance]">Autocuidado que cabe na rotina e no bolso</h2>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-soft">
            <p>
              A Selune Oficial é uma loja online de skincare. A gente seleciona produtos de marcas que já fazem parte da rotina de muita gente, confere a procedência e entrega na sua casa, com nota fiscal e frete grátis.
            </p>
            <p>
              Não fabricamos os produtos e não oferecemos serviços de estética: nosso trabalho é escolher bem, explicar com clareza o que vem em cada embalagem e cuidar do seu pedido do começo ao fim.
            </p>
          </div>
          <p className="mt-5 text-xs text-ink-soft">CNPJ {LEGAL.cnpj}</p>
          <a href={`${base}politicas.html#procedencia`} className="mt-2 inline-block text-sm font-medium text-ink underline underline-offset-4 decoration-gold">
            Garantia de procedência, trocas e entrega
          </a>
        </div>
      </div>
    </section>
  );
}

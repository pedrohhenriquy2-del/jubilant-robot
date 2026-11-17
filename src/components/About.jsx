export default function About() {
  const base = import.meta.env.BASE_URL;
  return (
    <section id="sobre" className="py-10 md:py-16 bg-cream border-t border-beige">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-xl md:text-2xl text-ink font-bold tracking-tight">
          Loja independente, produtos originais
        </h2>
        <p className="mt-3 text-sm md:text-base text-ink-soft leading-relaxed">
          A Selune Oficial (CNPJ 56.996.633/0001-56) é uma loja online: revendemos
          produtos de skincare originais e lacrados, de marcas confiáveis. Não
          fabricamos os produtos nem oferecemos serviços de estética. Todo pedido
          sai com nota fiscal, frete grátis e atendimento pelo WhatsApp.
        </p>
        <a href={`${base}politicas.html#procedencia`} className="mt-3 inline-block text-sm text-ink underline underline-offset-4">
          Garantia, trocas e entrega
        </a>
      </div>
    </section>
  );
}

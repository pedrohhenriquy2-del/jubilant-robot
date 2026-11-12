// Topo da Loja no estilo das grandes lojas de beleza: banner da oferta em destaque.
export default function Hero() {
  const base = import.meta.env.BASE_URL;
  return (
    <section id="inicio" className="bg-cream pt-4 md:pt-6">
      <h1 className="sr-only">Selune Oficial: skincare Principia original com frete grátis</h1>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <a
          href={`${base}mix-01.html`}
          className="block overflow-hidden rounded-md border border-beige bg-ink"
          aria-label="Ver oferta: Principia Sérum Mix-01 por R$ 49,90 com frete grátis"
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={`${base}banners/black-friday-1080.webp`} width="1080" height="1080" />
            <img
              src={`${base}banners/black-friday-1600.webp`}
              alt="Black Friday Selune: Principia Sérum Mix-01 por R$ 49,90, frete grátis, Pix ou cartão"
              width="1600"
              height="640"
              className="w-full h-auto block"
            />
          </picture>
        </a>
      </div>
    </section>
  );
}

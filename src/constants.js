// ============================================================
// DADOS CENTRAIS DO SITE — SELUNE OFICIAL
// Edite este arquivo para atualizar textos, contatos e serviços
// sem precisar mexer nos componentes.
// ============================================================

// Prefixo do caminho de assets em public/ — usa a base configurada no Vite
// (funciona tanto em localhost quanto na subpasta do GitHub Pages)
const ASSET_BASE = import.meta.env.BASE_URL;

export const LOGO = `${ASSET_BASE}logo.webp`;
export const LOGO_WORDMARK = `${ASSET_BASE}logo-selune.svg`;
export const LOGO_WORDMARK_WHITE = `${ASSET_BASE}logo-selune-white.svg`;

export const WHATSAPP_NUMBER = "5538999659366";

export function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Selune Oficial e gostaria de saber mais 🌿";

export function buildWhatsAppLink(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_LINK = buildWhatsAppLink();

// Dispara o evento de conversão do Meta Pixel ao clicar em qualquer
// botão do WhatsApp (cliques abrem o link normalmente, só registra antes).
export function trackWhatsAppClick() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Contact");
  }
}

export const BRAND = {
  name: "Selune Oficial",
  tagline: "Beleza, autocuidado e confiança",
};

export const LEGAL = {
  cnpj: "56.996.633/0001-56",
  about:
    "Loja independente de skincare. Revendemos produtos Principia originais e lacrados, com nota fiscal em todo pedido.",
  policies: [
    { label: "Trocas e devoluções", href: `${ASSET_BASE}politicas.html#trocas` },
    { label: "Garantia de procedência", href: `${ASSET_BASE}politicas.html#procedencia` },
    { label: "Entrega", href: `${ASSET_BASE}politicas.html#entrega` },
    { label: "Privacidade", href: `${ASSET_BASE}politicas.html#privacidade` },
  ],
};

export const CONTACT = {
  hours: [
    { day: "Atendimento", time: "24 horas no WhatsApp · aberto sempre" },
  ],
  instagram: "https://www.instagram.com/seluneoficial.com.br/",
  instagramHandle: "@seluneoficial.com.br",
  whatsappDisplay: "(38) 99965-9366",
};

export const NAV_LINKS = [
  { label: "Produtos", href: "#produtos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

// Dispara o evento de conversão do Meta Pixel ao clicar em "Comprar".
// Envia também o valor e o produto, para o Meta saber quanto vale cada início de compra.
export function trackProductClick(e) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const el = e && e.currentTarget;
  const href = (el && el.getAttribute && el.getAttribute("href")) || "";
  const prod =
    PRODUCTS.find((p) => el && el.dataset && el.dataset.ipay && p.ipayCode === el.dataset.ipay) ||
    PRODUCTS.find((p) => p.paymentLink && href && href.split("?")[0] === p.paymentLink.split("?")[0]);
  if (!prod) {
    window.fbq("track", "InitiateCheckout", { currency: "BRL" });
    return;
  }
  window.fbq("track", "InitiateCheckout", {
    content_name: prod.name,
    content_ids: [String(prod.id)],
    content_type: "product",
    value: prod.price,
    currency: "BRL",
  });
}

// Catálogo de produtos (o botão Comprar abre o checkout da InfinitePay; Perfect Pay fica de reserva).
// Adicione novos produtos aqui conforme forem confirmados (nome + preço + link).
export const PRODUCTS = [
  {
    id: 1,
    category: "Tratamento",
    tagline: "Sérum para pele oleosa · 30 ml",
    name: "Principia Sérum Mix-01 (Niacinamida + Ácido Glicólico)",
    shortName: "Mix-01",
    description:
      "Acne, oleosidade, textura irregular, poros dilatados e perda de viço.",
    price: 24.95,
    paymentLink: "https://go.perfectpay.com.br/PPU38CQHM7L",
    salesPageUrl: `${ASSET_BASE}mix-01.html`,
    photo: `${ASSET_BASE}products/mix-01.webp`,
    badge: "Novidade",
    // TROCAR: vídeo removido — mostrava produto de outra marca e pessoas
    // genéricas de IA/banco de imagens. Adicionar de volta só com um vídeo
    // real do Mix-01, sem esses problemas.
    benefits: [
      {
        icon: "Droplet",
        title: "Niacinamida 5%",
        text: "Controla a oleosidade e ajuda a reduzir a aparência dos poros.",
      },
      {
        icon: "Sparkles",
        title: "Ácido Glicólico 4%",
        text: "Renova a textura da pele e traz mais viço e luminosidade.",
      },
      {
        icon: "ShieldCheck",
        title: "Ácido Tranexâmico 3%",
        text: "Ajuda a uniformizar o tom da pele e atenuar manchas.",
      },
      {
        icon: "Sun",
        title: "Ácido Salicílico 2%",
        text: "Atua na acne e ajuda a desobstruir os poros.",
      },
    ],
    salesFaq: [
      {
        q: "Serve para qualquer tipo de pele?",
        a: "É indicado principalmente para peles oleosas, mistas e com tendência a acne, poros dilatados e textura irregular.",
      },
      {
        q: "Como devo usar?",
        a: "Aplique algumas gotas no rosto limpo, de preferência à noite. Comece com uso a cada dois dias para avaliar a sensibilidade da sua pele. Use protetor solar durante o dia.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é feito em ambiente seguro, com Pix ou cartão.",
      },
      {
        q: "Tenho dúvidas antes de comprar, como falo com vocês?",
        a: "É só chamar no WhatsApp (38) 99965-9366. O atendimento é 24 horas, todos os dias.",
      },
    ],
  },
  {
    id: 7,
    category: "Kits",
    tagline: "Sérum Mix-01 + Protetor Solar PS-01",
    name: "Kit Rotina Selune: Trata + Protege",
    shortName: "Kit Rotina Selune",
    description:
      "Os dois passos que não podem faltar na rotina, juntos e mais baratos do que separados: sérum Principia Mix-01 (30 ml) para tratar e protetor solar Principia PS-01 FPS 60 (40 ml) para proteger.",
    price: 49.9,
    // Soma real dos dois produtos comprados separados (24,95 + 29,90).
    compareAtPrice: 54.85,
    // Oferta de Black Friday: tirar estas duas linhas depois de 01/12.
    offerNote: "Oferta de Black Friday · frete grátis até 01/12",
    bonus: {
      title: "Bônus: e-book Sua Rotina Skincare",
      text: "O guia da pele bem cuidada, em PDF. Enviamos no seu WhatsApp depois da confirmação do pagamento.",
    },
    // Checkout só pela InfinitePay (código em public/checkout-infinitepay.js).
    // Se o script não carregar, o botão leva o pedido para o WhatsApp.
    ipayCode: "KITROTINA",
    paymentLink: buildWhatsAppLink(
      "Olá! Quero comprar o Kit Rotina Selune (Sérum Mix-01 + Protetor Solar PS-01) por R$ 49,90."
    ),
    salesPageUrl: `${ASSET_BASE}kit-rotina.html`,
    photo: `${ASSET_BASE}products/kit-rotina.webp`,
    badge: "Black Friday",
    benefits: [
      {
        icon: "Moon",
        title: "Passo 1 · Sérum Mix-01 (à noite)",
        text: "Niacinamida 5%, ácido glicólico 4%, ácido tranexâmico 3% e ácido salicílico 2%. Para acne, oleosidade, textura irregular e poros dilatados.",
      },
      {
        icon: "Sun",
        title: "Passo 2 · Protetor Solar PS-01 (de manhã)",
        text: "FPS 60 com 16,5% mix de filtros UV e 5% niacinamida. Toque seco, antioleosidade, proteção UVA e UVB.",
      },
      {
        icon: "ShieldCheck",
        title: "Feitos para usar juntos",
        text: "Quem usa sérum com ácidos precisa de protetor solar todos os dias. No kit, os dois já chegam juntos.",
      },
      {
        icon: "Sparkles",
        title: "Mais barato do que separado",
        text: "Separados, os dois saem por R$ 54,85. No kit, R$ 49,90 com frete grátis.",
      },
    ],
    salesFaq: [
      {
        q: "Como uso os dois produtos?",
        a: "À noite, aplique algumas gotas do sérum Mix-01 no rosto limpo. Comece com uso a cada dois dias para avaliar a sensibilidade da sua pele. De manhã, aplique o protetor solar PS-01 e reaplique ao longo do dia se ficar exposta ao sol.",
      },
      {
        q: "Serve para qualquer tipo de pele?",
        a: "É indicado principalmente para peles oleosas, mistas e com tendência a acne, poros dilatados e textura irregular.",
      },
      {
        q: "Como recebo o e-book de bônus?",
        a: "Depois da confirmação do pagamento, enviamos o PDF do e-book Sua Rotina Skincare no seu WhatsApp.",
      },
      {
        q: "Até quando vale a oferta?",
        a: "O frete grátis da Black Friday vale até 01/12. Os pedidos chegam em 3 a 7 dias úteis.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é feito em ambiente seguro, com Pix ou cartão.",
      },
      {
        q: "Tenho dúvidas antes de comprar, como falo com vocês?",
        a: "É só chamar no WhatsApp (38) 99965-9366. O atendimento é 24 horas, todos os dias.",
      },
    ],
  },
  {
    id: 2,
    category: "Kits",
    tagline: "Rotina completa com 5 produtos",
    name: "Kit Avançado VC + RN com GL-01",
    shortName: "Kit Avançado",
    description:
      "Protetor solar PS-01 (60 FPS), sérum facial RN-0,3 (retinol), gel de limpeza GL-01, sérum facial VC-10 (vitamina C) e sérum facial AH-2 (ácido hialurônico) — rotina completa de skincare.",
    price: 145.5,
    paymentLink: "https://go.perfectpay.com.br/PPU38CQE85U",
    salesPageUrl: `${ASSET_BASE}kit-avancado.html`,
    photo: `${ASSET_BASE}products/kit-avancado-vc-rn.webp`,
    badge: "Rotina completa",
    benefits: [
      {
        icon: "Sun",
        title: "Protetor Solar PS-01 (FPS 60)",
        text: "Proteção UVA e UVB diária, com toque seco e antioleosidade.",
      },
      {
        icon: "Moon",
        title: "Sérum RN-0,3 (Retinol)",
        text: "Uso noturno, ajuda a estimular a renovação da pele.",
      },
      {
        icon: "Droplet",
        title: "Gel de Limpeza GL-01",
        text: "Limpeza diária que ajuda a reduzir oleosidade e poros dilatados.",
      },
      {
        icon: "Sparkles",
        title: "Sérum VC-10 (Vitamina C)",
        text: "Ajuda a uniformizar o tom da pele e trazer mais luminosidade.",
      },
      {
        icon: "ShieldCheck",
        title: "Sérum AH-2 (Ácido Hialurônico)",
        text: "Hidratação profunda pra completar a rotina.",
      },
    ],
    salesFaq: [
      {
        q: "Como uso os 5 produtos juntos?",
        a: "De manhã: gel de limpeza GL-01, sérum VC-10 (vitamina C) e protetor solar PS-01. À noite: gel de limpeza GL-01, sérum AH-2 (ácido hialurônico) e sérum RN-0,3 (retinol).",
      },
      {
        q: "Serve para qualquer tipo de pele?",
        a: "O kit foi montado pra cobrir uma rotina completa — limpeza, hidratação, proteção e renovação. O ideal é começar aos poucos e observar como sua pele reage, principalmente ao retinol. Se estiver grávida ou amamentando, fale com seu médico antes de usar o retinol.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é feito em ambiente seguro, com Pix ou cartão.",
      },
      {
        q: "Tenho dúvidas antes de comprar, como falo com vocês?",
        a: "É só chamar no WhatsApp (38) 99965-9366. O atendimento é 24 horas, todos os dias.",
      },
    ],
  },
  {
    id: 3,
    category: "Proteção solar",
    tagline: "FPS 60 · toque seco · 40 ml",
    name: "Principia Protetor Solar Facial PS-01 FPS 60",
    shortName: "Protetor Solar PS-01",
    description:
      "16,5% mix de filtros UV + 5% niacinamida. Toque seco, antioleosidade, proteção UVA e UVB.",
    price: 29.9,
    paymentLink: "https://go.perfectpay.com.br/PPU38CQE87N",
    salesPageUrl: `${ASSET_BASE}protetor-solar-ps-01.html`,
    photo: `${ASSET_BASE}products/protetor-solar-ps-01.webp`,
    badge: "Toque seco",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "16,5% mix de filtros UV",
        text: "Proteção UVA e UVB pra sua pele todos os dias.",
      },
      {
        icon: "Sun",
        title: "FPS 60",
        text: "Alta proteção solar, mesmo com exposição prolongada.",
      },
      {
        icon: "Droplet",
        title: "5% Niacinamida",
        text: "Ajuda a controlar a oleosidade ao longo do dia.",
      },
      {
        icon: "Sparkles",
        title: "Toque seco",
        text: "Não deixa a pele oleosa nem esbranquiçada.",
      },
    ],
    salesFaq: [
      {
        q: "Posso usar todos os dias?",
        a: "Sim, o ideal é aplicar todas as manhãs e reforçar ao longo do dia se ficar exposta ao sol por muito tempo.",
      },
      {
        q: "Deixa a pele oleosa ou esbranquiçada?",
        a: "Não. Tem toque seco e foi formulado com niacinamida pra ajudar a controlar a oleosidade.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é feito em ambiente seguro, com Pix ou cartão.",
      },
      {
        q: "Tenho dúvidas antes de comprar, como falo com vocês?",
        a: "É só chamar no WhatsApp (38) 99965-9366. O atendimento é 24 horas, todos os dias.",
      },
    ],
  },
  {
    id: 4,
    category: "Limpeza",
    tagline: "Gel de limpeza facial · 200 g",
    name: "Principia Gel de Limpeza Facial GL-01 200g",
    shortName: "Gel de Limpeza GL-01",
    description:
      "13% mix de tensoativos, 2% ácido salicílico e 3% glicerina. Reduz oleosidade, poros dilatados e textura irregular, com mais maciez e viço.",
    price: 45.5,
    paymentLink: "https://go.perfectpay.com.br/PPU38CQE87U",
    salesPageUrl: `${ASSET_BASE}gel-limpeza-gl-01.html`,
    photo: `${ASSET_BASE}products/gel-limpeza-gl-01.webp`,
    badge: "Uso diário",
    benefits: [
      {
        icon: "Droplet",
        title: "13% mix de tensoativos",
        text: "Limpeza profunda da pele sem ressecar.",
      },
      {
        icon: "ShieldCheck",
        title: "2% Ácido Salicílico",
        text: "Ajuda a desobstruir os poros e atuar na acne.",
      },
      {
        icon: "Sparkles",
        title: "3% Glicerina",
        text: "Mantém a pele hidratada mesmo no uso diário.",
      },
      {
        icon: "Sun",
        title: "Uso diário",
        text: "Reduz oleosidade e poros dilatados, com mais maciez e viço.",
      },
    ],
    salesFaq: [
      {
        q: "Como devo usar?",
        a: "Aplique no rosto molhado, massageie suavemente e enxágue. Pode ser usado de manhã e à noite.",
      },
      {
        q: "Serve para pele oleosa e com acne?",
        a: "Sim. O ácido salicílico ajuda a desobstruir os poros e atuar na acne, e a glicerina mantém a pele hidratada mesmo com o uso diário.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é feito em ambiente seguro, com Pix ou cartão.",
      },
      {
        q: "Tenho dúvidas antes de comprar, como falo com vocês?",
        a: "É só chamar no WhatsApp (38) 99965-9366. O atendimento é 24 horas, todos os dias.",
      },
    ],
  },
  {
    id: 5,
    category: "Corpo",
    tagline: "Hidratação de 72 horas · 454 g",
    name: "Principia Creme Hidratante Corporal CH-02 454g",
    shortName: "Creme Hidratante CH-02",
    description:
      "5% óleo de semente de girassol, 5% glicerina e 3% manteiga de abacate. Para peles sensíveis, secas a extra secas, com 72 horas de hidratação.",
    price: 49.9,
    paymentLink: "https://go.perfectpay.com.br/PPU38CQEQMQ",
    salesPageUrl: `${ASSET_BASE}creme-hidratante-ch-02.html`,
    photo: `${ASSET_BASE}products/creme-hidratante-ch-02.webp`,
    badge: "72h de hidratação",
    benefits: [
      {
        icon: "Droplet",
        title: "5% Óleo de Semente de Girassol",
        text: "Ajuda a nutrir e hidratar a pele do corpo.",
      },
      {
        icon: "Sparkles",
        title: "5% Glicerina",
        text: "Mantém a hidratação por até 72 horas.",
      },
      {
        icon: "ShieldCheck",
        title: "3% Manteiga de Abacate",
        text: "Ajuda a nutrir e deixar a pele mais macia.",
      },
      {
        icon: "Sun",
        title: "Pele sensível, seca a extra seca",
        text: "Formulado pra quem precisa de mais cuidado na hidratação.",
      },
    ],
    salesFaq: [
      {
        q: "Como devo usar?",
        a: "Aplique no corpo após o banho, com a pele ainda levemente úmida, massageando até absorver.",
      },
      {
        q: "Serve para pele muito seca?",
        a: "Sim, foi formulado para peles sensíveis, secas a extra secas, com até 72 horas de hidratação.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é feito em ambiente seguro, com Pix ou cartão.",
      },
      {
        q: "Tenho dúvidas antes de comprar, como falo com vocês?",
        a: "É só chamar no WhatsApp (38) 99965-9366. O atendimento é 24 horas, todos os dias.",
      },
    ],
  },
  {
    id: 6,
    category: "Tratamento",
    tagline: "Tônico renovador · 120 ml",
    name: "Tônico Principia AL-7 (7% Ácido Lático + 1% Ácido Salicílico) 120ml",
    shortName: "Tônico AL-7",
    description:
      "7% ácido lático e 1% ácido salicílico. Acne, textura irregular, oleosidade, impurezas e poros dilatados.",
    price: 26.5,
    paymentLink: "https://go.perfectpay.com.br/PPU38CQEQMT",
    salesPageUrl: `${ASSET_BASE}tonico-al-7.html`,
    photo: `${ASSET_BASE}products/tonico-al-7.webp`,
    badge: "Ação renovadora",
    benefits: [
      {
        icon: "Sparkles",
        title: "7% Ácido Lático",
        text: "Renova a textura da pele e ajuda a uniformizar o aspecto.",
      },
      {
        icon: "ShieldCheck",
        title: "1% Ácido Salicílico",
        text: "Atua na acne e ajuda a desobstruir os poros.",
      },
      {
        icon: "Droplet",
        title: "Remove impurezas",
        text: "Completa a limpeza, preparando a pele pros próximos passos da rotina.",
      },
      {
        icon: "Sun",
        title: "Textura irregular e poros dilatados",
        text: "Uso frequente ajuda a deixar a pele mais uniforme.",
      },
    ],
    salesFaq: [
      {
        q: "Como devo usar?",
        a: "Aplique com um algodão no rosto limpo, de preferência à noite. Use protetor solar durante o dia.",
      },
      {
        q: "Serve para qualquer tipo de pele?",
        a: "É indicado principalmente para peles oleosas ou com tendência a acne, textura irregular e poros dilatados.",
      },
      {
        q: "Como funciona o pagamento?",
        a: "O pagamento é feito em ambiente seguro, com Pix ou cartão.",
      },
      {
        q: "Tenho dúvidas antes de comprar, como falo com vocês?",
        a: "É só chamar no WhatsApp (38) 99965-9366. O atendimento é 24 horas, todos os dias.",
      },
    ],
  },
];

// Selos de confiança/segurança. TROCAR: não afirmar registro específico em
// órgãos regulatórios (ex: ANVISA) sem documentação real que comprove isso —
// aqui ficam apenas compromissos gerais de boas práticas e qualidade.
export const SAFETY_BADGES = [
  {
    icon: "ShieldCheck",
    title: "Boas práticas de segurança",
    description:
      "Compromisso com boas práticas e cuidado no atendimento e no envio dos produtos.",
  },
  {
    icon: "BadgeCheck",
    title: "Produtos de qualidade",
    description:
      "Fórmulas com ingredientes seguros e reconhecidos, escolhidos com cuidado.",
  },
  {
    icon: "GraduationCap",
    title: "Curadoria especializada",
    description:
      "Produtos selecionados com base em ativos eficazes e reconhecidos no skincare.",
  },
  {
    icon: "HeartHandshake",
    title: "Transparência com você",
    description:
      "Atendimento claro, sem promessas milagrosas, focado no seu bem-estar real.",
  },
];

export const SERVICES = [
  {
    icon: "Sparkles",
    title: "Limpeza Facial Diária",
    description:
      "Remove impurezas e oleosidade em excesso, preparando a pele pros próximos passos da sua rotina.",
  },
  {
    icon: "Droplet",
    title: "Hidratação Profunda",
    description:
      "Repõe a barreira de hidratação da pele, deixando-a macia, viçosa e com aspecto saudável.",
  },
  {
    icon: "Sun",
    title: "Proteção Solar Diária",
    description:
      "Protege contra os raios UVA e UVB no dia a dia, sem deixar a pele oleosa ou esbranquiçada.",
  },
  {
    icon: "Leaf",
    title: "Renovação da Textura",
    description:
      "Ácidos que ajudam a renovar a pele, melhorando textura, poros dilatados e uniformidade.",
  },
  {
    icon: "Heart",
    title: "Ajuda para escolher",
    description:
      "Não sabe por onde começar? Chame no WhatsApp e indicamos os produtos certos para o seu tipo de pele.",
  },
  {
    icon: "ShieldCheck",
    title: "Ação Anti-idade",
    description:
      "No Kit Avançado, retinol e vitamina C ajudam a suavizar linhas finas com o uso contínuo.",
  },
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    src: `${ASSET_BASE}gallery/resultados-acne.webp`,
    alt: "Antes e depois: redução da aparência de acne",
  },
  {
    id: 2,
    src: `${ASSET_BASE}gallery/resultados-firmeza.webp`,
    alt: "Antes e depois: pele mais firme e hidratada",
  },
  {
    id: 3,
    src: `${ASSET_BASE}gallery/resultados-uniformidade.webp`,
    alt: "Antes e depois: pele mais uniforme e luminosa",
  },
  {
    id: 4,
    src: `${ASSET_BASE}gallery/resultados-manchas.webp`,
    alt: "Antes e depois: redução da aparência de manchas",
  },
  {
    id: 5,
    src: `${ASSET_BASE}gallery/resultados-brilho.webp`,
    alt: "Pele com viço e luminosidade",
  },
  {
    id: 6,
    src: `${ASSET_BASE}gallery/resultados-vitalidade.webp`,
    alt: "Antes e depois: mais brilho, vitalidade e hidratação",
  },
];

export const TESTIMONIALS = [
  {
    name: "Camila Rezende",
    photo: `${ASSET_BASE}testimonials/camila-rezende.jpeg`,
    rating: 5,
    text: "Minha pele nunca esteve tão limpa e uniforme. O atendimento é super acolhedor, me senti cuidada do início ao fim.",
  },
  {
    name: "Fernanda Alves",
    photo: `${ASSET_BASE}testimonials/fernanda-alves.jpeg`,
    rating: 5,
    text: "Fiz a limpeza de pele profunda e amei o resultado. Ambiente impecável e profissional muito atenciosa.",
  },
  {
    name: "Juliana Martins",
    photo: `${ASSET_BASE}testimonials/juliana-martins.webp`,
    rating: 5,
    text: "Já é minha terceira sessão na Selune e cada vez saio mais satisfeita. Recomendo de olhos fechados!",
  },
  {
    name: "Patrícia Gomes",
    photo: `${ASSET_BASE}testimonials/patricia-gomes.jpeg`,
    rating: 5,
    text: "Atendimento personalizado de verdade. Explicaram cada etapa do procedimento e minha pele agradeceu.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Como escolho o produto certo para minha pele?",
    answer:
      "Cada produto tem a indicação na própria descrição (acne, oleosidade, textura irregular, manchas, hidratação etc.). Se tiver dúvida, é só chamar no WhatsApp que ajudamos a montar sua rotina.",
  },
  {
    question: "Quanto tempo leva para ver resultado?",
    answer:
      "Varia de pessoa para pessoa e do produto usado, mas o uso constante, seguindo o modo de uso indicado em cada página, é o que traz os melhores resultados.",
  },
  {
    question: "Preciso usar protetor solar junto com os produtos?",
    answer:
      "Sim, principalmente com ácidos (como os do Sérum Mix-01 e do Tônico AL-7). Recomendamos usar protetor solar diariamente durante o uso desses produtos.",
  },
  {
    question: "Vocês entregam os produtos para todo o Brasil?",
    answer:
      "Sim! Os produtos de skincare da Principia são enviados para todo o Brasil, com pagamento por Pix ou cartão direto no checkout do site.",
  },];

export const TRUST_BADGE = "Cuidado de pele para o dia a dia";

export const FOOTER_LINKS = NAV_LINKS;

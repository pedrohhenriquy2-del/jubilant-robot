// ============================================================
// DADOS CENTRAIS DO SITE — SELUNE OFICIAL
// Edite este arquivo para atualizar textos, contatos e serviços
// sem precisar mexer nos componentes.
// ============================================================

// TROCAR: número real do WhatsApp no formato 55DDDNÚMERO (só dígitos)
export const WHATSAPP_NUMBER = "55XXXXXXXXXXX";

export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e gostaria de agendar uma limpeza de pele na Selune Oficial 🌿";

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const BRAND = {
  name: "Selune Oficial",
  tagline: "Estética facial em Unaí, MG",
};

// TROCAR: endereço exato da clínica
export const CONTACT = {
  address: "Rua Placeholder, 123 — Centro, Unaí - MG",
  hours: [
    { day: "Segunda a Sexta", time: "09h às 19h" },
    { day: "Sábado", time: "09h às 14h" },
    { day: "Domingo", time: "Fechado" },
  ],
  // TROCAR: link/handle real do Instagram
  instagram: "https://instagram.com/selune.oficial",
  instagramHandle: "@selune.oficial",
  whatsappDisplay: "(38) XXXXX-XXXX",
  // TROCAR: coordenadas reais para o embed do Google Maps
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Unaí,MG&output=embed",
};

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export const SERVICES = [
  {
    icon: "Sparkles",
    title: "Limpeza de Pele Profunda",
    description:
      "Higienização completa com extração e remoção de impurezas para uma pele visivelmente mais leve e uniforme.",
  },
  {
    icon: "Droplet",
    title: "Extração de Cravos",
    description:
      "Técnica cuidadosa para desobstruir os poros sem agredir a pele, prevenindo novas inflamações.",
  },
  {
    icon: "Leaf",
    title: "Hidratação Facial",
    description:
      "Reposição da barreira de hidratação natural da pele, deixando-a macia, viçosa e com aspecto saudável.",
  },
  {
    icon: "Sun",
    title: "Peeling de Renovação",
    description:
      "Esfoliação controlada que estimula a renovação celular e melhora textura, manchas e brilho da pele.",
  },
  {
    icon: "Heart",
    title: "Skincare Personalizado",
    description:
      "Avaliação individual da pele para indicar a rotina de cuidados ideal para o seu tipo e objetivo.",
  },
  {
    icon: "ShieldCheck",
    title: "Protocolo Anti-idade",
    description:
      "Conjunto de técnicas voltadas a prevenir e suavizar linhas finas, devolvendo firmeza ao rosto.",
  },
];

export const GALLERY_IMAGES = [
  { id: 1, alt: "Ambiente acolhedor da clínica Selune Oficial" },
  { id: 2, alt: "Procedimento de limpeza de pele em andamento" },
  { id: 3, alt: "Resultado de pele após tratamento facial" },
  { id: 4, alt: "Produtos utilizados nos procedimentos da Selune" },
  { id: 5, alt: "Sala de atendimento da Selune Oficial em Unaí" },
  { id: 6, alt: "Cliente satisfeita após sessão de skincare" },
];

export const TESTIMONIALS = [
  {
    name: "Camila Rezende",
    rating: 5,
    text: "Minha pele nunca esteve tão limpa e uniforme. O atendimento é super acolhedor, me senti cuidada do início ao fim.",
  },
  {
    name: "Fernanda Alves",
    rating: 5,
    text: "Fiz a limpeza de pele profunda e amei o resultado. Ambiente impecável e profissional muito atenciosa.",
  },
  {
    name: "Juliana Martins",
    rating: 5,
    text: "Já é minha terceira sessão na Selune e cada vez saio mais satisfeita. Recomendo de olhos fechados!",
  },
  {
    name: "Patrícia Gomes",
    rating: 5,
    text: "Atendimento personalizado de verdade. Explicaram cada etapa do procedimento e minha pele agradeceu.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "A limpeza de pele dói?",
    answer:
      "O procedimento é feito com técnicas que priorizam o seu conforto. Pode haver um leve desconforto durante a extração, mas nada que comprometa a experiência — e a sensação após a sessão é de pele renovada e leve.",
  },
  {
    question: "Quanto tempo dura a sessão?",
    answer:
      "Em média, a limpeza de pele profunda dura entre 1h e 1h30, considerando higienização, extração, hidratação e finalização.",
  },
  {
    question: "Quais cuidados devo ter após o procedimento?",
    answer:
      "Recomendamos evitar exposição solar direta nas primeiras 24h, usar protetor solar diariamente e manter a pele hidratada conforme orientação passada durante o atendimento.",
  },
  {
    question: "Com que frequência devo fazer a limpeza de pele?",
    answer:
      "Para manter os resultados, o ideal é repetir o procedimento a cada 30 a 45 dias, mas isso pode variar conforme o tipo e a necessidade da sua pele.",
  },
  {
    question: "Qual o valor do procedimento?",
    answer:
      "Os valores variam conforme o protocolo indicado para sua pele. Fale com a gente pelo WhatsApp para receber os valores atualizados e condições especiais.",
  },
  {
    question: "Vocês atendem todos os tipos de pele?",
    answer:
      "Sim! Cada atendimento começa com uma avaliação da pele para adaptarmos a técnica e os produtos às suas necessidades específicas.",
  },
];

export const TRUST_BADGE = "+300 clientes atendidas em Unaí-MG";

export const FOOTER_LINKS = NAV_LINKS;

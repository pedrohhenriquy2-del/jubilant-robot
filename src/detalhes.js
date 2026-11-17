// Informações das páginas de produto.
// Regra: só entra aqui o que está impresso na embalagem ou informado pelo fabricante.
// "embalagem" = frases da própria embalagem (mostradas como "Segundo a embalagem").
export const DETALHES = {
  SELHIAL: {
    slug: "serum-acido-hialuronico",
    titulo: "Hidratação leve para usar todos os dias",
    resumo:
      "Sérum facial Dermachem com 1,5% de ácido hialurônico e 0,5% de niacinamida, em frasco conta-gotas de 30 ml. Textura de sérum, pensado para entrar na rotina de manhã e à noite.",
    embalagem: ["Luminosidade e uniformidade", "Hidrata e tonifica", "Melhora os sinais de acne e a aparência da pele"],
    composicao: "1,5% Ácido Hialurônico · 0,5% Niacinamida",
    caracteristicas: ["30 ml", "Frasco com conta-gotas", "Uso facial"],
    uso: [
      "Lave o rosto e seque bem.",
      "Aplique algumas gotas no rosto e espalhe com a ponta dos dedos.",
      "Durante o dia, finalize com protetor solar.",
    ],
    indicacao: "Uso facial. Siga as orientações e advertências da embalagem.",
    combina: ["SELSAB", "SELPROT"],
    kit: "SELKITOL",
  },
  SELROSA: {
    slug: "serum-rosa-mosqueta",
    titulo: "O clássico rosa mosqueta em versão sérum",
    resumo:
      "Sérum facial Dermachem com 10% de rosa mosqueta e 2% de pró-vitamina B5, em frasco conta-gotas de 30 ml.",
    embalagem: ["Renovação e hidratação", "Brilho e clareamento", "Uniformização da pele"],
    composicao: "10% Óleo de Rosa Mosqueta · 2% Pró-vitamina B5 (Pantenol)",
    caracteristicas: ["30 ml", "Frasco com conta-gotas", "Uso facial"],
    uso: [
      "Com o rosto limpo e seco, aplique algumas gotas.",
      "Espalhe com movimentos suaves até absorver.",
      "Durante o dia, finalize com protetor solar.",
    ],
    indicacao: "Uso facial. Siga as orientações e advertências da embalagem.",
    combina: ["SELMOUS", "SELCREM"],
    kit: "SELKITGL",
  },
  SELCENT: {
    slug: "centella-asiatica-ampoule",
    titulo: "Um toque de calma na sua rotina",
    resumo:
      "Ampola facial Céntia, da Bella Femme, com centella asiática. Frasco conta-gotas de 30 ml.",
    embalagem: ["Acalma e fortalece", "Para todos os tipos de pele"],
    composicao: "Centella Asiática",
    caracteristicas: ["30 ml", "Frasco com conta-gotas", "Todos os tipos de pele (segundo a embalagem)"],
    uso: [
      "Com o rosto limpo e seco, aplique algumas gotas.",
      "Espalhe suavemente até absorver.",
      "Durante o dia, finalize com protetor solar.",
    ],
    indicacao: "Uso facial. Siga as orientações e advertências da embalagem.",
    combina: ["SELMOUS", "SELPROT"],
  },
  SELPROT: {
    slug: "protetor-solar-facial-fps-60",
    titulo: "Proteção FPS 60 com toque seco, sem cor",
    resumo:
      "Protetor solar facial Dermachem FPS 60, proteção UVA e UVB, sem cor, em bisnaga de 40 g. Com niacinamida e vitamina E na fórmula.",
    embalagem: [
      "FPS 60 · UVA + UVB",
      "Toque suave e seco",
      "Rápida absorção",
      "Resistente à água e ao suor",
      "Uso diário",
      "Dermatologicamente testado",
    ],
    composicao: "Niacinamida · Vitamina E",
    caracteristicas: ["40 g", "Sem cor", "Bisnaga"],
    uso: [
      "Aplique como último passo da rotina da manhã.",
      "Espalhe uma quantidade generosa no rosto e no pescoço.",
      "Reaplique ao longo do dia, principalmente após suar ou molhar o rosto.",
    ],
    indicacao: "Uso externo. Siga as orientações e advertências da embalagem.",
    combina: ["SELHIAL", "SELSAB"],
    kit: "SELKITOL",
  },
  SELSAB: {
    slug: "sabonete-facial-acido-salicilico",
    titulo: "Limpeza para pele oleosa, de manhã e à noite",
    resumo:
      "Sabonete líquido facial Dermachem com ácido salicílico, em bisnaga de 100 ml. Na embalagem: indicado para pele oleosa e acneica.",
    embalagem: [
      "Para pele oleosa e acneica",
      "Limpeza intensa e redução do excesso de oleosidade",
      "Dermatologicamente testado",
    ],
    composicao: "Ácido Salicílico",
    caracteristicas: ["100 ml", "Bisnaga", "Uso facial"],
    uso: [
      "Molhe o rosto e aplique uma pequena quantidade.",
      "Massageie com movimentos suaves, evitando a área dos olhos.",
      "Enxágue bem e seque. Use de manhã e à noite.",
    ],
    indicacao: "Pele oleosa e acneica, segundo a embalagem. Siga as advertências do rótulo.",
    combina: ["SELHIAL", "SELPROT"],
    kit: "SELKITOL",
  },
  SELMOUS: {
    slug: "mousse-micelar-rosa-mosqueta",
    titulo: "Espuma macia com escovinha de limpeza",
    resumo:
      "Mousse micelar de limpeza facial Phállebeauty com rosa mosqueta, em frasco de 150 ml com aplicador de cerdas macias.",
    embalagem: [
      "Limpa, nutre e purifica",
      "Suaviza, hidrata e tonifica",
      "Fórmula que equilibra com o pH da pele",
      "Com ácido hialurônico e vitamina E",
    ],
    composicao: "Rosa Mosqueta (Rosehip) · Ácido Hialurônico · Vitamina E",
    caracteristicas: ["150 ml", "Espuma pronta", "Escovinha de silicone no aplicador"],
    uso: [
      "Molhe o rosto e aplique a espuma com a escovinha.",
      "Massageie com movimentos circulares suaves.",
      "Enxágue e seque. Pode usar de manhã e à noite.",
    ],
    indicacao: "Limpeza facial. Siga as orientações e advertências da embalagem.",
    combina: ["SELROSA", "SELCREM"],
    kit: "SELKITGL",
  },
  SELCREM: {
    slug: "creme-rosa-mosqueta-colageno",
    titulo: "Creme facial para fechar a rotina",
    resumo: "Creme facial Florêncio com rosa mosqueta e colágeno, em bisnaga de 50 g da linha facial.",
    embalagem: ["Rosa mosqueta + colágeno", "Linha facial"],
    composicao: "Rosa Mosqueta · Colágeno",
    caracteristicas: ["50 g", "Bisnaga", "Linha facial"],
    uso: [
      "Depois da limpeza e do sérum, aplique uma pequena quantidade.",
      "Espalhe no rosto até absorver.",
      "Durante o dia, finalize com protetor solar.",
    ],
    indicacao: "Uso facial. Siga as orientações e advertências da embalagem.",
    combina: ["SELROSA", "SELMOUS"],
    kit: "SELKITGL",
  },
  SELSABRM: {
    slug: "sabonete-facial-rosa-mosqueta",
    titulo: "Limpeza suave com rosa mosqueta",
    resumo:
      "Sabonete facial Dermachem com extrato de rosa mosqueta e ácido hialurônico, em bisnaga de 100 ml. Na embalagem: para pele sensível e extrasseca.",
    embalagem: ["Para pele sensível e extrasseca", "Limpeza, hidratação e nutrição", "Dermatologicamente testado"],
    composicao: "Extrato de Rosa Mosqueta · Ácido Hialurônico · Solução ionizada de colágeno hidrolisado",
    caracteristicas: ["100 ml", "Bisnaga", "Uso facial"],
    uso: [
      "Molhe o rosto e aplique uma pequena quantidade.",
      "Massageie com movimentos suaves, evitando a área dos olhos.",
      "Enxágue bem e seque.",
    ],
    indicacao: "Pele sensível e extrasseca, segundo a embalagem. Siga as advertências do rótulo.",
    combina: ["SELROSA", "SELCREM"],
  },
  SELESF: {
    slug: "esfoliante-facial-rosa-mosqueta",
    titulo: "O passo de esfoliação da sua rotina",
    resumo:
      "Esfoliante facial Dermachem com óleo de rosa mosqueta e esfoliante da casca de coco, em bisnaga de 100 g. Na embalagem: para pele sensível e extrasseca.",
    embalagem: ["Para pele sensível e extrasseca", "Limpeza, revitalização e hidratação", "Dermatologicamente testado"],
    composicao:
      "Óleo de Rosa Mosqueta · Esfoliante da Casca de Coco · Ácido Hialurônico · Solução ionizada de colágeno hidrolisado",
    caracteristicas: ["100 g", "Bisnaga", "Uso facial"],
    uso: [
      "Com o rosto úmido, aplique uma pequena quantidade.",
      "Massageie com movimentos circulares suaves, evitando a área dos olhos.",
      "Enxágue bem. Siga a frequência de uso indicada no rótulo.",
    ],
    indicacao: "Pele sensível e extrasseca, segundo a embalagem. Siga as advertências do rótulo.",
    combina: ["SELSABRM", "SELCREM"],
  },
  SELOLEO: {
    slug: "oleo-de-rosa-mosqueta",
    titulo: "Rosa mosqueta em óleo, no frasco de 30 ml",
    resumo: "Óleo de rosa mosqueta Apinil, em frasco de 30 ml com bico aplicador.",
    embalagem: ["Óleo de Rosa Mosqueta", "30 ml"],
    composicao: "Óleo de Rosa Mosqueta",
    caracteristicas: ["30 ml", "Frasco com bico aplicador"],
    uso: [
      "Com a pele limpa e seca, aplique algumas gotas.",
      "Massageie suavemente até absorver.",
      "Siga o modo de uso indicado no rótulo.",
    ],
    indicacao: "Uso externo. Siga as orientações e advertências da embalagem.",
    combina: ["SELSABRM", "SELCREM"],
  },
  SELKITOL: {
    slug: "kit-pele-oleosa",
    titulo: "Rotina completa para pele oleosa: limpa, hidrata e protege",
    resumo:
      "Os três passos da rotina em um pedido só, todos da Dermachem: sabonete facial com ácido salicílico (100 ml), sérum de ácido hialurônico 1,5% (30 ml) e protetor solar facial FPS 60 sem cor (40 g).",
    embalagem: [
      "Sabonete: para pele oleosa e acneica",
      "Sérum: 1,5% ácido hialurônico + 0,5% niacinamida",
      "Protetor: FPS 60, toque seco, resistente à água e ao suor",
    ],
    composicao: "3 produtos Dermachem",
    caracteristicas: ["Sabonete 100 ml", "Sérum 30 ml", "Protetor 40 g"],
    uso: [
      "Manhã: sabonete, sérum e protetor solar.",
      "Noite: sabonete e sérum.",
      "Reaplique o protetor ao longo do dia.",
    ],
    indicacao: "Siga as orientações e advertências de cada embalagem.",
    combina: ["SELCENT", "SELMOUS"],
    incluso: ["SELSAB", "SELHIAL", "SELPROT"],
  },
  SELKITGL: {
    slug: "kit-glow-rosa-mosqueta",
    titulo: "Rotina rosa mosqueta: limpeza, sérum e creme",
    resumo:
      "Três passos com rosa mosqueta em um pedido só: mousse micelar Phállebeauty (150 ml), sérum rosa mosqueta Dermachem (30 ml) e creme rosa mosqueta + colágeno Florêncio (50 g).",
    embalagem: [
      "Mousse: limpa, nutre e purifica",
      "Sérum: 10% rosa mosqueta + 2% pró-vitamina B5",
      "Creme: rosa mosqueta + colágeno",
    ],
    composicao: "3 produtos com rosa mosqueta",
    caracteristicas: ["Mousse 150 ml", "Sérum 30 ml", "Creme 50 g"],
    uso: [
      "Limpe o rosto com o mousse.",
      "Aplique algumas gotas do sérum.",
      "Finalize com o creme. Durante o dia, use protetor solar.",
    ],
    indicacao: "Siga as orientações e advertências de cada embalagem.",
    combina: ["SELPROT", "SELCENT"],
    incluso: ["SELMOUS", "SELROSA", "SELCREM"],
  },
};

export const paginaDe = (codigo) =>
  `${import.meta.env.BASE_URL}${DETALHES[codigo] ? DETALHES[codigo].slug : ""}.html`;

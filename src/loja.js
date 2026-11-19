// Organização da loja: categorias, necessidades da pele e filtro compartilhado
// entre o menu de categorias, a seção "Compre pela necessidade" e a vitrine.
import { VITRINE } from "./constants";

// Necessidade da pele -> produtos (só para navegação; as promessas de cada
// produto ficam na página dele, com o que está na embalagem).
export const NECESSIDADES = [
  { id: "oleosa", rotulo: "Pele oleosa e acne", curto: "Oleosidade", codigos: ["SELSAB", "SELHIAL", "SELPROT", "SELESF", "SELKITOL"] },
  { id: "manchas", rotulo: "Manchas e tom", curto: "Manchas", codigos: ["SELROSA", "SELCREMC", "SELOLEO", "SELSABRM", "SELKITGL"] },
  { id: "hidratacao", rotulo: "Hidratação", curto: "Hidratação", codigos: ["SELHIAL", "SELCENT", "SELCREM", "SELSABRM", "SELMOUS", "SELGHK", "SELKITGL"] },
  { id: "antissinais", rotulo: "Antissinais", curto: "Antissinais", codigos: ["SELGHK", "SELCREMC", "SELCREM", "SELKITFI"] },
  { id: "protecao", rotulo: "Proteção solar", curto: "Proteção solar", codigos: ["SELPROT"] },
];

// Abas de categoria da vitrine (passo da rotina).
export const CATEGORIAS = [
  { id: "Todos", rotulo: "Todos" },
  { id: "Sérum", rotulo: "Sérum" },
  { id: "Limpeza", rotulo: "Limpeza" },
  { id: "Hidratante", rotulo: "Hidratante" },
  { id: "Protetor", rotulo: "Protetor solar" },
  { id: "Kits", rotulo: "Kits" },
];

// Aplica um filtro na vitrine e rola até ela. valor = id de categoria ou de necessidade.
export function filtrar(valor) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("selune:filtro", { detail: valor }));
  const el = document.getElementById("produtos");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function produtosDo(filtro) {
  if (!filtro || filtro === "Todos") return [...VITRINE.filter((p) => p.category === "Kits"), ...VITRINE.filter((p) => p.category !== "Kits")];
  if (filtro === "Kits") return VITRINE.filter((p) => p.category === "Kits");
  const n = NECESSIDADES.find((x) => x.id === filtro);
  if (n) return n.codigos.map((c) => VITRINE.find((p) => p.ipayCode === c)).filter(Boolean);
  return VITRINE.filter((p) => p.category === filtro);
}

// Tudo o que aparece na busca: os produtos da vitrine.
export function catalogoBusca(paginaDe) {
  const vitrine = VITRINE.map((p) => ({
    nome: p.name,
    curto: p.shortName,
    marca: p.brand === "Selune" ? "Kit Selune" : p.brand,
    preco: p.price,
    foto: p.photo,
    href: paginaDe(p.ipayCode),
    busca: `${p.name} ${p.tagline} ${p.description} ${p.category} ${NECESSIDADES.filter((n) => n.codigos.includes(p.ipayCode)).map((n) => n.rotulo).join(" ")}`,
  }));
  return vitrine;
}

export const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Carrinho simples da Selune: fica salvo no navegador da cliente (localStorage)
// e é compartilhado entre a loja e as páginas de produto.
import { useEffect, useState } from "react";
import { VITRINE } from "./constants";

const CHAVE = "selune_carrinho";
const ouvintes = new Set();

function ler() {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    return Array.isArray(v) ? v.filter((i) => VITRINE.some((p) => p.ipayCode === i.codigo)) : [];
  } catch {
    return [];
  }
}

let itens = ler();
// Voltou do checkout com pagamento feito: esvazia o carrinho.
try {
  const q = new URLSearchParams(window.location.search);
  if (q.get("compra") === "ok" && (q.get("transaction_nsu") || q.get("receipt_url"))) {
    itens = [];
    localStorage.setItem(CHAVE, "[]");
  }
} catch {}
let aberto = false;

function avisar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(itens));
  } catch {}
  ouvintes.forEach((f) => f());
}

export function adicionar(codigo, q = 1) {
  const i = itens.find((x) => x.codigo === codigo);
  itens = i ? itens.map((x) => (x.codigo === codigo ? { ...x, q: Math.min(9, x.q + q) } : x)) : [...itens, { codigo, q }];
  aberto = true;
  const p = VITRINE.find((x) => x.ipayCode === codigo);
  if (p && typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "AddToCart", {
      content_name: p.name,
      content_ids: [String(p.id)],
      content_type: "product",
      value: p.price,
      currency: "BRL",
    });
  }
  avisar();
}

export function mudarQtd(codigo, q) {
  itens = q <= 0 ? itens.filter((x) => x.codigo !== codigo) : itens.map((x) => (x.codigo === codigo ? { ...x, q: Math.min(9, q) } : x));
  avisar();
}

export function abrirCarrinho(v = true) {
  aberto = v;
  avisar();
}

export function finalizar(botao) {
  const linhas = detalhar();
  const total = linhas.reduce((s, l) => s + l.p.price * l.q, 0);
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", "CliqueComprar", {
      content_ids: linhas.map((l) => String(l.p.id)),
      content_type: "product",
      num_items: linhas.reduce((s, l) => s + l.q, 0),
      value: Number(total.toFixed(2)),
      currency: "BRL",
    });
  }
  if (typeof window !== "undefined" && window.seluneCheckoutCarrinho) {
    window.seluneCheckoutCarrinho(itens, botao);
  } else {
    const msg = `Olá! Quero comprar: ${linhas.map((l) => `${l.q}x ${l.p.shortName}`).join(", ")}. Total R$ ${total.toFixed(2).replace(".", ",")}.`;
    window.location.href = `https://wa.me/5538999659366?text=${encodeURIComponent(msg)}`;
  }
}

function detalhar() {
  return itens
    .map((i) => ({ ...i, p: VITRINE.find((p) => p.ipayCode === i.codigo) }))
    .filter((l) => l.p);
}

export function useCarrinho() {
  const [, setN] = useState(0);
  useEffect(() => {
    const f = () => setN((n) => n + 1);
    ouvintes.add(f);
    const outraAba = (e) => {
      if (e.key === CHAVE) {
        itens = ler();
        f();
      }
    };
    window.addEventListener("storage", outraAba);
    return () => {
      ouvintes.delete(f);
      window.removeEventListener("storage", outraAba);
    };
  }, []);
  const linhas = detalhar();
  return {
    linhas,
    aberto,
    qtd: linhas.reduce((s, l) => s + l.q, 0),
    total: linhas.reduce((s, l) => s + l.p.price * l.q, 0),
  };
}

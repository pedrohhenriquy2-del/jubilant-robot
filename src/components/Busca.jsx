import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { formatPrice } from "../constants";
import { paginaDe } from "../detalhes";
import { catalogoBusca, semAcento, NECESSIDADES, filtrar } from "../loja";

// Busca de produtos em tela cheia: procura por nome, marca, ativo ou necessidade da pele.
export default function Busca({ aberta, fechar, naLoja = true }) {
  const [q, setQ] = useState("");
  const campo = useRef(null);
  const base = import.meta.env.BASE_URL;
  const todos = useMemo(() => catalogoBusca(paginaDe), []);

  useEffect(() => {
    if (!aberta) return;
    setQ("");
    const t = setTimeout(() => campo.current && campo.current.focus(), 50);
    const esc = (e) => e.key === "Escape" && fechar();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [aberta, fechar]);

  if (!aberta) return null;
  const termos = semAcento(q.trim()).split(/\s+/).filter(Boolean);
  const achados = termos.length ? todos.filter((p) => termos.every((t) => semAcento(p.busca).includes(t))) : [];

  const irPara = (id) => {
    fechar();
    if (naLoja) filtrar(id);
    else window.location.href = `${base}#produtos`;
  };

  return (
    <div className="fixed inset-0 z-[70] bg-cream" role="dialog" aria-modal="true" aria-label="Buscar produtos">
      <div className="mx-auto flex h-full max-w-3xl flex-col px-4 pt-4 md:px-6 md:pt-8">
        <div className="flex items-center gap-2">
          <label className="flex min-h-13 flex-1 items-center gap-3 rounded-full border border-beige-dark bg-white px-5 focus-within:border-ink">
            <Search size={20} className="shrink-0 text-ink-soft" aria-hidden="true" />
            <input
              ref={campo}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar sérum, protetor, rosa mosqueta…"
              className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink outline-none placeholder:text-ink-soft/70"
              aria-label="O que você procura?"
            />
          </label>
          <button type="button" onClick={fechar} aria-label="Fechar busca" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-ink hover:bg-offwhite">
            <X size={24} />
          </button>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pb-10">
          {!termos.length && (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Buscar por necessidade</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {NECESSIDADES.map((n) => (
                  <button key={n.id} type="button" onClick={() => irPara(n.id)} className="min-h-10 rounded-full border border-beige-dark bg-white px-4 text-sm font-medium text-ink hover:border-ink">
                    {n.rotulo}
                  </button>
                ))}
              </div>
            </>
          )}

          {termos.length > 0 && (
            <p className="text-sm text-ink-soft" role="status">
              {achados.length ? `${achados.length} ${achados.length === 1 ? "produto encontrado" : "produtos encontrados"}` : "Nenhum produto encontrado. Tente outra palavra ou chame a gente no WhatsApp."}
            </p>
          )}

          <ul className="mt-3 grid gap-2">
            {achados.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="flex items-center gap-3 rounded-2xl border border-beige bg-white p-2 pr-4 hover:border-beige-dark">
                  <img src={p.foto} alt="" width="64" height="64" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-contain" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">{p.marca}</span>
                    <span className="block truncate font-medium text-ink">{p.curto}</span>
                  </span>
                  <span className="shrink-0 font-bold text-ink">{formatPrice(p.preco)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { X, Minus, Plus, Lock, Truck } from "lucide-react";
import { formatPrice, precoPix, VITRINE } from "../constants";
import { DETALHES, paginaDe } from "../detalhes";
import { useCarrinho, mudarQtd, abrirCarrinho, finalizar, adicionar } from "../cart";

// Carrinho lateral: abre ao adicionar um produto. Mostra o total, uma sugestão
// que combina com o que já está no carrinho e um único botão para pagar.
export default function CartDrawer() {
  const { linhas, aberto, qtd, total } = useCarrinho();
  const painel = useRef(null);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e) => e.key === "Escape" && abrirCarrinho(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    painel.current && painel.current.focus();
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  // Sugestão: o primeiro produto que "combina" com algo do carrinho e ainda não está nele.
  const noCarrinho = new Set(linhas.map((l) => l.codigo));
  const kitsDentro = linhas.filter((l) => DETALHES[l.codigo] && DETALHES[l.codigo].incluso).flatMap((l) => DETALHES[l.codigo].incluso);
  const sugestaoCod = linhas
    .flatMap((l) => (DETALHES[l.codigo] && DETALHES[l.codigo].combina) || [])
    .find((c) => !noCarrinho.has(c) && !kitsDentro.includes(c));
  const sugestao = VITRINE.find((p) => p.ipayCode === sugestaoCod);

  // Troca inteligente: com 2 ou mais itens de um kit no carrinho, oferece trocar pelo kit
  // (todos os itens do kit, com frete grátis e mais barato do que comprar separado).
  const troca = VITRINE.filter((k) => DETALHES[k.ipayCode] && DETALHES[k.ipayCode].incluso && !noCarrinho.has(k.ipayCode))
    .map((k) => {
      const inc = DETALHES[k.ipayCode].incluso;
      const dentro = inc.filter((c) => noCarrinho.has(c));
      const pagaHoje = dentro.reduce((s, c) => s + VITRINE.find((x) => x.ipayCode === c).price, 0);
      return { k, inc, dentro, pagaHoje, extra: k.price - pagaHoje, falta: inc.length - dentro.length };
    })
    .filter((t) => t.dentro.length >= 2)
    .sort((a, b) => b.dentro.length - a.dentro.length)[0];

  function trocarPeloKit() {
    troca.dentro.forEach((c) => {
      const l = linhas.find((x) => x.codigo === c);
      mudarQtd(c, l.q - 1);
    });
    adicionar(troca.k.ipayCode);
  }

  return (
    <div className={`fixed inset-0 z-[60] ${aberto ? "" : "pointer-events-none"}`} aria-hidden={!aberto}>
      <div
        className={`absolute inset-0 bg-[#3E1222]/40 transition-opacity duration-300 ${aberto ? "opacity-100" : "opacity-0"}`}
        onClick={() => abrirCarrinho(false)}
      />
      <aside
        ref={painel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Seu carrinho"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl outline-none transition-transform duration-300 ${
          aberto ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <header className="flex items-center justify-between border-b border-beige px-5 py-4">
          <h2 className="font-display text-2xl text-ink">Seu carrinho {qtd > 0 && <span className="font-sans text-sm text-ink-soft">({qtd})</span>}</h2>
          <button type="button" onClick={() => abrirCarrinho(false)} aria-label="Fechar carrinho" className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink">
            <X size={24} />
          </button>
        </header>

        <div className="flex items-center gap-2 bg-offwhite px-5 py-2.5 text-xs font-medium text-ink">
          <Truck size={15} className="text-gold" aria-hidden="true" /> Frete grátis para todo o Brasil em qualquer pedido
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {linhas.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl text-ink">Seu carrinho está vazio</p>
              <p className="mt-2 text-sm text-ink-soft">Que tal começar pelo Kit Rosa Mosqueta? É a rotina completa, com frete grátis.</p>
              <a
                href={`${import.meta.env.BASE_URL}#produtos`}
                onClick={() => abrirCarrinho(false)}
                className="mt-6 inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-white"
              >
                Ver produtos
              </a>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-beige">
              {linhas.map(({ codigo, q, p }) => (
                <li key={codigo} className="flex gap-3 py-4">
                  <a href={paginaDe(codigo)} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-beige bg-white">
                    <img src={p.cover || p.photo} alt="" width="80" height="80" className="h-full w-full object-cover" />
                  </a>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug text-ink">{p.shortName}</p>
                    <p className="text-xs text-ink-soft">{p.tagline}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-beige-dark">
                        <button type="button" aria-label={`Diminuir ${p.shortName}`} onClick={() => mudarQtd(codigo, q - 1)} className="inline-flex h-9 w-9 items-center justify-center text-ink">
                          <Minus size={15} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold" aria-live="polite">{q}</span>
                        <button type="button" aria-label={`Aumentar ${p.shortName}`} onClick={() => mudarQtd(codigo, q + 1)} className="inline-flex h-9 w-9 items-center justify-center text-ink">
                          <Plus size={15} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-ink">{formatPrice(p.price * q)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {troca && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-offwhite to-white p-3">
              <p className="px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                {troca.falta > 0 ? `Falta ${troca.falta === 1 ? "1 item" : `${troca.falta} itens`} para a rotina completa` : "Sai mais barato em kit"}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <img src={troca.k.cover || troca.k.photo} alt="" width="64" height="64" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1 text-sm leading-snug text-ink">
                  <p className="font-semibold">{troca.k.shortName}</p>
                  <p className="text-ink-soft">
                    {troca.extra > 0 ? <>Só <b className="text-ink">+{formatPrice(troca.extra)}</b> e leva o kit todo</> : <>Economize <b className="text-ink">{formatPrice(-troca.extra)}</b> trocando pelo kit</>}
                  </p>
                </div>
              </div>
              <button type="button" onClick={trocarPeloKit} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-cream hover:bg-accent-dark">
                Trocar pelo {troca.k.shortName}
              </button>
            </div>
          )}

          {!troca && sugestao && (
            <div className="mt-4 rounded-2xl border border-gold-light bg-white p-3">
              <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Combina com a sua rotina</p>
              <div className="mt-2 flex items-center gap-3">
                <img src={sugestao.cover || sugestao.photo} alt="" width="56" height="56" className="h-14 w-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug text-ink">{sugestao.shortName}</p>
                  <p className="text-sm text-ink-soft">{formatPrice(sugestao.price)}</p>
                </div>
                <button type="button" onClick={() => adicionar(sugestao.ipayCode)} className="min-h-10 shrink-0 rounded-full border border-ink px-3 text-xs font-semibold text-ink">
                  + Adicionar
                </button>
              </div>
            </div>
          )}
        </div>

        {linhas.length > 0 && (
          <footer className="border-t border-beige bg-white px-5 pb-5 pt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-ink-soft">Total com frete grátis</span>
              <span className="text-xl font-bold text-ink">{formatPrice(total)}</span>
            </div>
            <p className="mt-0.5 text-right text-sm font-semibold text-accent">ou {formatPrice(precoPix(total))} no Pix</p>
            <button
              type="button"
              onClick={(e) => finalizar(e.currentTarget)}
              className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-accent text-base font-semibold tracking-wide text-white hover:bg-accent-dark"
            >
              <Lock size={17} aria-hidden="true" /> Finalizar compra
            </button>
            <p className="mt-2 text-center text-xs text-ink-soft">5% off no Pix · cartão parcelado ou boleto · checkout seguro Yampi</p>
          </footer>
        )}
      </aside>
    </div>
  );
}

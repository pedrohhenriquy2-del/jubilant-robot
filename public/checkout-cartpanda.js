/* Checkout Cartpanda: ao clicar em "Comprar", leva o cliente direto para o
   checkout da Cartpanda com o produto já no carrinho.
   Carrinho com produtos diferentes segue pelo WhatsApp (o link da Cartpanda
   aceita um produto por vez), então nenhuma venda se perde. */
(function () {
  var LOJA = 'https://selune-oficial-com.mycartpanda.com/checkout/';
  var WHATS = 'https://wa.me/5538999659366?text=';

  // código do produto no site -> variante na Cartpanda (v). Sem "v" = pedido pelo WhatsApp.
  var PRODUTOS = {
    PPU38CQHM7L: { d: 'Principia Sérum Mix-01 · 30 ml', p: 2495, v: 214544891 },
    MIX01X2: { d: 'Principia Sérum Mix-01 · 30 ml', p: 2495, v: 214544891, q: 2 },
    MIX01X3: { d: 'Principia Sérum Mix-01 · 30 ml', p: 2495, v: 214544891, q: 3 },
    SELHIAL: { d: 'Sérum Ácido Hialurônico 1,5% Dermachem 30 ml', p: 3490, v: 214544893 },
    SELROSA: { d: 'Sérum Rosa Mosqueta Dermachem 30 ml', p: 3490, v: 214544895 },
    SELCENT: { d: 'Centella Asiática Ampoule Bella Femme 30 ml', p: 4490, v: 214544896 },
    SELPROT: { d: 'Protetor Solar Facial FPS 60 sem cor Dermachem 40 g', p: 4490, v: 214544897 },
    SELSAB: { d: 'Sabonete Facial Ácido Salicílico Dermachem 100 ml', p: 3290, v: 214544898 },
    SELMOUS: { d: 'Mousse Micelar Rosa Mosqueta Phállebeauty 150 ml', p: 3290, v: 214544899 },
    SELCREM: { d: 'Creme Rosa Mosqueta + Colágeno Florêncio 50 g', p: 3490, v: 214544914 },
    SELSABRM: { d: 'Sabonete Facial Rosa Mosqueta Dermachem 100 ml', p: 3290, v: 214544931 },
    SELESF: { d: 'Esfoliante Facial Rosa Mosqueta Dermachem 100 g', p: 3490, v: 214544932 },
    SELOLEO: { d: 'Óleo de Rosa Mosqueta Apinil 30 ml', p: 3290, v: 214544933 },
    SELKITOL: { d: 'Kit Pele Oleosa: Sabonete Ácido Salicílico + Sérum Ácido Hialurônico + Protetor FPS 60', p: 6990, v: 214544934 },
    SELKITGL: { d: 'Kit Glow: Mousse Micelar + Sérum Rosa Mosqueta + Creme Rosa Mosqueta', p: 5990, v: 214544935 },
    KITROTINA: { d: 'Kit Rotina Selune: Sérum Mix-01 + Protetor Solar PS-01', p: 4990, v: 214571430 },
    PPU38CQE87N: { d: 'Principia Protetor Solar Facial PS-01 FPS 60', p: 2990, v: 214571431 },
    PPU38CQEQMT: { d: 'Tônico Principia AL-7 · 120 ml', p: 2650, v: 214571432 },
    PPU38CQE87U: { d: 'Principia Gel de Limpeza Facial GL-01 · 200 g', p: 4550, v: 214571433 },
    PPU38CQEQMQ: { d: 'Principia Creme Hidratante Corporal CH-02 · 454 g', p: 4990, v: 214571434 },
    PPU38CQE85U: { d: 'Kit Avançado VC + RN com GL-01', p: 14550, v: 214571435 }
  };

  var SELETOR = 'a[href*="go.perfectpay.com.br/"], a[data-ipay]';
  function alvo(ev) { return ev.target && ev.target.closest && ev.target.closest(SELETOR); }
  function codigoDe(a) { return a.dataset.ipay || a.href.split('/').pop().split('?')[0]; }
  function reais(c) { return 'R$ ' + (c / 100).toFixed(2).replace('.', ','); }

  // Leva a origem do anúncio (utm_*, fbclid) até o checkout, para a venda ser atribuída à campanha certa.
  function origem() {
    try {
      var q = new URLSearchParams(location.search), keep = new URLSearchParams();
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'src', 'sck'].forEach(function (k) {
        if (q.get(k)) keep.set(k, q.get(k));
      });
      var s = keep.toString();
      return s ? '?' + s : '';
    } catch (e) { return ''; }
  }

  // itens = [{ codigo, q }] -> link do checkout Cartpanda (um produto, qualquer quantidade).
  // O link direto da Cartpanda só aceita um produto por vez; carrinho com produtos
  // diferentes, ou produto que não está na Cartpanda, segue pelo WhatsApp.
  function linkCartpanda(itens) {
    var v = null, q = 0;
    for (var i = 0; i < itens.length; i++) {
      var pr = PRODUTOS[itens[i].codigo];
      if (!pr || !pr.v || (v && v !== pr.v)) return null;
      v = pr.v; q += itens[i].q * (pr.q || 1);
    }
    return v ? LOJA + v + ':' + q + origem() : null;
  }

  function linkWhats(itens) {
    var total = 0;
    var nomes = itens.map(function (i) {
      var pr = PRODUTOS[i.codigo], q = i.q * (pr.q || 1);
      total += pr.p * q;
      return q + 'x ' + pr.d;
    });
    return WHATS + encodeURIComponent('Olá! Quero comprar ' + nomes.join(', ') + ', total ' + reais(total) + '.');
  }

  function ir(itens) {
    var url = linkCartpanda(itens) || linkWhats(itens);
    aviso(url.indexOf(LOJA) === 0 ? 'Abrindo o pagamento seguro…' : 'Abrindo o WhatsApp…');
    window.location.href = url;
  }

  document.addEventListener('click', function (ev) {
    var a = alvo(ev);
    if (!a) return;
    var codigo = codigoDe(a);
    if (!PRODUTOS[codigo]) return;
    ev.preventDefault();
    ir([{ codigo: codigo, q: 1 }]);
  });

  // Carrinho do site com vários produtos: itens = [{ codigo, q }]. Monta um único checkout.
  window.seluneCheckoutCarrinho = function (itens) {
    var lista = (itens || []).filter(function (i) { return PRODUTOS[i.codigo] && i.q > 0; });
    if (lista.length) ir(lista);
  };

  var caixaAviso;
  function aviso(txt) {
    if (!caixaAviso) {
      caixaAviso = document.createElement('div');
      caixaAviso.setAttribute('role', 'status');
      caixaAviso.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:99998;background:#3D2E25;color:#fff;padding:14px 20px;border-radius:14px;font:600 15px/1.3 Montserrat,system-ui,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.28);text-align:center;max-width:86vw';
      document.body.appendChild(caixaAviso);
    }
    caixaAviso.textContent = txt;
    caixaAviso.style.display = txt ? 'block' : 'none';
  }
  // Cliente voltou do checkout pelo botão "voltar": some com o aviso.
  window.addEventListener('pageshow', function () { if (caixaAviso) aviso(''); });
})();

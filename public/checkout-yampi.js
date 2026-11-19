/* Checkout Yampi: ao clicar em "Comprar", leva o cliente para o checkout da Yampi
   (pagamento pelo PagBank, order bump e recuperação de carrinho). */
(function () {
  var LOJA = 'https://selune-oficialcombr.pay.yampi.com.br/r/';
  var TOKENS = {
    SELGHK: 'BK5BCHHEM3',
    SELHIAL: 'QVBWUATNQB',
    SELROSA: 'LXL6MSEIES',
    SELCENT: 'SS8E40ERXD',
    SELPROT: 'TVXDFPNS0P',
    SELSAB: 'JB3J4XV0J9',
    SELMOUS: '3EBJI3HWRQ',
    SELCREM: 'IW1GEIJ3EH',
    SELSABRM: 'KEZBL8RZR3',
    SELESF: 'M995DO0WYQ',
    SELOLEO: 'BRBDROYRSL',
    SELCREMC: '4RIA4EUMQ4',
    SELKITOL: '80N203MGI8',
    SELKITGL: 'QVQ4SJ5EYJ',
    SELKITFI: '4ZUJSCLFEJ',
    SELKITRM: 'FA0GQK8RWK'
  };

  // Limpa o pedido antigo da InfinitePay guardado no navegador (evita o aviso
  // "Conseguiu finalizar sua compra?" que levava para o checkout antigo).
  try { ['selune_pedido', 'selune_registrado', 'selune_dispensado'].forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}

  function codigoDe(a) { return a.dataset.ipay || ''; }

  function ir(url, botao) {
    if (botao && botao.style) { botao.setAttribute('aria-busy', 'true'); botao.style.opacity = '.6'; }
    window.location.href = url;
  }

  // Captura o clique antes do script da InfinitePay.
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a[data-ipay]');
    if (!a) return;
    var token = TOKENS[codigoDe(a)];
    if (!token) return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ir(LOJA + token, a);
  }, true);

  // Carrinho com vários produtos: itens = [{ codigo, q }] -> um único checkout na Yampi.
  var infinitepay = window.seluneCheckoutCarrinho;
  function carrinho(itens, botao) {
    var partes = [], fora = false;
    (itens || []).forEach(function (i) {
      if (!(i.q > 0)) return;
      if (TOKENS[i.codigo]) partes.push(TOKENS[i.codigo] + ':' + i.q);
      else fora = true;
    });
    if (partes.length && !fora) return ir(LOJA + partes.join(','), botao);
    var outro = infinitepay || window.__seluneCarrinhoIpay;
    if (outro) return outro(itens, botao);
  }
  // O script da InfinitePay carrega depois e redefine a função; guardamos a dele e mantemos a nossa.
  Object.defineProperty(window, 'seluneCheckoutCarrinho', {
    configurable: true,
    get: function () { return carrinho; },
    set: function (f) { window.__seluneCarrinhoIpay = f; }
  });

  // Libera o botão quando o cliente volta do checkout pelo "voltar".
  window.addEventListener('pageshow', function () {
    [].forEach.call(document.querySelectorAll('a[data-ipay][aria-busy="true"]'), function (b) {
      b.removeAttribute('aria-busy'); b.style.opacity = '';
    });
  });
})();

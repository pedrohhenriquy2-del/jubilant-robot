/* Checkout InfinitePay: ao clicar em "Comprar", cria o link de pagamento na
   InfinitePay e leva o cliente para lá. Se a InfinitePay não responder,
   segue para o checkout antigo (Perfect Pay), então nenhuma venda se perde. */
(function () {
  var HANDLE = 'pedro-henrique-ps6';
  var SITE = 'https://selune-oficial.com.br/';
  var PRODUTOS = {
    PPU38CQHM7L: { d: 'Principia Sérum Mix-01 · 30 ml', p: 4990 },
    PPU38CQE85U: { d: 'Kit Avançado VC + RN com GL-01', p: 14550 },
    PPU38CQE87N: { d: 'Principia Protetor Solar Facial PS-01 FPS 60', p: 2990 },
    PPU38CQE87U: { d: 'Principia Gel de Limpeza Facial GL-01 · 200 g', p: 4550 },
    PPU38CQEQMQ: { d: 'Principia Creme Hidratante Corporal CH-02 · 454 g', p: 4990 },
    PPU38CQEQMT: { d: 'Tônico Principia AL-7 · 120 ml', p: 2650 }
  };

  function salvar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href*="go.perfectpay.com.br/"]');
    if (!a) return;
    var codigo = a.href.split('/').pop().split('?')[0];
    var prod = PRODUTOS[codigo];
    if (!prod) return;
    ev.preventDefault();
    var fallback = a.href;
    var feito = false;
    function ir(url) { if (!feito) { feito = true; window.location.href = url; } }
    var timer = setTimeout(function () { ir(fallback); }, 7000);
    var pedido = 'selune-' + Date.now().toString(36);
    salvar('selune_pedido', JSON.stringify({ nsu: pedido, valor: prod.p / 100, nome: prod.d }));
    a.style.opacity = '.6';
    fetch('https://api.checkout.infinitepay.io/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        handle: HANDLE,
        items: [{ description: prod.d + ' · Frete grátis', price: prod.p, quantity: 1 }],
        order_nsu: pedido,
        redirect_url: SITE + '?compra=ok'
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        clearTimeout(timer);
        var url = j && (j.url || j.link || j.checkout_url || (j.data && (j.data.url || j.data.link)));
        ir(url || fallback);
      })
      .catch(function () { clearTimeout(timer); ir(fallback); });
  });

  // Volta da InfinitePay depois do pagamento: registra a compra no Pixel e agradece.
  var q = new URLSearchParams(location.search);
  if (q.get('compra') === 'ok' && (q.get('transaction_nsu') || q.get('receipt_url'))) {
    var info = {};
    try { info = JSON.parse(ler('selune_pedido') || '{}'); } catch (e) {}
    if (window.fbq && info.nsu && ler('selune_registrado') !== info.nsu) {
      fbq('track', 'Purchase', { value: info.valor, currency: 'BRL', content_name: info.nome }, { eventID: info.nsu });
      salvar('selune_registrado', info.nsu);
    }
    var box = document.createElement('div');
    box.setAttribute('role', 'status');
    box.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:520px;margin:0 auto;background:#1f3d36;color:#fff;padding:16px 18px;border-radius:14px;font:15px/1.5 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.25)';
    box.innerHTML = '<strong>Pagamento recebido! 💚</strong><br>Obrigada pela compra! Vamos te avisar pelo WhatsApp quando o pedido for enviado.' +
      (q.get('receipt_url') ? '<br><a style="color:#9fe3d3" target="_blank" rel="noopener" href="' + encodeURI(q.get('receipt_url')) + '">Ver comprovante</a>' : '');
    document.body.appendChild(box);
  }
})();

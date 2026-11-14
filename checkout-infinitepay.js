/* Checkout InfinitePay: ao clicar em "Comprar", cria o link de pagamento na
   InfinitePay e leva o cliente para lá. Se a InfinitePay não responder,
   segue para o checkout antigo (Perfect Pay), então nenhuma venda se perde. */
(function () {
  var HANDLE = 'seluneoficial';
  var SITE = 'https://selune-oficial.com.br/';
  var PRODUTOS = {
    // Mix-01: se a InfinitePay falhar, o pedido segue pelo WhatsApp (o link antigo da Perfect Pay cobra outro preço).
    PPU38CQHM7L: { d: 'Principia Sérum Mix-01 · 30 ml', p: 2495, wa: true },
    PPU38CQE85U: { d: 'Kit Avançado VC + RN com GL-01', p: 14550 },
    PPU38CQE87N: { d: 'Principia Protetor Solar Facial PS-01 FPS 60', p: 2990 },
    PPU38CQE87U: { d: 'Principia Gel de Limpeza Facial GL-01 · 200 g', p: 4550 },
    PPU38CQEQMQ: { d: 'Principia Creme Hidratante Corporal CH-02 · 454 g', p: 4990 },
    PPU38CQEQMT: { d: 'Tônico Principia AL-7 · 120 ml', p: 2650 },
    // Kits do Mix-01 (só pela InfinitePay; se ela falhar, o pedido segue pelo WhatsApp)
    MIX01X2: { d: 'Kit 2x Principia Sérum Mix-01 · 30 ml', p: 6990, wa: true },
    MIX01X3: { d: 'Kit 3x Principia Sérum Mix-01 · 30 ml', p: 9990, wa: true },
    // Kit Rotina Selune (Black Friday): Mix-01 + Protetor PS-01
    KITROTINA: { d: 'Kit Rotina Selune: Sérum Mix-01 + Protetor Solar PS-01', p: 4990, wa: true }
  };

  function salvar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var SELETOR = 'a[href*="go.perfectpay.com.br/"], a[data-ipay]';
  var VALIDADE = 10 * 60 * 1000; // um link preparado vale por 10 minutos
  var prontos = {}; // código do produto -> { nsu, quando, promessa }

  function alvo(ev) { return ev.target && ev.target.closest && ev.target.closest(SELETOR); }
  function codigoDe(a) { return a.dataset.ipay || a.href.split('/').pop().split('?')[0]; }

  // Cria o link de pagamento na InfinitePay (uma vez por produto, reaproveitado por 10 minutos).
  function preparar(codigo) {
    var prod = PRODUTOS[codigo];
    if (!prod) return null;
    var p = prontos[codigo];
    if (p && Date.now() - p.quando < VALIDADE) return p;
    var nsu = 'selune-' + Date.now().toString(36);
    p = prontos[codigo] = { nsu: nsu, quando: Date.now(), promessa: null };
    p.promessa = fetch('https://api.checkout.infinitepay.io/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        handle: HANDLE,
        items: [{ description: prod.d + ' · Frete grátis', price: prod.p, quantity: 1 }],
        order_nsu: nsu,
        redirect_url: SITE + '?compra=ok'
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var url = j && (j.url || j.link || j.checkout_url || (j.data && (j.data.url || j.data.link)));
        if (!url) delete prontos[codigo];
        return url || null;
      })
      .catch(function () { delete prontos[codigo]; return null; });
    return p;
  }

  // Adianta o trabalho: quando o cliente encosta ou passa o mouse no botão, o link já começa
  // a ser criado. No clique, o checkout abre na hora em vez de esperar a resposta da InfinitePay.
  function adiantar(ev) { var a = alvo(ev); if (a) preparar(codigoDe(a)); }
  document.addEventListener('pointerdown', adiantar, { passive: true, capture: true });
  document.addEventListener('touchstart', adiantar, { passive: true, capture: true });
  document.addEventListener('mouseover', adiantar, { passive: true, capture: true });
  document.addEventListener('focusin', adiantar, true);

  document.addEventListener('click', function (ev) {
    var a = alvo(ev);
    if (!a) return;
    var codigo = codigoDe(a);
    var prod = PRODUTOS[codigo];
    if (!prod) return;
    ev.preventDefault();
    abrir(a, codigo, prod);
  });

  function abrir(a, codigo, prod) {
    var fallback = prod.wa
      ? 'https://wa.me/5538999659366?text=' + encodeURIComponent('Olá! Quero comprar o ' + prod.d + ' por R$ ' + (prod.p / 100).toFixed(2).replace('.', ',') + '.')
      : (a.href || 'https://go.perfectpay.com.br/' + codigo);
    if (a.getAttribute('aria-busy') === 'true') return;
    var feito = false;
    function ir(url) { if (!feito) { feito = true; window.location.href = url; } }
    var timer = setTimeout(function () { ir(fallback); }, 7000);
    var p = preparar(codigo);
    salvar('selune_pedido', JSON.stringify({ nsu: p.nsu, valor: prod.p / 100, nome: prod.d, codigo: codigo, quando: Date.now() }));
    ocupar(a, true);
    aviso('Abrindo o pagamento seguro…');
    p.promessa.then(function (url) {
      clearTimeout(timer);
      delete prontos[codigo]; // cada link serve para um pedido só
      ir(url || fallback);
    });
  }

  // Mostra que o clique funcionou enquanto o checkout abre, e evita toque duplo.
  function ocupar(a, sim) {
    if (sim) { a.setAttribute('aria-busy', 'true'); a.style.opacity = '.6'; a.style.pointerEvents = 'none'; }
    else { a.removeAttribute('aria-busy'); a.style.opacity = ''; a.style.pointerEvents = ''; }
  }
  var caixaAviso;
  function aviso(txt) {
    if (!caixaAviso) {
      caixaAviso = document.createElement('div');
      caixaAviso.setAttribute('role', 'status');
      caixaAviso.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:99998;background:#1C1B19;color:#fff;padding:14px 20px;border-radius:14px;font:600 15px/1.3 Montserrat,system-ui,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.28);text-align:center;max-width:86vw';
      document.body.appendChild(caixaAviso);
    }
    caixaAviso.textContent = txt;
    caixaAviso.style.display = txt ? 'block' : 'none';
  }

  // Cliente voltou do checkout (botão "voltar"): libera os botões e oferece retomar o pedido.
  window.addEventListener('pageshow', function () {
    [].forEach.call(document.querySelectorAll('a[aria-busy="true"]'), function (b) { ocupar(b, false); });
    if (caixaAviso) aviso('');
    retomar();
  });

  var barra;
  function retomar() {
    if (barra || new URLSearchParams(location.search).get('compra') === 'ok') return;
    var info = {};
    try { info = JSON.parse(ler('selune_pedido') || '{}'); } catch (e) {}
    var prod = info.codigo && PRODUTOS[info.codigo];
    if (!prod || !info.quando || Date.now() - info.quando > 24 * 60 * 60 * 1000) return;
    if (ler('selune_registrado') === info.nsu || ler('selune_dispensado') === info.nsu) return;
    if (!info.conferido) {
      info.conferido = true;
      fetch('https://api.checkout.infinitepay.io/payment_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle: HANDLE, order_nsu: info.nsu })
      })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && j.paid === true) {
            if (window.fbq) fbq('track', 'Purchase', { value: info.valor, currency: 'BRL', content_name: info.nome }, { eventID: info.nsu });
            salvar('selune_registrado', info.nsu);
          } else { mostrarBarra(info, prod); }
        })
        .catch(function () { mostrarBarra(info, prod); });
      return;
    }
  }

  function mostrarBarra(info, prod) {
    if (barra) return;
    var preco = 'R$ ' + (prod.p / 100).toFixed(2).replace('.', ',');
    barra = document.createElement('div');
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Compra em andamento');
    barra.style.cssText = 'position:fixed;left:12px;right:12px;top:12px;z-index:99997;max-width:520px;margin:0 auto;background:#FAFAF8;color:#1C1B19;border:1px solid #E4E1DC;border-radius:16px;padding:14px 14px 12px;font:14px/1.45 Montserrat,system-ui,sans-serif;box-shadow:0 14px 36px rgba(0,0,0,.18)';
    var titulo = document.createElement('b');
    titulo.textContent = 'Conseguiu finalizar sua compra?';
    titulo.style.cssText = 'display:block;font-size:15px;padding-right:28px';
    var texto = document.createElement('span');
    texto.textContent = prod.d + ' · ' + preco + ' com frete grátis. Se ainda não pagou, dá para concluir agora. Se já pagou, é só fechar este aviso.';
    texto.style.cssText = 'display:block;color:#6A665F;margin:2px 0 10px';
    var linha = document.createElement('div');
    linha.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';
    var pagar = document.createElement('button');
    pagar.type = 'button';
    pagar.textContent = 'Finalizar no Pix ou cartão';
    pagar.style.cssText = 'flex:1 1 180px;min-height:46px;border:0;border-radius:12px;background:#2F5D5A;color:#fff;font:700 15px Montserrat,system-ui,sans-serif;cursor:pointer';
    var duvida = document.createElement('a');
    duvida.textContent = 'Tirar dúvida no WhatsApp';
    duvida.href = 'https://wa.me/5538999659366?text=' + encodeURIComponent('Olá! Comecei a compra do ' + prod.d + ' e fiquei com uma dúvida.');
    duvida.target = '_blank'; duvida.rel = 'noopener';
    duvida.style.cssText = 'flex:1 1 160px;min-height:46px;display:flex;align-items:center;justify-content:center;border:1px solid #1C1B19;border-radius:12px;color:#1C1B19;font-weight:600;text-decoration:none';
    var fechar = document.createElement('button');
    fechar.type = 'button';
    fechar.setAttribute('aria-label', 'Fechar');
    fechar.textContent = '×';
    fechar.style.cssText = 'position:absolute;right:6px;top:4px;width:36px;height:36px;border:0;background:none;font-size:24px;line-height:1;color:#6A665F;cursor:pointer';
    function sumir() { salvar('selune_dispensado', info.nsu); if (barra && barra.parentNode) barra.parentNode.removeChild(barra); barra = null; }
    fechar.addEventListener('click', sumir);
    pagar.addEventListener('click', function () {
      if (window.fbq) fbq('track', 'InitiateCheckout', { content_name: prod.d, value: prod.p / 100, currency: 'BRL' });
      abrir(pagar, info.codigo, prod);
    });
    linha.appendChild(pagar); linha.appendChild(duvida);
    barra.appendChild(fechar); barra.appendChild(titulo); barra.appendChild(texto); barra.appendChild(linha);
    document.body.appendChild(barra);
  }

  // Volta da InfinitePay depois do pagamento: registra a compra no Pixel e agradece.
  var q = new URLSearchParams(location.search);
  if (q.get('compra') === 'ok' && (q.get('transaction_nsu') || q.get('receipt_url'))) {
    var info = {};
    try { info = JSON.parse(ler('selune_pedido') || '{}'); } catch (e) {}
    if (window.fbq && info.nsu && ler('selune_registrado') !== info.nsu) {
      fbq('track', 'Purchase', { value: info.valor, currency: 'BRL', content_name: info.nome }, { eventID: info.nsu });
      salvar('selune_registrado', info.nsu);
    }
    // Só mostra o link do comprovante se ele for da própria InfinitePay.
    var recibo = '';
    try {
      var u = new URL(q.get('receipt_url') || '');
      if (u.protocol === 'https:' && /(^|\.)infinitepay\.io$/.test(u.hostname)) recibo = u.href;
    } catch (e) {}
    var fundo = document.createElement('div');
    fundo.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(20,19,18,.55);display:flex;align-items:center;justify-content:center;padding:16px';
    var box = document.createElement('div');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Pagamento recebido');
    box.style.cssText = 'width:100%;max-width:420px;background:#FAFAF8;color:#1C1B19;padding:26px 22px 20px;border-radius:20px;font:15px/1.55 Montserrat,system-ui,sans-serif;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.3)';
    box.innerHTML = '<div style="width:52px;height:52px;margin:0 auto;border-radius:999px;background:#1C1B19;color:#fff;display:flex;align-items:center;justify-content:center"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></div>' +
      '<h2 style="margin:10px 0 6px;font-size:1.3rem">Pagamento recebido!</h2>' +
      '<p style="margin:0 0 6px;color:#6A665F">Obrigada por comprar na Selune. Seu pedido já está com a gente.</p>' +
      '<p style="margin:0 0 16px;color:#6A665F">Vamos te avisar pelo <strong style="color:#1C1B19">WhatsApp</strong> quando ele for enviado, com o código de rastreio.</p>' +
      (recibo ? '<a href="' + recibo + '" target="_blank" rel="noopener" style="display:block;margin-bottom:10px;color:#1C1B19;font-weight:600">Ver comprovante</a>' : '') +
      '<button type="button" style="width:100%;min-height:50px;border:0;border-radius:14px;background:#2F5D5A;color:#fff;font:700 1rem Montserrat,system-ui,sans-serif;cursor:pointer">Continuar no site</button>';
    fundo.appendChild(box);
    function fechar() { if (fundo.parentNode) fundo.parentNode.removeChild(fundo); }
    box.querySelector('button').addEventListener('click', fechar);
    fundo.addEventListener('click', function (e) { if (e.target === fundo) fechar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
    document.body.appendChild(fundo);
    // Limpa o endereço para a mensagem não voltar ao atualizar a página.
    try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {}
  }
})();

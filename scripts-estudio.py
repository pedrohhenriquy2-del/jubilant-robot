"""Gera as fotos de estúdio da Selune a partir das fotos reais dos produtos.

Cada produto (foto original em fundo branco) vai para um cenário bege da marca:
fundo em degradê, arco claro atrás e sombra no chão. O produto não é redesenhado:
é a foto real, só que num cenário igual para toda a loja.

Uso: python3 scripts-estudio.py  (gera public/products/estudio/*.webp)
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter
import numpy as np

ORIG = Path("public/products/novos")
DEST = Path("public/products/estudio")
DEST.mkdir(parents=True, exist_ok=True)
S = 1000  # lado da imagem final


def limpa(nome):
    """Foto original com o fundo quase branco virando branco puro (some no multiply)."""
    im = Image.open(ORIG / f"{nome}.webp").convert("RGB")
    a = np.asarray(im).astype(float)
    t = np.clip((a.min(axis=2) - 226) / 10, 0, 1)[..., None]
    im = Image.fromarray((a * (1 - t) + 255 * t).astype("uint8"))
    caixa = ImageChops.invert(im.convert("L")).point(lambda v: 255 if v > 6 else 0).getbbox()
    return im.crop(caixa)


def cenario(arco_w=0.64):
    """Fundo bege em degradê, arco claro e luz suave."""
    y = np.linspace(0, 1, S)[:, None]
    topo, base = np.array([247, 242, 236]), np.array([236, 226, 214])
    fundo = (topo * (1 - y[..., None]) + base * y[..., None]).repeat(S, axis=1).astype("uint8")
    img = Image.fromarray(fundo)
    arco = Image.new("L", (S, S), 0)
    d = ImageDraw.Draw(arco)
    w = int(S * arco_w)
    x0, x1, y0, y1 = (S - w) // 2, (S + w) // 2, int(S * 0.12), int(S * 0.86)
    d.rounded_rectangle((x0, y0, x1, y1), radius=w // 2, fill=255)
    d.rectangle((x0, y0 + w // 2, x1, y1), fill=255)
    arco = arco.filter(ImageFilter.GaussianBlur(2))
    img.paste(Image.new("RGB", (S, S), (252, 249, 245)), (0, 0), arco)
    # chão: faixa um pouco mais escura embaixo
    chao = Image.new("L", (S, S), 0)
    ImageDraw.Draw(chao).rectangle((0, int(S * 0.86), S, S), fill=16)
    chao = chao.filter(ImageFilter.GaussianBlur(6))
    img = ImageChops.subtract(img, Image.merge("RGB", (chao, chao, chao)))
    return img


def sombra(img, itens):
    """Sombra de contato embaixo de cada produto."""
    camada = Image.new("L", (S, S), 255)
    d = ImageDraw.Draw(camada)
    for cx, base, largura in itens:
        d.ellipse((cx - largura * 0.62, base - 12, cx + largura * 0.62, base + 14), fill=120)
    camada = camada.filter(ImageFilter.GaussianBlur(16))
    return ImageChops.multiply(img, Image.merge("RGB", (camada,) * 3))


def compoe(arquivo, produtos, altura=0.62, espaco=0.30, base=0.86, arco_w=0.64, limite=0.86):
    """produtos: lista de nomes de arquivo (sem .webp). Lado a lado, centralizados."""
    img = cenario(arco_w)
    fotos = [limpa(n) for n in produtos]
    alt = int(S * altura)
    # escala para todos terem a mesma altura máxima, sem passar da largura disponível
    escalas = [alt / f.height for f in fotos]
    larguras = [f.width * e for f, e in zip(fotos, escalas)]
    total = sum(larguras) + espaco * S * 0.1 * (len(fotos) - 1)
    limite = S * limite
    if total > limite:
        k = limite / total
        escalas = [e * k for e in escalas]
        larguras = [l * k for l in larguras]
        total = limite
    x = (S - total) / 2
    y_base = int(S * base)
    itens = []
    posicoes = []
    for f, e, l in zip(fotos, escalas, larguras):
        cx = x + l / 2
        itens.append((cx, y_base, l))
        posicoes.append((f.resize((int(f.width * e), int(f.height * e)), Image.LANCZOS), int(x), y_base))
        x += l + espaco * S * 0.1
    img = sombra(img, itens)
    for f, px, yb in posicoes:
        camada = Image.new("RGB", (S, S), (255, 255, 255))
        camada.paste(f, (px, yb - f.height))
        img = ImageChops.multiply(img, camada)
    img.save(DEST / f"{arquivo}.webp", quality=88)
    print(arquivo, [p for p in produtos])


AVULSOS = [
    "serum-ghk-cu", "serum-hialuronico", "serum-rosa-mosqueta", "centella-ampoule", "protetor-fps60",
    "sabonete-salicilico", "mousse-micelar", "creme-vitamina-c", "sabonete-rosa-mosqueta",
    "esfoliante-rosa-mosqueta", "oleo-rosa-mosqueta", "creme-rosa-mosqueta",
]
for n in AVULSOS:
    compoe(n, [n], altura=0.64)

compoe("kit-pele-oleosa", ["sabonete-salicilico", "serum-hialuronico", "protetor-fps60"], altura=0.52, espaco=0.55, arco_w=0.84, limite=0.78)
compoe("kit-glow", ["mousse-micelar", "serum-rosa-mosqueta", "creme-rosa-mosqueta"], altura=0.52, espaco=0.55, arco_w=0.84, limite=0.78)
compoe("kit-rosa-mosqueta", ["sabonete-rosa-mosqueta", "esfoliante-rosa-mosqueta", "oleo-rosa-mosqueta"], altura=0.52, espaco=0.55, arco_w=0.84, limite=0.78)
compoe("kit-firmeza", ["serum-ghk-cu", "creme-vitamina-c"], altura=0.52, espaco=0.55, arco_w=0.84, limite=0.78)

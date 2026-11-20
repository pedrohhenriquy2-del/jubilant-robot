# Cartões de compartilhamento (1200x630, JPG) para WhatsApp, Instagram e Facebook.
# Rode: python3 scripts-og.py  (lê nome e preço de src/constants.js)
import re
from PIL import Image, ImageDraw, ImageFont
S = 'src/constants.js'; s = open(S).read()
bloco = s[s.index('export const NOVOS_PRODUTOS'):]
SERIF = '/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf'
SANS = '/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'
SANSB = '/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf'
BORDO, INK, CREME, ROSE = (110, 31, 59), (43, 27, 33), (252, 248, 247), (247, 238, 236)

def quebra(txt, fonte, larg, d):
    linhas, l = [], ''
    for p in txt.split():
        t = (l + ' ' + p).strip()
        if d.textlength(t, font=fonte) <= larg: l = t
        else: linhas.append(l); l = p
    return linhas + [l]

def cartao(foto, nome, preco, saida, selo):
    im = Image.new('RGB', (1200, 630), ROSE)
    p = Image.open(foto).convert('RGB').resize((630, 630), Image.LANCZOS)
    im.paste(p, (0, 0))
    d = ImageDraw.Draw(im)
    x = 690
    d.text((x, 92), 'SELUNE OFICIAL', font=ImageFont.truetype(SANSB, 22), fill=BORDO)
    for tam in (60, 54, 48, 44):
        f = ImageFont.truetype(SERIF, tam); f.set_variation_by_axes([600])
        linhas = quebra(nome, f, 460, d)
        if len(linhas) <= 3: break
    y = 150
    for l in linhas:
        d.text((x, y), l, font=f, fill=INK); y += int(tam * 1.17)
    y += 18
    d.text((x, y), f'R$ {preco}', font=ImageFont.truetype(SANSB, 50), fill=INK); y += 74
    sf = ImageFont.truetype(SANS, 24)
    for l in ['Frete grátis para todo o Brasil', '5% off no Pix · nota fiscal']:
        d.text((x, y), l, font=sf, fill=(118, 96, 106)); y += 38
    if selo:
        w = d.textlength(selo, font=ImageFont.truetype(SANSB, 20)) + 40
        d.rounded_rectangle((x, 520, x + w, 566), radius=23, fill=BORDO)
        d.text((x + 20, 530), selo, font=ImageFont.truetype(SANSB, 20), fill=CREME)
    im.save(saida, 'JPEG', quality=86, optimize=True, progressive=True)

for m in re.finditer(r'ipayCode: "(SEL[A-Z]+)"', bloco):
    i = m.start(); tre = bloco[bloco.rfind('{\n    id:', 0, i):i]
    nome = re.search(r'shortName: "([^"]+)"', tre).group(1)
    preco = f"{float(re.search(r'price: ([\d.]+)', tre).group(1)):.2f}".replace('.', ',')
    foto = re.search(r'photo: `\$\{ASSET_BASE\}products/estudio/([a-z0-9-]+)\.webp`', bloco[i:]).group(1)
    selo = 'Kit com frete grátis' if nome.startswith('Kit') else None
    cartao(f'public/products/estudio/{foto}.webp', nome, preco, f'public/og/{foto}.jpg', selo)
    print(foto, nome, preco)

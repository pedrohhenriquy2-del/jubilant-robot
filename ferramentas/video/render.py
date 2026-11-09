import math, os, subprocess, sys, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

W, H, FPS = 1080, 1920, 30
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = '/home/claude/jubilant-robot/public'
FD = '/usr/share/fonts/truetype/google-fonts/'

INK = (21, 33, 31); BG = (247, 250, 249); SOFT = (235, 243, 241); BLUSH = (214, 236, 231)
ACC = (14, 124, 112); PEACH = (127, 216, 198); TEAL = (14, 124, 112); GREEN = (14, 124, 112)
MUTED = (71, 87, 85); WHITE = (255, 255, 255)

_fc = {}
def F(w, s):
    k = (w, s)
    if k not in _fc:
        _fc[k] = ImageFont.truetype(FD + f'Poppins-{w}.ttf', s)
    return _fc[k]

def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def prog(t, a, b): return clamp((t - a) / (b - a))
def eo(x): return 1 - (1 - x) ** 3
def eback(x):
    c1 = 1.70158; c3 = c1 + 1
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2

prod = Image.open(REPO + '/products/mix-01.webp').convert('RGB')
mao1 = Image.open(REPO + '/products/mix-01-mao-1.webp').convert('RGB')
mao2 = Image.open(REPO + '/products/mix-01-mao-2.webp').convert('RGB')

def vgrad(c1, c2):
    g = Image.new('RGB', (1, 256))
    for y in range(256):
        f = y / 255
        g.putpixel((0, y), tuple(int(c1[i] + (c2[i] - c1[i]) * f) for i in range(3)))
    return g.resize((W, H), Image.BICUBIC)

def radial(base, glow, cx, cy, r, strength=1.0):
    img = Image.new('RGB', (W, H), base)
    m = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(m)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=int(255 * strength))
    m = m.filter(ImageFilter.GaussianBlur(r * 0.45))
    img.paste(Image.new('RGB', (W, H), glow), (0, 0), m)
    return img

BG1 = radial(INK, (12, 84, 76), W // 2, 1180, 620, 0.9)
BG2 = vgrad((244, 249, 248), BLUSH)
BG3 = Image.new('RGB', (W, H), BG)
BG5 = radial(SOFT, (198, 232, 224), W // 2, 620, 700, 1.0)

def rounded_mask(size, r):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), r, fill=255)
    return m

def shadow(canvas, box, r, blur=40, alpha=70, dy=24):
    x0, y0, x1, y1 = box
    pad = blur * 2
    sh = Image.new('L', (x1 - x0 + pad * 2, y1 - y0 + pad * 2), 0)
    ImageDraw.Draw(sh).rounded_rectangle((pad, pad, pad + x1 - x0, pad + y1 - y0), r, fill=alpha)
    sh = sh.filter(ImageFilter.GaussianBlur(blur))
    canvas.paste(Image.new('RGB', sh.size, (15, 40, 36)), (x0 - pad, y0 - pad + dy), sh)

def card_product(canvas, cx, cy, size, alpha=1.0, r=48):
    size = int(size)
    im = prod.resize((size, size), Image.LANCZOS)
    box = (cx - size // 2, cy - size // 2, cx - size // 2 + size, cy - size // 2 + size)
    if alpha >= 0.99:
        shadow(canvas, box, r)
    m = rounded_mask((size, size), r)
    if alpha < 1: m = m.point(lambda v: int(v * alpha))
    canvas.paste(im, box[:2], m)

def multiply_product(canvas, cx, cy, size):
    size = int(size)
    im = prod.resize((size, size), Image.LANCZOS)
    x, y = cx - size // 2, cy - size // 2
    region = canvas.crop((x, y, x + size, y + size))
    canvas.paste(ImageChops.multiply(region, im), (x, y))

def text_w(s, font):
    b = font.getbbox(s); return b[2] - b[0]

def draw_text(canvas, s, font, x, y, fill, alpha=1.0, anchor='mm', dy=0):
    if alpha <= 0: return
    if alpha >= 0.999:
        ImageDraw.Draw(canvas).text((x, y + dy), s, font=font, fill=fill, anchor=anchor)
        return
    layer = Image.new('L', canvas.size, 0)
    ImageDraw.Draw(layer).text((x, y + dy), s, font=font, fill=int(255 * alpha), anchor=anchor)
    canvas.paste(Image.new('RGB', canvas.size, fill), (0, 0), layer)

def draw_rich(canvas, parts, font, cx, y, alpha=1.0, dy=0):
    total = sum(text_w(p, font) for p, _ in parts)
    x = cx - total / 2
    for p, col in parts:
        draw_text(canvas, p, font, x, y, col, alpha, anchor='lm', dy=dy)
        x += text_w(p, font)

def pill(canvas, cx, cy, s, font, bg, fg, padx=34, h=74, alpha=1.0, scale=1.0):
    w = int((text_w(s, font) + padx * 2) * scale); h2 = int(h * scale)
    layer = Image.new('RGBA', (w, h2), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((0, 0, w - 1, h2 - 1), h2 // 2, fill=bg + (255,))
    f2 = font if scale == 1.0 else ImageFont.truetype(font.path, max(8, int(font.size * scale)))
    d.text((w / 2, h2 / 2), s, font=f2, fill=fg, anchor='mm')
    if alpha < 1:
        a = layer.split()[3].point(lambda v: int(v * alpha)); layer.putalpha(a)
    canvas.paste(layer, (int(cx - w / 2), int(cy - h2 / 2)), layer)

# ---------- cenas ----------
def s1(t):  # 0-3s gancho
    c = BG1.copy()
    p = eo(prog(t, 0.0, 1.2))
    size = 760 * (1.18 - 0.18 * p) + 20 * math.sin(t * 1.4) * 0
    card_product(c, W // 2, int(1230 + 60 * (1 - p)), size, alpha=clamp(p * 1.6))
    lines = [
        [('Sua pele sofre', WHITE)],
        [('com ', WHITE), ('oleosidade,', PEACH)],
        [('acne ', PEACH), ('e ', WHITE), ('manchas?', PEACH)],
    ]
    f = F('Bold', 88)
    for i, ln in enumerate(lines):
        q = eo(prog(t, 0.15 + i * 0.28, 0.6 + i * 0.28))
        draw_rich(c, ln, f, W // 2, 330 + i * 118, alpha=q, dy=int(40 * (1 - q)))
    return c

drops = [(random.Random(i).uniform(150, 930), random.Random(i * 7).uniform(0, 1.6), random.Random(i * 13).uniform(16, 30)) for i in range(9)]
def drop(canvas, x, y, r):
    lay = Image.new('RGBA', (int(r * 2.4), int(r * 3.4)), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    w, h = lay.size
    d.ellipse((w / 2 - r, h - 2 * r - 2, w / 2 + r, h - 2), fill=(214, 150, 70, 200))
    d.polygon([(w / 2, 2), (w / 2 - r * 0.92, h - r * 1.4), (w / 2 + r * 0.92, h - r * 1.4)], fill=(214, 150, 70, 200))
    d.ellipse((w / 2 - r * 0.45, h - r * 1.5, w / 2 - r * 0.05, h - r * 1.05), fill=(255, 245, 225, 230))
    canvas.paste(lay, (int(x - w / 2), int(y - h / 2)), lay)

def s2(t):  # 3-7s apresentação
    c = BG2.copy()
    p = eo(prog(t, 0, 0.8))
    size = 960 * (1.0 + 0.07 * t / 4) * (0.9 + 0.1 * p)
    multiply_product(c, W // 2, int(860 - 14 * math.sin(t * 1.6)), size)
    for x, st, r in drops:
        tt = t - st
        if tt < 0: continue
        y = -60 + (tt * 520) ** 1.0 * 1.0 + 0.5 * 900 * tt * tt
        if y < 1700: drop(c, x, y, r)
    q = eo(prog(t, 0.5, 1.1))
    draw_text(c, 'Principia Sérum Mix-01', F('Bold', 76), W // 2, 1440, INK, q, dy=int(36 * (1 - q)))
    q2 = eo(prog(t, 0.8, 1.4))
    draw_text(c, '4 ativos em um único frasco · 30 ml', F('Medium', 44), W // 2, 1530, MUTED, q2, dy=int(30 * (1 - q2)))
    return c

ACT = [('5%', 'Niacinamida', 'Controla a oleosidade e o brilho'),
       ('4%', 'Ácido glicólico', 'Renova a textura e traz viço'),
       ('3%', 'Ácido tranexâmico', 'Ajuda a uniformizar o tom'),
       ('2%', 'Ácido salicílico', 'Ajuda a desobstruir os poros')]
def s3(t):  # 7-11s ativos
    c = BG3.copy()
    q = eo(prog(t, 0, 0.5))
    draw_text(c, '4 ativos que cuidam', F('Bold', 72), W // 2, 300, INK, q, dy=int(30 * (1 - q)))
    draw_text(c, 'da sua pele', F('Bold', 72), W // 2, 392, ACC, q, dy=int(30 * (1 - q)))
    for i, (pct, name, desc) in enumerate(ACT):
        a = eo(prog(t, 0.45 + i * 0.38, 0.95 + i * 0.38))
        if a <= 0: continue
        y0 = 520 + i * 250
        x0 = 90 + int(260 * (1 - a))
        box = (x0, y0, x0 + 900, y0 + 210)
        lay = Image.new('RGBA', (900, 210), (0, 0, 0, 0))
        d = ImageDraw.Draw(lay)
        d.rounded_rectangle((0, 0, 899, 209), 36, fill=WHITE + (255,), outline=(220, 231, 228, 255), width=3)
        d.text((60, 105), pct, font=F('Bold', 92), fill=TEAL, anchor='lm')
        d.text((270, 82), name, font=F('Bold', 46), fill=INK, anchor='lm')
        d.text((270, 140), desc, font=F('Regular', 34), fill=MUTED, anchor='lm')
        if a < 1:
            al = lay.split()[3].point(lambda v: int(v * a)); lay.putalpha(al)
        c.paste(lay, box[:2], lay)
    return c

def photo_scene(img, t, dur, caption):
    bg = img.resize((W, int(W * img.height / img.width)), Image.BICUBIC)
    bg = bg.resize((int(bg.width * 1.15), int(bg.height * 1.15))).crop((0, 0, W, H)) if bg.height >= H else bg.resize((int(H * img.width / img.height), H)).crop((0, 0, W, H))
    bg = bg.filter(ImageFilter.GaussianBlur(30))
    bg = Image.blend(bg, Image.new('RGB', (W, H), INK), 0.45)
    c = bg
    z = 1.0 + 0.06 * (t / dur)
    pw = int(820 * z); ph = int(pw * img.height / img.width)
    im = img.resize((pw, ph), Image.LANCZOS).filter(ImageFilter.UnsharpMask(2, 80, 2))
    x, y = (W - pw) // 2, 820 - ph // 2 + 40
    shadow(c, (x, y, x + pw, y + ph), 44, alpha=110)
    c.paste(im, (x, y), rounded_mask((pw, ph), 44))
    q = eo(prog(t, 0.15, 0.6))
    pill(c, W // 2, 1600, caption, F('Bold', 44), WHITE, INK, padx=44, h=100, alpha=q)
    return c

def s4(t):  # 11-14.5s fotos reais
    if t < 1.75:
        return photo_scene(mao1, t, 1.75, 'Produto original Principia')
    return photo_scene(mao2, t - 1.75, 1.75, 'Chega em 3 a 7 dias úteis')

def s5(t):  # 14.5-18.5s oferta
    c = BG5.copy()
    p = eo(prog(t, 0, 0.6))
    card_product(c, W // 2, int(560 + 40 * (1 - p)), 600 * (0.92 + 0.08 * p), alpha=clamp(p * 1.5), r=44)
    q = eo(prog(t, 0.25, 0.65))
    pill(c, W // 2, 190, 'OFERTA BLACK FRIDAY', F('Bold', 40), INK, PEACH, padx=40, h=90, alpha=q)
    q2 = eo(prog(t, 0.55, 0.95))
    s = 'No site oficial R$ 74,00'
    fo = F('Medium', 50)
    draw_text(c, s, fo, W // 2, 990, MUTED, q2, dy=int(24 * (1 - q2)))
    if q2 > 0.5:
        wv = text_w('R$ 74,00', fo); x0 = W // 2 - text_w(s, fo) / 2 + text_w('No site oficial ', fo)
        ImageDraw.Draw(c).line((x0, 994, x0 + wv, 994), fill=MUTED, width=5)
    ps = eback(prog(t, 0.85, 1.35))
    if ps > 0:
        fz = int(185 * ps)
        draw_rich(c, [('R$ ', GREEN)], F('Bold', max(10, int(80 * ps))), W // 2 - text_w('23,99', F('Bold', max(10, fz))) / 2 - 10, 1140, 1.0) if False else None
        draw_text(c, 'R$ 23,99', F('Bold', max(10, fz)), W // 2, 1135, GREEN, clamp(ps))
    q3 = eo(prog(t, 1.3, 1.7))
    draw_text(c, 'Frete grátis para todo o Brasil', F('Bold', 46), W // 2, 1290, INK, q3, dy=int(20 * (1 - q3)))
    q4 = eo(prog(t, 1.6, 2.0))
    if q4 > 0:
        pulse = 1.0 + 0.045 * max(0.0, math.sin((t - 2.0) * 5.2)) if t > 2.0 else 1.0
        pill(c, W // 2, 1450, 'Compre agora', F('Bold', 54), ACC, WHITE, padx=110, h=130, alpha=q4, scale=pulse)
    q5 = eo(prog(t, 2.0, 2.4))
    draw_text(c, '7 dias para desistir · Pix, cartão ou PicPay', F('Medium', 34), W // 2, 1580, MUTED, q5)
    return c

SCENES = [('s1', s1, 3.0), ('s2', s2, 4.0), ('s3', s3, 4.0), ('s4', s4, 3.5), ('s5', s5, 4.0)]

def render(name, fn, dur, out_dir):
    tmp = os.path.join(out_dir, f'{name}.tmp.mp4'); final = os.path.join(out_dir, f'{name}.mp4')
    n = int(round(dur * FPS))
    fade = 0.18
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
           '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', str(FPS), tmp]
    pr = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(n):
        t = i / FPS
        img = fn(t)
        if name != 's1' and t < fade:  # entrada rápida a partir do fim da cena anterior
            img = Image.blend(Image.new('RGB', (W, H), INK), img, t / fade) if name in ('s4',) else img
        pr.stdin.write(img.tobytes())
    pr.stdin.close()
    if pr.wait() == 0: os.replace(tmp, final)
    else: sys.exit(f'falhou {name}')

if __name__ == '__main__':
    out = os.path.join(HERE, 'out'); os.makedirs(out, exist_ok=True)
    if len(sys.argv) > 1 and sys.argv[1] == 'frames':
        for name, fn, dur in SCENES:
            for t in [dur * 0.3, dur - 0.05]:
                fn(t).save(os.path.join(out, f'{name}_{t:.2f}.jpg'), quality=85)
        sys.exit()
    for name, fn, dur in SCENES:
        render(name, fn, dur, out)
    with open(os.path.join(out, 'list.txt'), 'w') as f:
        for name, _, _ in SCENES: f.write(f"file '{name}.mp4'\n")
    subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', os.path.join(out, 'list.txt'), '-c', 'copy', '-movflags', '+faststart', os.path.join(out, 'mix-01-black-friday.mp4')])
    print('ok')

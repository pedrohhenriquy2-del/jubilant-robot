# Trilha original sintetizada (sem direitos de terceiros) para o vídeo de 18,5 s.
import numpy as np, wave, sys

SR = 44100
DUR = 18.5
N = int(SR * DUR)
BPM = 116
BEAT = 60 / BPM
DROP = 3.0          # entram a bateria e o baixo (início da cena 2)
PRICE = 14.5 + 0.85 # momento em que o preço aparece
rng = np.random.default_rng(7)
t_all = np.arange(N) / SR

def midi(n): return 440.0 * 2 ** ((n - 69) / 12)

def env_adsr(n, a, d, s, r, sr=SR):
    a, d, r = int(a * sr), int(d * sr), int(r * sr)
    sus = max(0, n - a - d - r)
    e = np.concatenate([np.linspace(0, 1, a, False), np.linspace(1, s, d, False), np.full(sus, s), np.linspace(s, 0, r)])
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))

def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc; y[i] = acc
    return y

def lp_fast(x, cutoff, passes=2):
    # filtro de média móvel repetido (rápido em numpy)
    k = max(1, int(SR / (cutoff * 2.2)))
    ker = np.ones(k) / k
    for _ in range(passes): x = np.convolve(x, ker, mode='same')
    return x

def place(buf, sig, start):
    i = int(start * SR)
    if i >= len(buf): return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[:j - i]

mix_pad = np.zeros(N); mix_bass = np.zeros(N); mix_drums = np.zeros(N); mix_pluck = np.zeros(N); mix_fx = np.zeros(N)

# Progressão: Cmaj7 - Am7 - Fmaj7 - G6 (1 compasso cada)
CHORDS = [[48, 55, 59, 64], [45, 52, 55, 60], [41, 48, 52, 57], [43, 50, 52, 59]]
BAR = 4 * BEAT
nbars = int(np.ceil(DUR / BAR)) + 1

# --- pad
for b in range(nbars):
    st = b * BAR
    if st >= DUR: break
    ch = CHORDS[b % 4]
    n = int(BAR * SR * 1.05)
    tt = np.arange(n) / SR
    sig = np.zeros(n)
    for note in ch:
        f = midi(note + 12)
        for det in (-0.12, 0.0, 0.12):
            ph = 2 * np.pi * f * 2 ** (det / 12) * tt
            sig += (np.sin(ph) + 0.35 * np.sin(2 * ph) + 0.15 * np.sin(3 * ph))
    sig = sig / 12 * env_adsr(n, 0.35, 0.3, 0.8, 0.5)
    place(mix_pad, sig, st)
mix_pad = lp_fast(mix_pad, 2600)
# intro abafada que abre no drop
open_env = np.clip((t_all - 0.0) / DROP, 0, 1) ** 2 * 0.6 + 0.4
mix_pad *= np.where(t_all < DROP, open_env, 1.0)

# --- baixo (colcheias a partir do drop)
for b in range(nbars):
    root = CHORDS[b % 4][0] - 12
    for k in range(8):
        st = b * BAR + k * BEAT / 2
        if st < DROP or st >= DUR: continue
        n = int(BEAT / 2 * SR)
        tt = np.arange(n) / SR
        f = midi(root + (12 if k in (3, 7) else 0))
        s = np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt)
        s = np.tanh(1.6 * s) * env_adsr(n, 0.005, 0.08, 0.6, 0.06)
        place(mix_bass, s * 0.55, st)

# --- bateria
def kick():
    n = int(0.35 * SR); tt = np.arange(n) / SR
    f = 45 + 95 * np.exp(-tt * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-tt * 9) * 1.0
def hat(dec=55):
    n = int(0.08 * SR); tt = np.arange(n) / SR
    s = rng.standard_normal(n); s = s - lp_fast(s, 6000, 1)
    return s * np.exp(-tt * dec) * 0.22
def clap():
    n = int(0.22 * SR); tt = np.arange(n) / SR
    s = rng.standard_normal(n); s = lp_fast(s, 3500, 1) - lp_fast(s, 900, 1)
    e = np.exp(-tt * 18) * (1 + 0.6 * (np.sin(2 * np.pi * 90 * tt) > 0) * (tt < 0.03))
    return s * e * 0.75
K, Hh, C = kick(), hat(), clap()
beat_i = 0
t = DROP
while t < DUR - 0.05:
    pos = int(round((t - DROP) / BEAT)) % 4
    place(mix_drums, K, t)
    if pos in (1, 3): place(mix_drums, C, t)
    place(mix_drums, Hh * 0.8, t + BEAT / 2)
    place(mix_drums, Hh * 0.45, t + BEAT * 0.75)
    t += BEAT
# hats suaves na intro
t = 0.0
while t < DROP - 0.1:
    place(mix_drums, Hh * 0.35, t + BEAT / 2); t += BEAT

# --- pluck (arpejo em semicolcheias)
for b in range(nbars):
    ch = CHORDS[b % 4]
    notes = [ch[1] + 24, ch[2] + 24, ch[3] + 24, ch[2] + 24]
    for k in range(16):
        st = b * BAR + k * BEAT / 4
        if st >= DUR: continue
        if st < DROP and k % 2: continue
        n = int(0.32 * SR); tt = np.arange(n) / SR
        f = midi(notes[k % 4])
        ph = 2 * np.pi * f * tt
        s = (2 / np.pi) * np.arcsin(np.sin(ph)) + 0.25 * np.sin(2 * ph)
        s *= np.exp(-tt * 14) * (0.9 if k % 4 == 0 else 0.6)
        place(mix_pluck, s * 0.22, st)

# --- efeitos: riser antes do drop, impacto no drop e no preço, whoosh nas trocas
def riser(dur):
    n = int(dur * SR); tt = np.arange(n) / SR
    s = rng.standard_normal(n); s = s - lp_fast(s, 1500, 1)
    return s * (tt / dur) ** 2.2 * 0.35
def impact(level=1.0):
    n = int(1.6 * SR); tt = np.arange(n) / SR
    f = 38 + 70 * np.exp(-tt * 10)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 3.2)
    nz = lp_fast(rng.standard_normal(n), 2500, 1) * np.exp(-tt * 4.5) * 0.5
    return (boom + nz) * level
def whoosh(dur=0.45):
    n = int(dur * SR); tt = np.arange(n) / SR
    s = lp_fast(rng.standard_normal(n), 3000, 1) - lp_fast(rng.standard_normal(n), 300, 1) * 0
    e = np.sin(np.pi * tt / dur) ** 2
    return s * e * 0.28
place(mix_fx, riser(1.4), DROP - 1.4)
place(mix_fx, impact(0.9), DROP)
for ts in (7.0, 11.0, 14.5):
    place(mix_fx, whoosh(), ts - 0.22)
place(mix_fx, impact(0.75), PRICE)

# --- reverb simples (pentes em paralelo)
def reverb(x, mix=0.25):
    out = np.zeros_like(x)
    for d, g in ((0.0297, .78), (0.0371, .76), (0.0411, .74), (0.0437, .72)):
        k = int(d * SR); y = x.copy()
        for _ in range(6):
            y = np.concatenate([np.zeros(k), y[:-k]]) * g + x
        out += y
    out = lp_fast(out / 4, 5000, 1)
    return x * (1 - mix) + out * mix * 0.5

# duck no pad/pluck com o bumbo (sidechain leve)
duck = np.ones(N)
t = DROP
while t < DUR:
    i = int(t * SR); n = int(0.22 * SR)
    seg = 1 - 0.45 * np.exp(-np.arange(n) / SR * 14)
    j = min(N, i + n); duck[i:j] = np.minimum(duck[i:j], seg[:j - i])
    t += BEAT

mus = reverb(mix_pad * duck * 0.9 + mix_pluck * duck, 0.35) + mix_bass + mix_drums * 0.9 + reverb(mix_fx, 0.4)
# saída do volume no fim
fo = 1.2
mus *= np.clip((DUR - t_all) / fo, 0, 1)
mus *= np.clip(t_all / 0.05, 0, 1)
# soft clip + normaliza
mus = np.tanh(mus / (np.max(np.abs(mus)) * 0.85) * 1.2)
mus = mus / np.max(np.abs(mus)) * 0.89
# leve estéreo: atraso de 9 ms num canal para o pad
L = mus; R = np.concatenate([np.zeros(int(0.009 * SR)), mus[:-int(0.009 * SR)]]) * 0.5 + mus * 0.5
st = (np.stack([L, R], 1) * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok')

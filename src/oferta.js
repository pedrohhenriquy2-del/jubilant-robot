// Fase da oferta, pelo relógio de Brasília. O site troca os textos sozinho:
// "bf" até 01/12 23:59 · "natal" até 14/12 23:59 (prazo para chegar antes do Natal) · "normal" depois.
const FIM_BF = new Date("2026-12-01T23:59:59-03:00").getTime();
const FIM_NATAL = new Date("2026-12-14T23:59:59-03:00").getTime();

export function fase(agora = Date.now()) {
  if (agora <= FIM_BF) return "bf";
  if (agora <= FIM_NATAL) return "natal";
  return "normal";
}

export const porFase = (textos) => textos[fase()] ?? textos.normal;

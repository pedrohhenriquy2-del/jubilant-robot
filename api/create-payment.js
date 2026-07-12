// Função serverless (Vercel) que recebe os dados do Payment Brick no
// frontend e cria o pagamento de verdade no Mercado Pago usando o
// Access Token secreto (nunca exposto no navegador).
import { MercadoPagoConfig, Payment } from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método não permitido" });
    return;
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    res.status(500).json({ error: "MERCADOPAGO_ACCESS_TOKEN não configurado" });
    return;
  }

  const client = new MercadoPagoConfig({ accessToken });
  const payment = new Payment(client);

  const {
    token,
    issuer_id,
    payment_method_id,
    installments,
    transaction_amount,
    description,
    payer,
  } = req.body || {};

  try {
    const result = await payment.create({
      body: {
        token,
        issuer_id,
        payment_method_id,
        installments,
        transaction_amount,
        description,
        payer,
      },
    });

    res.status(200).json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Erro ao processar pagamento" });
  }
}

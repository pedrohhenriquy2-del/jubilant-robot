import { useEffect, useState } from "react";
import { initMercadoPago, Payment, StatusScreen } from "@mercadopago/sdk-react";
import { XCircle } from "lucide-react";

const PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;

let initialized = false;

export default function CheckoutBrick({ amount, description }) {
  const [paymentId, setPaymentId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (PUBLIC_KEY && !initialized) {
      initMercadoPago(PUBLIC_KEY, { locale: "pt-BR" });
      initialized = true;
    }
  }, []);

  if (!PUBLIC_KEY) {
    return (
      <p className="text-sm text-ink-soft text-center">
        Checkout indisponível no momento. Chave pública do Mercado Pago não
        configurada.
      </p>
    );
  }

  if (paymentId) {
    return <StatusScreen initialization={{ paymentId }} />;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <XCircle size={18} />
          {error}
        </div>
      )}
      <Payment
        initialization={{ amount }}
        customization={{
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            bankTransfer: "all",
            ticket: "all",
          },
        }}
        onSubmit={async ({ formData }) => {
          setError(null);
          try {
            const res = await fetch("/api/create-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...formData, description }),
            });
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || "Não foi possível processar o pagamento.");
            }
            setPaymentId(data.id);
          } catch (err) {
            setError(err.message);
          }
        }}
        onError={(err) => {
          console.error(err);
          setError("Ocorreu um erro ao carregar o checkout. Tente novamente.");
        }}
      />
    </div>
  );
}

import { Suspense } from "react";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Ödeme — Puki",
  description: "Planınızı tamamlayın ve iyzico ile güvenli ödeme yapın.",
};

export default function OdemePage() {
  return (
    <div className="container-p py-12">
      <div className="mb-8">
        <span className="eyebrow">Güvenli ödeme</span>
        <h1 className="mt-2 text-3xl font-extrabold text-ink tracking-tight">Siparişinizi tamamlayın</h1>
        <p className="text-muted mt-1">Bilgilerinizi girin, iyzico'nun güvenli ödeme ekranına geçin.</p>
      </div>
      <Suspense fallback={<div className="text-muted">Yükleniyor…</div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function PayByRef({ refCode }: { refCode: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const pay = async () => {
    setBusy(true); setErr(null);
    try {
      const r = await fetch("/api/checkout/init-by-ref", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: refCode }),
      });
      const d = await r.json();
      if (!r.ok || !d.paymentPageUrl) throw new Error(d.error || "Ödeme başlatılamadı.");
      window.location.href = d.paymentPageUrl;
    } catch (e: any) {
      setErr(e.message);
      setBusy(false);
    }
  };

  return (
    <div>
      <button onClick={pay} disabled={busy}
        className="w-full text-base font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3.5 rounded-xl shadow-soft disabled:opacity-50">
        {busy ? "Ödeme sayfasına yönlendiriliyor…" : "Güvenli ödeme yap"}
      </button>
      {err && <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</div>}
      <p className="text-xs text-muted mt-3 text-center">iyzico ile güvenli ödeme. Kart bilgileriniz Puki'de saklanmaz.</p>
    </div>
  );
}

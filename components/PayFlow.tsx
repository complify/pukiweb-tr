"use client";

import { useEffect, useState } from "react";
import { fmt } from "@/lib/catalog";

export default function PayFlow({
  refCode, monthlyTotal, annualMonths, offerAnnual, company,
}: {
  refCode: string;
  monthlyTotal: number;
  annualMonths: number;
  offerAnnual: boolean;
  company: string;
}) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [inv, setInv] = useState({
    type: "corporate" as "corporate" | "individual",
    title: company, taxId: "", taxOffice: "", address: "", city: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [embed, setEmbed] = useState<string | null>(null);

  const total = billing === "annual" ? monthlyTotal * annualMonths : monthlyTotal;
  const setF = (k: keyof typeof inv) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInv((s) => ({ ...s, [k]: e.target.value }));
  const inp = "mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none";

  // iyzico embed (checkoutFormContent) script'lerini çalıştır
  useEffect(() => {
    if (!embed) return;
    const holder = document.createElement("div");
    holder.innerHTML = embed;
    const appended: HTMLScriptElement[] = [];
    holder.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      if (old.src) s.src = old.src; else s.text = old.textContent || "";
      s.async = false;
      document.body.appendChild(s);
      appended.push(s);
    });
    return () => { appended.forEach((s) => s.remove()); };
  }, [embed]);

  const pay = async () => {
    setErr(null);
    if (!inv.title.trim() || !inv.taxId.trim() || !inv.address.trim() || !inv.city.trim()) {
      setErr("Fatura için ünvan, VKN/TCKN, adres ve il zorunludur."); return;
    }
    if (inv.type === "corporate" && !inv.taxOffice.trim()) {
      setErr("Kurumsal fatura için vergi dairesi zorunludur."); return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/checkout/subscription-init", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: refCode, billing, invoice: inv }),
      });
      const d = await r.json();
      if (!r.ok || !d.checkoutFormContent) throw new Error(d.error || "Ödeme başlatılamadı.");
      setEmbed(d.checkoutFormContent);
    } catch (e: any) {
      setErr(e.message); setBusy(false);
    }
  };

  // Ödeme ekranı (iyzico embed)
  if (embed) {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold text-ink">Kart bilgileri</div>
          <div className="text-sm font-semibold text-puki-dark">{fmt(total)}<span className="text-xs text-muted">{billing === "annual" ? "/yıl" : "/ay"}</span></div>
        </div>
        <div id="iyzipay-checkout-form" className="responsive" />
        <p className="text-xs text-muted mt-3 text-center">iyzico ile güvenli ödeme · {billing === "annual" ? "yıllık" : "aylık"} otomatik yenilenir, istediğiniz zaman iptal edebilirsiniz.</p>
      </div>
    );
  }

  const optCard = (val: "monthly" | "annual", title: string, amount: number, sub: string, note?: string) => {
    const on = billing === val;
    return (
      <button type="button" onClick={() => setBilling(val)}
        className={`flex-1 text-left rounded-xl2 border-2 px-4 py-3.5 transition-colors ${on ? "border-puki bg-puki-light/40" : "border-[#e7ebf1] hover:border-[#cdd4df]"}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">{title}</span>
          <span className={`w-4 h-4 rounded-full border-2 ${on ? "border-puki bg-puki" : "border-[#cdd4df]"}`} />
        </div>
        <div className="mt-1.5 text-xl font-extrabold text-ink">{fmt(amount)}<span className="text-xs font-semibold text-muted">{sub}</span></div>
        {note && <div className="text-[.7rem] font-bold text-puki-dark mt-0.5">{note}</div>}
      </button>
    );
  };

  return (
    <div className="mt-6">
      {offerAnnual ? (
        <>
          <div className="text-sm font-bold text-ink mb-2">Ödeme dönemi</div>
          <div className="flex gap-3">
            {optCard("monthly", "Aylık", monthlyTotal, "/ay", "otomatik yenilenir")}
            {optCard("annual", "Yıllık", monthlyTotal * annualMonths, "/yıl", "2 ay bedava")}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between rounded-xl2 border border-[#e7ebf1] px-4 py-3">
          <span className="text-sm font-semibold text-[#5e6278]">Aylık abonelik</span>
          <span className="text-lg font-extrabold text-ink">{fmt(monthlyTotal)}<span className="text-xs text-muted">/ay</span></span>
        </div>
      )}

      <div className="mt-6">
        <div className="text-sm font-bold text-ink mb-3">Fatura bilgileri</div>
        <div className="flex gap-2 mb-3">
          {(["corporate", "individual"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setInv((s) => ({ ...s, type: t }))}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border ${inv.type === t ? "bg-puki text-white border-puki" : "bg-white text-[#5e6278] border-[#e3e7ee]"}`}>
              {t === "corporate" ? "Kurumsal" : "Bireysel"}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block sm:col-span-2"><span className="text-sm font-semibold text-ink">{inv.type === "corporate" ? "Şirket ünvanı" : "Ad Soyad"} *</span>
            <input value={inv.title} onChange={setF("title")} className={inp} /></label>
          <label className="block"><span className="text-sm font-semibold text-ink">{inv.type === "corporate" ? "VKN" : "TCKN"} *</span>
            <input value={inv.taxId} onChange={setF("taxId")} className={inp} /></label>
          {inv.type === "corporate" && (
            <label className="block"><span className="text-sm font-semibold text-ink">Vergi dairesi *</span>
              <input value={inv.taxOffice} onChange={setF("taxOffice")} className={inp} /></label>
          )}
          <label className="block sm:col-span-2"><span className="text-sm font-semibold text-ink">Adres *</span>
            <input value={inv.address} onChange={setF("address")} className={inp} /></label>
          <label className="block"><span className="text-sm font-semibold text-ink">İl *</span>
            <input value={inv.city} onChange={setF("city")} className={inp} /></label>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl2 bg-[#f9fbf5] border border-[#e7ebf1] px-4 py-3">
        <span className="font-bold text-ink">İlk tahsilat</span>
        <span className="text-2xl font-extrabold text-puki-dark">{fmt(total)}<span className="text-sm text-muted font-semibold">{billing === "annual" ? "/yıl" : "/ay"}</span></span>
      </div>

      {err && <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</div>}

      <button onClick={pay} disabled={busy}
        className="mt-4 w-full text-base font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3.5 rounded-xl shadow-soft disabled:opacity-50">
        {busy ? "Hazırlanıyor…" : "Aboneliği başlat & öde"}
      </button>
      <p className="text-xs text-muted mt-3 text-center">{billing === "annual" ? "Yıllık" : "Aylık"} otomatik yenilenir · istediğiniz zaman iptal edebilirsiniz · iyzico güvencesiyle.</p>
    </div>
  );
}

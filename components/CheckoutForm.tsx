"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATALOG, fmt, moduleByCode, monthlyPrice, quote, type Billing } from "@/lib/catalog";
import PaymentMarks from "@/components/PaymentMarks";

export default function CheckoutForm() {
  const sp = useSearchParams();
  const modules = (sp.get("modules") || "").split(",").map((s) => s.trim()).filter((c) => moduleByCode(c));
  const seats = Math.max(1, Math.min(CATALOG.maxSelfServiceSeats, Number(sp.get("seats")) || 5));
  const region: "tr" | "eu" = sp.get("region") === "eu" ? "eu" : "tr";
  const billing: Billing = sp.get("billing") === "annual" ? "annual" : "monthly";
  const promo = sp.get("promo") || null;

  const q = quote(modules, seats, billing, promo);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", company: "", taxId: "", address: "", city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!modules.length) { setError("Plan bulunamadı. Lütfen fiyatlandırmadan tekrar seçin."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modules, seats, region, billing, promo, customer: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ödeme başlatılamadı.");
      if (data.paymentPageUrl) { window.location.href = data.paymentPageUrl; return; }
      throw new Error("iyzico ödeme sayfası alınamadı.");
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
      setLoading(false);
    }
  };

  const inputCls = "w-full border-[1.5px] border-[#e7ebf1] focus:border-puki outline-none rounded-xl px-3.5 py-2.5 text-sm";

  if (!modules.length) {
    return (
      <div className="text-center py-16">
        <p className="text-muted">Plan bilgisi bulunamadı.</p>
        <a href="/fiyatlandirma" className="inline-block mt-4 font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft">Fiyatlandırmaya dön</a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] items-start">
      {/* Form */}
      <form onSubmit={submit} className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card">
        <div className="px-5 py-4 border-b border-[#eef1f6] font-bold text-ink">Fatura & iletişim bilgileri</div>
        <div className="p-5 grid sm:grid-cols-2 gap-4">
          <label className="text-sm"><span className="font-semibold text-ink">Ad *</span><input required value={form.firstName} onChange={set("firstName")} className={`${inputCls} mt-1`} /></label>
          <label className="text-sm"><span className="font-semibold text-ink">Soyad *</span><input required value={form.lastName} onChange={set("lastName")} className={`${inputCls} mt-1`} /></label>
          <label className="text-sm sm:col-span-2"><span className="font-semibold text-ink">E-posta *</span><input required type="email" value={form.email} onChange={set("email")} className={`${inputCls} mt-1`} placeholder="Giriş bilgileri bu adrese gönderilecek" /></label>
          <label className="text-sm"><span className="font-semibold text-ink">Telefon</span><input value={form.phone} onChange={set("phone")} className={`${inputCls} mt-1`} placeholder="+90..." /></label>
          <label className="text-sm"><span className="font-semibold text-ink">Şirket *</span><input required value={form.company} onChange={set("company")} className={`${inputCls} mt-1`} /></label>
          <label className="text-sm"><span className="font-semibold text-ink">Vergi/TC No</span><input value={form.taxId} onChange={set("taxId")} className={`${inputCls} mt-1`} /></label>
          <label className="text-sm"><span className="font-semibold text-ink">Şehir</span><input value={form.city} onChange={set("city")} className={`${inputCls} mt-1`} /></label>
          <label className="text-sm sm:col-span-2"><span className="font-semibold text-ink">Adres</span><input value={form.address} onChange={set("address")} className={`${inputCls} mt-1`} /></label>
        </div>
        {error && <div className="mx-5 mb-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>}
        <div className="px-5 pb-5">
          <button disabled={loading} className="w-full py-3.5 rounded-xl font-extrabold text-white bg-puki hover:bg-puki-dark shadow-soft disabled:bg-[#cbd5e1] disabled:shadow-none">
            {loading ? "iyzico'ya yönlendiriliyor…" : `Güvenli ödemeye geç · ${fmt(q.total)}`}
          </button>
          <div className="mt-4 flex items-center justify-center gap-3 opacity-90"><PaymentMarks /></div>
          <p className="text-[.72rem] text-muted mt-3 text-center leading-relaxed">
            Ödeme, iyzico'nun güvenli altyapısı üzerinden alınır; kart bilgileriniz Puki'de tutulmaz.
            Ödeme sonrası siparişiniz onaylanınca giriş bilgileriniz e-posta ile gönderilir.
          </p>
        </div>
      </form>

      {/* Özet */}
      <div className="lg:sticky lg:top-24 bg-white border border-[#e7ebf1] rounded-xl2 shadow-card">
        <div className="px-5 py-4 border-b border-[#eef1f6] font-bold text-ink">Sipariş özeti</div>
        <div className="p-5">
          {modules.map((c) => {
            const m = moduleByCode(c)!;
            const monthly = monthlyPrice([c], seats);
            const v = billing === "annual" ? monthly * CATALOG.annualMonths : monthly;
            return (
              <div key={c} className="flex justify-between py-1.5 text-sm border-b border-dashed border-[#eef1f6]">
                <span className="text-[#5e6278]">Puki {m.name}</span>
                <span className="font-bold text-ink">{fmt(v)}</span>
              </div>
            );
          })}
          {q.discount > 0 && (
            <div className="flex justify-between py-2 text-sm text-puki-dark font-bold border-b border-dashed border-[#eef1f6]">
              <span>İndirim ({q.promo})</span><span>−{fmt(q.discount)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline mt-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-muted">{billing === "annual" ? "Yıllık toplam" : "Aylık toplam"}</span>
            <span className="text-2xl font-extrabold text-ink">{fmt(q.total)}</span>
          </div>
          <div className="mt-4 text-xs text-muted space-y-1">
            <div>Kullanıcı: <b className="text-ink">{seats}</b></div>
            <div>Bölge: <b className="text-ink">{region === "eu" ? "Avrupa (EU)" : "Türkiye (TR)"}</b></div>
            <div>Dönem: <b className="text-ink">{billing === "annual" ? "Yıllık" : "Aylık"}</b></div>
          </div>
          <a href="/fiyatlandirma" className="mt-4 inline-block text-sm font-bold text-puki-dark hover:text-puki">← Planı düzenle</a>
        </div>
      </div>
    </div>
  );
}

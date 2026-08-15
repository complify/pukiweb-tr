"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATALOG, monthlyPrice, fmt, moduleByCode } from "@/lib/catalog";

type Sel = Record<string, number>; // code -> fiyat (₺)

export default function AdminQuoteForm() {
  const sp = useSearchParams();
  const [customer, setCustomer] = useState(() => {
    const name = (sp.get("name") || "").trim();
    const parts = name.split(/\s+/).filter(Boolean);
    return {
      firstName: sp.get("firstName") || parts[0] || "",
      lastName: sp.get("lastName") || parts.slice(1).join(" ") || "",
      email: sp.get("email") || "",
      phone: sp.get("phone") || "",
      company: sp.get("company") || "",
      taxId: "",
    };
  });
  const [region, setRegion] = useState<"tr" | "eu">("tr");
  const [offerAnnual, setOfferAnnual] = useState(true);
  const [seats, setSeats] = useState(5);
  const [sel, setSel] = useState<Sel>(() => {
    const codes = (sp.get("modules") || "").split(",").map((x) => x.trim()).filter(Boolean);
    const init: Sel = {};
    for (const code of codes) { if (moduleByCode(code)) init[code] = monthlyPrice([code], 5); }
    return init;
  });
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string; link: string; emailed: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const annualMonths = CATALOG.annualMonths;
  const suggested = (code: string) => monthlyPrice([code], seats);

  const toggle = (code: string) =>
    setSel((cur) => {
      const next = { ...cur };
      if (code in next) delete next[code];
      else next[code] = suggested(code);
      return next;
    });

  const recalc = () =>
    setSel((cur) => {
      const next: Sel = {};
      for (const code of Object.keys(cur)) next[code] = suggested(code);
      return next;
    });

  const total = useMemo(() => Object.values(sel).reduce((s, n) => s + (Number(n) || 0), 0), [sel]);
  const setField = (k: keyof typeof customer) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCustomer((c) => ({ ...c, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!customer.firstName.trim() || !customer.email.trim() || !customer.company.trim()) {
      setErr("Ad, e-posta ve şirket zorunludur."); return;
    }
    if (!Object.keys(sel).length) { setErr("En az bir modül ekleyin."); return; }
    setBusy(true);
    try {
      const lineItems = Object.entries(sel).map(([code, price]) => ({ code, price: Number(price) || 0 }));
      const r = await fetch("/api/admin/quotes", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, region, seats, offerAnnual, lineItems, note }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Teklif oluşturulamadı.");
      setDone({ ref: d.ref, link: d.link, emailed: d.emailed });
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!done) return;
    try { await navigator.clipboard.writeText(done.link); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  if (done) {
    return (
      <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8 text-center max-w-xl">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-puki-light grid place-items-center">
          <svg className="w-7 h-7 text-puki-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="mt-5 text-2xl font-extrabold text-ink tracking-tight">Teklif oluşturuldu</h2>
        <p className="text-[#5e6278] mt-2">
          Teklif no <b className="text-puki-dark">{done.ref}</b>. {done.emailed ? "Ödeme linki müşteriye e-posta ile gönderildi." : "E-posta gönderilemedi (SENDGRID_API_KEY yok/hatalı) — linki manuel iletebilirsiniz."}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <input readOnly value={done.link} className="flex-1 rounded-xl border border-[#e3e7ee] px-3 py-2.5 text-sm text-[#5e6278]" />
          <button onClick={copy} className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-2.5 rounded-xl shrink-0">{copied ? "Kopyalandı" : "Kopyala"}</button>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/admin" className="text-sm font-semibold text-[#5e6278] hover:text-ink border border-[#e7ebf1] px-4 py-2 rounded-lg">Siparişlere dön</a>
          <button onClick={() => { setDone(null); setSel({}); setCustomer({ firstName:"", lastName:"", email:"", phone:"", company:"", taxId:"" }); setNote(""); }}
            className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-2 rounded-lg">Yeni teklif</button>
        </div>
      </div>
    );
  }

  const inp = "mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none";

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-5 gap-6 items-start">
      {/* SOL: müşteri + modüller */}
      <div className="lg:col-span-3 space-y-5">
        <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
          <div className="font-bold text-ink mb-4">Müşteri bilgileri</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block"><span className="text-sm font-semibold text-ink">Ad *</span><input value={customer.firstName} onChange={setField("firstName")} className={inp} /></label>
            <label className="block"><span className="text-sm font-semibold text-ink">Soyad</span><input value={customer.lastName} onChange={setField("lastName")} className={inp} /></label>
            <label className="block"><span className="text-sm font-semibold text-ink">E-posta *</span><input type="email" value={customer.email} onChange={setField("email")} className={inp} /></label>
            <label className="block"><span className="text-sm font-semibold text-ink">Telefon</span><input value={customer.phone} onChange={setField("phone")} className={inp} /></label>
            <label className="block"><span className="text-sm font-semibold text-ink">Şirket *</span><input value={customer.company} onChange={setField("company")} className={inp} /></label>
            <label className="block"><span className="text-sm font-semibold text-ink">Vergi/TC No</span><input value={customer.taxId} onChange={setField("taxId")} className={inp} /></label>
          </div>
        </div>

        <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-ink">Modüller & fiyat</div>
            <button type="button" onClick={recalc} className="text-xs font-bold text-puki-dark hover:text-puki">↻ Fiyatları yeniden hesapla</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <label className="block"><span className="text-xs font-semibold text-muted uppercase tracking-wide">Bölge</span>
              <select value={region} onChange={(e) => setRegion(e.target.value as any)} className={inp}><option value="tr">Türkiye</option><option value="eu">Avrupa</option></select></label>
            <label className="block"><span className="text-xs font-semibold text-muted uppercase tracking-wide">Kullanıcı</span>
              <input type="number" min={1} value={seats} onChange={(e) => setSeats(Math.max(1, Number(e.target.value) || 1))} className={inp} /></label>
          </div>
          <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
            <input type="checkbox" checked={offerAnnual} onChange={(e) => setOfferAnnual(e.target.checked)} className="w-4 h-4 accent-puki" />
            <span className="text-sm font-semibold text-ink">Yıllık ödeme seçeneği de sun <span className="text-muted font-normal">(müşteri aylık/yıllık seçer · 2 ay bedava)</span></span>
          </label>
          <div className="text-xs text-muted mb-3">Fiyatları <b>aylık birim</b> olarak girin; yıllık tutar otomatik hesaplanır.</div>
          <div className="space-y-2">
            {CATALOG.modules.map((m) => {
              const on = m.code in sel;
              return (
                <div key={m.code} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${on ? "border-puki bg-puki-light/40" : "border-[#eef1f6]"}`}>
                  <button type="button" onClick={() => toggle(m.code)}
                    className={`w-5 h-5 rounded-md border grid place-items-center shrink-0 ${on ? "bg-puki border-puki text-white" : "border-[#cdd4df] text-transparent"}`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-ink text-sm leading-tight">Puki {m.name}</div>
                    <div className="text-[.7rem] text-muted">{m.iso}</div>
                  </div>
                  {on ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input type="number" min={0} value={sel[m.code]}
                        onChange={(e) => setSel((c) => ({ ...c, [m.code]: Math.max(0, Number(e.target.value) || 0) }))}
                        className="w-28 rounded-lg border border-[#e3e7ee] px-2.5 py-1.5 text-right text-ink focus:border-puki outline-none" />
                      <span className="text-sm text-muted">₺/ay</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted shrink-0">≈ {fmt(suggested(m.code))}/ay</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-ink">Not (opsiyonel — dahili)</span>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className={inp} />
        </label>
      </div>

      {/* SAĞ: özet */}
      <div className="lg:col-span-2 lg:sticky lg:top-24">
        <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
          <div className="font-bold text-ink mb-3">Teklif özeti</div>
          <div className="space-y-2 text-sm">
            {Object.keys(sel).length === 0 && <div className="text-muted">Henüz modül eklenmedi.</div>}
            {Object.entries(sel).map(([code, price]) => (
              <div key={code} className="flex items-center justify-between">
                <span className="text-[#5e6278]">Puki {moduleByCode(code)?.name || code}</span>
                <span className="font-semibold text-ink">{fmt(Number(price) || 0)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-ink">
            <span className="font-extrabold text-ink">Aylık toplam</span>
            <span className="text-xl font-extrabold text-puki-dark">{fmt(total)}<span className="text-sm text-muted font-semibold">/ay</span></span>
          </div>
          {offerAnnual && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-semibold text-[#5e6278]">Yıllık <span className="text-muted font-normal">(2 ay bedava)</span></span>
              <span className="text-sm font-bold text-ink">{fmt(total * annualMonths)}<span className="text-xs text-muted font-semibold">/yıl</span></span>
            </div>
          )}
          <div className="text-xs text-muted mt-2 text-right">{seats} kullanıcı · {region.toUpperCase()} · fatura bilgisi ödemede alınır</div>

          {err && <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</div>}

          <button type="submit" disabled={busy}
            className="mt-5 w-full text-base font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft disabled:opacity-50">
            {busy ? "Oluşturuluyor…" : "Teklif oluştur & link gönder"}
          </button>
          <p className="text-xs text-muted mt-2 text-center">Müşteriye ödeme linki e-posta ile gider; linki kopyalayıp elle de iletebilirsiniz.</p>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { CATALOG, fmt, monthlyPrice, quote, type Billing } from "@/lib/catalog";

export default function PricingConfigurator() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["bgys"]));
  const [seats, setSeats] = useState(5);
  const [region, setRegion] = useState<"tr" | "eu">("tr");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoMsg, setPromoMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const codes = [...selected];
  const q = quote(codes, seats, billing, promoApplied);
  const warn = seats >= CATALOG.maxSelfServiceSeats;

  const toggle = (code: string) => {
    const n = new Set(selected);
    n.has(code) ? n.delete(code) : n.add(code);
    setSelected(n);
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const test = quote(codes.length ? codes : ["bgys"], seats, billing, code);
    if (test.promo) {
      setPromoApplied(code);
      setPromoMsg({ ok: true, text: `✓ ${code} uygulandı.` });
    } else {
      setPromoApplied(null);
      setPromoMsg({ ok: false, text: "Geçersiz veya süresi dolmuş kod." });
    }
  };

  const checkout = () => {
    if (!codes.length) return;
    // Planı checkout sayfasına taşı → iyzico ödeme → onay kuyruğu → /api/provision.
    const params = new URLSearchParams({
      modules: codes.join(","),
      seats: String(seats),
      region,
      billing,
    });
    if (q.promo) params.set("promo", q.promo);
    window.location.href = `/odeme?${params.toString()}`;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px] items-start">
      {/* Sol: seçim */}
      <div className="space-y-5">
        <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card">
          <div className="px-5 py-4 border-b border-[#eef1f6] font-bold text-ink">1 · Modülleri seçin</div>
          <div className="p-5 grid sm:grid-cols-2 gap-3">
            {CATALOG.modules.map((m) => {
              const on = selected.has(m.code);
              return (
                <button
                  key={m.code}
                  onClick={() => toggle(m.code)}
                  className={`text-left relative border-[1.5px] rounded-xl p-4 transition ${
                    on ? "border-puki bg-puki-light2 shadow-soft" : "border-[#e7ebf1] hover:border-[#c9d8ad] bg-white"
                  }`}
                >
                  <span
                    className={`absolute top-3 right-3 w-[22px] h-[22px] rounded-full grid place-items-center text-xs text-white ${
                      on ? "bg-puki border-puki" : "bg-white border-2 border-[#e7ebf1]"
                    }`}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <div className="text-[.68rem] font-extrabold uppercase tracking-widest text-puki-dark">{m.iso}</div>
                  <div className="font-extrabold text-ink text-base mt-1">{m.name}</div>
                  <div className="text-sm text-[#5e6278] mt-2">
                    <b className="text-ink">{fmt(m.basePrice)}</b>/ay <span className="text-muted text-xs">· 1-5 kullanıcı</span>
                  </div>
                  <div className="text-muted text-xs">+{fmt(m.perUser)}/ek kullanıcı</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card">
          <div className="px-5 py-4 border-b border-[#eef1f6] font-bold text-ink">2 · Kullanıcı sayısı & bölge</div>
          <div className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-ink">Kullanıcı sayısı</div>
                <div className={`text-xs ${warn ? "text-amber-600" : "text-muted"}`}>
                  {warn ? "10+ kullanıcı için kurumsal teklif — bize ulaşın." : "İlk 5 kullanıcı standart fiyata dahildir."}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setSeats((s) => Math.max(1, s - 1))} className="w-10 h-10 rounded-xl border-[1.5px] border-[#e7ebf1] hover:border-puki hover:bg-puki-light text-xl font-extrabold text-puki-dark">−</button>
                <span className="text-2xl font-extrabold text-ink w-9 text-center">{seats}</span>
                <button onClick={() => setSeats((s) => Math.min(CATALOG.maxSelfServiceSeats, s + 1))} className="w-10 h-10 rounded-xl border-[1.5px] border-[#e7ebf1] hover:border-puki hover:bg-puki-light text-xl font-extrabold text-puki-dark">+</button>
              </div>
            </div>
            <hr className="my-4 border-[#eef1f6]" />
            <div className="flex items-center justify-between gap-4">
              <div className="font-bold text-ink">Veri bölgesi</div>
              <div className="inline-flex border border-[#e7ebf1] rounded-xl overflow-hidden">
                {(["tr", "eu"] as const).map((r) => (
                  <button key={r} onClick={() => setRegion(r)} className={`px-4 py-2 text-sm font-bold ${region === r ? "bg-puki text-white" : "bg-white text-[#7e8299]"}`}>
                    {r === "tr" ? "🇹🇷 Türkiye" : "🇪🇺 Avrupa (EU)"}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs text-muted mt-2">
              {region === "eu"
                ? "Hesabınız eu.pukisoft.com üzerinde açılır; verileriniz Avrupa Birliği'nde (GDPR) tutulur."
                : "Hesabınız tr.pukisoft.com üzerinde açılır; verileriniz Türkiye'de tutulur."}
            </div>
          </div>
        </div>
      </div>

      {/* Sağ: özet */}
      <div className="lg:sticky lg:top-24 bg-white border border-[#e7ebf1] rounded-xl2 shadow-card">
        <div className="px-5 py-4 border-b border-[#eef1f6] font-bold text-ink">Özet</div>
        <div className="p-5">
          <div className="flex bg-[#f1f4f8] rounded-xl p-1 mb-4">
            {(["monthly", "annual"] as const).map((b) => (
              <button key={b} onClick={() => setBilling(b)} className={`flex-1 py-2 rounded-lg text-sm font-extrabold ${billing === b ? "bg-white text-ink shadow" : "text-[#7e8299]"}`}>
                {b === "monthly" ? "Aylık" : "Yıllık"}
                {b === "annual" && <span className="ml-1.5 text-[.62rem] bg-puki-light text-puki-dark px-2 py-0.5 rounded-full">2 ay bedava</span>}
              </button>
            ))}
          </div>

          {codes.length === 0 ? (
            <div className="text-muted text-sm py-2">Henüz modül seçmediniz.</div>
          ) : (
            codes.map((c) => {
              const m = CATALOG.modules.find((x) => x.code === c)!;
              const monthly = monthlyPrice([c], seats);
              const v = billing === "annual" ? monthly * CATALOG.annualMonths : monthly;
              return (
                <div key={c} className="flex justify-between py-1.5 text-sm border-b border-dashed border-[#eef1f6]">
                  <span className="text-[#5e6278]">{m.name}</span>
                  <span className="font-bold text-ink">{fmt(v)}</span>
                </div>
              );
            })
          )}

          {q.discount > 0 && (
            <div className="flex justify-between py-2 text-sm text-puki-dark font-bold border-b border-dashed border-[#eef1f6]">
              <span>İndirim ({q.promo})</span>
              <span>−{fmt(q.discount)}</span>
            </div>
          )}

          <div className="flex gap-2 my-3">
            <input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyPromo()}
              placeholder="Promosyon kodu"
              className="flex-1 border-[1.5px] border-[#e7ebf1] focus:border-puki outline-none rounded-xl px-3 py-2 text-sm uppercase"
            />
            <button onClick={applyPromo} className="bg-ink hover:bg-black text-white rounded-xl px-4 font-bold text-sm">Uygula</button>
          </div>
          {promoMsg && <div className={`text-xs mb-2 ${promoMsg.ok ? "text-puki-dark" : "text-red-600"}`}>{promoMsg.text}</div>}

          <div className="flex justify-between items-baseline mt-3">
            <span className="text-xs uppercase tracking-wider font-extrabold text-muted">{billing === "annual" ? "Yıllık toplam" : "Aylık toplam"}</span>
            <span className="text-3xl font-extrabold text-ink">{codes.length ? fmt(q.total) : "—"}</span>
          </div>
          {codes.length > 0 && billing === "annual" && (
            <div className="text-right text-xs text-muted mt-1">≈ {fmt(q.total / 12)}/ay eşdeğeri</div>
          )}

          <button
            onClick={checkout}
            disabled={codes.length === 0}
            className="w-full mt-4 py-3.5 rounded-xl font-extrabold text-white bg-puki hover:bg-puki-dark shadow-soft disabled:bg-[#cbd5e1] disabled:shadow-none"
          >
            Devam et
          </button>
          <p className="text-[.72rem] text-muted mt-2.5 text-center leading-relaxed">
            Ödeme sonrası hesabınız onaylanıp giriş bilgileriniz e-posta ile gönderilir.
          </p>
        </div>
      </div>
    </div>
  );
}

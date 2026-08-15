"use client";

import { useState } from "react";
import Link from "next/link";
import { MODULE_DETAILS } from "@/lib/module-content";

// Demo formunda seçilebilecek modüller (tanıtım sırası)
const MODULE_ORDER = ["bgys", "kvys", "isys", "yzys", "soc2", "tisax", "spice", "itsm", "qms", "egitim"];
const MODULES = MODULE_ORDER.map((code) => MODULE_DETAILS[code]).filter(Boolean);

export default function DemoForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [modules, setModules] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ ref: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const toggle = (code: string) =>
    setModules((cur) => (cur.includes(code) ? cur.filter((c) => c !== code) : [...cur, code]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!name.trim() || !company.trim() || !email.trim()) {
      setErr("Ad Soyad, şirket ve e-posta zorunludur.");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, modules, message }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Talebiniz gönderilemedi.");
      setDone({ ref: d.ref });
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-puki-light grid place-items-center">
          <svg className="w-7 h-7 text-puki-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-extrabold text-ink tracking-tight">Talebiniz alındı</h2>
        <p className="text-[#5e6278] mt-2 leading-relaxed">
          Ekibimiz en kısa sürede sizinle iletişime geçip demo planlayacak. Talep numaranız:{" "}
          <span className="font-bold text-puki-dark">{done.ref}</span>
        </p>
        <Link href="/" className="inline-block mt-6 text-sm font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft">
          Ana sayfaya dön
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Ad Soyad *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required
            className="mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Şirket *</span>
          <input value={company} onChange={(e) => setCompany(e.target.value)} required
            className="mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">E-posta *</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Telefon</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none" />
        </label>
      </div>

      <div>
        <span className="text-sm font-semibold text-ink">İlgilendiğiniz modüller</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {MODULES.map((m) => {
            const on = modules.includes(m.code);
            return (
              <button type="button" key={m.code} onClick={() => toggle(m.code)}
                className={`px-3.5 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                  on ? "bg-puki text-white border-puki" : "bg-white text-[#5e6278] border-[#e3e7ee] hover:border-puki"
                }`}>
                Puki {m.name} <span className={on ? "text-white/70" : "text-muted"}>· {m.iso}</span>
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-ink">Mesajınız</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
          placeholder="İhtiyaçlarınızdan, hedeflediğiniz belgelendirmeden veya ekip büyüklüğünüzden kısaca bahsedin."
          className="mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none resize-y" />
      </label>

      {err && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</div>}

      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-xs text-muted">Bilgileriniz yalnızca demo ve teklif süreci için kullanılır.</p>
        <button type="submit" disabled={busy}
          className="text-base font-bold text-white bg-puki hover:bg-puki-dark px-7 py-3 rounded-xl shadow-soft disabled:opacity-50 shrink-0">
          {busy ? "Gönderiliyor…" : "Demo Talep Et"}
        </button>
      </div>
    </form>
  );
}

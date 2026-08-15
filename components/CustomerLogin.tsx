"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CustomerLogin() {
  const sp = useSearchParams();
  const initialErr = sp.get("error") ? "Giriş bağlantısı geçersiz veya süresi dolmuş. Lütfen tekrar deneyin." : null;
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(initialErr);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) { setErr("Geçerli bir e-posta girin."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/hesap/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!r.ok) { const d = await r.json(); throw new Error(d.error || "Bağlantı gönderilemedi."); }
      setSent(true);
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  };

  if (sent) {
    return (
      <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-puki-light grid place-items-center">
          <svg className="w-7 h-7 text-puki-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" /></svg>
        </div>
        <h2 className="mt-5 text-xl font-extrabold text-ink">E-postanızı kontrol edin</h2>
        <p className="text-[#5e6278] mt-2 text-sm leading-relaxed">
          <b>{email}</b> adresine bir giriş bağlantısı gönderdik. Bağlantı 20 dakika geçerlidir.
          (E-posta bu adrese kayıtlı bir sipariş varsa gelir.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8">
      <label className="block">
        <span className="text-sm font-semibold text-ink">E-posta adresiniz</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@sirket.com" autoFocus
          className="mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none" />
      </label>
      {err && <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</div>}
      <button type="submit" disabled={busy} className="mt-4 w-full text-base font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft disabled:opacity-50">
        {busy ? "Gönderiliyor…" : "Giriş bağlantısı gönder"}
      </button>
      <p className="text-xs text-muted mt-3 text-center">Şifre gerekmez — size e-posta ile güvenli bir giriş bağlantısı göndeririz.</p>
    </form>
  );
}

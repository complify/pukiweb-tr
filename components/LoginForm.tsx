"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Giriş başarısız.");
      window.location.href = next;
    } catch (err: any) {
      setError(err.message); setLoading(false);
    }
  };

  const cls = "w-full border-[1.5px] border-[#e7ebf1] focus:border-puki outline-none rounded-xl px-3.5 py-2.5 text-sm";

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm">
        <span className="font-semibold text-ink">E-posta</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${cls} mt-1`} autoFocus />
      </label>
      <label className="block text-sm">
        <span className="font-semibold text-ink">Parola</span>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${cls} mt-1`} />
      </label>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>}
      <button disabled={loading} className="w-full py-3 rounded-xl font-extrabold text-white bg-puki hover:bg-puki-dark shadow-soft disabled:bg-[#cbd5e1] disabled:shadow-none">
        {loading ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
    </form>
  );
}

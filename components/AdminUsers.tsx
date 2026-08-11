"use client";

import { useState } from "react";

interface PublicUser { email: string; name: string; role: "owner" | "member"; source: "env" | "kv" }

export default function AdminUsers({ initial, kvEnabled, me }: { initial: PublicUser[]; kvEnabled: boolean; me: string }) {
  const [users, setUsers] = useState<PublicUser[]>(initial);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" as "member" | "owner" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const refresh = async () => {
    const r = await fetch("/api/admin/users", { cache: "no-store" });
    const d = await r.json();
    setUsers(d.users || []);
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try {
      const r = await fetch("/api/admin/users", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Eklenemedi.");
      setMsg({ ok: true, text: `${d.user.email} eklendi.` });
      setForm({ name: "", email: "", password: "", role: "member" });
      await refresh();
    } catch (err: any) {
      setMsg({ ok: false, text: err.message });
    } finally { setBusy(false); }
  };

  const remove = async (email: string) => {
    if (!confirm(`${email} hesabını silmek istediğinize emin misiniz?`)) return;
    setBusy(true); setMsg(null);
    try {
      const r = await fetch("/api/admin/users", {
        method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Silinemedi.");
      await refresh();
    } catch (err: any) {
      setMsg({ ok: false, text: err.message });
    } finally { setBusy(false); }
  };

  const cls = "w-full border-[1.5px] border-[#e7ebf1] focus:border-puki outline-none rounded-xl px-3 py-2 text-sm";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px] items-start">
      {/* Liste */}
      <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card">
        <div className="px-5 py-4 border-b border-[#eef1f6] font-bold text-ink flex items-center justify-between">
          <span>Ekip üyeleri</span>
          <span className="text-xs font-normal text-muted">{users.length} kişi</span>
        </div>
        <div className="divide-y divide-[#eef1f6]">
          {users.map((u) => (
            <div key={u.email} className="px-5 py-3.5 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-ink text-sm">{u.name} {u.email === me && <span className="text-xs text-muted">(siz)</span>}</div>
                <div className="text-xs text-muted">{u.email}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[.68rem] font-bold px-2 py-0.5 rounded-full ${u.role === "owner" ? "bg-puki-light text-puki-dark" : "bg-[#f1f4f8] text-[#5e6278]"}`}>
                  {u.role === "owner" ? "Sahip" : "Üye"}
                </span>
                {u.source === "env" ? (
                  <span className="text-[.68rem] text-muted" title="Ortam değişkeninden gelen kurucu hesap">kurucu</span>
                ) : (
                  <button onClick={() => remove(u.email)} disabled={busy} className="text-xs font-semibold text-[#8a94a6] hover:text-red-600 disabled:opacity-50">Sil</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ekle */}
      <form onSubmit={add} className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card">
        <div className="px-5 py-4 border-b border-[#eef1f6] font-bold text-ink">Üye ekle</div>
        <div className="p-5 space-y-3">
          {!kvEnabled && (
            <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              Kalıcı depo (KV) bağlı değil — eklenen üyeler geçici olur. Vercel'de Redis (Upstash) bağlayın.
            </div>
          )}
          <input placeholder="Ad Soyad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls} />
          <input type="email" required placeholder="E-posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={cls} />
          <input type="password" required placeholder="Parola (en az 8 karakter)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={cls} />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as any })} className={cls}>
            <option value="member">Üye (siparişleri onaylayabilir)</option>
            <option value="owner">Sahip (üye de yönetebilir)</option>
          </select>
          {msg && <div className={`text-sm rounded-lg px-3 py-2 ${msg.ok ? "text-puki-dark bg-puki-light" : "text-red-600 bg-red-50 border border-red-100"}`}>{msg.text}</div>}
          <button disabled={busy} className="w-full py-2.5 rounded-xl font-bold text-white bg-puki hover:bg-puki-dark shadow-soft disabled:bg-[#cbd5e1] disabled:shadow-none">
            {busy ? "Ekleniyor…" : "Üye ekle"}
          </button>
        </div>
      </form>
    </div>
  );
}

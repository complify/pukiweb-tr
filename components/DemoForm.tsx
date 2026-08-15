"use client";

import { useState } from "react";
import Link from "next/link";
import { MODULE_DETAILS } from "@/lib/module-content";
import { useDict } from "@/components/LangProvider";

const MODULE_ORDER = ["bgys", "kvys", "isys", "yzys", "soc2", "tisax", "spice", "itsm", "qms", "egitim"];
const MODULES = MODULE_ORDER.map((code) => MODULE_DETAILS[code]).filter(Boolean);

export default function DemoForm() {
  const d = useDict();
  const f = d.form;
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
    if (!name.trim() || !company.trim() || !email.trim()) { setErr(f.errRequired); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/demo", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, modules, message }),
      });
      const res = await r.json();
      if (!r.ok) throw new Error(res.error || f.errFailed);
      setDone({ ref: res.ref });
    } catch (e: any) { setErr(e.message); } finally { setBusy(false); }
  };

  const inp = "mt-1.5 w-full rounded-xl border border-[#e3e7ee] px-3.5 py-2.5 text-ink focus:border-puki focus:ring-2 focus:ring-puki/20 outline-none";

  if (done) {
    return (
      <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-puki-light grid place-items-center">
          <svg className="w-7 h-7 text-puki-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="mt-5 text-2xl font-extrabold text-ink tracking-tight">{f.successTitle}</h2>
        <p className="text-[#5e6278] mt-2 leading-relaxed">
          {f.successMsg}<span className="font-bold text-puki-dark">{done.ref}</span>
        </p>
        <Link href="/" className="inline-block mt-6 text-sm font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft">{f.backHome}</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6 md:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block"><span className="text-sm font-semibold text-ink">{f.name} *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required className={inp} /></label>
        <label className="block"><span className="text-sm font-semibold text-ink">{f.company} *</span>
          <input value={company} onChange={(e) => setCompany(e.target.value)} required className={inp} /></label>
        <label className="block"><span className="text-sm font-semibold text-ink">{f.email} *</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inp} /></label>
        <label className="block"><span className="text-sm font-semibold text-ink">{f.phone}</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inp} /></label>
      </div>

      <div>
        <span className="text-sm font-semibold text-ink">{f.modulesLabel}</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {MODULES.map((m) => {
            const on = modules.includes(m.code);
            return (
              <button type="button" key={m.code} onClick={() => toggle(m.code)}
                className={`px-3.5 py-2 rounded-xl border text-sm font-semibold transition-colors ${on ? "bg-puki text-white border-puki" : "bg-white text-[#5e6278] border-[#e3e7ee] hover:border-puki"}`}>
                Puki {m.name} <span className={on ? "text-white/70" : "text-muted"}>· {m.iso}</span>
              </button>
            );
          })}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-ink">{f.message}</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder={f.messagePlaceholder}
          className={inp + " resize-y"} />
      </label>

      {err && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</div>}

      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-xs text-muted">{f.privacy}</p>
        <button type="submit" disabled={busy} className="text-base font-bold text-white bg-puki hover:bg-puki-dark px-7 py-3 rounded-xl shadow-soft disabled:opacity-50 shrink-0">
          {busy ? f.sending : d.cta.requestDemo}
        </button>
      </div>
    </form>
  );
}

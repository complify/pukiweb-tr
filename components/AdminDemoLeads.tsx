"use client";

import { useState } from "react";
import { MODULE_DETAILS } from "@/lib/module-content";
import type { Lead, LeadStatus } from "@/lib/leads";

const STATUS: Record<LeadStatus, { label: string; cls: string }> = {
  new: { label: "Yeni", cls: "bg-amber-100 text-amber-700" },
  contacted: { label: "İletişime geçildi", cls: "bg-blue-100 text-blue-700" },
  closed: { label: "Kapandı", cls: "bg-[#f1f4f8] text-[#8a94a6]" },
};

const NEXT: Record<LeadStatus, { to: LeadStatus; label: string }[]> = {
  new: [{ to: "contacted", label: "İletişime geçildi" }, { to: "closed", label: "Kapat" }],
  contacted: [{ to: "closed", label: "Kapat" }, { to: "new", label: "Yeniye al" }],
  closed: [{ to: "new", label: "Yeniden aç" }],
};

const modName = (c: string) => (MODULE_DETAILS[c] ? `Puki ${MODULE_DETAILS[c].name}` : c);
const fmtDate = (ts?: number) => (ts ? new Date(ts).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" }) : "—");

function quoteHref(l: Lead): string {
  const q = new URLSearchParams();
  q.set("company", l.company);
  q.set("name", l.name);
  q.set("email", l.email);
  if (l.phone) q.set("phone", l.phone);
  if (l.modules.length) q.set("modules", l.modules.join(","));
  return `/admin/teklif?${q.toString()}`;
}

export default function AdminDemoLeads({ initial, kvEnabled }: { initial: Lead[]; kvEnabled: boolean }) {
  const [leads, setLeads] = useState<Lead[]>(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const refresh = async () => {
    const r = await fetch("/api/admin/leads", { cache: "no-store" });
    const d = await r.json();
    setLeads(d.leads || []);
  };

  const setStatus = async (ref: string, status: LeadStatus) => {
    setBusy(ref);
    try {
      const r = await fetch("/api/admin/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref, status }) });
      if (r.ok) await refresh();
    } finally { setBusy(null); }
  };

  const kv = (label: string, value: React.ReactNode) => (
    <div className="flex justify-between gap-4 py-1.5 border-b border-[#f1f4f8] last:border-0">
      <span className="text-xs font-semibold text-muted whitespace-nowrap">{label}</span>
      <span className="text-xs text-ink text-right">{value}</span>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted">{leads.length} talep · Depo: <b className={kvEnabled ? "text-puki-dark" : "text-amber-600"}>{kvEnabled ? "Kalıcı (KV)" : "Bellek içi (geçici)"}</b></div>
        <button onClick={refresh} className="text-sm font-semibold text-puki-dark hover:text-puki">↻ Yenile</button>
      </div>

      {!kvEnabled && (
        <div className="mb-4 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Kalıcı depo bağlı değil (KV env yok). Talepler geçici olarak bellekte tutulur; Upstash Redis entegrasyonunu bağlayın.
        </div>
      )}

      <div className="space-y-3">
        {leads.length === 0 && <div className="text-muted text-sm py-8 text-center">Henüz demo talebi yok.</div>}
        {leads.map((l) => {
          const st = STATUS[l.status] || STATUS.new;
          const isOpen = open === l.ref;
          return (
            <div key={l.ref} className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-ink">{l.ref}</span>
                    <span className={`text-[.68rem] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                    <span className="text-xs text-muted">{fmtDate(l.createdAt)}</span>
                  </div>
                  <div className="text-sm text-[#5e6278] mt-1.5">
                    <span className="font-semibold text-ink">{l.company}</span> · {l.name} · <a href={`mailto:${l.email}`} className="text-puki-dark">{l.email}</a>
                    {l.phone ? <> · <a href={`tel:${l.phone}`} className="text-puki-dark">{l.phone}</a></> : null}
                  </div>
                  {l.modules.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {l.modules.map((c) => <span key={c} className="text-[.7rem] font-bold text-puki-dark bg-puki-light px-2 py-0.5 rounded-full">{modName(c)}</span>)}
                    </div>
                  )}
                  {l.message && <p className="text-sm text-[#5e6278] mt-2 leading-relaxed whitespace-pre-wrap">{l.message}</p>}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <a href={quoteHref(l)} className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-3 py-1.5 rounded-lg whitespace-nowrap">Teklif oluştur →</a>
                  {NEXT[l.status].map((n) => (
                    <button key={n.to} onClick={() => setStatus(l.ref, n.to)} disabled={busy === l.ref}
                      className="text-sm font-semibold text-[#5e6278] hover:text-puki-dark border border-[#e7ebf1] hover:border-puki px-3 py-1.5 rounded-lg disabled:opacity-50 whitespace-nowrap">
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setOpen(isOpen ? null : l.ref)} className="mt-3 text-xs font-bold text-puki-dark hover:text-puki">
                {isOpen ? "Detayı gizle ▲" : "Detay ▾"}
              </button>
              {isOpen && (
                <div className="mt-3 rounded-xl border border-[#eef1f6] p-4 max-w-md">
                  {kv("Talep no", l.ref)}
                  {kv("Oluşturma", fmtDate(l.createdAt))}
                  {kv("Son güncelleme", fmtDate(l.updatedAt))}
                  {kv("Kaynak", l.source || "web")}
                  {kv("Modüller", l.modules.length ? l.modules.map(modName).join(", ") : "—")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

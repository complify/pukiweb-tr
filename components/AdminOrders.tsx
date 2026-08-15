"use client";

import { useState } from "react";
import { fmt, moduleByCode } from "@/lib/catalog";
import type { Order } from "@/lib/orders";

const STATUS: Record<string, { label: string; cls: string }> = {
  pending_payment: { label: "Ödeme bekliyor", cls: "bg-[#f1f4f8] text-[#5e6278]" },
  paid_awaiting_approval: { label: "Onay bekliyor", cls: "bg-amber-100 text-amber-700" },
  provisioned: { label: "Açıldı", cls: "bg-puki-light text-puki-dark" },
  failed: { label: "Ödeme başarısız", cls: "bg-red-100 text-red-700" },
  rejected: { label: "Reddedildi", cls: "bg-[#f1f4f8] text-[#8a94a6]" },
};

const fmtDate = (ts?: number) => (ts ? new Date(ts).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" }) : "—");
const billingLabel = (o: Order) => (o.billing === "annual" ? "Yıllık" : "Aylık");

export default function AdminOrders({ initial, kvEnabled }: { initial: Order[]; kvEnabled: boolean }) {
  const [orders, setOrders] = useState<Order[]>(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ref: string; ok: boolean; text: string } | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const refresh = async () => {
    const r = await fetch("/api/admin/orders", { cache: "no-store" });
    const d = await r.json();
    setOrders(d.orders || []);
  };

  const linkFor = (ref: string) =>
    (typeof window !== "undefined" ? window.location.origin : "") + `/odeme/${encodeURIComponent(ref)}`;
  const copyLink = async (ref: string) => {
    try { await navigator.clipboard.writeText(linkFor(ref)); setCopied(ref); setTimeout(() => setCopied(null), 1500); } catch {}
  };

  const resend = async (ref: string) => {
    setBusy(ref); setMsg(null);
    try {
      const r = await fetch("/api/admin/quotes/resend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Gönderilemedi");
      setMsg({ ref, ok: true, text: d.emailed ? "Ödeme linki müşteriye tekrar gönderildi." : "E-posta gönderilemedi (RESEND_API_KEY yok) — linki kopyalayıp elle iletin." });
    } catch (e: any) { setMsg({ ref, ok: false, text: e.message }); } finally { setBusy(null); }
  };

  const act = async (ref: string, action: "approve" | "reject") => {
    if (action === "reject" && !confirm("Bu siparişi reddetmek istediğinize emin misiniz?")) return;
    setBusy(ref); setMsg(null);
    try {
      const r = await fetch("/api/admin/approve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref, action }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "İşlem başarısız");
      setMsg({ ref, ok: true, text: action === "approve" ? "Hesap açıldı, hoş geldin maili gönderildi." : "Sipariş reddedildi." });
      await refresh();
    } catch (e: any) { setMsg({ ref, ok: false, text: e.message }); } finally { setBusy(null); }
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
        <div className="text-sm text-muted">{orders.length} sipariş · Depo: <b className={kvEnabled ? "text-puki-dark" : "text-amber-600"}>{kvEnabled ? "Kalıcı (KV)" : "Bellek içi (geçici)"}</b></div>
        <button onClick={refresh} className="text-sm font-semibold text-puki-dark hover:text-puki">↻ Yenile</button>
      </div>

      {!kvEnabled && (
        <div className="mb-4 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Kalıcı depo bağlı değil (KV env yok). Siparişler geçici olarak bellekte tutulur; Vercel'de Redis (Upstash) entegrasyonunu bağlayın.
        </div>
      )}

      <div className="space-y-3">
        {orders.length === 0 && <div className="text-muted text-sm py-8 text-center">Henüz sipariş yok.</div>}
        {orders.map((o) => {
          const st = STATUS[o.status] || STATUS.pending_payment;
          const paid = o.status === "paid_awaiting_approval" || o.status === "provisioned";
          const isOpen = open === o.ref;
          const lines = o.lineItems && o.lineItems.length ? o.lineItems : o.modules.map((c) => ({ code: c, name: `Puki ${moduleByCode(c)?.name || c}`, price: 0 }));
          return (
            <div key={o.ref} className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-ink">{o.ref}</span>
                    <span className={`text-[.68rem] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                    {o.origin === "admin" && <span className="text-[.62rem] font-bold px-2 py-0.5 rounded-full bg-[#eef4ff] text-[#3b6fd4]">Teklif</span>}
                  </div>
                  <div className="text-sm text-[#5e6278] mt-1">
                    {o.customer.company} · {o.customer.firstName} {o.customer.lastName} · <a href={`mailto:${o.customer.email}`} className="text-puki-dark">{o.customer.email}</a>
                  </div>
                  <div className="text-xs text-muted mt-1">
                    {lines.map((l) => moduleByCode(l.code)?.name || l.code).join(", ") || "—"} · {o.seats} kullanıcı · {o.region.toUpperCase()} · {billingLabel(o)}
                  </div>
                  {o.provision?.loginUrl && <div className="text-xs text-puki-dark mt-1">Org #{String(o.provision.organizationId)} · {o.provision.loginUrl}</div>}
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-ink">{fmt(o.total)}</div>
                  <div className="text-[.7rem] text-muted">{billingLabel(o)}</div>
                  {o.status === "paid_awaiting_approval" && (
                    <div className="mt-2 flex gap-2 justify-end">
                      <button onClick={() => act(o.ref, "reject")} disabled={busy === o.ref} className="text-sm font-semibold text-[#5e6278] hover:text-red-600 border border-[#e7ebf1] hover:border-red-200 px-3 py-1.5 rounded-lg disabled:opacity-50">Reddet</button>
                      <button onClick={() => act(o.ref, "approve")} disabled={busy === o.ref} className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-1.5 rounded-lg shadow-soft disabled:opacity-50">{busy === o.ref ? "İşleniyor…" : "Onayla & Aç"}</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Ödeme alındı bilgisi */}
              {paid && (
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-puki-dark bg-puki-light rounded-lg px-3 py-2">
                  <span className="w-5 h-5 rounded-full bg-puki grid place-items-center text-white text-xs font-black shrink-0">✓</span>
                  Ödeme alındı · {fmt(o.total)} · {billingLabel(o)}
                  <span className="text-muted font-normal">· {fmtDate(o.paidAt)}{o.iyzicoPaymentId ? ` · iyzico #${o.iyzicoPaymentId}` : ""}</span>
                </div>
              )}

              {/* Ödeme linki (bekliyor) */}
              {o.status === "pending_payment" && (
                <div className="mt-3 pt-3 border-t border-[#eef1f6] flex flex-wrap items-center gap-2">
                  <a href={`/odeme/${encodeURIComponent(o.ref)}`} target="_blank" rel="noreferrer" className="text-xs font-semibold text-puki-dark hover:text-puki truncate max-w-[240px]">/odeme/{o.ref}</a>
                  <div className="flex-1" />
                  <button onClick={() => copyLink(o.ref)} className="text-xs font-semibold text-[#5e6278] hover:text-ink border border-[#e7ebf1] px-3 py-1.5 rounded-lg">{copied === o.ref ? "Kopyalandı" : "Linki kopyala"}</button>
                  <button onClick={() => resend(o.ref)} disabled={busy === o.ref} className="text-xs font-bold text-white bg-puki hover:bg-puki-dark px-3 py-1.5 rounded-lg disabled:opacity-50">{busy === o.ref ? "Gönderiliyor…" : "Tekrar gönder"}</button>
                </div>
              )}

              {/* Detay aç/kapat */}
              <button onClick={() => setOpen(isOpen ? null : o.ref)} className="mt-3 text-xs font-bold text-puki-dark hover:text-puki">
                {isOpen ? "Detayı gizle ▲" : "Detay ▾"}
              </button>

              {isOpen && (
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#eef1f6] p-4">
                    <div className="text-xs font-bold text-ink mb-2">Kalemler</div>
                    {lines.map((l) => (
                      <div key={l.code} className="flex justify-between text-xs py-1 border-b border-[#f1f4f8] last:border-0">
                        <span className="text-[#5e6278]">{l.name} <span className="text-muted">({moduleByCode(l.code)?.iso || "GRC"})</span></span>
                        <span className="font-semibold text-ink whitespace-nowrap">{fmt(l.price)}/ay</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-xs pt-2 mt-1 border-t border-ink font-extrabold text-ink">
                      <span>Toplam ({billingLabel(o)})</span><span>{fmt(o.total)}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#eef1f6] p-4">
                    <div className="text-xs font-bold text-ink mb-2">Fatura bilgileri</div>
                    {o.invoice ? (
                      <>
                        {kv("Tür", o.invoice.type === "corporate" ? "Kurumsal" : "Bireysel")}
                        {kv("Ünvan", o.invoice.title)}
                        {kv(o.invoice.type === "corporate" ? "VKN" : "TCKN", o.invoice.taxId)}
                        {o.invoice.taxOffice ? kv("Vergi dairesi", o.invoice.taxOffice) : null}
                        {kv("Adres", o.invoice.address)}
                        {kv("İl", o.invoice.city)}
                      </>
                    ) : <div className="text-xs text-muted">Ödeme sırasında alınacak.</div>}
                  </div>

                  <div className="rounded-xl border border-[#eef1f6] p-4">
                    <div className="text-xs font-bold text-ink mb-2">İletişim</div>
                    {kv("Yetkili", `${o.customer.firstName} ${o.customer.lastName}`.trim() || "—")}
                    {kv("E-posta", o.customer.email)}
                    {kv("Telefon", o.customer.phone || "—")}
                    {kv("Şirket", o.customer.company)}
                  </div>

                  <div className="rounded-xl border border-[#eef1f6] p-4">
                    <div className="text-xs font-bold text-ink mb-2">Zaman çizelgesi</div>
                    {kv("Oluşturma", fmtDate(o.createdAt))}
                    {kv("Ödeme", o.paidAt ? fmtDate(o.paidAt) : "—")}
                    {kv("Hesap açılışı", o.provision?.at ? fmtDate(o.provision.at) : "—")}
                    {o.note ? kv("Not", o.note) : null}
                  </div>

                  {(o.subscription?.subscriptionRef || (o.payments && o.payments.length > 0)) && (
                    <div className="md:col-span-2 rounded-xl border border-[#eef1f6] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-bold text-ink">Abonelik & ödeme geçmişi</div>
                        {o.subscription?.status && (
                          <span className="text-[.62rem] font-bold px-2 py-0.5 rounded-full bg-puki-light text-puki-dark">{o.subscription.status}{o.subscription.interval ? ` · ${o.subscription.interval === "annual" ? "Yıllık" : "Aylık"}` : ""}</span>
                        )}
                      </div>
                      {o.subscription?.subscriptionRef && <div className="text-[.7rem] text-muted mb-2">Abonelik no: {o.subscription.subscriptionRef}</div>}
                      {o.payments && o.payments.length > 0 ? (
                        <div className="divide-y divide-[#f1f4f8]">
                          {o.payments.slice().sort((a, b) => b.at - a.at).map((pmt, i) => (
                            <div key={i} className="flex items-center justify-between py-1.5 text-xs">
                              <span className="text-[#5e6278]">{fmtDate(pmt.at)}</span>
                              <span className="flex items-center gap-2">
                                <span className="font-semibold text-ink">{fmt(pmt.amount)}</span>
                                <span className={`font-bold px-2 py-0.5 rounded-full ${pmt.status === "success" ? "bg-puki-light text-puki-dark" : "bg-red-100 text-red-700"}`}>{pmt.status === "success" ? "Başarılı" : "Başarısız"}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-muted">Henüz tahsilat kaydı yok — her dönem tahsilatı iyzico webhook'u ile buraya düşer.</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {msg && msg.ref === o.ref && (
                <div className={`mt-3 text-sm rounded-lg px-3 py-2 ${msg.ok ? "text-puki-dark bg-puki-light" : "text-red-600 bg-red-50 border border-red-100"}`}>{msg.text}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

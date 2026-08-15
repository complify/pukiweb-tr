import Link from "next/link";
import { getCustomerSession } from "@/lib/customer-session";
import { getOrdersByEmail, type Order } from "@/lib/orders";
import { fmt, moduleByCode } from "@/lib/catalog";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: "Hesabım — Puki", robots: { index: false } };

const fmtDate = (ts?: number) => (ts ? new Date(ts).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" }) : "—");

export default async function HesapPage() {
  const t = getDict(getLang());
  const p = t.portal;
  const session = await getCustomerSession();
  const email = session?.email || "";
  const orders = email ? await getOrdersByEmail(email) : [];

  const STATUS: Record<string, { label: string; cls: string }> = {
    pending_payment: { label: p.stPending, cls: "bg-amber-100 text-amber-700" },
    paid_awaiting_approval: { label: p.stPaid, cls: "bg-blue-100 text-blue-700" },
    provisioned: { label: p.stActive, cls: "bg-puki-light text-puki-dark" },
    failed: { label: p.stFailed, cls: "bg-red-100 text-red-700" },
    rejected: { label: p.stRejected, cls: "bg-[#f1f4f8] text-[#8a94a6]" },
  };
  const billingLabel = (o: Order) => (o.billing === "annual" ? p.annual : p.monthly);

  return (
    <div className="container-p py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow">{t.nav.account}</span>
          <h1 className="mt-1 text-2xl font-extrabold text-ink tracking-tight">{session?.name || email}</h1>
          <p className="text-muted text-sm">{email}</p>
        </div>
        <a href="/api/hesap/logout" className="text-sm font-semibold text-[#5e6278] hover:text-red-600">{p.logout}</a>
      </div>

      {orders.length === 0 && (
        <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8 text-center">
          <p className="text-[#5e6278]">{p.noOrders}</p>
          <Link href="/demo" className="inline-block mt-4 text-sm font-bold text-white bg-puki hover:bg-puki-dark px-5 py-2.5 rounded-xl">{t.cta.requestDemo}</Link>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((o) => {
          const st = STATUS[o.status] || STATUS.pending_payment;
          const lines = o.lineItems && o.lineItems.length ? o.lineItems : o.modules.map((c) => ({ code: c, name: `Puki ${moduleByCode(c)?.name || c}`, price: 0 }));
          const payments = (o.payments || []).slice().sort((a, b) => b.at - a.at);
          return (
            <div key={o.ref} className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-ink">{o.ref}</span>
                    <span className={`text-[.68rem] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                  </div>
                  <div className="text-sm text-muted mt-1">{lines.map((l) => moduleByCode(l.code)?.name || l.code).join(", ")}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-ink">{fmt(o.total)}</div>
                  <div className="text-[.7rem] text-muted">{billingLabel(o)}{o.subscription?.status === "ACTIVE" ? ` · ${p.autoRenew}` : ""}</div>
                </div>
              </div>

              {o.status === "pending_payment" && (
                <Link href={`/odeme/${encodeURIComponent(o.ref)}`} className="inline-block mt-3 text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-2 rounded-lg">{p.goPay}</Link>
              )}
              {o.status === "provisioned" && o.provision?.loginUrl && (
                <a href={o.provision.loginUrl} className="inline-block mt-3 text-sm font-bold text-puki-dark hover:text-puki">{p.goGrc}</a>
              )}

              <div className="mt-4 pt-4 border-t border-[#eef1f6]">
                <div className="text-xs font-bold text-ink mb-2">{p.paymentHistory}</div>
                {payments.length > 0 ? (
                  <div className="divide-y divide-[#f1f4f8]">
                    {payments.map((pmt, i) => (
                      <div key={i} className="flex items-center justify-between py-2 text-sm">
                        <span className="text-[#5e6278]">{fmtDate(pmt.at)}</span>
                        <span className="flex items-center gap-3">
                          <span className="font-semibold text-ink">{fmt(pmt.amount)}</span>
                          <span className={`text-[.66rem] font-bold px-2 py-0.5 rounded-full ${pmt.status === "success" ? "bg-puki-light text-puki-dark" : "bg-red-100 text-red-700"}`}>{pmt.status === "success" ? p.paySuccess : p.payFailure}</span>
                          <span className="text-xs text-muted">{p.invoiceSoon}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : o.paidAt ? (
                  <div className="flex items-center justify-between py-2 text-sm">
                    <span className="text-[#5e6278]">{fmtDate(o.paidAt)}</span>
                    <span className="flex items-center gap-3"><span className="font-semibold text-ink">{fmt(o.total)}</span><span className="text-[.66rem] font-bold px-2 py-0.5 rounded-full bg-puki-light text-puki-dark">{p.paySuccess}</span></span>
                  </div>
                ) : (
                  <div className="text-sm text-muted">{p.noPayments}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted mt-8">
        {p.questions} <Link href="/iletisim" className="font-bold text-puki-dark hover:text-puki">{t.cta.contactUs}</Link>
      </p>
    </div>
  );
}

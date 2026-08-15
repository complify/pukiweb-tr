import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/lib/orders";
import { fmt, moduleByCode, CATALOG } from "@/lib/catalog";
import PayFlow from "@/components/PayFlow";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ödeme — Puki", robots: { index: false } };

export default async function OdemeRefPage({ params }: { params: { ref: string } }) {
  const t = getDict(getLang());
  const P = t.pay;
  const ref = decodeURIComponent(params.ref);
  const order = await getOrder(ref);
  if (!order) notFound();

  const lines = order.lineItems && order.lineItems.length
    ? order.lineItems
    : order.modules.map((c) => ({ code: c, name: `Puki ${moduleByCode(c)?.name || c}`, price: 0 }));
  const monthlyTotal = order.pricing?.monthlyTotal ?? order.total;
  const annualMonths = order.pricing?.annualMonths ?? CATALOG.annualMonths;
  const offerAnnual = order.pricing?.offerAnnual ?? false;
  const payable = order.status === "pending_payment" || order.status === "failed";
  const paidPeriod = order.billing === "annual" ? P.annual : P.monthly;

  return (
    <div className="container-p py-12 max-w-2xl">
      <div className="mb-6">
        <span className="eyebrow">{P.quoteEyebrow}</span>
        <h1 className="mt-2 text-3xl font-extrabold text-ink tracking-tight">{order.customer.company}</h1>
        <p className="text-muted mt-1 text-sm">{P.quoteNo}{order.ref}</p>
      </div>

      <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6 md:p-8">
        <div className="text-sm font-bold text-ink mb-1">{P.scope}</div>
        <div className="divide-y divide-[#eef1f6]">
          {lines.map((li) => (
            <div key={li.code} className="flex items-center justify-between py-3">
              <div>
                <div className="font-bold text-ink">{li.name}</div>
                <div className="text-xs text-muted">{moduleByCode(li.code)?.iso || "GRC"}</div>
              </div>
              <div className="font-semibold text-[#5e6278] whitespace-nowrap">{fmt(li.price)}<span className="text-xs text-muted">{t.common.perMonth}</span></div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted mt-2">{order.seats} {P.usersRegion} · {order.region.toUpperCase()}</div>

        {payable ? (
          <PayFlow refCode={order.ref} monthlyTotal={monthlyTotal} annualMonths={annualMonths} offerAnnual={offerAnnual} company={order.customer.company} />
        ) : (
          <>
            <div className="flex items-center justify-between mt-5 pt-4 border-t-2 border-ink">
              <div className="font-extrabold text-ink">{P.total} <span className="text-muted font-semibold text-sm">({paidPeriod})</span></div>
              <div className="text-2xl font-extrabold text-puki-dark whitespace-nowrap">{fmt(order.total)}</div>
            </div>
            <div className="mt-6">
              {order.status === "paid_awaiting_approval" && (
                <div className="text-sm text-puki-dark bg-puki-light rounded-xl px-4 py-3 text-center font-semibold">{P.paidReceived}</div>
              )}
              {order.status === "provisioned" && (
                <div className="text-sm text-puki-dark bg-puki-light rounded-xl px-4 py-3 text-center font-semibold">
                  {P.provisioned}{order.provision?.loginUrl && <> <a href={order.provision.loginUrl} className="underline">{P.signIn}</a></>}
                </div>
              )}
              {order.status === "rejected" && (
                <div className="text-sm text-[#8a94a6] bg-[#f1f4f8] rounded-xl px-4 py-3 text-center font-semibold">{P.rejected}</div>
              )}
            </div>
          </>
        )}
      </div>

      <p className="text-center text-sm text-muted mt-6">
        {t.portal.questions} <Link href="/iletisim" className="font-bold text-puki-dark hover:text-puki">{t.cta.contactUs}</Link>
      </p>
    </div>
  );
}

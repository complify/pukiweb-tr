import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/lib/orders";
import { fmt, moduleByCode } from "@/lib/catalog";
import PayByRef from "@/components/PayByRef";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ödeme — Puki", robots: { index: false } };

export default async function OdemeRefPage({ params }: { params: { ref: string } }) {
  const ref = decodeURIComponent(params.ref);
  const order = await getOrder(ref);
  if (!order) notFound();

  const lines = order.lineItems && order.lineItems.length
    ? order.lineItems
    : order.modules.map((c) => ({ code: c, name: `Puki ${moduleByCode(c)?.name || c}`, price: 0 }));
  const period = order.billing === "annual" ? "yıllık" : "aylık";
  const payable = order.status === "pending_payment" || order.status === "failed";

  return (
    <div className="container-p py-12 max-w-2xl">
      <div className="mb-6">
        <span className="eyebrow">Teklifiniz</span>
        <h1 className="mt-2 text-3xl font-extrabold text-ink tracking-tight">{order.customer.company}</h1>
        <p className="text-muted mt-1 text-sm">Teklif no: {order.ref}</p>
      </div>

      <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6 md:p-8">
        <div className="divide-y divide-[#eef1f6]">
          {lines.map((li) => (
            <div key={li.code} className="flex items-center justify-between py-3">
              <div>
                <div className="font-bold text-ink">{li.name}</div>
                <div className="text-xs text-muted">{moduleByCode(li.code)?.iso || "GRC"}</div>
              </div>
              <div className="font-extrabold text-ink whitespace-nowrap">{fmt(li.price)}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-ink">
          <div className="font-extrabold text-ink">Toplam <span className="text-muted font-semibold text-sm">({period})</span></div>
          <div className="text-2xl font-extrabold text-puki-dark whitespace-nowrap">{fmt(order.total)}</div>
        </div>

        <div className="mt-7">
          {payable && <PayByRef refCode={order.ref} />}

          {order.status === "paid_awaiting_approval" && (
            <div className="text-sm text-puki-dark bg-puki-light rounded-xl px-4 py-3 text-center font-semibold">
              Ödemeniz alındı. Hesabınız kısa süre içinde hazırlanıp giriş bilgileriniz e-posta ile iletilecek.
            </div>
          )}
          {order.status === "provisioned" && (
            <div className="text-sm text-puki-dark bg-puki-light rounded-xl px-4 py-3 text-center font-semibold">
              Hesabınız açıldı. Giriş bilgileriniz e-posta ile gönderildi.
              {order.provision?.loginUrl && (
                <> <a href={order.provision.loginUrl} className="underline">Giriş yap</a></>
              )}
            </div>
          )}
          {order.status === "rejected" && (
            <div className="text-sm text-[#8a94a6] bg-[#f1f4f8] rounded-xl px-4 py-3 text-center font-semibold">
              Bu teklif iptal edildi. Bilgi için bizimle iletişime geçin.
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-sm text-muted mt-6">
        Sorunuz mu var? <Link href="/iletisim" className="font-bold text-puki-dark hover:text-puki">Bize ulaşın</Link>
      </p>
    </div>
  );
}

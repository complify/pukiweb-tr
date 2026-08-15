import { NextRequest, NextResponse } from "next/server";
import { iyzicoClient, subCheckoutInitialize, iyzField } from "@/lib/iyzico";
import { ensureProduct, createPlan } from "@/lib/subscriptions";
import { getOrder, setOrderStatus, mapCftToOrder } from "@/lib/orders";
import { CATALOG } from "@/lib/catalog";

export const runtime = "nodejs";

function siteUrl(req: NextRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${req.headers.get("host")}`;
}

// Bir teklifi (order), müşterinin seçtiği dönem + fatura bilgisiyle iyzico ABONELİĞİNE başlatır.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ref = String(body?.ref || "");
    if (!ref) return NextResponse.json({ error: "ref gerekli" }, { status: 400 });

    const order = await getOrder(ref);
    if (!order) return NextResponse.json({ error: "Teklif bulunamadı." }, { status: 404 });
    if (order.status === "provisioned")
      return NextResponse.json({ error: "Bu teklifin hesabı zaten açıldı." }, { status: 409 });
    if (order.status === "paid_awaiting_approval")
      return NextResponse.json({ error: "Bu teklifin ödemesi zaten alındı." }, { status: 409 });

    // Fatura bilgisi
    const iv = body?.invoice || {};
    const invoice = {
      type: iv.type === "individual" ? ("individual" as const) : ("corporate" as const),
      title: String(iv.title || "").trim(),
      taxId: String(iv.taxId || "").trim(),
      taxOffice: String(iv.taxOffice || "").trim() || undefined,
      address: String(iv.address || "").trim(),
      city: String(iv.city || "").trim(),
    };
    if (!invoice.title || !invoice.taxId || !invoice.address || !invoice.city)
      return NextResponse.json({ error: "Fatura bilgileri eksik." }, { status: 400 });
    if (invoice.type === "corporate" && !invoice.taxOffice)
      return NextResponse.json({ error: "Kurumsal fatura için vergi dairesi gerekli." }, { status: 400 });

    // Dönem + tutar
    const months = order.pricing?.annualMonths ?? CATALOG.annualMonths;
    const monthlyTotal = order.pricing?.monthlyTotal ?? order.total;
    const canAnnual = order.pricing?.offerAnnual ?? false;
    const billing: "monthly" | "annual" = body?.billing === "annual" && canAnnual ? "annual" : "monthly";
    const total = billing === "annual" ? monthlyTotal * months : monthlyTotal;

    const c = order.customer;
    const country = order.region === "eu" ? "Europe" : "Turkey";
    const identity = invoice.taxId.replace(/\D/g, "").padEnd(11, "1").slice(0, 11);
    const addr = { contactName: invoice.title, city: invoice.city, country, address: invoice.address };

    const client = iyzicoClient();
    const productRef = await ensureProduct(client);
    const planName = `${order.ref} · ${billing === "annual" ? "Yıllık" : "Aylık"}`;
    const planRef = await createPlan(client, { productRef, name: planName, price: total, interval: billing });

    const init = await subCheckoutInitialize(client, {
      locale: "tr",
      conversationId: order.ref,
      callbackUrl: `${siteUrl(req)}/api/checkout/subscription-callback`,
      pricingPlanReferenceCode: planRef,
      subscriptionInitialStatus: "ACTIVE",
      customer: {
        name: c.firstName || invoice.title,
        surname: c.lastName || "-",
        identityNumber: identity,
        email: c.email,
        gsmNumber: c.phone || "+905000000000",
        billingAddress: addr,
        shippingAddress: addr,
      },
    });

    const content = iyzField(init, "checkoutFormContent");
    const token = iyzField(init, "token");
    if (init?.status !== "success" || !content || !token) {
      return NextResponse.json({ error: init?.errorMessage || "Abonelik başlatılamadı." }, { status: 502 });
    }

    await setOrderStatus(order.ref, "pending_payment", {
      billing, total, invoice,
      subscription: { ...(order.subscription || {}), planRef, interval: billing, checkoutToken: token },
    });
    await mapCftToOrder(token, order.ref);

    return NextResponse.json({ ref: order.ref, checkoutFormContent: content, token });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "subscription_init_error" }, { status: 500 });
  }
}

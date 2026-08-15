import { NextRequest, NextResponse } from "next/server";
import Iyzipay from "iyzipay";
import { iyzicoClient, iyziPrice, cfInitialize } from "@/lib/iyzico";
import { getOrder, setOrderStatus } from "@/lib/orders";
import { moduleByCode, CATALOG } from "@/lib/catalog";

export const runtime = "nodejs";

function siteUrl(req: NextRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${req.headers.get("host")}`;
}

// Admin panelinde oluşturulmuş bir teklifi, müşterinin seçtiği dönem + fatura bilgisiyle ödemeye başlatır.
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

    // Fatura bilgisi (müşteriden alınır)
    const iv = body?.invoice || {};
    const invoice = {
      type: iv.type === "individual" ? "individual" as const : "corporate" as const,
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
    const lines = order.lineItems && order.lineItems.length
      ? order.lineItems
      : order.modules.map((code) => ({ code, name: `Puki ${moduleByCode(code)?.name || code}`, price: 0 }));

    const basketItems = lines.map((li) => {
      const m = moduleByCode(li.code);
      const linePrice = billing === "annual" ? li.price * months : li.price;
      return {
        id: li.code,
        name: li.name,
        category1: "GRC SaaS",
        category2: m?.iso || "GRC",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: iyziPrice(linePrice),
      };
    });

    const ip = (req.headers.get("x-forwarded-for") || "85.34.78.112").split(",")[0].trim();
    const identity = invoice.taxId.replace(/\D/g, "").padEnd(11, "1").slice(0, 11);

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: order.ref,
      price: iyziPrice(total),
      paidPrice: iyziPrice(total),
      currency: Iyzipay.CURRENCY.TRY,
      basketId: order.ref,
      paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
      callbackUrl: `${siteUrl(req)}/api/checkout/callback`,
      enabledInstallments: [1],
      buyer: {
        id: c.email,
        name: c.firstName || invoice.title,
        surname: c.lastName || "-",
        gsmNumber: c.phone || "+905000000000",
        email: c.email,
        identityNumber: identity,
        registrationAddress: invoice.address,
        ip,
        city: invoice.city,
        country: order.region === "eu" ? "Europe" : "Turkey",
      },
      billingAddress: {
        contactName: invoice.title,
        city: invoice.city,
        country: order.region === "eu" ? "Europe" : "Turkey",
        address: invoice.address,
      },
      basketItems,
    };

    const client = iyzicoClient();
    const result: any = await cfInitialize(client, request);
    if (result.status !== "success") {
      return NextResponse.json({ error: result.errorMessage || "iyzico başlatma hatası" }, { status: 502 });
    }

    // Seçilen dönem + tutar + fatura bilgisini teklife işle (ödeme öncesi)
    await setOrderStatus(order.ref, "pending_payment", { billing, total, invoice });

    return NextResponse.json({
      ref: order.ref,
      paymentPageUrl: result.paymentPageUrl,
      token: result.token,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "init_by_ref_error" }, { status: 500 });
  }
}

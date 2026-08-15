import { NextRequest, NextResponse } from "next/server";
import Iyzipay from "iyzipay";
import { iyzicoClient, iyziPrice, cfInitialize } from "@/lib/iyzico";
import { getOrder } from "@/lib/orders";
import { moduleByCode } from "@/lib/catalog";

export const runtime = "nodejs";

function siteUrl(req: NextRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${req.headers.get("host")}`;
}

// Admin panelinde oluşturulmuş bir siparişi (teklif) ref ile iyzico ödemesine başlatır.
export async function POST(req: NextRequest) {
  try {
    const { ref } = await req.json();
    if (!ref) return NextResponse.json({ error: "ref gerekli" }, { status: 400 });

    const order = await getOrder(String(ref));
    if (!order) return NextResponse.json({ error: "Teklif bulunamadı." }, { status: 404 });
    if (order.status === "provisioned")
      return NextResponse.json({ error: "Bu teklifin hesabı zaten açıldı." }, { status: 409 });
    if (order.status === "paid_awaiting_approval")
      return NextResponse.json({ error: "Bu teklifin ödemesi zaten alındı." }, { status: 409 });

    const c = order.customer;
    const lines = order.lineItems && order.lineItems.length
      ? order.lineItems
      : order.modules.map((code) => {
          const m = moduleByCode(code);
          return { code, name: `Puki ${m?.name || code}`, price: 0 };
        });

    const basketItems = lines.map((li) => {
      const m = moduleByCode(li.code);
      return {
        id: li.code,
        name: li.name,
        category1: "GRC SaaS",
        category2: m?.iso || "GRC",
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: iyziPrice(li.price),
      };
    });

    const ip = (req.headers.get("x-forwarded-for") || "85.34.78.112").split(",")[0].trim();
    const addr = c.address || "Bilgi verilmedi";
    const city = c.city || "İstanbul";

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: order.ref,
      price: iyziPrice(order.total),
      paidPrice: iyziPrice(order.total),
      currency: Iyzipay.CURRENCY.TRY,
      basketId: order.ref,
      paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
      callbackUrl: `${siteUrl(req)}/api/checkout/callback`,
      enabledInstallments: [1],
      buyer: {
        id: c.email,
        name: c.firstName || c.company,
        surname: c.lastName || "-",
        gsmNumber: c.phone || "+905000000000",
        email: c.email,
        identityNumber: (c.taxId || "11111111111").replace(/\D/g, "").padEnd(11, "1").slice(0, 11),
        registrationAddress: addr,
        ip,
        city,
        country: order.region === "eu" ? "Europe" : "Turkey",
      },
      billingAddress: {
        contactName: `${c.firstName} ${c.lastName}`.trim() || c.company,
        city, country: order.region === "eu" ? "Europe" : "Turkey", address: addr,
      },
      basketItems,
    };

    const client = iyzicoClient();
    const result: any = await cfInitialize(client, request);
    if (result.status !== "success") {
      return NextResponse.json({ error: result.errorMessage || "iyzico başlatma hatası" }, { status: 502 });
    }
    return NextResponse.json({
      ref: order.ref,
      paymentPageUrl: result.paymentPageUrl,
      token: result.token,
      checkoutFormContent: result.checkoutFormContent,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "init_by_ref_error" }, { status: 500 });
  }
}

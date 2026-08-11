import { NextRequest, NextResponse } from "next/server";
import Iyzipay from "iyzipay";
import { iyzicoClient, iyziPrice, cfInitialize } from "@/lib/iyzico";
import { CATALOG, monthlyPrice, subtotal, quote, moduleByCode } from "@/lib/catalog";
import { saveOrder } from "@/lib/orders";

export const runtime = "nodejs";

function siteUrl(req: NextRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("host");
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const modules: string[] = Array.isArray(b.modules) ? b.modules.filter((c: string) => moduleByCode(c)) : [];
    const seats = Math.max(1, Math.min(CATALOG.maxSelfServiceSeats, Number(b.seats) || 1));
    const region: "tr" | "eu" = b.region === "eu" ? "eu" : "tr";
    const billing: "monthly" | "annual" = b.billing === "annual" ? "annual" : "monthly";
    const promo: string | null = b.promo || null;
    const c = b.customer || {};

    if (!modules.length) return NextResponse.json({ error: "Modül seçilmedi." }, { status: 400 });
    if (!c.firstName || !c.lastName || !c.email || !c.company) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    // Fiyat SUNUCUDA hesaplanır (istemciye güvenilmez)
    const q = quote(modules, seats, billing, promo);
    const sub = subtotal(modules, seats, billing);

    const basketItems = modules.map((code) => {
      const m = moduleByCode(code)!;
      const monthly = monthlyPrice([code], seats);
      const line = billing === "annual" ? monthly * CATALOG.annualMonths : monthly;
      return {
        id: code,
        name: `Puki ${m.name} (${billing === "annual" ? "yıllık" : "aylık"})`,
        category1: "GRC SaaS",
        category2: m.iso,
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: iyziPrice(line),
      };
    });

    const ref = `PUKI-${Date.now().toString(36).toUpperCase()}-${Math.floor(seats)}${region}`;
    const ip = (req.headers.get("x-forwarded-for") || "85.34.78.112").split(",")[0].trim();
    const addr = c.address || "Bilgi verilmedi";
    const city = c.city || "İstanbul";

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: ref,
      price: iyziPrice(sub),          // sepet toplamı (kalemler toplamı)
      paidPrice: iyziPrice(q.total),  // tahsil edilen (promosyon sonrası)
      currency: Iyzipay.CURRENCY.TRY,
      basketId: ref,
      paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
      callbackUrl: `${siteUrl(req)}/api/checkout/callback`,
      enabledInstallments: [1],
      buyer: {
        id: c.email,
        name: c.firstName,
        surname: c.lastName,
        gsmNumber: c.phone || "+905000000000",
        email: c.email,
        identityNumber: (c.taxId || "11111111111").replace(/\D/g, "").padEnd(11, "1").slice(0, 11),
        registrationAddress: addr,
        ip,
        city,
        country: region === "eu" ? "Europe" : "Turkey",
      },
      billingAddress: { contactName: `${c.firstName} ${c.lastName}`, city, country: region === "eu" ? "Europe" : "Turkey", address: addr },
      basketItems,
    };

    const client = iyzicoClient();
    const result: any = await cfInitialize(client, request);

    if (result.status !== "success") {
      return NextResponse.json({ error: result.errorMessage || "iyzico başlatma hatası", raw: result }, { status: 502 });
    }

    saveOrder({
      ref,
      status: "pending_payment",
      createdAt: Date.now(),
      modules, seats, region, billing, promo,
      total: q.total,
      customer: { firstName: c.firstName, lastName: c.lastName, email: c.email, phone: c.phone, company: c.company, taxId: c.taxId, address: addr, city },
    });

    // paymentPageUrl -> yönlendirme; checkoutFormContent -> gömme (ikisini de döneriz)
    return NextResponse.json({
      ref,
      paymentPageUrl: result.paymentPageUrl,
      token: result.token,
      checkoutFormContent: result.checkoutFormContent,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "checkout_init_error" }, { status: 500 });
  }
}

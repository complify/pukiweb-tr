import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrderBySubRef, appendPayment } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// iyzico abonelik webhook'u: her tekrarlayan tahsilatta bildirim gelir.
// Olaylar: subscription.order.success | subscription.order.failure
export async function POST(req: NextRequest) {
  const raw = await req.text();
  let body: any = {};
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }

  const eventType = String(body.iyziEventType || "");
  const subRef = String(body.subscriptionReferenceCode || "");
  const orderRef = String(body.orderReferenceCode || "");
  const customerRef = String(body.customerReferenceCode || "");
  const iyziRef = String(body.iyziReferenceCode || "");
  const eventTime = Number(body.iyziEventTime) || Date.now();

  // İmza doğrulama (X-IYZ-SIGNATURE-V3) — merchantId + secret set ise kontrol edilir.
  const merchantId = process.env.IYZICO_MERCHANT_ID;
  const secret = process.env.IYZICO_SECRET_KEY;
  if (merchantId && secret) {
    const sigHeader = req.headers.get("x-iyz-signature-v3") || "";
    const msg = `${merchantId}${secret}${eventType}${subRef}${orderRef}${customerRef}`;
    const calc = crypto.createHmac("sha256", secret).update(msg).digest("hex");
    if (sigHeader && sigHeader !== calc) {
      console.warn("[iyzico-webhook] imza uyuşmadı", { eventType, subRef });
      if (process.env.IYZICO_WEBHOOK_STRICT === "1")
        return NextResponse.json({ error: "bad_signature" }, { status: 401 });
    }
  }

  if (!subRef) return NextResponse.json({ ok: true, ignored: "no_sub_ref" });

  const order = await getOrderBySubRef(subRef);
  if (!order) {
    console.warn("[iyzico-webhook] abonelik için sipariş bulunamadı", subRef);
    return NextResponse.json({ ok: true, ignored: "order_not_found" });
  }

  const success = eventType === "subscription.order.success";
  await appendPayment(order.ref, {
    at: eventTime > 1e12 ? eventTime : eventTime * 1000,
    amount: order.total,
    period: order.subscription?.interval || "monthly",
    status: success ? "success" : "failure",
    iyziRef: iyziRef || undefined,
    orderRef: orderRef || undefined,
  });

  return NextResponse.json({ ok: true });
}

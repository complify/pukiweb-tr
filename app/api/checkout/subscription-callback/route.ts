import { NextRequest, NextResponse } from "next/server";
import { iyzicoClient, subCheckoutRetrieve, iyzField } from "@/lib/iyzico";
import { getOrderByCfToken, setOrderStatus, mapSubToOrder } from "@/lib/orders";

export const runtime = "nodejs";

// iyzico abonelik ödemesi sonrası token'ı callbackUrl'e POST eder.
export async function POST(req: NextRequest) {
  const base = process.env.SITE_URL?.replace(/\/$/, "") ||
    `${req.headers.get("x-forwarded-proto") ?? "https"}://${req.headers.get("host")}`;
  const redirect = (params: string) => NextResponse.redirect(`${base}/odeme/sonuc?${params}`, { status: 303 });

  try {
    let token = "";
    try { const form = await req.formData(); token = String(form.get("token") || ""); } catch {}
    if (!token) { const u = new URL(req.url); token = u.searchParams.get("token") || ""; }
    if (!token) return redirect("status=error&reason=missing_token");

    const order = await getOrderByCfToken(token);
    const client = iyzicoClient();
    const res = await subCheckoutRetrieve(client, token);

    const ok = iyzField(res, "status") === "success";
    const subStatus = iyzField(res, "subscriptionStatus");
    const subRef = iyzField(res, "referenceCode");
    const customerRef = iyzField(res, "customerReferenceCode");
    const parentRef = iyzField(res, "parentReferenceCode");
    const ref = order?.ref || "";

    if (ok && (subStatus === "ACTIVE" || subStatus === "PENDING") && ref) {
      await setOrderStatus(ref, "paid_awaiting_approval", {
        paidAt: Date.now(),
        iyzicoPaymentId: subRef,
        subscription: {
          ...(order?.subscription || {}),
          subscriptionRef: subRef, customerRef, parentRef, status: subStatus,
        },
      });
      if (subRef) await mapSubToOrder(subRef, ref);
      return redirect(`status=ok&ref=${encodeURIComponent(ref)}`);
    }

    if (ref) await setOrderStatus(ref, "failed");
    return redirect(`status=fail&ref=${encodeURIComponent(ref)}&reason=${encodeURIComponent(iyzField(res, "errorMessage") || subStatus || "declined")}`);
  } catch (e: any) {
    return redirect(`status=error&reason=${encodeURIComponent(e?.message || "callback_error")}`);
  }
}

export async function GET(req: NextRequest) { return POST(req); }

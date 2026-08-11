import { NextRequest, NextResponse } from "next/server";
import { iyzicoClient, cfRetrieve } from "@/lib/iyzico";
import { setOrderStatus } from "@/lib/orders";

export const runtime = "nodejs";

// iyzico ödeme sonrası callbackUrl'e token'ı POST eder (form-encoded).
export async function POST(req: NextRequest) {
  const base = process.env.SITE_URL?.replace(/\/$/, "") ||
    `${req.headers.get("x-forwarded-proto") ?? "https"}://${req.headers.get("host")}`;

  const redirect = (params: string) => NextResponse.redirect(`${base}/odeme/sonuc?${params}`, { status: 303 });

  try {
    const form = await req.formData();
    const token = String(form.get("token") || "");
    if (!token) return redirect("status=error&reason=missing_token");

    const client = iyzicoClient();
    const result: any = await cfRetrieve(client, token);

    const ref = result.basketId || result.conversationId || "";
    const ok = result.status === "success" && result.paymentStatus === "SUCCESS";

    if (ok) {
      setOrderStatus(ref, "paid_awaiting_approval", { iyzicoPaymentId: result.paymentId });
      // NOT: Otomatik provizyon YOK — sipariş onay kuyruğuna girer.
      // (Onay panelinden onaylanınca /api/provision tetiklenecek.)
      return redirect(`status=ok&ref=${encodeURIComponent(ref)}`);
    }

    setOrderStatus(ref, "failed");
    return redirect(`status=fail&ref=${encodeURIComponent(ref)}&reason=${encodeURIComponent(result.errorMessage || result.paymentStatus || "declined")}`);
  } catch (e: any) {
    return redirect(`status=error&reason=${encodeURIComponent(e?.message || "callback_error")}`);
  }
}

// Bazı akışlarda GET ile de dönebilir
export async function GET(req: NextRequest) {
  return POST(req);
}

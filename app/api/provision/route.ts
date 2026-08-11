import { NextRequest, NextResponse } from "next/server";
import { provisionAccount } from "@/lib/provision";

// POST /api/provision
// ONAY panelinden (ödeme alınmış + yetkili onaylamış sipariş) tetiklenir.
// Bu uç, doğrudan müşteriye açık DEĞİLDİR — dahili anahtarla korunur.
export async function POST(req: NextRequest) {
  const internal = process.env.INTERNAL_API_KEY;
  if (internal && req.headers.get("x-internal-key") !== internal) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const b = await req.json();

    // TODO: siparişin (b.orderId) DB'de "ödendi + onaylandı" olduğunu doğrula.
    const result = await provisionAccount({
      idempotencyKey: b.idempotencyKey ?? b.orderId ?? `ord_${Date.now()}`,
      region: b.region,
      modules: b.modules,
      seats: Number(b.seats),
      billing: b.billing ?? "monthly",
      companyName: b.companyName,
      adminName: b.adminName,
      adminEmail: b.adminEmail,
      phone: b.phone,
      promoCode: b.promoCode ?? null,
      externalRef: b.externalRef,
    });

    // TODO: sonucu (organization_id, login_url) siparişe yaz, durumu "provisioned" yap.
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "provision_error" }, { status: 500 });
  }
}

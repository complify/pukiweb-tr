import { NextRequest, NextResponse } from "next/server";
import { getOrder, setOrderStatus } from "@/lib/orders";
import { provisionAccount } from "@/lib/provision";

export const runtime = "nodejs";

// Admin panelinden çağrılır (middleware ile Basic Auth korumalı).
// action: "approve" -> provizyon tetikler; "reject" -> siparişi reddeder.
export async function POST(req: NextRequest) {
  try {
    const { ref, action } = await req.json();
    if (!ref) return NextResponse.json({ error: "ref gerekli" }, { status: 400 });

    const order = await getOrder(ref);
    if (!order) return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });

    if (action === "reject") {
      const o = await setOrderStatus(ref, "rejected");
      return NextResponse.json({ ok: true, order: o });
    }

    if (order.status === "provisioned") {
      return NextResponse.json({ ok: true, already: true, order });
    }
    if (order.status !== "paid_awaiting_approval") {
      return NextResponse.json({ error: `Bu sipariş onaylanamaz (durum: ${order.status})` }, { status: 409 });
    }

    // Provizyon: GRC'de organizasyon + admin + lisanslar + hoş geldin maili.
    const result: any = await provisionAccount({
      idempotencyKey: order.ref,
      region: order.region,
      modules: order.modules,
      seats: order.seats,
      billing: order.billing,
      companyName: order.customer.company,
      adminName: `${order.customer.firstName} ${order.customer.lastName}`.trim() || order.customer.company,
      adminEmail: order.customer.email,
      phone: order.customer.phone,
      promoCode: order.promo,
      externalRef: order.ref,
    });

    const updated = await setOrderStatus(ref, "provisioned", {
      provision: {
        organizationId: result?.organization_id,
        loginUrl: result?.login_url,
        at: Date.now(),
      },
    });

    return NextResponse.json({ ok: true, order: updated, provision: result });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "approve_error" }, { status: 500 });
  }
}

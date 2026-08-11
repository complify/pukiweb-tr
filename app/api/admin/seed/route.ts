import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/orders";

export const runtime = "nodejs";

// SADECE test/dev: ADMIN_ALLOW_SEED=1 ise örnek sipariş ekler. (Basic Auth korumalı.)
export async function POST() {
  if (process.env.ADMIN_ALLOW_SEED !== "1") {
    return NextResponse.json({ error: "devre dışı" }, { status: 403 });
  }
  const now = Date.now();
  await saveOrder({
    ref: "PUKI-DEMO-001", status: "paid_awaiting_approval", createdAt: now - 60000, updatedAt: now - 60000,
    modules: ["bgys", "kvys"], seats: 6, region: "tr", billing: "annual", promo: "TEKNOKENT20", total: 64800,
    customer: { firstName: "Ayşe", lastName: "Demir", email: "ayse@ornekfirma.com", phone: "+90 532 000 00 00", company: "Örnek Yazılım A.Ş.", taxId: "1234567890", city: "İstanbul" },
    iyzicoPaymentId: "sandbox-pay-123",
  });
  await saveOrder({
    ref: "PUKI-DEMO-002", status: "provisioned", createdAt: now - 3600000, updatedAt: now - 3500000,
    modules: ["isys"], seats: 3, region: "eu", billing: "monthly", promo: null, total: 2500,
    customer: { firstName: "John", lastName: "Smith", email: "john@acme.eu", company: "ACME GmbH", city: "Berlin" },
    provision: { organizationId: 42, loginUrl: "https://eu.pukisoft.com/login", at: now - 3500000 },
  });
  return NextResponse.json({ ok: true });
}

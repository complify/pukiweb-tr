import { NextResponse } from "next/server";
import { saveLead, type Lead } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function makeRef(): string {
  const rnd = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `DEMO-${rnd}`;
}

export async function POST(req: Request) {
  const body: any = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });

  const name = String(body.name || "").trim();
  const company = String(body.company || "").trim();
  const email = String(body.email || "").trim();

  if (!name || !company || !email)
    return NextResponse.json({ error: "Ad Soyad, şirket ve e-posta zorunludur." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });

  const lead: Lead = {
    ref: makeRef(),
    createdAt: Date.now(),
    name,
    company,
    email,
    phone: String(body.phone || "").trim() || undefined,
    modules: Array.isArray(body.modules) ? body.modules.map((x: any) => String(x)) : [],
    message: String(body.message || "").trim() || undefined,
    status: "new",
    source: "web",
  };

  await saveLead(lead);
  return NextResponse.json({ ok: true, ref: lead.ref }, { status: 201 });
}

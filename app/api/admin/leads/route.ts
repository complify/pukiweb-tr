import { NextResponse } from "next/server";
import { listLeads, setLeadStatus, leadsKvEnabled, type LeadStatus } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const leads = await listLeads();
  return NextResponse.json({ leads, kvEnabled: leadsKvEnabled });
}

export async function POST(req: Request) {
  const body: any = await req.json().catch(() => null);
  const ref = String(body?.ref || "");
  const status = String(body?.status || "") as LeadStatus;
  if (!ref || !["new", "contacted", "closed"].includes(status))
    return NextResponse.json({ error: "ref ve geçerli status gerekli" }, { status: 400 });
  const lead = await setLeadStatus(ref, status);
  if (!lead) return NextResponse.json({ error: "Talep bulunamadı" }, { status: 404 });
  return NextResponse.json({ ok: true, lead });
}

import { NextResponse } from "next/server";
import { saveLead, type Lead } from "@/lib/leads";
import { sendMail, notifyTo } from "@/lib/mail";
import { MODULE_DETAILS } from "@/lib/module-content";
import { isFreeEmail, CORPORATE_EMAIL_ERROR } from "@/lib/corporate-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function makeRef(): string {
  const rnd = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `DEMO-${rnd}`;
}

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const modName = (c: string) => (MODULE_DETAILS[c] ? `Puki ${MODULE_DETAILS[c].name}` : c);

function notifyHtml(lead: Lead): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#8a94a6;font:600 13px system-ui;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#1b1b2b;font:500 14px system-ui">${value}</td></tr>`;
  const mods = lead.modules.length ? lead.modules.map(modName).map(esc).join(", ") : "—";
  return `
  <div style="max-width:560px;margin:0 auto;font-family:system-ui,Arial,sans-serif">
    <div style="background:#1b1b2b;border-radius:14px 14px 0 0;padding:20px 24px">
      <div style="color:#7cb518;font:700 12px system-ui;letter-spacing:.12em;text-transform:uppercase">Puki · Yeni demo talebi</div>
      <div style="color:#fff;font:800 20px system-ui;margin-top:4px">${esc(lead.company)}</div>
    </div>
    <div style="border:1px solid #e7ebf1;border-top:0;border-radius:0 0 14px 14px;padding:16px 8px">
      <table style="width:100%;border-collapse:collapse">
        ${row("Talep no", esc(lead.ref))}
        ${row("Ad Soyad", esc(lead.name))}
        ${row("Şirket", esc(lead.company))}
        ${row("E-posta", `<a href="mailto:${esc(lead.email)}" style="color:#5f8a12">${esc(lead.email)}</a>`)}
        ${row("Telefon", lead.phone ? `<a href="tel:${esc(lead.phone)}" style="color:#5f8a12">${esc(lead.phone)}</a>` : "—")}
        ${row("İlgilenilen modüller", mods)}
        ${lead.message ? row("Mesaj", esc(lead.message).replace(/\n/g, "<br>")) : ""}
      </table>
      <div style="padding:12px 12px 4px">
        <a href="https://pukiweb-tr.vercel.app/admin/talepler" style="display:inline-block;background:#7cb518;color:#fff;font:700 14px system-ui;text-decoration:none;padding:10px 18px;border-radius:10px">Admin panelde aç</a>
      </div>
    </div>
  </div>`;
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

  if (isFreeEmail(email))
    return NextResponse.json({ error: CORPORATE_EMAIL_ERROR }, { status: 422 });

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

  // Bildirim e-postası — başarısız olsa bile talep kaydı bozulmaz.
  try {
    await sendMail({
      to: notifyTo(),
      replyTo: lead.email,
      subject: `Yeni demo talebi — ${lead.company} (${lead.ref})`,
      html: notifyHtml(lead),
    });
  } catch (e) {
    console.error("[demo] bildirim e-postası gönderilemedi", e);
  }

  return NextResponse.json({ ok: true, ref: lead.ref }, { status: 201 });
}

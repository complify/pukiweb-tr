import { NextResponse } from "next/server";
import { saveOrder, type Order } from "@/lib/orders";
import { CATALOG, moduleByCode, fmt } from "@/lib/catalog";
import { sendMail, notifyTo } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function siteUrl(req: Request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${req.headers.get("host")}`;
}

function quoteEmail(order: Order, link: string): string {
  const rows = (order.lineItems || []).map((li) =>
    `<tr><td style="padding:8px 14px;color:#1b1b2b;font:600 14px system-ui;border-top:1px solid #eef1f6">${esc(li.name)}</td>
     <td style="padding:8px 14px;color:#8a94a6;font:600 13px system-ui;text-align:right;border-top:1px solid #eef1f6;white-space:nowrap">${esc(fmt(li.price))}/ay</td></tr>`
  ).join("");
  const monthly = order.pricing?.monthlyTotal ?? order.total;
  const months = order.pricing?.annualMonths ?? CATALOG.annualMonths;
  const annual = monthly * months;
  const offerAnnual = order.pricing?.offerAnnual ?? false;
  const options = `
    <div style="display:flex;gap:10px;margin:14px 0 6px;flex-wrap:wrap">
      <div style="flex:1;min-width:180px;border:1px solid #e7ebf1;border-radius:12px;padding:14px">
        <div style="color:#8a94a6;font:700 11px system-ui;text-transform:uppercase;letter-spacing:.08em">Aylık</div>
        <div style="color:#1b1b2b;font:800 20px system-ui;margin-top:4px">${esc(fmt(monthly))}<span style="font:600 13px system-ui;color:#8a94a6">/ay</span></div>
      </div>
      ${offerAnnual ? `<div style="flex:1;min-width:180px;border:2px solid #7cb518;border-radius:12px;padding:14px;background:#f6faef">
        <div style="color:#5f8a12;font:700 11px system-ui;text-transform:uppercase;letter-spacing:.08em">Yıllık · 2 ay bedava</div>
        <div style="color:#1b1b2b;font:800 20px system-ui;margin-top:4px">${esc(fmt(annual))}<span style="font:600 13px system-ui;color:#8a94a6">/yıl</span></div>
      </div>` : ``}
    </div>`;
  return `
  <div style="max-width:560px;margin:0 auto;font-family:system-ui,Arial,sans-serif">
    <div style="background:#1b1b2b;border-radius:14px 14px 0 0;padding:22px 24px">
      <div style="color:#7cb518;font:700 12px system-ui;letter-spacing:.12em;text-transform:uppercase">Puki · Teklifiniz hazır</div>
      <div style="color:#fff;font:800 20px system-ui;margin-top:6px">Merhaba ${esc(order.customer.firstName || order.customer.company)},</div>
    </div>
    <div style="border:1px solid #e7ebf1;border-top:0;border-radius:0 0 14px 14px;padding:20px 16px">
      <p style="color:#5e6278;font:400 14px system-ui;line-height:1.6;margin:0 0 6px">${esc(order.customer.company)} için hazırladığımız teklif aşağıdadır. ${offerAnnual ? "Aylık veya yıllık ödemeyi kendiniz seçebilirsiniz." : ""}</p>
      <table style="width:100%;border-collapse:collapse;margin:6px 0 2px"><tbody>${rows}</tbody></table>
      ${options}
      <div style="padding:12px 14px 4px;text-align:center"><a href="${link}" style="display:inline-block;background:#7cb518;color:#fff;font:800 15px system-ui;text-decoration:none;padding:13px 28px;border-radius:11px">Teklifi incele & öde</a></div>
      <p style="color:#8a94a6;font:400 12px system-ui;text-align:center;margin:12px 0 0">Teklif no: ${esc(order.ref)}</p>
    </div>
  </div>`;
}

export async function POST(req: Request) {
  const b: any = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });

  const c = b.customer || {};
  const firstName = String(c.firstName || "").trim();
  const lastName = String(c.lastName || "").trim();
  const email = String(c.email || "").trim();
  const company = String(c.company || "").trim();
  if (!firstName || !email || !company)
    return NextResponse.json({ error: "Ad, e-posta ve şirket zorunludur." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: "Geçerli bir e-posta girin." }, { status: 400 });

  const region: "tr" | "eu" = b.region === "eu" ? "eu" : "tr";
  const seats = Math.max(1, Number(b.seats) || 5);
  const offerAnnual = b.offerAnnual !== false; // varsayılan: sun

  const rawLines: any[] = Array.isArray(b.lineItems) ? b.lineItems : [];
  const lineItems = rawLines
    .map((li) => {
      const m = moduleByCode(String(li.code || ""));
      const price = Math.max(0, Math.round(Number(li.price) || 0)); // AYLIK birim
      if (!m) return null;
      return { code: m.code, name: `Puki ${m.name}`, price };
    })
    .filter(Boolean) as { code: string; name: string; price: number }[];

  if (!lineItems.length)
    return NextResponse.json({ error: "En az bir modül (kalem) ekleyin." }, { status: 400 });

  const monthlyTotal = lineItems.reduce((s, li) => s + li.price, 0);
  if (monthlyTotal <= 0) return NextResponse.json({ error: "Toplam tutar 0 olamaz." }, { status: 400 });

  const ref = `TEK-${Date.now().toString(36).toUpperCase()}-${region}`;
  const order: Order = {
    ref,
    status: "pending_payment",
    createdAt: Date.now(),
    origin: "admin",
    modules: lineItems.map((li) => li.code),
    lineItems,
    seats,
    region,
    billing: "monthly", // müşteri ödeme ekranında seçecek
    promo: null,
    total: monthlyTotal, // müşteri seçince güncellenir
    pricing: { monthlyTotal, offerAnnual, annualMonths: CATALOG.annualMonths },
    customer: {
      firstName, lastName, email,
      phone: String(c.phone || "").trim() || undefined,
      company,
    },
    note: String(b.note || "").trim() || undefined,
  };

  await saveOrder(order);

  const link = `${siteUrl(req)}/odeme/${encodeURIComponent(ref)}`;
  let emailed = false;
  try {
    emailed = await sendMail({
      to: email,
      replyTo: notifyTo(),
      subject: `Puki teklifiniz — ${company} (${ref})`,
      html: quoteEmail(order, link),
    });
  } catch (e) {
    console.error("[quotes] teklif e-postası gönderilemedi", e);
  }

  return NextResponse.json({ ok: true, ref, link, emailed }, { status: 201 });
}

import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";
import { fmt } from "@/lib/catalog";
import { sendMail, notifyTo } from "@/lib/mail";
import type { Order } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function siteUrl(req: Request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${req.headers.get("host")}`;
}

function html(order: Order, link: string): string {
  const rows = (order.lineItems || []).map((li) =>
    `<tr><td style="padding:8px 14px;color:#1b1b2b;font:600 14px system-ui;border-top:1px solid #eef1f6">${esc(li.name)}</td>
     <td style="padding:8px 14px;color:#1b1b2b;font:700 14px system-ui;text-align:right;border-top:1px solid #eef1f6;white-space:nowrap">${esc(fmt(li.price))}</td></tr>`).join("");
  const period = order.billing === "annual" ? "yıllık" : "aylık";
  return `<div style="max-width:560px;margin:0 auto;font-family:system-ui,Arial,sans-serif">
    <div style="background:#1b1b2b;border-radius:14px 14px 0 0;padding:22px 24px">
      <div style="color:#7cb518;font:700 12px system-ui;letter-spacing:.12em;text-transform:uppercase">Puki · Teklif hatırlatma</div>
      <div style="color:#fff;font:800 20px system-ui;margin-top:6px">Merhaba ${esc(order.customer.firstName || order.customer.company)},</div>
    </div>
    <div style="border:1px solid #e7ebf1;border-top:0;border-radius:0 0 14px 14px;padding:20px 16px">
      <p style="color:#5e6278;font:400 14px system-ui;line-height:1.6;margin:0 0 14px">${esc(order.customer.company)} için teklifiniz ödeme bekliyor.</p>
      <table style="width:100%;border-collapse:collapse"><tbody>${rows}</tbody>
      <tfoot><tr><td style="padding:12px 14px;color:#1b1b2b;font:800 15px system-ui;border-top:2px solid #1b1b2b">Toplam (${period})</td>
      <td style="padding:12px 14px;color:#5f8a12;font:800 16px system-ui;text-align:right;border-top:2px solid #1b1b2b;white-space:nowrap">${esc(fmt(order.total))}</td></tr></tfoot></table>
      <div style="padding:14px 14px 4px;text-align:center"><a href="${link}" style="display:inline-block;background:#7cb518;color:#fff;font:800 15px system-ui;text-decoration:none;padding:13px 28px;border-radius:11px">Güvenli ödeme yap</a></div>
      <p style="color:#8a94a6;font:400 12px system-ui;text-align:center;margin:12px 0 0">Teklif no: ${esc(order.ref)}</p>
    </div></div>`;
}

export async function POST(req: Request) {
  const b: any = await req.json().catch(() => null);
  const ref = String(b?.ref || "");
  if (!ref) return NextResponse.json({ error: "ref gerekli" }, { status: 400 });
  const order = await getOrder(ref);
  if (!order) return NextResponse.json({ error: "Teklif bulunamadı." }, { status: 404 });
  if (order.status !== "pending_payment")
    return NextResponse.json({ error: "Yalnız ödeme bekleyen teklifler tekrar gönderilebilir." }, { status: 409 });

  const link = `${siteUrl(req)}/odeme/${encodeURIComponent(ref)}`;
  const emailed = await sendMail({
    to: order.customer.email,
    replyTo: notifyTo(),
    subject: `Puki teklifiniz (hatırlatma) — ${order.customer.company} (${ref})`,
    html: html(order, link),
  });
  return NextResponse.json({ ok: true, emailed, link });
}

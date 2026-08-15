import { NextResponse } from "next/server";
import { getOrdersByEmail } from "@/lib/orders";
import { signMagicToken } from "@/lib/customer-auth";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function siteUrl(req: Request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return `${proto}://${req.headers.get("host")}`;
}

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const b: any = await req.json().catch(() => null);
  const email = String(b?.email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: "Geçerli bir e-posta girin." }, { status: 400 });

  // E-postanın kayıtlı olup olmadığını sızdırmayız: her durumda başarı döneriz.
  const orders = await getOrdersByEmail(email);
  if (orders.length > 0) {
    const token = await signMagicToken(email);
    const link = `${siteUrl(req)}/api/hesap/verify?token=${encodeURIComponent(token)}`;
    try {
      await sendMail({
        to: email,
        subject: "Puki hesabınıza giriş bağlantısı",
        html: `<div style="max-width:520px;margin:0 auto;font-family:system-ui,Arial,sans-serif">
          <div style="background:#1b1b2b;border-radius:14px 14px 0 0;padding:22px 24px">
            <div style="color:#7cb518;font:700 12px system-ui;letter-spacing:.12em;text-transform:uppercase">Puki · Hesap girişi</div>
          </div>
          <div style="border:1px solid #e7ebf1;border-top:0;border-radius:0 0 14px 14px;padding:22px 18px">
            <p style="color:#5e6278;font:400 14px system-ui;line-height:1.6;margin:0 0 16px">Hesabınıza giriş yapmak için aşağıdaki bağlantıya tıklayın. Bağlantı 20 dakika geçerlidir.</p>
            <div style="text-align:center"><a href="${esc(link)}" style="display:inline-block;background:#7cb518;color:#fff;font:800 15px system-ui;text-decoration:none;padding:13px 28px;border-radius:11px">Giriş yap</a></div>
            <p style="color:#8a94a6;font:400 12px system-ui;margin:16px 0 0">Bu isteği siz yapmadıysanız bu e-postayı yok sayabilirsiniz.</p>
          </div></div>`,
      });
    } catch (e) { console.error("[hesap] giriş e-postası gönderilemedi", e); }
  }
  return NextResponse.json({ ok: true });
}

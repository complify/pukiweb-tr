import { NextResponse } from "next/server";
import { sendMail, notifyTo } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Admin girişi arkasında (middleware korur). Tarayıcıda /api/admin/mail-test açılınca test maili gönderir.
export async function GET() {
  const to = notifyTo();
  const from = process.env.MAIL_FROM || "Puki <hello@complify.io>";
  const hasKey = !!process.env.RESEND_API_KEY;

  if (!hasKey) {
    return NextResponse.json({
      ok: false,
      hasKey,
      to, from,
      hint: "RESEND_API_KEY tanımlı değil. Vercel'de Resend entegrasyonunu bağlayın ve MAIL_FROM'u doğrulanmış adresinizle ayarlayın.",
    });
  }

  const emailed = await sendMail({
    to,
    subject: "Puki · Test e-postası",
    html: `<div style="font-family:system-ui,Arial,sans-serif;max-width:480px;margin:0 auto;padding:20px">
      <h2 style="color:#1b1b2b">Mail yapılandırması çalışıyor ✅</h2>
      <p style="color:#5e6278">Bu bir test e-postasıdır. Gönderen: <b>${from}</b> · Alıcı: <b>${to}</b></p>
    </div>`,
  });

  return NextResponse.json({
    ok: emailed,
    hasKey, to, from,
    hint: emailed
      ? "Test maili gönderildi. Gelen kutunuzu (ve spam) kontrol edin. Gelmezse MAIL_FROM alan adının Resend'de doğrulandığından emin olun."
      : "Gönderim başarısız. Genelde MAIL_FROM alan adı Resend'de doğrulanmamıştır ya da anahtar hatalıdır. Vercel loglarına bakın.",
  });
}

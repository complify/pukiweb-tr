import { NextResponse } from "next/server";
import { sendMail, notifyTo } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Admin girişi arkasında (middleware korur). Tarayıcıda /api/admin/mail-test açılınca test maili gönderir.
export async function GET() {
  const to = notifyTo();
  const from = process.env.MAIL_FROM || "Puki <destek@puki.com.tr>";
  const hasKey = !!process.env.SENDGRID_API_KEY;

  if (!hasKey) {
    return NextResponse.json({
      ok: false, hasKey, to, from,
      hint: "SENDGRID_API_KEY tanımlı değil. Vercel env'e GRC ile aynı SendGrid anahtarını ekleyin.",
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
    ok: emailed, hasKey, to, from,
    hint: emailed
      ? "Test maili gönderildi (SendGrid 202). Gelen kutunuzu ve spam'i kontrol edin."
      : "Gönderim başarısız. MAIL_FROM adresinin SendGrid'de doğrulanmış (domain authentication) olduğundan ve anahtarın doğru olduğundan emin olun. Vercel loglarına bakın.",
  });
}

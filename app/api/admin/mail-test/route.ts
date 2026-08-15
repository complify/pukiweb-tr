import { NextResponse } from "next/server";
import { sendMailRaw, notifyTo } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const to = notifyTo();
  const from = process.env.MAIL_FROM || "Puki <no-reply@pukisoft.com>";
  const hasKey = !!process.env.SENDGRID_API_KEY;

  const res = await sendMailRaw({
    to,
    subject: "Puki · Test e-postası",
    html: `<div style="font-family:system-ui,Arial,sans-serif;max-width:480px;margin:0 auto;padding:20px">
      <h2 style="color:#1b1b2b">Mail yapılandırması çalışıyor ✅</h2>
      <p style="color:#5e6278">Gönderen: <b>${from}</b> · Alıcı: <b>${to}</b></p>
    </div>`,
  });

  return NextResponse.json({
    ok: res.ok,
    hasKey,
    to,
    from,
    sendgridStatus: res.status ?? null,
    sendgridError: res.error ?? null,
    hint: res.ok
      ? "Test maili gönderildi (202). Gelen kutusunu/spam'i kontrol edin."
      : "Gönderim başarısız. Aşağıdaki 'sendgridError' alanı gerçek sebebi gösterir (genelde gönderici adresi doğrulanmamış).",
  });
}

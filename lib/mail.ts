// Basit e-posta gönderimi — Resend HTTP API (ek bağımlılık yok, Vercel-dostu).
// RESEND_API_KEY tanımlı değilse sessizce atlar (lead yine de kaydedilir, panelde görünür).

export interface MailInput {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export const mailEnabled = !!process.env.RESEND_API_KEY;

export async function sendMail(m: MailInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "Puki <hello@complify.io>";
  if (!key) {
    console.warn("[mail] RESEND_API_KEY yok — e-posta gönderimi atlandı.");
    return false;
  }
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: Array.isArray(m.to) ? m.to : [m.to],
        subject: m.subject,
        html: m.html,
        ...(m.replyTo ? { reply_to: m.replyTo } : {}),
      }),
    });
    if (!r.ok) {
      console.error("[mail] gönderim hatası", r.status, await r.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[mail] istisna", e);
    return false;
  }
}

// Alıcı: bildirimlerin gideceği iç e-posta (varsayılan: sahibin adresi).
export function notifyTo(): string {
  return process.env.LEAD_NOTIFY_TO || process.env.ADMIN_EMAIL || "omer@complify.io";
}

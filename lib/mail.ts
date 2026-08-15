// E-posta gönderimi — SendGrid v3 HTTP API (ek bağımlılık yok).
// Puki GRC ile aynı SendGrid altyapısı; puki.com.tr uzantılı adresten gönderir.
// SENDGRID_API_KEY tanımlı değilse sessizce atlar (işlem yine de tamamlanır).

export interface MailInput {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export const mailEnabled = !!process.env.SENDGRID_API_KEY;

// "Puki <destek@puki.com.tr>" -> { name, email }
function parseFrom(s: string): { email: string; name?: string } {
  const m = s.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  if (m) return { name: m[1] || undefined, email: m[2].trim() };
  return { email: s.trim() };
}

export async function sendMail(m: MailInput): Promise<boolean> {
  const key = process.env.SENDGRID_API_KEY;
  const fromRaw = process.env.MAIL_FROM || "Puki <destek@puki.com.tr>";
  if (!key) {
    console.warn("[mail] SENDGRID_API_KEY yok — e-posta gönderimi atlandı.");
    return false;
  }
  const from = parseFrom(fromRaw);
  const toList = (Array.isArray(m.to) ? m.to : [m.to]).map((email) => ({ email }));

  const body: any = {
    personalizations: [{ to: toList }],
    from,
    subject: m.subject,
    content: [{ type: "text/html", value: m.html }],
  };
  if (m.replyTo) body.reply_to = { email: m.replyTo };

  try {
    const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.status !== 202) {
      console.error("[mail] SendGrid hatası", r.status, await r.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[mail] istisna", e);
    return false;
  }
}

// Alıcı: iç bildirimlerin gideceği adres (varsayılan: sahibin adresi).
export function notifyTo(): string {
  return process.env.LEAD_NOTIFY_TO || process.env.ADMIN_EMAIL || "omer@complify.io";
}

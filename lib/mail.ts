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

export interface MailResult { ok: boolean; status?: number; error?: string; skipped?: boolean }

export async function sendMailRaw(m: MailInput): Promise<MailResult> {
  const key = process.env.SENDGRID_API_KEY;
  const fromRaw = process.env.MAIL_FROM || "Puki <no-reply@pukisoft.com>";
  if (!key) {
    console.warn("[mail] SENDGRID_API_KEY yok — e-posta gönderimi atlandı.");
    return { ok: false, skipped: true, error: "SENDGRID_API_KEY yok" };
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
      const txt = await r.text().catch(() => "");
      console.error("[mail] SendGrid hatası", r.status, txt);
      return { ok: false, status: r.status, error: txt || `HTTP ${r.status}` };
    }
    return { ok: true, status: 202 };
  } catch (e: any) {
    console.error("[mail] istisna", e);
    return { ok: false, error: e?.message || "istisna" };
  }
}

export async function sendMail(m: MailInput): Promise<boolean> {
  return (await sendMailRaw(m)).ok;
}

// Alıcı: iç bildirimlerin gideceği adres (varsayılan: sahibin adresi).
export function notifyTo(): string {
  return process.env.LEAD_NOTIFY_TO || "destek@puki.com.tr";
}

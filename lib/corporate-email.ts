// Demo talebinde kurumsal e-posta şartı — ücretsiz/kişisel sağlayıcıları reddet.
// Liste büyüdükçe buraya ekleyin.
export const FREE_EMAIL_DOMAINS = new Set<string>([
  "gmail.com", "googlemail.com",
  "hotmail.com", "hotmail.com.tr", "hotmail.co.uk", "hotmail.fr", "hotmail.de",
  "outlook.com", "outlook.com.tr", "live.com", "live.com.tr", "msn.com", "windowslive.com",
  "yahoo.com", "yahoo.com.tr", "yahoo.co.uk", "ymail.com", "rocketmail.com",
  "icloud.com", "me.com", "mac.com",
  "aol.com",
  "proton.me", "protonmail.com", "pm.me",
  "gmx.com", "gmx.net", "gmx.de",
  "mail.com", "email.com",
  "yandex.com", "yandex.ru", "yandex.com.tr", "ya.ru",
  "zoho.com",
  "mail.ru", "bk.ru", "inbox.ru", "list.ru",
  "hey.com", "fastmail.com", "tutanota.com", "tuta.com",
  "mynet.com", "superonline.com", "ttmail.com",
]);

export function emailDomain(email: string): string {
  const at = String(email).lastIndexOf("@");
  return at === -1 ? "" : email.slice(at + 1).trim().toLowerCase();
}

export function isFreeEmail(email: string): boolean {
  return FREE_EMAIL_DOMAINS.has(emailDomain(email));
}

export const CORPORATE_EMAIL_ERROR =
  "Lütfen kurumsal e-posta adresinizle başvurun. Gmail, Hotmail, Outlook, Yahoo gibi ücretsiz e-posta hesapları kabul edilmiyor.";

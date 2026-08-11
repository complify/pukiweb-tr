import crypto from "crypto";

// Bölge -> GRC provizyon API kök adresi
const REGION_URLS: Record<string, string | undefined> = {
  tr: process.env.PROVISION_URL_TR,
  eu: process.env.PROVISION_URL_EU,
};

export interface ProvisionInput {
  idempotencyKey: string;
  region: "tr" | "eu";
  modules: string[];
  seats: number;
  billing: "monthly" | "annual";
  companyName: string;
  adminName: string;
  adminEmail: string;
  phone?: string;
  promoCode?: string | null;
  externalRef?: string;
}

// GRC (tr/eu.pukisoft.com) provizyon API'sini HMAC imzalı çağırır.
// GRC tarafındaki PROVISIONING_API_SECRET ile aynı sır kullanılmalı.
export async function provisionAccount(input: ProvisionInput) {
  const base = REGION_URLS[input.region];
  const secret = process.env.PROVISIONING_API_SECRET;
  if (!base) throw new Error(`Bölge için provizyon URL tanımlı değil: ${input.region}`);
  if (!secret) throw new Error("PROVISIONING_API_SECRET tanımlı değil");

  const body = JSON.stringify({
    idempotency_key: input.idempotencyKey,
    modules: input.modules,
    seats: input.seats,
    period: input.billing,
    company_name: input.companyName,
    admin_name: input.adminName,
    admin_email: input.adminEmail,
    admin_username: input.adminEmail,
    phone: input.phone,
    promo_code: input.promoCode ?? undefined,
    locale: input.region === "eu" ? "en" : "tr",
    external_ref: input.externalRef,
  });

  const ts = Math.floor(Date.now() / 1000).toString();
  const sig = crypto.createHmac("sha256", secret).update(`${ts}.${body}`).digest("hex");

  const res = await fetch(`${base}/api/provisioning/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Puki-Timestamp": ts,
      "X-Puki-Signature": sig,
    },
    body,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Provizyon başarısız (${res.status}): ${JSON.stringify(data)}`);
  return data; // { status, organization_id, login_url }
}

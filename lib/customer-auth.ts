import { SignJWT, jwtVerify } from "jose";

export const CUSTOMER_COOKIE = "puki_customer";
export interface CustomerSession { email: string; name?: string }

const secretKey = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-insecure-secret-change-me");

// Uzun ömürlü oturum (30 gün)
export async function signCustomerSession(email: string, name?: string): Promise<string> {
  return await new SignJWT({ typ: "sess", name: name || "" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email.toLowerCase())
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey());
}

export async function verifyCustomerSession(token?: string): Promise<CustomerSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.typ !== "sess") return null;
    return { email: String(payload.sub), name: String(payload.name || "") };
  } catch { return null; }
}

// Kısa ömürlü sihirli giriş token'ı (20 dk)
export async function signMagicToken(email: string): Promise<string> {
  return await new SignJWT({ typ: "magic" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email.toLowerCase())
    .setIssuedAt()
    .setExpirationTime("20m")
    .sign(secretKey());
}

export async function verifyMagicToken(token?: string): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.typ !== "magic") return null;
    return String(payload.sub);
  } catch { return null; }
}

export const CUSTOMER_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 gün

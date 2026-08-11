import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "puki_admin";
export type Role = "owner" | "member";
export interface Session { email: string; name: string; role: Role }

const secretKey = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-insecure-secret-change-me");

export async function signSession(s: Session): Promise<string> {
  return await new SignJWT({ name: s.name, role: s.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(s.email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifySession(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { email: String(payload.sub), name: String(payload.name || ""), role: (payload.role as Role) || "member" };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 gün

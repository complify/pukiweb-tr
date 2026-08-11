import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession, type Session } from "@/lib/auth";

// Server component / route handler içinde oturumu okur.
export async function getSession(): Promise<Session | null> {
  const t = cookies().get(SESSION_COOKIE)?.value;
  return verifySession(t);
}

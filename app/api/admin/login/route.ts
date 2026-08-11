import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/users";
import { signSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.AUTH_SECRET && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Sunucu yapılandırması eksik: AUTH_SECRET tanımlı değil." }, { status: 503 });
    }
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "E-posta ve parola gerekli." }, { status: 400 });

    const user = await verifyCredentials(String(email), String(password));
    if (!user) return NextResponse.json({ error: "E-posta veya parola hatalı." }, { status: 401 });

    const token = await signSession(user);
    const res = NextResponse.json({ ok: true, user });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "login_error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

// Giriş yapmadan erişilebilen uçlar
const PUBLIC = new Set(["/admin/giris", "/api/admin/login"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.has(pathname)) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  if (session) return NextResponse.next();

  // API uçları için 401, sayfalar için giriş sayfasına yönlendir
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/giris";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

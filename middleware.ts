import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { CUSTOMER_COOKIE, verifyCustomerSession } from "@/lib/customer-auth";

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*", "/hesap/:path*", "/api/hesap/:path*"] };

const ADMIN_PUBLIC = new Set(["/admin/giris", "/api/admin/login"]);
const CUSTOMER_PUBLIC = new Set(["/hesap/giris", "/api/hesap/login", "/api/hesap/verify"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Müşteri portalı ---
  if (pathname.startsWith("/hesap") || pathname.startsWith("/api/hesap")) {
    if (CUSTOMER_PUBLIC.has(pathname)) return NextResponse.next();
    const session = await verifyCustomerSession(req.cookies.get(CUSTOMER_COOKIE)?.value);
    if (session) return NextResponse.next();
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
    const url = req.nextUrl.clone();
    url.pathname = "/hesap/giris";
    return NextResponse.redirect(url);
  }

  // --- Admin paneli ---
  if (ADMIN_PUBLIC.has(pathname)) return NextResponse.next();
  const admin = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (admin) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  const url = req.nextUrl.clone();
  url.pathname = "/admin/giris";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

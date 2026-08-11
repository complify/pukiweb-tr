import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

// /admin ve /api/admin uçlarını HTTP Basic Auth ile korur.
// Vercel'de ADMIN_USER (varsayılan "admin") ve ADMIN_PASSWORD env değerlerini tanımlayın.
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER || "admin";
  const pass = process.env.ADMIN_PASSWORD;

  // Parola tanımlı değilse: üretimde eriş(tir)me, geliştirmede serbest bırak.
  if (!pass) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return new NextResponse("ADMIN_PASSWORD tanımlı değil.", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const i = decoded.indexOf(":");
      const u = decoded.slice(0, i);
      const p = decoded.slice(i + 1);
      if (u === user && p === pass) return NextResponse.next();
    } catch {}
  }

  return new NextResponse("Yetki gerekli.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Puki Admin"' },
  });
}

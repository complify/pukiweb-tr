import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { CUSTOMER_COOKIE, verifyCustomerSession } from "@/lib/customer-auth";

export const config = {
  // Tüm sayfalarda çalışır; statik dosyalar hariç
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|txt|xml|json|woff|woff2|ttf|otf)).*)",
  ],
};

const ADMIN_PUBLIC = new Set(["/admin/giris", "/api/admin/login"]);
const CUSTOMER_PUBLIC = new Set(["/hesap/giris", "/api/hesap/login", "/api/hesap/verify"]);

// --- Geo-kısıt: yalnız Türkiye (TR) ve Azerbaycan (AZ) ---
const ALLOWED_COUNTRIES = new Set(["TR", "AZ"]);
// Arama motoru + sosyal/izleme botları geo-engelden muaftır (SEO korunur)
const BOT_UA =
  /(googlebot|google-inspectiontool|storebot-google|adsbot-google|mediapartners-google|bingbot|slurp|duckduckbot|baiduspider|yandex|sogou|exabot|facebookexternalhit|facebot|ia_archiver|applebot|petalbot|bytespider|semrushbot|ahrefsbot|mj12bot|dotbot|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|lighthouse|chrome-lighthouse|uptimerobot|pingdom|vercel)/i;

function geoAllowed(req: NextRequest): boolean {
  const ua = req.headers.get("user-agent") || "";
  if (BOT_UA.test(ua)) return true; // botlar her yerden geçer
  const country = (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    ""
  ).toUpperCase();
  // Ülke belirlenemiyorsa (boş / XX / T1) engelleme — yanlış pozitiflerden kaçın
  if (!country || country === "XX" || country === "T1") return true;
  return ALLOWED_COUNTRIES.has(country);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPanel =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/hesap") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/hesap");

  // Herkese açık sayfalar: geo-kısıt uygula (panel yolları muaf)
  if (!isPanel) {
    const isSeoFile = pathname === "/robots.txt" || pathname.startsWith("/sitemap");
    if (!isSeoFile && !geoAllowed(req)) {
      // Sitenin varlığını ele vermeyen sessiz yanıt: sıradan 404 (mesaj yok)
      return new NextResponse("Not Found", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
    return NextResponse.next();
  }

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

import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_COOKIE } from "@/lib/customer-auth";

export const runtime = "nodejs";

function base(req: NextRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  return `${req.headers.get("x-forwarded-proto") ?? "https"}://${req.headers.get("host")}`;
}

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(`${base(req)}/hesap/giris`, { status: 303 });
  res.cookies.set(CUSTOMER_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

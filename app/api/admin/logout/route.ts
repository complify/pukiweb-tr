import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

function clear(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/admin/giris";
  url.search = "";
  const res = NextResponse.redirect(url, { status: 303 });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

export async function GET(req: NextRequest) { return clear(req); }
export async function POST(req: NextRequest) { return clear(req); }

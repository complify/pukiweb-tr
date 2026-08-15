import { NextRequest, NextResponse } from "next/server";
import { verifyMagicToken, signCustomerSession, CUSTOMER_COOKIE, CUSTOMER_SESSION_MAX_AGE } from "@/lib/customer-auth";
import { getOrdersByEmail } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function base(req: NextRequest) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  return `${req.headers.get("x-forwarded-proto") ?? "https"}://${req.headers.get("host")}`;
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const email = await verifyMagicToken(token);
  if (!email) return NextResponse.redirect(`${base(req)}/hesap/giris?error=1`, { status: 303 });

  // İsim (varsa) siparişten
  const orders = await getOrdersByEmail(email);
  const name = orders[0]?.customer ? `${orders[0].customer.firstName} ${orders[0].customer.lastName}`.trim() : "";
  const sess = await signCustomerSession(email, name);

  const res = NextResponse.redirect(`${base(req)}/hesap`, { status: 303 });
  res.cookies.set(CUSTOMER_COOKIE, sess, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: CUSTOMER_SESSION_MAX_AGE,
  });
  return res;
}

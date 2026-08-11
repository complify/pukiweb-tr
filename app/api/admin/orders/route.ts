import { NextResponse } from "next/server";
import { listOrders, kvEnabled } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ orders, kvEnabled });
}

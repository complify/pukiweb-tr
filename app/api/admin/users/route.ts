import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session-server";
import { listUsers, createUser, deleteUser, usersKvEnabled } from "@/lib/users";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireOwner() {
  const s = await getSession();
  if (!s) return { error: "Oturum gerekli", status: 401 as const };
  if (s.role !== "owner") return { error: "Bu işlem için yetkiniz yok (sadece sahip).", status: 403 as const };
  return { session: s };
}

export async function GET() {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Oturum gerekli" }, { status: 401 });
  const users = await listUsers();
  return NextResponse.json({ users, kvEnabled: usersKvEnabled, canManage: s.role === "owner", me: s.email });
}

export async function POST(req: NextRequest) {
  const g = await requireOwner();
  if (g.error) return NextResponse.json({ error: g.error }, { status: g.status });
  try {
    const { email, name, password, role } = await req.json();
    const user = await createUser({ email, name, password, role: role === "owner" ? "owner" : "member" });
    return NextResponse.json({ ok: true, user });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "create_error" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const g = await requireOwner();
  if (g.error) return NextResponse.json({ error: g.error }, { status: g.status });
  try {
    const { email } = await req.json();
    if (email && g.session && email.toLowerCase() === g.session.email.toLowerCase()) {
      return NextResponse.json({ error: "Kendi hesabınızı silemezsiniz." }, { status: 400 });
    }
    await deleteUser(String(email));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "delete_error" }, { status: 400 });
  }
}

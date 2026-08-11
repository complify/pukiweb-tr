import Link from "next/link";
import AdminUsers from "@/components/AdminUsers";
import AdminBar from "@/components/AdminBar";
import { getSession } from "@/lib/session-server";
import { listUsers, usersKvEnabled } from "@/lib/users";

export const dynamic = "force-dynamic";
export const metadata = { title: "Kullanıcılar — Puki Admin", robots: { index: false } };

export default async function KullanicilarPage() {
  const session = await getSession();
  if (!session) return null; // middleware zaten yönlendirir

  if (session.role !== "owner") {
    return (
      <div className="container-p py-10">
        <AdminBar session={session} active="users" />
        <div className="max-w-md bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
          <h1 className="text-lg font-extrabold text-ink">Yetkiniz yok</h1>
          <p className="text-sm text-muted mt-2">Kullanıcı yönetimi yalnızca “Sahip” rolündeki hesaplar içindir.</p>
          <Link href="/admin" className="inline-block mt-4 text-sm font-bold text-puki-dark hover:text-puki">← Siparişlere dön</Link>
        </div>
      </div>
    );
  }

  const users = await listUsers();
  return (
    <div className="container-p py-10">
      <AdminBar session={session} active="users" />
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">Kullanıcılar</h1>
        <p className="text-muted mt-1 text-sm">Ekip üyelerini ekleyin veya çıkarın. “Üye” siparişleri onaylayabilir; “Sahip” ayrıca kullanıcıları yönetebilir.</p>
      </div>
      <AdminUsers initial={users} kvEnabled={usersKvEnabled} me={session.email} />
    </div>
  );
}

import AdminOrders from "@/components/AdminOrders";
import AdminBar from "@/components/AdminBar";
import { listOrders, kvEnabled } from "@/lib/orders";
import { getSession } from "@/lib/session-server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sipariş Onayları — Puki Admin", robots: { index: false } };

export default async function AdminPage() {
  const session = await getSession();
  const orders = await listOrders();
  return (
    <div className="container-p py-10">
      {session && <AdminBar session={session} active="orders" />}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">Sipariş onayları</h1>
        <p className="text-muted mt-1 text-sm">Ödemesi alınan siparişleri onaylayın; onay, hesabı GRC'de açar ve müşteriye giriş bilgilerini gönderir.</p>
      </div>
      <AdminOrders initial={orders} kvEnabled={kvEnabled} />
    </div>
  );
}

import AdminOrders from "@/components/AdminOrders";
import { listOrders, kvEnabled } from "@/lib/orders";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sipariş Onayları — Puki Admin", robots: { index: false } };

export default async function AdminPage() {
  const orders = await listOrders();
  return (
    <div className="container-p py-10">
      <div className="mb-6">
        <span className="eyebrow">Admin</span>
        <h1 className="mt-2 text-2xl font-extrabold text-ink tracking-tight">Sipariş onayları</h1>
        <p className="text-muted mt-1 text-sm">Ödemesi alınan siparişleri onaylayın; onay, hesabı GRC'de açar ve müşteriye giriş bilgilerini gönderir.</p>
      </div>
      <AdminOrders initial={orders} kvEnabled={kvEnabled} />
    </div>
  );
}

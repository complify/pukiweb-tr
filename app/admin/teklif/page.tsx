import AdminQuoteForm from "@/components/AdminQuoteForm";
import AdminBar from "@/components/AdminBar";
import { getSession } from "@/lib/session-server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Yeni Teklif — Puki Admin", robots: { index: false } };

export default async function AdminQuotePage() {
  const session = await getSession();
  return (
    <div className="container-p py-10">
      {session && <AdminBar session={session} active="quote" />}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">Yeni teklif & ödeme linki</h1>
        <p className="text-muted mt-1 text-sm">Müşteri ve modülleri seçin, fiyatı düzenleyin; sistem ödeme linkini oluşturup müşteriye e-posta ile gönderir. Ödeme alınınca sipariş onay kuyruğuna düşer.</p>
      </div>
      <AdminQuoteForm />
    </div>
  );
}

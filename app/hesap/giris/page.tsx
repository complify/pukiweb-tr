import { Suspense } from "react";
import CustomerLogin from "@/components/CustomerLogin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Hesap Girişi — Puki", robots: { index: false } };

export default function HesapGirisPage() {
  return (
    <div className="container-p py-16 max-w-md">
      <div className="mb-6 text-center">
        <span className="eyebrow">Müşteri portalı</span>
        <h1 className="mt-2 text-3xl font-extrabold text-ink tracking-tight">Hesabınıza giriş</h1>
        <p className="text-muted mt-1 text-sm">Aboneliğinizi, ödemelerinizi ve faturalarınızı görüntüleyin.</p>
      </div>
      <Suspense fallback={<div className="text-muted text-center">Yükleniyor…</div>}>
        <CustomerLogin />
      </Suspense>
    </div>
  );
}

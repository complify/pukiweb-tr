import { Suspense } from "react";
import CustomerLogin from "@/components/CustomerLogin";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: "Hesap Girişi — Puki", robots: { index: false } };

export default function HesapGirisPage() {
  const p = getDict(getLang()).portal;
  return (
    <div className="container-p py-16 max-w-md">
      <div className="mb-6 text-center">
        <span className="eyebrow">{p.loginEyebrow}</span>
        <h1 className="mt-2 text-3xl font-extrabold text-ink tracking-tight">{p.loginTitle}</h1>
        <p className="text-muted mt-1 text-sm">{p.loginSub}</p>
      </div>
      <Suspense fallback={<div className="text-muted text-center">…</div>}>
        <CustomerLogin />
      </Suspense>
    </div>
  );
}

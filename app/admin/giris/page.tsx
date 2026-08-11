import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";

export const metadata = { title: "Giriş — Puki Admin", robots: { index: false } };

export default function GirisPage() {
  return (
    <div className="container-p py-20">
      <div className="max-w-sm mx-auto">
        <div className="flex justify-center mb-6">
          <Logo markClass="h-8 w-auto" />
        </div>
        <div className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-7">
          <h1 className="text-xl font-extrabold text-ink text-center">Yönetim paneli girişi</h1>
          <p className="text-sm text-muted text-center mt-1 mb-6">Ekip hesabınızla giriş yapın.</p>
          <Suspense fallback={<div className="text-muted text-sm">Yükleniyor…</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

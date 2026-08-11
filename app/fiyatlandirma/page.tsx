import PricingConfigurator from "@/components/PricingConfigurator";

export const metadata = {
  title: "Fiyatlandırma — Puki",
  description: "Modülleri seçin, kullanıcı sayınızı belirleyin, fiyatınızı anında görün.",
};

export default function FiyatlandirmaPage() {
  return (
    <div className="container-p py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-puki to-puki-dark" />
          <span className="text-sm font-bold text-puki-dark uppercase tracking-widest">Planınızı oluşturun</span>
        </div>
        <h1 className="text-3xl font-extrabold text-ink tracking-tight">Fiyatlandırma</h1>
        <p className="text-muted mt-1">
          İhtiyacınız olan yönetim sistemlerini seçin, kullanıcı sayınızı belirleyin — fiyat anında hesaplansın.
          <span className="ml-2 inline-block bg-puki-light text-puki-dark font-bold text-xs px-2 py-0.5 rounded">KDV yok (Teknokent muafiyeti)</span>
        </p>
      </div>
      <PricingConfigurator />
    </div>
  );
}

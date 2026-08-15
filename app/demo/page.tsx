import DemoForm from "@/components/DemoForm";

export const metadata = {
  title: "Demo Talep Et — Puki",
  description: "Puki GRC'yi ekibinizle birlikte keşfedin. Kısa bir demo planlayalım, size özel teklifimizi sunalım.",
};

const POINTS = [
  ["Size özel demo", "İhtiyacınıza göre ilgilendiğiniz modülleri canlı gösterelim."],
  ["Kuruma özel teklif", "Ekip büyüklüğünüze ve seçtiğiniz modüllere göre net fiyat sunalım."],
  ["Danışman desteği", "GRC uzmanlarımız kurulum ve belgelendirme yolculuğunuzda yanınızda."],
];

export default function DemoPage() {
  return (
    <div className="container-p py-12 md:py-16">
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <span className="text-sm font-bold text-puki-dark uppercase tracking-widest">Demo &amp; Teklif</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
            Puki'yi yakından görün
          </h1>
          <p className="text-[#5e6278] mt-4 leading-relaxed">
            Formu doldurun, ekibimiz sizinle iletişime geçsin. Kısa bir demoda ilgilendiğiniz modülleri gösterelim,
            ardından kurumunuza özel teklifimizi paylaşalım.
          </p>
          <div className="mt-8 space-y-4">
            {POINTS.map(([t, d]) => (
              <div key={t} className="flex gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-xl2 bg-puki-light text-puki-dark grid place-items-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <div className="font-bold text-ink">{t}</div>
                  <p className="text-sm text-[#5e6278] mt-0.5 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <DemoForm />
        </div>
      </div>
    </div>
  );
}

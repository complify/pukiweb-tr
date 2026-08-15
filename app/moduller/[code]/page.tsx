import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULE_DETAILS, allModuleCodes, moduleDetail } from "@/lib/module-content";
import ModuleIcon from "@/components/ModuleIcon";
import ModuleVisual from "@/components/ModuleVisual";

export function generateStaticParams() {
  return allModuleCodes().map((code) => ({ code }));
}

export function generateMetadata({ params }: { params: { code: string } }) {
  const d = moduleDetail(params.code);
  if (!d) return { title: "Modül — Puki" };
  return {
    title: `Puki ${d.name} (${d.iso}) — Puki`,
    description: `${d.tagline}. ${d.overview[0]}`,
  };
}

// GRC akış adımları (tüm modüllerde ortak mantık)
const FLOW = [
  ["Envanter", "Varlık, süreç ve gereksinimleri kayıt altına alın."],
  ["Değerlendirme", "Risk / uygunluk analizini yapılandırılmış biçimde yürütün."],
  ["Aksiyon", "Eksikleri düzeltici faaliyet ve görevlere bağlayın."],
  ["Kanıt", "Denetime hazır kayıt ve raporları otomatik biriktirin."],
];

export default function ModulePage({ params }: { params: { code: string } }) {
  const d = moduleDetail(params.code);
  if (!d) notFound();

  const others = Object.values(MODULE_DETAILS).filter((m) => m.code !== d.code);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero-dark text-white relative overflow-hidden">
        <div className="container-p py-16 md:py-24 grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fadeup">
            <Link href="/#moduller" className="text-sm font-semibold text-white/60 hover:text-white">
              ← Tüm modüller
            </Link>
            <div className="mt-5 flex items-center gap-4">
              <span className="w-14 h-14 rounded-xl2 bg-puki text-white grid place-items-center shadow-soft shrink-0">
                <ModuleIcon code={d.code} className="w-7 h-7" />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-puki">{d.iso}</div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Puki {d.name}</h1>
              </div>
            </div>
            <p className="mt-5 max-w-xl text-lg text-white/70 leading-relaxed">{d.tagline}</p>
            <p className="mt-3 max-w-xl text-white/55 leading-relaxed">{d.overview[0]}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/demo" className="text-base font-bold text-ink bg-white hover:bg-puki hover:text-white transition-colors px-6 py-3.5 rounded-xl shadow-soft">
                Demo Talep Et
              </Link>
              <div className="text-sm text-white/60">Kuruma özel fiyatlandırma · teklife özel</div>
            </div>
          </div>

          <div className="lg:pl-6">
            <ModuleVisual detail={d} />
          </div>
        </div>
      </section>

      {/* ================= GENEL BAKIŞ + YAN PANEL ================= */}
      <section className="container-p py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <span className="eyebrow">Genel bakış</span>
            <div className="mt-4 space-y-4 text-[#5e6278] leading-relaxed text-[1.05rem]">
              {d.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="space-y-4">
            <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
              <div className="font-bold text-ink">Kimler için?</div>
              <p className="text-sm text-[#5e6278] mt-2 leading-relaxed">{d.audience}</p>
            </div>
            <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
              <div className="font-bold text-ink">Kapsanan standartlar</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {d.standards.map((st) => (
                  <span key={st} className="text-xs font-bold text-puki-dark bg-puki-light px-2.5 py-1 rounded-full">{st}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ================= ÖZELLİKLER ================= */}
      <section className="grid-soft border-y border-[#eef1f6]">
        <div className="container-p py-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Özellikler</span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink tracking-tight">{d.name} ile neler yaparsınız?</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.features.map((f, i) => (
              <div key={f.title} className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6 hover:shadow-lift transition-shadow">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl2 bg-puki-light text-puki-dark grid place-items-center font-extrabold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="font-bold text-ink leading-tight">{f.title}</div>
                </div>
                <p className="text-sm text-[#5e6278] mt-3 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AKIŞ ================= */}
      <section className="container-p py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Nasıl işler</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink tracking-tight">Envanterden kanıta</h2>
          <p className="text-muted mt-3">Puki {d.name} sizi baştan sona aynı akışta yürütür — dağınık dosyalar değil, tek gerçek.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {FLOW.map(([t, dsc], i) => (
            <div key={t} className="relative bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6">
              <div className="w-10 h-10 rounded-xl2 bg-ink text-white grid place-items-center font-extrabold">{i + 1}</div>
              <div className="font-bold text-ink mt-3">{t}</div>
              <p className="text-sm text-[#5e6278] mt-1.5 leading-relaxed">{dsc}</p>
              {i < FLOW.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-2.5 text-puki text-xl font-black">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= ÇIKTILAR ================= */}
      <section className="bg-white border-y border-[#eef1f6]">
        <div className="container-p py-14">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div>
              <span className="eyebrow">Çıktılar</span>
              <h2 className="mt-3 text-2xl font-extrabold text-ink tracking-tight">Denetime hazır kanıtlar</h2>
              <p className="text-muted mt-2 text-sm">Puki {d.name} çalıştıkça, sertifikasyon ve denetimde ihtiyacınız olan kayıtlar kendiliğinden oluşur.</p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
              {d.outcomes.map((o) => (
                <div key={o} className="flex items-center gap-3 bg-[#f9fbf5] border border-[#e7ebf1] rounded-xl2 px-4 py-3">
                  <span className="w-6 h-6 rounded-lg bg-puki grid place-items-center text-white text-xs font-black shrink-0">✓</span>
                  <span className="text-sm font-semibold text-ink">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DİĞER MODÜLLER ================= */}
      <section className="container-p py-16">
        <h2 className="text-xl font-extrabold text-ink">Diğer modüller</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((m) => (
            <Link
              key={m.code}
              href={`/moduller/${m.code}`}
              className="group block bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5 hover:shadow-lift hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 rounded-xl2 bg-puki-light text-puki-dark grid place-items-center group-hover:bg-puki group-hover:text-white transition-colors">
                <ModuleIcon code={m.code} className="w-5 h-5" />
              </span>
              <div className="text-[.62rem] font-bold uppercase tracking-widest text-puki-dark mt-3">{m.iso}</div>
              <div className="font-extrabold text-ink leading-tight">Puki {m.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-p pb-24">
        <div className="hero-dark rounded-xl3 px-8 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Puki {d.name} ile başlayın</h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Kısa bir demo planlayalım, kurumunuza özel teklifimizi sunalım.
          </p>
          <Link
            href="/demo"
            className="inline-block mt-7 text-base font-bold text-ink bg-white hover:bg-puki hover:text-white transition-colors px-7 py-3.5 rounded-xl shadow-soft"
          >
            Demo Talep Et
          </Link>
        </div>
      </section>
    </>
  );
}

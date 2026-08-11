import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULE_DETAILS, allModuleCodes, moduleDetail } from "@/lib/module-content";
import { moduleByCode, fmt } from "@/lib/catalog";

export function generateStaticParams() {
  return allModuleCodes().map((code) => ({ code }));
}

export function generateMetadata({ params }: { params: { code: string } }) {
  const d = moduleDetail(params.code);
  if (!d) return { title: "Modül — Puki" };
  return {
    title: `${d.name} (${d.iso}) — Puki`,
    description: `${d.tagline}. ${d.overview[0]}`,
  };
}

export default function ModulePage({ params }: { params: { code: string } }) {
  const d = moduleDetail(params.code);
  if (!d) notFound();

  const price = moduleByCode(d.code);
  const others = Object.values(MODULE_DETAILS).filter((m) => m.code !== d.code);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#f6f7fb] border-b border-[#eef1f6]">
        <div className="container-p py-14 md:py-20">
          <Link href="/#moduller" className="text-sm font-semibold text-puki-dark hover:text-puki">
            ← Tüm modüller
          </Link>
          <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-puki-dark">{d.iso}</div>
              <h1 className="mt-1 text-4xl font-extrabold text-ink tracking-tight">{d.name}</h1>
              <p className="mt-2 text-lg text-[#5e6278]">{d.tagline}</p>
            </div>
            {price && !d.quoteOnly ? (
              <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card px-5 py-4 text-right shrink-0">
                <div className="text-2xl font-extrabold text-ink">{fmt(price.basePrice)}</div>
                <div className="text-xs text-muted">/ay · 1-5 kullanıcı · ek kullanıcı {fmt(price.perUser)}</div>
                <Link
                  href="/fiyatlandirma"
                  className="mt-3 inline-block text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-2 rounded-xl shadow-soft"
                >
                  Planınıza ekleyin
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card px-5 py-4 text-right shrink-0">
                <div className="text-sm font-bold text-ink">Kuruma özel teklif</div>
                <div className="text-xs text-muted">İhtiyacınıza göre fiyatlandırma</div>
                <Link
                  href="/iletisim"
                  className="mt-3 inline-block text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-2 rounded-xl shadow-soft"
                >
                  Teklif alın
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Genel bakış */}
      <section className="container-p py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-extrabold text-ink">Genel bakış</h2>
            <div className="mt-4 space-y-4 text-[#5e6278] leading-relaxed">
              {d.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl font-extrabold text-ink">Özellikler</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {d.features.map((f) => (
                <div key={f.title} className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
                  <div className="w-9 h-9 rounded-lg bg-puki-light flex items-center justify-center text-puki-dark font-black">✓</div>
                  <div className="font-bold text-ink mt-3">{f.title}</div>
                  <p className="text-sm text-[#5e6278] mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Yan panel */}
          <aside className="space-y-6">
            <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
              <div className="font-bold text-ink">Kimler için?</div>
              <p className="text-sm text-[#5e6278] mt-2 leading-relaxed">{d.audience}</p>
            </div>
            <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
              <div className="font-bold text-ink">Kapsanan standartlar</div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#5e6278]">
                {d.standards.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5">
              <div className="font-bold text-ink">Çıktılar & kanıtlar</div>
              <ul className="mt-2 space-y-1.5 text-sm text-[#5e6278]">
                {d.outcomes.map((o) => (
                  <li key={o}>· {o}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Diğer modüller */}
      <section className="bg-white border-t border-[#eef1f6]">
        <div className="container-p py-14">
          <h2 className="text-xl font-extrabold text-ink">Diğer modüller</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((m) => (
              <Link
                key={m.code}
                href={`/moduller/${m.code}`}
                className="block bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-5 hover:border-puki transition-colors"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-puki-dark">{m.iso}</div>
                <div className="text-lg font-extrabold text-ink mt-1">{m.name}</div>
                <div className="text-sm text-[#5e6278] mt-1">{m.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-p py-16 text-center">
        <h2 className="text-2xl font-extrabold text-ink">{d.name} ile başlamaya hazır mısınız?</h2>
        <p className="text-muted mt-2">
          {d.quoteOnly
            ? "Kurumunuza özel bir teklif için bize ulaşın."
            : "Modülü planınıza ekleyin, birkaç dakikada kurulumu tamamlayın."}
        </p>
        <Link
          href={d.quoteOnly ? "/iletisim" : "/fiyatlandirma"}
          className="inline-block mt-6 text-base font-bold text-white bg-puki hover:bg-puki-dark px-7 py-3 rounded-xl shadow-soft"
        >
          {d.quoteOnly ? "Teklif alın" : "Planınızı oluşturun"}
        </Link>
      </section>
    </>
  );
}

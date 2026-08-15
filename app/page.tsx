import Link from "next/link";
import DashboardMock from "@/components/DashboardMock";
import ModuleIcon from "@/components/ModuleIcon";
import { MODULE_DETAILS } from "@/lib/module-content";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const GRID_ORDER = ["bgys", "kvys", "isys", "yzys", "soc2", "tisax", "spice", "itsm", "qms", "egitim"];

export default function Home() {
  const lang = getLang();
  const t = getDict(lang);
  const h = t.home;

  return (
    <>
      {/* HERO */}
      <section className="hero-dark text-white relative overflow-hidden">
        <div className="container-p py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fadeup">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-puki bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-puki" /> {h.heroBadge}
            </span>
            <h1 className="mt-6 text-4xl md:text-[3.3rem] font-extrabold tracking-tight leading-[1.05]">
              {h.heroTitle} <span className="text-gradient">{h.heroTitleHl}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70 leading-relaxed">{h.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/demo" className="text-base font-bold text-ink bg-white hover:bg-puki hover:text-white transition-colors px-6 py-3.5 rounded-xl shadow-soft">
                {t.cta.requestDemo}
              </Link>
              <Link href="/#moduller" className="text-base font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-6 py-3.5 rounded-xl">
                {t.cta.exploreModules} →
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[.8rem] text-white/55">
              {["ISO 27001", "ISO 27701", "ISO 22301", "ISO 42001"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-puki" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" /></svg>
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:pl-6"><DashboardMock /></div>
        </div>
      </section>

      {/* İSTATİSTİK BANDI */}
      <section className="border-b border-[#eef1f6] bg-white">
        <div className="container-p grid grid-cols-2 md:grid-cols-4 divide-x divide-[#eef1f6]">
          {[
            ["10", h.statModules],
            [h.statPlatform1, h.statPlatform2],
            [h.statRegion1, h.statRegion2],
            [h.statSetup1, h.statSetup2],
          ].map(([n, d], i) => (
            <div key={i} className="px-4 py-8 text-center">
              <div className="text-3xl font-extrabold text-ink">{n}</div>
              <div className="text-xs text-muted mt-1 leading-snug">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MODÜLLER */}
      <section id="moduller" className="container-p py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{h.modulesEyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink tracking-tight">{h.modulesTitle}</h2>
          <p className="text-muted mt-3">{h.modulesSub}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GRID_ORDER.map((code) => {
            const m = MODULE_DETAILS[code];
            if (!m) return null;
            return (
              <Link key={code} href={`/moduller/${code}`} className="group relative block bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6 hover:shadow-lift hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-11 h-11 rounded-xl2 bg-puki-light text-puki-dark grid place-items-center shrink-0 group-hover:bg-puki group-hover:text-white transition-colors">
                      <ModuleIcon code={code} className="w-6 h-6" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[.62rem] font-bold uppercase tracking-widest text-puki-dark truncate">{m.iso}</div>
                      <div className="text-lg font-extrabold text-ink leading-tight">Puki {m.name}</div>
                    </div>
                  </div>
                  <span className="text-[.6rem] font-bold uppercase tracking-widest text-puki-dark bg-puki-light px-2 py-1 rounded-full shrink-0">{t.common.quoteOnly}</span>
                </div>
                <p className="mt-4 text-[#5e6278] text-sm leading-relaxed">{m.tagline[lang]}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-puki-dark group-hover:gap-2 transition-all">
                  {t.common.viewDetails} <span aria-hidden>→</span>
                </span>
              </Link>
            );
          })}
        </div>
        <p className="text-center text-sm text-muted mt-8">
          {h.modulesNote1}<Link href="/demo" className="font-bold text-puki-dark hover:text-puki">{h.modulesNoteLink}</Link>{h.modulesNote2}
        </p>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="grid-soft border-y border-[#eef1f6]">
        <div className="container-p py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">{h.howEyebrow}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink tracking-tight">{h.howTitle}</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["1", h.step1t, h.step1d],
              ["2", h.step2t, h.step2d],
              ["3", h.step3t, h.step3d],
            ].map(([n, tt, dd]) => (
              <div key={n} className="relative bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-7">
                <div className="w-11 h-11 rounded-xl2 bg-ink text-white grid place-items-center font-extrabold text-lg">{n}</div>
                <div className="font-bold text-ink text-lg mt-4">{tt}</div>
                <p className="text-sm text-[#5e6278] mt-2 leading-relaxed">{dd}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEDEN PUKI */}
      <section id="neden" className="container-p py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{h.whyEyebrow}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink tracking-tight">{h.whyTitle}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["⚡", h.why1t, h.why1d],
            ["◎", h.why2t, h.why2d],
            ["⛨", h.why3t, h.why3d],
            ["₺", h.why4t, h.why4d],
            ["↗", h.why5t, h.why5d],
            ["⤢", h.why6t, h.why6d],
          ].map(([icon, tt, dd]) => (
            <div key={tt} className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-7 hover:shadow-lift transition-shadow">
              <div className="w-11 h-11 rounded-xl2 bg-puki-light grid place-items-center text-puki-dark text-xl font-black">{icon}</div>
              <div className="font-bold text-ink mt-4">{tt}</div>
              <p className="text-sm text-[#5e6278] mt-2 leading-relaxed">{dd}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-p pb-24">
        <div className="hero-dark rounded-xl3 overflow-hidden relative">
          <div className="px-8 py-16 md:py-20 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{h.ctaTitle}</h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">{h.ctaSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/demo" className="text-base font-bold text-ink bg-white hover:bg-puki hover:text-white transition-colors px-7 py-3.5 rounded-xl shadow-soft">
                {t.cta.requestDemo}
              </Link>
              <Link href="/iletisim" className="text-base font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl">
                {t.cta.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Hero için stilize GRC dashboard mockup'ı — saf JSX/Tailwind, dış görsel yok.
import type { Lang } from "@/lib/i18n";

const D = {
  panel: { tr: "Uyum Paneli", az: "Uyğunluq Paneli", en: "Compliance Panel" },
  region: { tr: "TR bölge", az: "TR region", en: "TR region" },
  score: { tr: "Uyum skoru", az: "Uyğunluq balı", en: "Compliance score" },
  trend: { tr: "Risk kapanış trendi", az: "Risk bağlanma trendi", en: "Risk closure trend" },
} as const;

export default function DashboardMock({ lang = "tr" }: { lang?: Lang }) {
  const bars = [42, 68, 55, 80, 63, 90, 72];
  return (
    <div className="glass rounded-xl3 p-3 shadow-glow animate-floaty">
      <div className="rounded-xl2 bg-white overflow-hidden shadow-lift">
        {/* pencere üst çubuğu */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#eef1f6] bg-[#fafbfc]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[.66rem] font-semibold text-muted">puki · {D.panel[lang]}</span>
          <span className="ml-auto text-[.6rem] font-bold text-puki-dark bg-puki-light px-2 py-0.5 rounded-full">{D.region[lang]}</span>
        </div>

        <div className="p-4 grid grid-cols-3 gap-3">
          {/* uyum skoru */}
          <div className="col-span-1 rounded-xl border border-[#eef1f6] p-3 flex flex-col items-center justify-center">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eef1f6" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#7cb518" strokeWidth="4" strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset="21" />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-sm font-extrabold text-ink">%78</div>
            </div>
            <div className="text-[.6rem] font-bold text-muted mt-2 uppercase tracking-wider">{D.score[lang]}</div>
          </div>

          {/* mini bar grafik */}
          <div className="col-span-2 rounded-xl border border-[#eef1f6] p-3">
            <div className="flex items-center justify-between">
              <div className="text-[.62rem] font-bold text-ink">{D.trend[lang]}</div>
              <div className="text-[.55rem] font-bold text-puki-dark bg-puki-light px-1.5 py-0.5 rounded">↑ %24</div>
            </div>
            <div className="mt-3 flex items-end gap-1.5 h-14">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-puki-dark to-puki" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* modül tile'ları */}
          {[
            ["ISMS", "ISO 27001", "88"],
            ["PIMS", "KVKK", "71"],
            ["İSYS", "ISO 22301", "64"],
          ].map(([n, iso, pct]) => (
            <div key={n} className="rounded-xl border border-[#eef1f6] p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[.7rem] font-extrabold text-ink">{n}</span>
                <span className="w-5 h-5 rounded-md bg-puki-light grid place-items-center text-[.6rem] text-puki-dark font-black">✓</span>
              </div>
              <div className="text-[.52rem] font-bold text-muted uppercase tracking-wide mt-0.5">{iso}</div>
              <div className="mt-2 h-1.5 rounded-full bg-[#eef1f6] overflow-hidden">
                <div className="h-full bg-puki rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

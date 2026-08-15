import ModuleIcon from "@/components/ModuleIcon";
import type { Lang } from "@/lib/i18n";

const VIS = {
  ready: { tr: "Hazırlık", az: "Hazırlıq", en: "Readiness" },
  evidence: { tr: "Oluşan kanıtlar", az: "Yaranan sübutlar", en: "Evidence generated" },
} as const;

// Modül başına sabit (deterministik) örnek metrikler — demo görseli.
type Loc = Record<Lang, string>;
const L = (tr: string, az: string, en: string): Loc => ({ tr, az, en });
const STATS: Record<string, { ready: number; a: [string, Loc]; b: [string, Loc] }> = {
  bgys: { ready: 88, a: ["93", L("Annex A kontrolü", "Annex A nəzarəti", "Annex A controls")], b: ["4", L("açık risk", "açıq risk", "open risks")] },
  kvys: { ready: 71, a: ["156", L("işleme faaliyeti", "emal fəaliyyəti", "processing activities")], b: ["2", L("açık başvuru", "açıq müraciət", "open requests")] },
  isys: { ready: 64, a: ["12", L("kritik süreç", "kritik proses", "critical processes")], b: ["3", L("planlı tatbikat", "planlı məşq", "planned exercises")] },
  yzys: { ready: 58, a: ["7", L("YZ sistemi", "Sİ sistemi", "AI systems")], b: ["5", L("etki değerlendirmesi", "təsir qiymətləndirməsi", "impact assessments")] },
  qms: { ready: 76, a: ["48", L("süreç & KPI", "proses & KPI", "processes & KPIs")], b: ["6", L("açık DÖF", "açıq DÖF", "open CAPAs")] },
  tisax: { ready: 69, a: ["100+", L("VDA ISA kontrolü", "VDA ISA nəzarəti", "VDA ISA controls")], b: ["3", L("olgunluk gap", "yetkinlik gap", "maturity gaps")] },
  soc2: { ready: 74, a: ["61", L("TSC kontrolü", "TSC nəzarəti", "TSC controls")], b: ["5", L("açık kanıt", "açıq sübut", "open evidence")] },
  itsm: { ready: 67, a: ["24", L("aktif hizmet", "aktiv xidmət", "active services")], b: ["8", L("açık olay", "açıq hadisə", "open incidents")] },
  spice: { ready: 62, a: ["18", L("değerlendirilen süreç", "qiymətləndirilən proses", "assessed processes")], b: ["4", L("yetenek gap", "qabiliyyət gap", "capability gaps")] },
  egitim: { ready: 81, a: ["12", L("atanan eğitim", "təyin olunan təlim", "assigned trainings")], b: ["37", L("sertifika", "sertifikat", "certificates")] },
};

export default function ModuleVisual({ detail, lang = "tr" }: { detail: { code: string; name: string; iso: string; outcomes: string[] }; lang?: Lang }) {
  const s = STATS[detail.code] ?? { ready: 72, a: ["—", L("kontrol", "nəzarət", "control")] as [string, Loc], b: ["—", L("aksiyon", "tədbir", "action")] as [string, Loc] };
  const ring = 97.4;
  const offset = ring * (1 - s.ready / 100);

  return (
    <div className="glass rounded-xl3 p-3 shadow-glow animate-floaty">
      <div className="rounded-xl2 bg-white overflow-hidden shadow-lift">
        {/* pencere üst çubuğu */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#eef1f6] bg-[#fafbfc]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[.66rem] font-semibold text-muted">puki · {detail.name}</span>
          <span className="ml-auto text-[.6rem] font-bold text-puki-dark bg-puki-light px-2 py-0.5 rounded-full">{detail.iso}</span>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {/* hazırlık halkası */}
            <div className="rounded-xl border border-[#eef1f6] p-3 flex flex-col items-center justify-center">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#eef1f6" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#7cb518" strokeWidth="4" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={offset} />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-sm font-extrabold text-ink">%{s.ready}</div>
              </div>
              <div className="text-[.58rem] font-bold text-muted mt-2 uppercase tracking-wider text-center">{VIS.ready[lang]}</div>
            </div>

            {/* stat tile'ları */}
            <div className="col-span-2 grid grid-rows-2 gap-3">
              {[s.a, s.b].map(([n, l], i) => (
                <div key={i} className="rounded-xl border border-[#eef1f6] p-3 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-puki-light text-puki-dark grid place-items-center shrink-0">
                    <ModuleIcon code={detail.code} className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-lg font-extrabold text-ink leading-none">{n}</div>
                    <div className="text-[.6rem] font-bold text-muted uppercase tracking-wide mt-1">{l[lang]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* çıktı checklist */}
          <div className="mt-3 rounded-xl border border-[#eef1f6] p-3">
            <div className="text-[.62rem] font-bold text-ink mb-2">{VIS.evidence[lang]}</div>
            <div className="space-y-2">
              {detail.outcomes.slice(0, 4).map((o) => (
                <div key={o} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-puki grid place-items-center text-[.55rem] text-white font-black shrink-0">✓</span>
                  <span className="text-[.68rem] text-[#5e6278]">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

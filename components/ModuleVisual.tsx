import ModuleIcon from "@/components/ModuleIcon";
import type { ModuleDetail } from "@/lib/module-content";

// Modül başına sabit (deterministik) örnek metrikler — demo görseli.
const STATS: Record<string, { ready: number; a: [string, string]; b: [string, string] }> = {
  bgys: { ready: 88, a: ["93", "Annex A kontrolü"], b: ["4", "açık risk"] },
  kvys: { ready: 71, a: ["156", "işleme faaliyeti"], b: ["2", "açık başvuru"] },
  isys: { ready: 64, a: ["12", "kritik süreç"], b: ["3", "planlı tatbikat"] },
  yzys: { ready: 58, a: ["7", "YZ sistemi"], b: ["5", "etki değerlendirmesi"] },
  qms: { ready: 76, a: ["48", "süreç & KPI"], b: ["6", "açık DÖF"] },
  tisax: { ready: 69, a: ["100+", "VDA ISA kontrolü"], b: ["3", "olgunluk gap"] },
  soc2: { ready: 74, a: ["61", "TSC kontrolü"], b: ["5", "açık kanıt"] },
  itsm: { ready: 67, a: ["24", "aktif hizmet"], b: ["8", "açık olay"] },
  spice: { ready: 62, a: ["18", "değerlendirilen süreç"], b: ["4", "yetenek gap"] },
  egitim: { ready: 81, a: ["12", "atanan eğitim"], b: ["37", "sertifika"] },
};

export default function ModuleVisual({ detail }: { detail: ModuleDetail }) {
  const s = STATS[detail.code] ?? { ready: 72, a: ["—", "kontrol"], b: ["—", "aksiyon"] };
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
              <div className="text-[.58rem] font-bold text-muted mt-2 uppercase tracking-wider text-center">Hazırlık</div>
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
                    <div className="text-[.6rem] font-bold text-muted uppercase tracking-wide mt-1">{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* çıktı checklist */}
          <div className="mt-3 rounded-xl border border-[#eef1f6] p-3">
            <div className="text-[.62rem] font-bold text-ink mb-2">Oluşan kanıtlar</div>
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

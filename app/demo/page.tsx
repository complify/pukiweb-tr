import DemoForm from "@/components/DemoForm";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export function generateMetadata() {
  const m = getDict(getLang()).meta;
  return { title: m.demoTitle, description: m.demoDesc };
}

export default function DemoPage() {
  const t = getDict(getLang()).demo;
  const POINTS: [string, string][] = [[t.p1t, t.p1d], [t.p2t, t.p2d], [t.p3t, t.p3d]];
  return (
    <div className="container-p py-12 md:py-16">
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <span className="text-sm font-bold text-puki-dark uppercase tracking-widest">{t.eyebrow}</span>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">{t.title}</h1>
          <p className="text-[#5e6278] mt-4 leading-relaxed">{t.intro}</p>
          <div className="mt-8 space-y-4">
            {POINTS.map(([tt, dd]) => (
              <div key={tt} className="flex gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-xl2 bg-puki-light text-puki-dark grid place-items-center shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                <div>
                  <div className="font-bold text-ink">{tt}</div>
                  <p className="text-sm text-[#5e6278] mt-0.5 leading-relaxed">{dd}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3"><DemoForm /></div>
      </div>
    </div>
  );
}

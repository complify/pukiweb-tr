"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LANGS, LANG_SHORT, LANG_LABELS, LANG_COOKIE, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";

export default function LanguageSwitcher() {
  const router = useRouter();
  const current = useLang();
  const [open, setOpen] = useState(false);

  const pick = (lang: Lang) => {
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1 text-sm font-semibold text-[#5e6278] hover:text-puki-dark px-2 py-1.5 rounded-lg"
        aria-label="Dil / Language">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" /></svg>
        {LANG_SHORT[current]}
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-[#e7ebf1] rounded-xl shadow-card p-1 z-50">
          {LANGS.map((l) => (
            <button key={l} onMouseDown={() => pick(l)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${l === current ? "bg-puki-light text-puki-dark" : "text-[#5e6278] hover:bg-[#f6f8fb]"}`}>
              <span className="inline-block w-7 text-xs font-bold text-muted">{LANG_SHORT[l]}</span> {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

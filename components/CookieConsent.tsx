"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDict } from "@/components/LangProvider";

const KEY = "puki_cookie_consent";

export default function CookieConsent() {
  const c = useDict().cookie;
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const decide = (choice: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice, at: new Date().toISOString() }));
    } catch {}
    setShow(false);
    // Not: Analitik/pazarlama çerezleri yalnız choice === "all" ise yüklenmelidir.
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="container-p">
        <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-lift p-5 md:flex md:items-center md:gap-6">
          <div className="text-sm text-[#5e6278] leading-relaxed">
            <b className="text-ink">{c.title}</b> {c.body}
            <Link href="/cerez-politikasi" className="text-puki-dark font-semibold hover:text-puki underline underline-offset-2">{c.policy}</Link>.
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3 shrink-0">
            <button
              onClick={() => decide("essential")}
              className="text-sm font-semibold text-[#5e6278] hover:text-ink border border-[#e7ebf1] hover:border-[#c9d8ad] px-4 py-2.5 rounded-xl"
            >
              {c.essential}
            </button>
            <button
              onClick={() => decide("all")}
              className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-5 py-2.5 rounded-xl shadow-soft"
            >
              {c.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

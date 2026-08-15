import Link from "next/link";
import Logo from "@/components/Logo";
import { MODULE_DETAILS } from "@/lib/module-content";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDict, type Lang } from "@/lib/i18n";

const GRC_ORDER = ["bgys", "kvys", "isys", "yzys", "soc2", "tisax", "spice", "itsm", "qms", "egitim"];

export default function Header({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#e7ebf1]">
      <div className="container-p flex items-center justify-between h-16">
        <Link href="/" aria-label="Puki">
          <Logo markClass="h-7 w-auto" wordClass="text-ink text-xl tracking-tight font-extrabold" />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5e6278]">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-puki-dark py-2">
              {d.nav.products}
              <svg className="w-3.5 h-3.5 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[340px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-2 max-h-[70vh] overflow-auto">
                {GRC_ORDER.map((code) => {
                  const m = MODULE_DETAILS[code];
                  if (!m) return null;
                  return (
                    <Link key={code} href={`/moduller/${code}`} className="block px-3 py-2.5 rounded-xl hover:bg-puki-light transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink">Puki {m.name}</span>
                        <span className="text-[.68rem] font-bold uppercase tracking-widest text-puki-dark">{m.iso}</span>
                      </div>
                      <div className="text-xs text-muted mt-0.5">{m.tagline[lang]}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <a href="/#neden" className="hover:text-puki-dark">{d.nav.why}</a>
          <Link href="/demo" className="hover:text-puki-dark">{d.nav.demo}</Link>
          <Link href="/iletisim" className="hover:text-puki-dark">{d.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/hesap" className="hidden sm:inline text-sm font-semibold text-[#5e6278] hover:text-puki-dark">
            {d.nav.account}
          </Link>
          <Link href="/demo" className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-2 rounded-xl shadow-soft">
            {d.cta.requestDemo}
          </Link>
        </div>
      </div>
    </header>
  );
}

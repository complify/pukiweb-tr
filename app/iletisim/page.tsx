import Link from "next/link";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "İletişim — Puki",
  description: "Puki Yazılım Teknoloji A.Ş. iletişim bilgileri, adres ve teklif talebi.",
};

export default function IletisimPage() {
  const t = getDict(getLang());
  const c = t.contact;
  return (
    <>
      <section className="bg-gradient-to-b from-white to-[#f6f7fb] border-b border-[#eef1f6]">
        <div className="container-p py-14 md:py-20">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-puki-dark bg-puki-light px-3 py-1 rounded-full">{t.nav.contact}</span>
          <h1 className="mt-4 text-4xl font-extrabold text-ink tracking-tight">{t.cta.contactUs}</h1>
          <p className="mt-3 max-w-2xl text-lg text-[#5e6278]">{c.subtitle}</p>
        </div>
      </section>

      <section className="container-p py-14">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
            <div className="w-10 h-10 rounded-xl bg-puki-light flex items-center justify-center text-puki-dark font-black">⌂</div>
            <div className="font-bold text-ink mt-3">{c.addressLabel}</div>
            <address className="not-italic text-sm text-[#5e6278] mt-2 leading-relaxed">
              Puki Yazılım Teknoloji A.Ş.<br />Ulutek Teknoloji Geliştirme Bölgesi<br />Uludağ Üniversitesi, Görükle Mah.<br />Üniversite-1 Cad. No:933<br />16059, Nilüfer / BURSA<br />Türkiye
            </address>
          </div>
          <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
            <div className="w-10 h-10 rounded-xl bg-puki-light flex items-center justify-center text-puki-dark font-black">☎</div>
            <div className="font-bold text-ink mt-3">{c.phoneLabel}</div>
            <div className="text-sm text-[#5e6278] mt-2 leading-relaxed">
              <a href="tel:+902243230443" className="hover:text-puki-dark block">+90 224 323 0 443</a>
              <a href="tel:+902129510224" className="hover:text-puki-dark block">+90 212 951 0224</a>
            </div>
          </div>
          <div className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
            <div className="w-10 h-10 rounded-xl bg-puki-light flex items-center justify-center text-puki-dark font-black">@</div>
            <div className="font-bold text-ink mt-3">{c.emailLabel}</div>
            <div className="text-sm text-[#5e6278] mt-2 leading-relaxed">
              <a href="mailto:destek@puki.com.tr" className="hover:text-puki-dark block">destek@puki.com.tr</a>
              <a href="mailto:info@puki.com.tr" className="hover:text-puki-dark block">info@puki.com.tr</a>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-puki-light border border-[#d7ead0] rounded-xl2 p-8 text-center">
          <h2 className="text-2xl font-extrabold text-ink">{c.ctaTitle}</h2>
          <p className="text-[#5e6278] mt-2 max-w-2xl mx-auto">{c.ctaSub}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:destek@puki.com.tr?subject=Puki%20teklif%20talebi" className="text-base font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft">{c.ctaBtn}</a>
            <Link href="/demo" className="text-base font-semibold text-puki-dark hover:text-puki px-4 py-3">{c.ctaLink} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

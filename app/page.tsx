import Link from "next/link";
import DashboardMock from "@/components/DashboardMock";
import ModuleIcon from "@/components/ModuleIcon";
import { MODULE_DETAILS } from "@/lib/module-content";

// Ana sayfa modül vitrini sırası
const GRID_ORDER = ["bgys", "kvys", "isys", "yzys", "soc2", "tisax", "spice", "itsm", "qms", "egitim"];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero-dark text-white relative overflow-hidden">
        <div className="container-p py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fadeup">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-puki bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-puki" /> Bulut GRC · Küçük işletmeler için
            </span>
            <h1 className="mt-6 text-4xl md:text-[3.3rem] font-extrabold tracking-tight leading-[1.05]">
              Yönetim sistemlerinizi <span className="text-gradient">tek platformda</span> yönetin
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70 leading-relaxed">
              ISO 27001, KVKK &amp; ISO 27701, ISO 22301 ve ISO 42001 — risklerinizi, uyumunuzu ve
              dokümanlarınızı dakikalar içinde yönetmeye başlayın.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/demo" className="text-base font-bold text-ink bg-white hover:bg-puki hover:text-white transition-colors px-6 py-3.5 rounded-xl shadow-soft">
                Demo Talep Et
              </Link>
              <Link href="/#moduller" className="text-base font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-6 py-3.5 rounded-xl">
                Modülleri keşfedin →
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

          <div className="lg:pl-6">
            <DashboardMock />
          </div>
        </div>
      </section>

      {/* ================= İSTATİSTİK BANDI ================= */}
      <section className="border-b border-[#eef1f6] bg-white">
        <div className="container-p grid grid-cols-2 md:grid-cols-4 divide-x divide-[#eef1f6]">
          {[
            ["10", "yönetim sistemi modülü"],
            ["Tek", "platform, çapraz veri"],
            ["TR & EU", "veri bölgesi seçimi"],
            ["Dakikalar", "içinde kurulum"],
          ].map(([n, d]) => (
            <div key={d} className="px-4 py-8 text-center">
              <div className="text-3xl font-extrabold text-ink">{n}</div>
              <div className="text-xs text-muted mt-1 leading-snug">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MODÜLLER ================= */}
      <section id="moduller" className="container-p py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Modüller</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink tracking-tight">İhtiyacınız olanı seçin</h2>
          <p className="text-muted mt-3">À la carte — ister tek modül, ister hepsi. İstediğiniz an ekleyin, aboneliğiniz anında güncellensin.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GRID_ORDER.map((code) => {
            const m = MODULE_DETAILS[code];
            if (!m) return null;
            return (
              <Link
                key={code}
                href={`/moduller/${code}`}
                className="group relative block bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-6 hover:shadow-lift hover:-translate-y-1 transition-all duration-200"
              >
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
                  <span className="text-[.6rem] font-bold uppercase tracking-widest text-puki-dark bg-puki-light px-2 py-1 rounded-full shrink-0">Teklife özel</span>
                </div>
                <p className="mt-4 text-[#5e6278] text-sm leading-relaxed">{m.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-puki-dark group-hover:gap-2 transition-all">
                  Detayları görün <span aria-hidden>→</span>
                </span>
              </Link>
            );
          })}
        </div>
        <p className="text-center text-sm text-muted mt-8">
          İhtiyacınıza uygun modülleri birlikte belirleyelim — <Link href="/demo" className="font-bold text-puki-dark hover:text-puki">demo talep edin</Link>, size özel teklifimizi sunalım.
        </p>
      </section>

      {/* ================= NASIL ÇALIŞIR ================= */}
      <section className="grid-soft border-y border-[#eef1f6]">
        <div className="container-p py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Nasıl çalışır</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink tracking-tight">Üç adımda yayında</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["1", "Demo talep edin", "İlgilendiğiniz modülleri seçin, formu doldurun; ekibimiz sizinle iletişime geçsin."],
              ["2", "Demo & teklif", "Size özel bir demo yapalım, ekip büyüklüğünüze ve modüllerinize göre net teklifimizi sunalım."],
              ["3", "Hesabınız açılsın", "Anlaşınca hesabınızı hazırlarız; giriş bilgileriniz e-posta ile gelir, hemen kullanmaya başlarsınız."],
            ].map(([n, t, d]) => (
              <div key={n} className="relative bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-7">
                <div className="w-11 h-11 rounded-xl2 bg-ink text-white grid place-items-center font-extrabold text-lg">{n}</div>
                <div className="font-bold text-ink text-lg mt-4">{t}</div>
                <p className="text-sm text-[#5e6278] mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEDEN PUKI ================= */}
      <section id="neden" className="container-p py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Neden Puki</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-ink tracking-tight">Küçük ekipler için tasarlandı</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["⚡", "Dakikalar içinde kurulum", "Satın alın, hesabınız hazır olsun. Danışman beklemeden başlayın."],
            ["◎", "Tek platform, çok standart", "27001, KVKK/27701, 22301, 42001 aynı arayüzde — çapraz veri, tek gerçek."],
            ["⛨", "Veriniz sizin bölgenizde", "TR müşteri → Türkiye, EU müşteri → Avrupa. Data residency baştan çözülü."],
            ["₺", "Küçük işletmeye göre fiyat", "1-5 kullanıcı standart, sonrası kullanıcı başı. Şeffaf, sürprizsiz fiyat."],
            ["↗", "Risk → aksiyon → kanıt", "Riskten düzeltici faaliyete, denetimden kanıta uçtan uca akış."],
            ["⤢", "Her an ölçeklenir", "Kullanıcı ekleyin, modül ekleyin — aboneliğiniz anında güncellensin."],
          ].map(([icon, t, d]) => (
            <div key={t} className="bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-7 hover:shadow-lift transition-shadow">
              <div className="w-11 h-11 rounded-xl2 bg-puki-light grid place-items-center text-puki-dark text-xl font-black">{icon}</div>
              <div className="font-bold text-ink mt-4">{t}</div>
              <p className="text-sm text-[#5e6278] mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-p pb-24">
        <div className="hero-dark rounded-xl3 overflow-hidden relative">
          <div className="px-8 py-16 md:py-20 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Yönetim sisteminizi bugün kurun</h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">Kısa bir demo planlayalım, kurumunuza özel teklifimizi sunalım. TR &amp; EU veri bölgesi seçeneğiyle.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/demo" className="text-base font-bold text-ink bg-white hover:bg-puki hover:text-white transition-colors px-7 py-3.5 rounded-xl shadow-soft">
                Demo Talep Et
              </Link>
              <Link href="/iletisim" className="text-base font-semibold text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-7 py-3.5 rounded-xl">
                Bize ulaşın
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

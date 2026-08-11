import Link from "next/link";
import { CATALOG, fmt } from "@/lib/catalog";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-[#f6f7fb]">
        <div className="container-p py-20 md:py-28 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-puki-dark bg-puki-light px-3 py-1 rounded-full">
            Bulut GRC · Küçük işletmeler için
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-[1.1]">
            Yönetim sistemlerinizi<br /><span className="text-puki-dark">tek platformda</span> yönetin
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-[#5e6278]">
            ISO 27001, KVKK & ISO 27701, ISO 22301 ve ISO 42001 — Puki ile risklerinizi,
            uyumunuzu ve dokümanlarınızı dakikalar içinde yönetmeye başlayın.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/fiyatlandirma" className="text-base font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft">
              Planınızı oluşturun
            </Link>
            <a href="#moduller" className="text-base font-semibold text-puki-dark hover:text-puki px-4 py-3">
              Modülleri keşfedin →
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">Kredi kartı ile hızlı kurulum · Net fiyat (KDV yok) · TR & EU veri bölgesi</p>
        </div>
      </section>

      {/* Modüller */}
      <section id="moduller" className="container-p py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-ink text-center">Modüller</h2>
        <p className="text-center text-muted mt-2">İhtiyacınız olanı seçin — à la carte, istediğiniz an ekleyin.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {CATALOG.modules.map((m) => (
            <div key={m.code} className="bg-white border border-[#e7ebf1] rounded-xl2 shadow-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-puki-dark">{m.iso}</div>
                  <div className="text-xl font-extrabold text-ink mt-1">{m.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-ink">{fmt(m.basePrice)}</div>
                  <div className="text-xs text-muted">/ay · 1-5 kullanıcı</div>
                </div>
              </div>
              <p className="mt-3 text-[#5e6278] text-sm leading-relaxed">{m.blurb}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/fiyatlandirma" className="text-base font-bold text-white bg-puki hover:bg-puki-dark px-6 py-3 rounded-xl shadow-soft">
            Fiyatı hesaplayın
          </Link>
        </div>
      </section>

      {/* Neden Puki */}
      <section id="neden" className="bg-white border-y border-[#eef1f6]">
        <div className="container-p py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-ink text-center">Neden Puki?</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["Dakikalar içinde kurulum", "Satın alın, hesabınız hazır olsun. Danışman beklemeden başlayın."],
              ["Tek platform, çok standart", "27001, KVKK/27701, 22301, 42001 aynı arayüzde — çapraz veri, tek gerçek."],
              ["Veriniz sizin bölgenizde", "TR müşteri → Türkiye, EU müşteri → Avrupa. Data residency baştan çözülü."],
              ["Küçük işletmeye göre fiyat", "1-5 kullanıcı standart, sonrası kullanıcı başı. Net fiyat, KDV yok."],
              ["Risk → aksiyon → kanıt", "Riskten düzeltici faaliyete, denetimden kanıta uçtan uca akış."],
              ["Her an ölçeklenir", "Kullanıcı ekleyin, modül ekleyin — aboneliğiniz anında güncellensin."],
            ].map(([t, d]) => (
              <div key={t} className="p-5">
                <div className="w-10 h-10 rounded-xl bg-puki-light flex items-center justify-center text-puki-dark font-black">✓</div>
                <div className="font-bold text-ink mt-3">{t}</div>
                <p className="text-sm text-[#5e6278] mt-1 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-p py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-ink">Hazır mısınız?</h2>
        <p className="text-muted mt-2">Planınızı oluşturun, birkaç dakikada yönetim sisteminizi kurun.</p>
        <Link href="/fiyatlandirma" className="inline-block mt-6 text-base font-bold text-white bg-puki hover:bg-puki-dark px-7 py-3 rounded-xl shadow-soft">
          Planınızı oluşturun
        </Link>
      </section>
    </>
  );
}

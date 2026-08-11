import Link from "next/link";
import Logo from "@/components/Logo";
import PaymentMarks from "@/components/PaymentMarks";

export default function Footer() {
  return (
    <footer className="border-t border-[#e7ebf1] bg-white">
      <div className="container-p py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="mb-3">
            <Logo markClass="h-6 w-auto" wordClass="text-ink text-lg font-extrabold" />
          </div>
          <p className="text-muted leading-relaxed">Küçük işletmeler için bulut GRC — yönetim sistemlerinizi tek platformda.</p>
        </div>
        <div>
          <div className="font-bold text-ink mb-3">Ürün</div>
          <ul className="space-y-2 text-[#5e6278]">
            <li><Link href="/moduller/bgys" className="hover:text-puki-dark">Puki ISMS</Link></li>
            <li><Link href="/moduller/kvys" className="hover:text-puki-dark">Puki PIMS</Link></li>
            <li><Link href="/moduller/isys" className="hover:text-puki-dark">Puki İSYS</Link></li>
            <li><Link href="/moduller/yzys" className="hover:text-puki-dark">Puki YZYS</Link></li>
            <li><a href="/fiyatlandirma" className="hover:text-puki-dark">Fiyatlandırma</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-ink mb-3">Standartlar</div>
          <ul className="space-y-2 text-[#5e6278]">
            <li>ISO 27001 · ISO 27701</li>
            <li>KVKK · ISO 22301</li>
            <li>ISO 42001 · ISO 9001 · TISAX</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-ink mb-3">İletişim</div>
          <address className="not-italic space-y-2 text-[#5e6278] leading-relaxed">
            <div>Puki Yazılım Teknoloji A.Ş.<br />Ulutek TGB, Görükle Mah.<br />Üniversite-1 Cad. No:933<br />16059, Nilüfer / BURSA</div>
            <div><a href="tel:+902243230443" className="hover:text-puki-dark">+90 224 323 0 443</a></div>
            <div><a href="mailto:destek@puki.com.tr" className="hover:text-puki-dark">destek@puki.com.tr</a></div>
          </address>
        </div>
      </div>
      <div className="border-t border-[#eef1f6]">
        <div className="container-p py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-muted order-2 md:order-1">© {new Date().getFullYear()} Puki Yazılım Teknoloji A.Ş. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-3 order-1 md:order-2">
            <span className="text-[.7rem] font-semibold text-muted">Güvenli ödeme</span>
            <PaymentMarks />
          </div>
        </div>
      </div>
    </footer>
  );
}

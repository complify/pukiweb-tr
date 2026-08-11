export default function Footer() {
  return (
    <footer className="border-t border-[#e7ebf1] bg-white">
      <div className="container-p py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-puki to-puki-dark" />
            <b className="text-ink text-lg">Puki</b>
          </div>
          <p className="text-muted leading-relaxed">Küçük işletmeler için bulut GRC — yönetim sistemlerinizi tek platformda.</p>
        </div>
        <div>
          <div className="font-bold text-ink mb-3">Ürün</div>
          <ul className="space-y-2 text-[#5e6278]">
            <li><a href="/#moduller" className="hover:text-puki-dark">Modüller</a></li>
            <li><a href="/fiyatlandirma" className="hover:text-puki-dark">Fiyatlandırma</a></li>
            <li><a href="https://tr.pukisoft.com/login" className="hover:text-puki-dark">Giriş</a></li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-ink mb-3">Standartlar</div>
          <ul className="space-y-2 text-[#5e6278]">
            <li>ISO 27001 · ISO 27701</li>
            <li>KVKK · ISO 22301</li>
            <li>ISO 42001</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-ink mb-3">Kurumsal</div>
          <ul className="space-y-2 text-[#5e6278]">
            <li>Teknokent firması</li>
            <li>TR & EU veri bölgesi</li>
            <li>info@puki.com.tr</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#eef1f6]">
        <div className="container-p py-4 text-xs text-muted flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Puki. Tüm hakları saklıdır.</span>
          <span>Fiyatlar nettir (Teknokent KDV muafiyeti).</span>
        </div>
      </div>
    </footer>
  );
}

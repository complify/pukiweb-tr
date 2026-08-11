import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#e7ebf1]">
      <div className="container-p flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-puki to-puki-dark" />
          <b className="text-ink text-xl tracking-tight">Puki</b>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5e6278]">
          <a href="/#moduller" className="hover:text-puki-dark">Modüller</a>
          <a href="/#neden" className="hover:text-puki-dark">Neden Puki</a>
          <Link href="/fiyatlandirma" className="hover:text-puki-dark">Fiyatlandırma</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://tr.pukisoft.com/login" className="hidden sm:inline text-sm font-semibold text-[#5e6278] hover:text-puki-dark">
            Giriş
          </a>
          <Link href="/fiyatlandirma" className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-4 py-2 rounded-xl shadow-soft">
            Hemen başla
          </Link>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

export const metadata = { title: "Ödeme sonucu — Puki" };

export default function SonucPage({ searchParams }: { searchParams: { status?: string; ref?: string; reason?: string } }) {
  const ok = searchParams.status === "ok";
  const ref = searchParams.ref;

  return (
    <div className="container-p py-20">
      <div className="max-w-lg mx-auto bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8 text-center">
        {ok ? (
          <>
            <div className="w-16 h-16 rounded-full bg-puki-light grid place-items-center mx-auto text-puki-dark text-3xl font-black">✓</div>
            <h1 className="mt-5 text-2xl font-extrabold text-ink">Ödemeniz alındı</h1>
            <p className="text-[#5e6278] mt-3 leading-relaxed">
              Teşekkürler! Siparişiniz <b className="text-ink">onay kuyruğuna</b> alındı. Yetkili onayının ardından hesabınız
              hazırlanacak ve <b className="text-ink">giriş bilgileriniz e-posta ile</b> gönderilecektir.
            </p>
            {ref && <p className="text-xs text-muted mt-4">Sipariş no: <b className="text-ink">{ref}</b></p>}
            <p className="text-sm text-[#5e6278] mt-4">Aboneliğinizi ve ödemelerinizi <Link href="/hesap" className="font-bold text-puki-dark hover:text-puki">hesabınızdan</Link> takip edebilirsiniz.</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 grid place-items-center mx-auto text-red-500 text-3xl font-black">!</div>
            <h1 className="mt-5 text-2xl font-extrabold text-ink">Ödeme tamamlanamadı</h1>
            <p className="text-[#5e6278] mt-3 leading-relaxed">
              Ödeme sırasında bir sorun oluştu ve tahsilat yapılmadı. Dilerseniz tekrar deneyebilirsiniz.
            </p>
            {searchParams.reason && <p className="text-xs text-muted mt-4">Ayrıntı: {searchParams.reason}</p>}
          </>
        )}
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link href="/" className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-5 py-2.5 rounded-xl shadow-soft">Ana sayfa</Link>
          {!ok && ref && <Link href={`/odeme/${encodeURIComponent(ref)}`} className="text-sm font-semibold text-puki-dark hover:text-puki px-4 py-2.5">Tekrar dene</Link>}
        </div>
      </div>
    </div>
  );
}

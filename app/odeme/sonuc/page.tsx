import Link from "next/link";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ödeme sonucu — Puki" };

export default function SonucPage({ searchParams }: { searchParams: { status?: string; ref?: string; reason?: string } }) {
  const P = getDict(getLang()).pay;
  const ok = searchParams.status === "ok";
  const ref = searchParams.ref;

  return (
    <div className="container-p py-20">
      <div className="max-w-lg mx-auto bg-white border border-[#e7ebf1] rounded-xl3 shadow-card p-8 text-center">
        {ok ? (
          <>
            <div className="w-16 h-16 rounded-full bg-puki-light grid place-items-center mx-auto text-puki-dark text-3xl font-black">✓</div>
            <h1 className="mt-5 text-2xl font-extrabold text-ink">{P.okTitle}</h1>
            <p className="text-[#5e6278] mt-3 leading-relaxed">{P.okMsg}</p>
            {ref && <p className="text-xs text-muted mt-4">{P.orderNo}<b className="text-ink">{ref}</b></p>}
            <p className="text-sm text-[#5e6278] mt-4">{P.trackPre}<Link href="/hesap" className="font-bold text-puki-dark hover:text-puki">{P.trackLink}</Link>{P.trackSuf}</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 grid place-items-center mx-auto text-red-500 text-3xl font-black">!</div>
            <h1 className="mt-5 text-2xl font-extrabold text-ink">{P.failTitle}</h1>
            <p className="text-[#5e6278] mt-3 leading-relaxed">{P.failMsg}</p>
            {searchParams.reason && <p className="text-xs text-muted mt-4">{P.detail}{searchParams.reason}</p>}
          </>
        )}
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link href="/" className="text-sm font-bold text-white bg-puki hover:bg-puki-dark px-5 py-2.5 rounded-xl shadow-soft">{P.home}</Link>
          {!ok && ref && <Link href={`/odeme/${encodeURIComponent(ref)}`} className="text-sm font-semibold text-puki-dark hover:text-puki px-4 py-2.5">{P.retry}</Link>}
        </div>
      </div>
    </div>
  );
}

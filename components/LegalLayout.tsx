import { COMPANY } from "@/lib/company";

export default function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="hero-dark text-white">
        <div className="container-p py-14 md:py-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-puki bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
            Yasal
          </span>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
          {intro && <p className="mt-3 max-w-2xl text-white/70 leading-relaxed">{intro}</p>}
          <p className="mt-4 text-sm text-white/45">Yürürlük tarihi: {COMPANY.effectiveDate}</p>
        </div>
      </section>

      <section className="container-p py-12">
        <div className="max-w-3xl legal">{children}</div>

        <div className="max-w-3xl mt-12 pt-6 border-t border-[#eef1f6] text-sm text-muted">
          <p className="font-bold text-ink mb-1">Veri Sorumlusu / Satıcı</p>
          <p>{COMPANY.legalName}</p>
          <p>{COMPANY.address}</p>
          <p>Tel: {COMPANY.phone} · E-posta: {COMPANY.email}</p>
          <p>MERSİS: {COMPANY.mersis} · VERBİS: {COMPANY.verbis}</p>
        </div>
      </section>
    </>
  );
}

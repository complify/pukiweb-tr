// Ödeme kabul logoları — iyzico başvurusu footer'da bu logoları ister.
// Not: Marka renkleri korunarak sade SVG temsilleri. İstenirse resmî logo
// varlıklarıyla (public/ içine PNG/SVG koyup) değiştirilebilir.

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <span
      title={title}
      className="inline-flex items-center justify-center h-8 min-w-[52px] px-2.5 bg-white border border-[#e7ebf1] rounded-lg shadow-sm"
    >
      {children}
    </span>
  );
}

function Visa() {
  return (
    <svg width="40" height="14" viewBox="0 0 48 16" role="img" aria-label="Visa">
      <text x="0" y="13" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="800" fontStyle="italic" fill="#1A1F71" letterSpacing="1">VISA</text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" role="img" aria-label="Mastercard">
      <circle cx="13" cy="11" r="8" fill="#EB001B" />
      <circle cx="21" cy="11" r="8" fill="#F79E1B" />
      <path d="M17 5a8 8 0 000 12 8 8 0 000-12z" fill="#FF5F00" />
    </svg>
  );
}

function Troy() {
  return (
    <svg width="36" height="14" viewBox="0 0 40 16" role="img" aria-label="Troy">
      <text x="0" y="13" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800" fill="#00B2B2" letterSpacing="0.5">troy</text>
    </svg>
  );
}

function Iyzico() {
  return (
    <svg width="46" height="14" viewBox="0 0 52 16" role="img" aria-label="iyzico">
      <text x="0" y="13" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800" fill="#1e64ff" letterSpacing="0.2">iyzico</text>
    </svg>
  );
}

export default function PaymentMarks({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
      <Card title="iyzico"><Iyzico /></Card>
      <Card title="Visa"><Visa /></Card>
      <Card title="Mastercard"><Mastercard /></Card>
      <Card title="Troy"><Troy /></Card>
    </span>
  );
}

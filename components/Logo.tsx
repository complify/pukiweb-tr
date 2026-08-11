// Puki logosu — public/logo.svg (kurumsal tam kilit: marka + "Puki" yazısı) gösterilir.
// Logoyu değiştirmek için sadece public/logo.svg dosyasını değiştirin.

export default function Logo({
  className = "",
  markClass = "h-7 w-auto",
  // wordClass artık kullanılmıyor (yazı logonun içinde) — geriye dönük uyumluluk için tutuldu
  wordClass,
}: {
  className?: string;
  markClass?: string;
  wordClass?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.svg" alt="Puki" className={`${markClass} ${className}`.trim()} />
  );
}

// Puki logosu — çift-swoosh marka (yeşil + gri) + "Puki" wordmark.
// Not: Bu, marka renklerinde temiz bir SVG yorumudur. Kurumsal orijinal
// dosyanız varsa public/ içine koyup burada <img> ile değiştirebilirsiniz.

export function PukiMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 62 50"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Puki"
    >
      {/* üst swoosh — yeşil */}
      <path
        d="M6 26 C 18 22 34 14 52 6 C 44 16 30 26 14 30 C 10 31 7 30 6 26 Z"
        fill="#8bc53f"
      />
      {/* alt swoosh — gri */}
      <path
        d="M10 42 C 22 38 38 30 56 22 C 48 32 34 42 18 46 C 14 47 11 46 10 42 Z"
        fill="#58595b"
      />
    </svg>
  );
}

export default function Logo({
  className = "",
  markClass = "h-8 w-auto",
  wordClass = "text-ink text-xl tracking-tight font-extrabold",
}: {
  className?: string;
  markClass?: string;
  wordClass?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <PukiMark className={markClass} />
      <span className={wordClass}>Puki</span>
    </span>
  );
}

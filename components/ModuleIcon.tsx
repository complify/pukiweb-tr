// Modül ikonları (10 modül) — landing ve detay sayfalarında paylaşılır.
const PATHS: Record<string, JSX.Element> = {
  bgys: <path d="M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z" />,
  kvys: (
    <path d="M12 2a5 5 0 015 5v3h1a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h1V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v3h6V7a3 3 0 00-3-3z" />
  ),
  isys: <path d="M12 4V1L8 5l4 4V6a6 6 0 11-6 6H4a8 8 0 108-8z" />,
  yzys: (
    <path d="M9 2h6v2h3a1 1 0 011 1v3h2v6h-2v3a1 1 0 01-1 1h-3v2H9v-2H6a1 1 0 01-1-1v-3H3V8h2V5a1 1 0 011-1h3V2zm0 6v8h6V8H9z" />
  ),
  qms: (
    <path d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 16.8 6.2 19.9l1.1-6.5L2.6 8.8l6.5-.9L12 2z" />
  ),
  tisax: (
    <path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11m-14 0h14m-14 0a2 2 0 00-2 2v3h2m14-5a2 2 0 012 2v3h-2m-2 0H7m10 0v2h-2v-2m-6 0v2H7v-2m1-3h.01M16 8h.01" />
  ),
  soc2: (
    <path d="M12 2l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V5l7-3z M9 12l2 2 4-4" />
  ),
  itsm: (
    <path d="M4 6h16v9H4z M4 6v9m16-9v9M9 19h6m-3-4v4M9 9h6M9 12h4" />
  ),
  spice: (
    <path d="M4 19V5m0 14h16M8 19v-5m4 5V9m4 10v-8" />
  ),
  egitim: (
    <path d="M12 4L2 9l10 5 8-4v6m-4-2v3.5c0 1-2 2.5-4 2.5s-4-1.5-4-2.5V14" />
  ),
};

export default function ModuleIcon({ code, className = "w-6 h-6" }: { code: string; className?: string }) {
  const p = PATHS[code];
  if (!p) return null;
  const stroke = ["tisax", "itsm", "spice", "egitim", "soc2"].includes(code);
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={stroke ? "none" : "currentColor"}
      stroke={stroke ? "currentColor" : "none"}
      strokeWidth={stroke ? 1.8 : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p}
    </svg>
  );
}

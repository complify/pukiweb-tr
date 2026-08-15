// Puki SaaS satış kataloğu — FİYATLAR BURADA (puki.com.tr).
// GRC ürünü fiyatı bilmez; yalnız modül->lisans eşlemesini bilir.
// İleride bu katalog + promosyonlar bir admin/CMS veya DB'den yönetilecek.

export type Billing = "monthly" | "annual";

export interface CatalogModule {
  code: string;            // katalog kodu (GRC provizyon API'sine gönderilir)
  name: string;            // görünen ad
  iso: string;             // ISO standardı
  systemModules: string[]; // GRC çekirdek modül anahtarları (bilgi amaçlı)
  basePrice: number;       // 1-5 kullanıcı standart (net ₺)
  perUser: number;         // ek kullanıcı (net ₺)
  includedSeats: number;   // dahil koltuk
  blurb: string;
}

export const CATALOG = {
  currency: "TRY",
  annualMonths: 10,   // yıllık = 10 x aylık (2 ay bedava)
  maxSelfServiceSeats: 10,
  modules: [
    { code: "bgys", name: "ISMS", iso: "ISO 27001", systemModules: ["bgys"], basePrice: 3750, perUser: 750, includedSeats: 5,
      blurb: "Bilgi Güvenliği Yönetim Sistemi — risk, SoA, olay ve fırsat yönetimi." },
    { code: "kvys", name: "PIMS", iso: "ISO 27701 + KVKK", systemModules: ["gdpr", "pims"], basePrice: 3000, perUser: 600, includedSeats: 5,
      blurb: "Kişisel Veri Yönetim Sistemi — KVKK envanteri, PIMS ve uyum." },
    { code: "isys", name: "İSYS", iso: "ISO 22301", systemModules: ["bcms"], basePrice: 2500, perUser: 500, includedSeats: 5,
      blurb: "İş Sürekliliği Yönetim Sistemi — BIA, iş sürekliliği planı ve tatbikatlar." },
    { code: "yzys", name: "YZYS", iso: "ISO 42001", systemModules: ["aims"], basePrice: 2500, perUser: 500, includedSeats: 5,
      blurb: "Yapay Zekâ Yönetim Sistemi — AI etki değerlendirmesi ve risk." },
    { code: "soc2", name: "SOC 2", iso: "SOC 2 (AICPA TSC)", systemModules: ["soc2"], basePrice: 3500, perUser: 700, includedSeats: 5,
      blurb: "SOC 2 Güven Hizmetleri Kriterleri — kontrol eşleme, kanıt ve denetim hazırlığı." },
    { code: "itsm", name: "ITSM", iso: "ISO/IEC 20000-1", systemModules: ["itsm"], basePrice: 3000, perUser: 600, includedSeats: 5,
      blurb: "BT Hizmet Yönetim Sistemi — hizmet kataloğu, olay/problem/değişiklik yönetimi." },
    { code: "spice", name: "SPICE", iso: "ISO/IEC 33000 · ASPICE", systemModules: ["spice"], basePrice: 3500, perUser: 700, includedSeats: 5,
      blurb: "Süreç olgunluğu değerlendirmesi — yetenek seviyesi ve boşluk analizi." },
    { code: "qms", name: "QMS", iso: "ISO 9001", systemModules: ["qms"], basePrice: 2500, perUser: 500, includedSeats: 5,
      blurb: "Kalite Yönetim Sistemi — süreç, KPI, uygunsuzluk/DÖF ve iç denetim." },
    { code: "tisax", name: "TISAX", iso: "TISAX · VDA ISA", systemModules: ["tisax"], basePrice: 3500, perUser: 700, includedSeats: 5,
      blurb: "Otomotiv bilgi güvenliği (VDA ISA) — olgunluk değerlendirmesi ve gap analizi." },
    { code: "egitim", name: "Akademi", iso: "Eğitim & Farkındalık", systemModules: ["academy"], basePrice: 1500, perUser: 300, includedSeats: 5,
      blurb: "Eğitim ve farkındalık yönetimi — eğitim atama, tamamlanma ve sertifika takibi." },
  ] as CatalogModule[],
};

export interface Promo {
  code: string;
  type: "percent" | "amount";
  value: number;
  label: string;
  active?: boolean;
}

// İleride admin panelinden / DB'den yönetilecek. Şimdilik örnek kampanyalar.
export const PROMOS: Promo[] = [
  { code: "TEKNOKENT20", type: "percent", value: 20, label: "Teknokent %20", active: true },
  { code: "HOSGELDIN1000", type: "amount", value: 1000, label: "Hoş geldin −1.000 ₺", active: true },
  { code: "ILKYIL50", type: "percent", value: 50, label: "İlk yıl %50", active: true },
];

export const moduleByCode = (code: string) => CATALOG.modules.find((m) => m.code === code);

export function monthlyPrice(codes: string[], seats: number): number {
  return codes.reduce((sum, code) => {
    const m = moduleByCode(code);
    if (!m) return sum;
    const extra = Math.max(0, seats - m.includedSeats);
    return sum + m.basePrice + extra * m.perUser;
  }, 0);
}

export function subtotal(codes: string[], seats: number, billing: Billing): number {
  const monthly = monthlyPrice(codes, seats);
  return billing === "annual" ? monthly * CATALOG.annualMonths : monthly;
}

export function findPromo(code?: string | null): Promo | null {
  if (!code) return null;
  const p = PROMOS.find((x) => x.active !== false && x.code === code.trim().toUpperCase());
  return p ?? null;
}

export function discountAmount(sub: number, promo: Promo | null): number {
  if (!promo) return 0;
  const d = promo.type === "percent" ? (sub * promo.value) / 100 : promo.value;
  return Math.min(Math.round(d), sub);
}

export function quote(codes: string[], seats: number, billing: Billing, promoCode?: string | null) {
  const sub = subtotal(codes, seats, billing);
  const promo = findPromo(promoCode);
  const discount = discountAmount(sub, promo);
  return { subtotal: sub, discount, total: Math.max(0, sub - discount), promo: promo?.code ?? null, billing };
}

export const fmt = (n: number) =>
  new Intl.NumberFormat("tr-TR").format(Math.round(n)) + " ₺";

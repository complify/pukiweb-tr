// Çoklu dil (i18n) — Türkçe (varsayılan), Azerice, İngilizce.
export type Lang = "tr" | "az" | "en";
export const LANGS: Lang[] = ["tr", "az", "en"];
export const DEFAULT_LANG: Lang = "tr";
export const LANG_COOKIE = "puki_lang";

export const LANG_LABELS: Record<Lang, string> = { tr: "Türkçe", az: "Azərbaycan", en: "English" };
export const LANG_SHORT: Record<Lang, string> = { tr: "TR", az: "AZ", en: "EN" };

export function isLang(v: unknown): v is Lang {
  return v === "tr" || v === "az" || v === "en";
}

const tr = {
  nav: { why: "Neden Puki", demo: "Demo", account: "Hesabım", contact: "İletişim", products: "Puki GRC" },
  cta: { requestDemo: "Demo Talep Et", contactUs: "Bize ulaşın", exploreModules: "Modülleri keşfedin" },
  common: { quoteOnly: "Teklife özel", viewDetails: "Detayları görün", perMonth: "/ay", perYear: "/yıl" },
  home: {
    heroBadge: "Bulut GRC · Küçük işletmeler için",
    heroTitle: "Yönetim sistemlerinizi",
    heroTitleHl: "tek platformda yönetin",
    heroSubtitle: "ISO 27001, KVKK & ISO 27701, ISO 22301 ve ISO 42001 — risklerinizi, uyumunuzu ve dokümanlarınızı dakikalar içinde yönetmeye başlayın.",
    statModules: "yönetim sistemi modülü",
    statPlatform1: "Tek", statPlatform2: "platform, çapraz veri",
    statRegion1: "TR & EU", statRegion2: "veri bölgesi seçimi",
    statSetup1: "Dakikalar", statSetup2: "içinde kurulum",
    modulesEyebrow: "Modüller",
    modulesTitle: "İhtiyacınız olanı seçin",
    modulesSub: "À la carte — ister tek modül, ister hepsi. İstediğiniz an ekleyin, aboneliğiniz anında güncellensin.",
    modulesNote1: "İhtiyacınıza uygun modülleri birlikte belirleyelim — ",
    modulesNoteLink: "demo talep edin",
    modulesNote2: ", size özel teklifimizi sunalım.",
    howEyebrow: "Nasıl çalışır",
    howTitle: "Üç adımda yayında",
    step1t: "Demo talep edin", step1d: "İlgilendiğiniz modülleri seçin, formu doldurun; ekibimiz sizinle iletişime geçsin.",
    step2t: "Demo & teklif", step2d: "Size özel bir demo yapalım, ekip büyüklüğünüze ve modüllerinize göre net teklifimizi sunalım.",
    step3t: "Hesabınız açılsın", step3d: "Anlaşınca hesabınızı hazırlarız; giriş bilgileriniz e-posta ile gelir, hemen kullanmaya başlarsınız.",
    whyEyebrow: "Neden Puki",
    whyTitle: "Küçük ekipler için tasarlandı",
    why1t: "Dakikalar içinde kurulum", why1d: "Satın alın, hesabınız hazır olsun. Danışman beklemeden başlayın.",
    why2t: "Tek platform, çok standart", why2d: "27001, KVKK/27701, 22301, 42001 aynı arayüzde — çapraz veri, tek gerçek.",
    why3t: "Veriniz sizin bölgenizde", why3d: "TR müşteri → Türkiye, EU müşteri → Avrupa. Data residency baştan çözülü.",
    why4t: "Küçük işletmeye uygun", why4d: "Yalnızca ihtiyacınız olan modüller için, kurumunuza özel şeffaf teklif.",
    why5t: "Risk → aksiyon → kanıt", why5d: "Riskten düzeltici faaliyete, denetimden kanıta uçtan uca akış.",
    why6t: "Her an ölçeklenir", why6d: "Kullanıcı ekleyin, modül ekleyin — aboneliğiniz anında güncellensin.",
    ctaTitle: "Yönetim sisteminizi bugün kurun",
    ctaSub: "Kısa bir demo planlayalım, kurumunuza özel teklifimizi sunalım. TR & EU veri bölgesi seçeneğiyle.",
  },
  footer: {
    tagline: "Küçük işletmeler için bulut GRC — yönetim sistemlerinizi tek platformda.",
    product: "Ürün", standards: "Standartlar", contact: "İletişim",
    demoLink: "Demo talep et", account: "Hesabım",
    securePayment: "Güvenli ödeme", rights: "Tüm hakları saklıdır.",
  },
};

type Dict = typeof tr;

const az: Dict = {
  nav: { why: "Niyə Puki", demo: "Demo", account: "Hesabım", contact: "Əlaqə", products: "Puki GRC" },
  cta: { requestDemo: "Demo Tələb Et", contactUs: "Bizimlə əlaqə", exploreModules: "Modulları kəşf edin" },
  common: { quoteOnly: "Təklifə özəl", viewDetails: "Ətraflı bax", perMonth: "/ay", perYear: "/il" },
  home: {
    heroBadge: "Bulud GRC · Kiçik bizneslər üçün",
    heroTitle: "İdarəetmə sistemlərinizi",
    heroTitleHl: "vahid platformadan idarə edin",
    heroSubtitle: "ISO 27001, KVKK & ISO 27701, ISO 22301 və ISO 42001 — risklərinizi, uyğunluğunuzu və sənədlərinizi dəqiqələr içində idarə etməyə başlayın.",
    statModules: "idarəetmə sistemi modulu",
    statPlatform1: "Vahid", statPlatform2: "platforma, çarpaz məlumat",
    statRegion1: "TR & EU", statRegion2: "məlumat regionu seçimi",
    statSetup1: "Dəqiqələr", statSetup2: "içində quraşdırma",
    modulesEyebrow: "Modullar",
    modulesTitle: "Ehtiyacınız olanı seçin",
    modulesSub: "À la carte — istər tək modul, istər hamısı. İstədiyiniz an əlavə edin, abunəliyiniz dərhal yenilənsin.",
    modulesNote1: "Ehtiyacınıza uyğun modulları birlikdə müəyyən edək — ",
    modulesNoteLink: "demo tələb edin",
    modulesNote2: ", sizə özəl təklifimizi təqdim edək.",
    howEyebrow: "Necə işləyir",
    howTitle: "Üç addımda hazır",
    step1t: "Demo tələb edin", step1d: "Maraqlandığınız modulları seçin, formu doldurun; komandamız sizinlə əlaqə saxlasın.",
    step2t: "Demo & təklif", step2d: "Sizə özəl bir demo edək, komanda ölçünüzə və modullarınıza görə dəqiq təklifimizi təqdim edək.",
    step3t: "Hesabınız açılsın", step3d: "Razılaşdıqda hesabınızı hazırlayırıq; giriş məlumatlarınız e-poçtla gəlir, dərhal istifadəyə başlayırsınız.",
    whyEyebrow: "Niyə Puki",
    whyTitle: "Kiçik komandalar üçün hazırlanıb",
    why1t: "Dəqiqələr içində quraşdırma", why1d: "Satın alın, hesabınız hazır olsun. Məsləhətçi gözləmədən başlayın.",
    why2t: "Vahid platforma, çox standart", why2d: "27001, KVKK/27701, 22301, 42001 eyni interfeysdə — çarpaz məlumat, vahid həqiqət.",
    why3t: "Məlumatınız öz regionunuzda", why3d: "TR müştəri → Türkiyə, EU müştəri → Avropa. Data residency əvvəldən həll olunub.",
    why4t: "Kiçik biznesə uyğun", why4d: "Yalnız ehtiyacınız olan modullar üçün, təşkilatınıza özəl şəffaf təklif.",
    why5t: "Risk → tədbir → sübut", why5d: "Riskdən düzəldici tədbirə, auditdən sübuta uçdan-uca axın.",
    why6t: "Hər an miqyaslanır", why6d: "İstifadəçi əlavə edin, modul əlavə edin — abunəliyiniz dərhal yenilənsin.",
    ctaTitle: "İdarəetmə sisteminizi bu gün qurun",
    ctaSub: "Qısa bir demo planlaşdıraq, təşkilatınıza özəl təklifimizi təqdim edək. TR & EU məlumat regionu seçimi ilə.",
  },
  footer: {
    tagline: "Kiçik bizneslər üçün bulud GRC — idarəetmə sistemlərinizi vahid platformada.",
    product: "Məhsul", standards: "Standartlar", contact: "Əlaqə",
    demoLink: "Demo tələb et", account: "Hesabım",
    securePayment: "Təhlükəsiz ödəniş", rights: "Bütün hüquqlar qorunur.",
  },
};

const en: Dict = {
  nav: { why: "Why Puki", demo: "Demo", account: "My Account", contact: "Contact", products: "Puki GRC" },
  cta: { requestDemo: "Request a Demo", contactUs: "Contact us", exploreModules: "Explore modules" },
  common: { quoteOnly: "Custom quote", viewDetails: "View details", perMonth: "/mo", perYear: "/yr" },
  home: {
    heroBadge: "Cloud GRC · For small businesses",
    heroTitle: "Manage your management systems",
    heroTitleHl: "on one platform",
    heroSubtitle: "ISO 27001, GDPR & ISO 27701, ISO 22301 and ISO 42001 — start managing your risks, compliance and documents in minutes.",
    statModules: "management system modules",
    statPlatform1: "One", statPlatform2: "platform, cross-linked data",
    statRegion1: "TR & EU", statRegion2: "data region choice",
    statSetup1: "Minutes", statSetup2: "to get set up",
    modulesEyebrow: "Modules",
    modulesTitle: "Choose what you need",
    modulesSub: "À la carte — one module or all of them. Add anytime, your subscription updates instantly.",
    modulesNote1: "Let's define the right modules together — ",
    modulesNoteLink: "request a demo",
    modulesNote2: " and we'll prepare a custom quote for you.",
    howEyebrow: "How it works",
    howTitle: "Live in three steps",
    step1t: "Request a demo", step1d: "Pick the modules you're interested in, fill the form, and our team will reach out.",
    step2t: "Demo & quote", step2d: "We run a tailored demo and give you a clear quote based on your team size and modules.",
    step3t: "Your account is set up", step3d: "Once agreed, we set up your account; your login details arrive by email and you start right away.",
    whyEyebrow: "Why Puki",
    whyTitle: "Built for small teams",
    why1t: "Set up in minutes", why1d: "Purchase and your account is ready. Start without waiting for a consultant.",
    why2t: "One platform, many standards", why2d: "27001, GDPR/27701, 22301, 42001 in one interface — cross-linked data, one source of truth.",
    why3t: "Your data in your region", why3d: "TR customer → Türkiye, EU customer → Europe. Data residency solved from the start.",
    why4t: "Right-sized for small business", why4d: "Only for the modules you need, with a transparent quote tailored to your organization.",
    why5t: "Risk → action → evidence", why5d: "End-to-end flow from risk to corrective action, from audit to evidence.",
    why6t: "Scales anytime", why6d: "Add users, add modules — your subscription updates instantly.",
    ctaTitle: "Set up your management system today",
    ctaSub: "Let's schedule a short demo and give you a custom quote. With a TR & EU data region option.",
  },
  footer: {
    tagline: "Cloud GRC for small businesses — your management systems on one platform.",
    product: "Product", standards: "Standards", contact: "Contact",
    demoLink: "Request a demo", account: "My Account",
    securePayment: "Secure payment", rights: "All rights reserved.",
  },
};

export const DICT: Record<Lang, Dict> = { tr, az, en };
export function getDict(lang: Lang): Dict { return DICT[lang] ?? tr; }

import type { Lang } from "@/lib/i18n";

// Modül detay içerikleri — /moduller/[code] sayfalarında kullanılır.
// Katalog (lib/catalog.ts) fiyat & kodları tutar; burada anlatım & özellikler.

export interface ModuleFeature {
  title: string;
  desc: string;
}

export interface ModuleDetail {
  code: string;          // katalog kodu (bgys|kvys|isys|yzys) veya salt-tanıtım (qms|tisax)
  name: string;
  iso: string;
  tagline: Record<Lang, string>;
  overview: string[];    // paragraflar
  features: ModuleFeature[];
  audience: string;      // kimler için
  standards: string[];   // kapsanan standart/mevzuat
  outcomes: string[];    // çıktılar / kanıtlar
  quoteOnly?: boolean;   // true → fiyat yok, "Teklif alın" gösterilir (self-servis değil)
}

export const MODULE_DETAILS: Record<string, ModuleDetail> = {
  bgys: {
    code: "bgys",
    name: "ISMS",
    iso: "ISO/IEC 27001",
    tagline: { tr: "Bilgi Güvenliği Yönetim Sistemi (ISMS)", az: "İnformasiya Təhlükəsizliyi İdarəetmə Sistemi (ISMS)", en: "Information Security Management System (ISMS)" },
    overview: [
      "BGYS modülü, kurumunuzun bilgi varlıklarını risk temelli bir yaklaşımla korumanızı sağlar. Varlıklarınızı envanterler, risklerinizi değerlendirir ve ISO/IEC 27001 Annex A kontrollerini uçtan uca yönetirsiniz.",
      "Belge, politika, olay ve iyileştirme akışları tek platformda birleşir; iç denetim ve yönetimin gözden geçirmesi için gereken kanıtı otomatik biriktirirsiniz. Sertifikasyon denetimine hazır bir sistemle çalışırsınız.",
    ],
    features: [
      { title: "Varlık envanteri & sınıflandırma", desc: "Bilgi varlıklarını sahiplik, gizlilik ve kritiklik düzeyiyle kayıt altına alın." },
      { title: "Risk değerlendirme & işleme", desc: "Risk matrisi ile tehdit/zafiyet analizi, risk işleme planı ve kalan risk takibi." },
      { title: "SoA — Uygulanabilirlik Bildirgesi", desc: "Annex A kontrollerini gerekçesiyle seçin, uygulama durumunu izleyin." },
      { title: "Olay yönetimi", desc: "Bilgi güvenliği olaylarını kaydedin, sınıflandırın, kök neden ve aksiyona bağlayın." },
      { title: "Politika & doküman yönetimi", desc: "Sürüm, onay ve yayım akışıyla politikaları güncel tutun." },
      { title: "İç denetim & YGG", desc: "Denetim planı, bulgular ve yönetimin gözden geçirmesi kayıtlarını tek yerde toplayın." },
    ],
    audience: "ISO 27001 belgelendirmesi hedefleyen veya bilgi güvenliğini sistematik yönetmek isteyen küçük ve orta ölçekli kurumlar.",
    standards: ["ISO/IEC 27001", "ISO/IEC 27002 (kontrol rehberi)"],
    outcomes: ["Varlık & risk envanteri", "Uygulanabilirlik Bildirgesi (SoA)", "Risk işleme planı", "Denetim & YGG kanıtları"],
  },
  kvys: {
    code: "kvys",
    name: "PIMS",
    iso: "KVKK & ISO/IEC 27701",
    tagline: { tr: "Kişisel Veri Yönetim Sistemi (PIMS)", az: "Şəxsi Məlumatların İdarəetmə Sistemi (PIMS)", en: "Privacy Information Management System (PIMS)" },
    overview: [
      "KVYS modülü, KVKK yükümlülüklerinizi ve ISO/IEC 27701 (PIMS) gereksinimlerini tek çatı altında yönetmenizi sağlar. Kişisel veri işleme faaliyetlerinizi envanterler, hukuki dayanaklarını ve saklama sürelerini kayıt altına alırsınız.",
      "İlgili kişi başvurularından veri ihlali bildirimine, aydınlatma ve rıza yönetiminden imha süreçlerine kadar tüm KVKK akışını dijitalleştirir; VERBİS ve denetimler için gereken kanıtı hazır tutarsınız.",
    ],
    features: [
      { title: "Kişisel veri envanteri (ROPA)", desc: "İşleme faaliyetleri kaydı — veri kategorisi, amaç, hukuki dayanak, alıcı ve saklama süresi." },
      { title: "Aydınlatma & açık rıza", desc: "Aydınlatma metinleri ve açık rıza kayıtlarını versiyonlu yönetin." },
      { title: "İlgili kişi başvuruları", desc: "Başvuruları alın, süre takibi yapın ve yanıtları kanıtıyla saklayın." },
      { title: "Veri ihlali yönetimi", desc: "İhlal kaydı, risk değerlendirmesi ve 72 saat bildirim süreci." },
      { title: "Saklama & imha", desc: "Saklama planları ve periyodik imha takvimiyle uyumu koruyun." },
      { title: "PIMS kontrolleri (27701)", desc: "ISO 27701 gereksinimlerini BGYS ile entegre yönetin." },
    ],
    audience: "KVKK uyumunu düzenli yürütmek ve/veya ISO 27701 belgelendirmesi isteyen kurumlar.",
    standards: ["6698 sayılı KVKK", "ISO/IEC 27701", "ISO/IEC 27001 (temel)"],
    outcomes: ["Kişisel veri envanteri (ROPA)", "Aydınlatma & rıza kayıtları", "İlgili kişi başvuru dosyaları", "İhlal & imha kanıtları"],
  },
  isys: {
    code: "isys",
    name: "İSYS",
    iso: "ISO 22301",
    tagline: { tr: "İş Sürekliliği Yönetim Sistemi", az: "Biznesin Fasiləsizliyi İdarəetmə Sistemi", en: "Business Continuity Management System" },
    overview: [
      "İSYS modülü, kritik iş süreçlerinizi kesintilere karşı dayanıklı hale getirir. İş etki analizi (BIA) ile kritik süreçlerinizi, kurtarma hedeflerinizi (RTO/RPO) ve bağımlılıklarınızı belirlersiniz.",
      "İş sürekliliği planlarını (BCP) oluşturur, tatbikatlarla test eder ve olay/kriz anında devreye alacağınız hazır adımlarla çalışırsınız. ISO 22301 denetimine hazır kanıt seti otomatik oluşur.",
    ],
    features: [
      { title: "İş etki analizi (BIA)", desc: "Kritik süreçleri, etkileri ve kabul edilebilir kesinti sürelerini analiz edin." },
      { title: "RTO / RPO hedefleri", desc: "Kurtarma zamanı ve veri kaybı hedeflerini süreç bazında tanımlayın." },
      { title: "İş sürekliliği planları (BCP)", desc: "Senaryo bazlı kurtarma adımlarını, rolleri ve iletişim planını yönetin." },
      { title: "Tatbikat & test", desc: "Planları düzenli tatbikatlarla sınayın, bulguları iyileştirmeye bağlayın." },
      { title: "Kaynak & bağımlılık envanteri", desc: "Kritik kaynakları, tedarikçileri ve bağımlılıkları haritalayın." },
      { title: "Olay & kriz yönetimi", desc: "Kesinti olaylarını kaydedin, kriz ekibini ve aksiyonları yönetin." },
    ],
    audience: "Operasyonel kesintilere karşı dayanıklılık isteyen veya ISO 22301 hedefleyen kurumlar.",
    standards: ["ISO 22301"],
    outcomes: ["İş etki analizi (BIA)", "İş sürekliliği planları (BCP)", "Tatbikat kayıtları", "Kaynak & bağımlılık envanteri"],
  },
  yzys: {
    code: "yzys",
    name: "YZYS",
    iso: "ISO/IEC 42001",
    tagline: { tr: "Yapay Zekâ Yönetim Sistemi", az: "Süni İntellekt İdarəetmə Sistemi", en: "Artificial Intelligence Management System" },
    overview: [
      "YZYS modülü, yapay zekâ sistemlerinizi sorumlu ve şeffaf biçimde yönetmenizi sağlar. Kullandığınız YZ sistemlerini envanterler, etki değerlendirmesi yapar ve riskleri kontrol altına alırsınız.",
      "ISO/IEC 42001 gereksinimleri doğrultusunda yaşam döngüsü, tedarikçi ve hesap verebilirlik kontrollerini yönetir; YZ yönetişimini denetlenebilir bir sisteme dönüştürürsünüz.",
    ],
    features: [
      { title: "YZ sistem envanteri", desc: "Kullanılan YZ sistemlerini amaç, veri ve sahiplikle kayıt altına alın." },
      { title: "YZ etki değerlendirmesi", desc: "Etik, güvenlik ve bireyler üzerindeki etkiyi yapılandırılmış şekilde değerlendirin." },
      { title: "YZ risk yönetimi", desc: "YZ'ye özgü riskleri belirleyin, işleyin ve kalan riski izleyin." },
      { title: "Şeffaflık & hesap verebilirlik", desc: "Rolleri, kararları ve gözetim kontrollerini belgeleyin." },
      { title: "Yaşam döngüsü yönetimi", desc: "Tasarımdan kullanımdan çıkarmaya kadar YZ yaşam döngüsünü yönetin." },
      { title: "Tedarikçi yönetimi", desc: "Üçüncü taraf YZ ve model tedarikçilerini değerlendirin ve izleyin." },
    ],
    audience: "Yapay zekâ kullanan veya geliştiren, sorumlu YZ yönetişimi ve ISO 42001 hedefleyen kurumlar.",
    standards: ["ISO/IEC 42001"],
    outcomes: ["YZ sistem envanteri", "YZ etki değerlendirmeleri", "YZ risk kayıtları", "Yönetişim & tedarikçi kanıtları"],
  },
  qms: {
    code: "qms",
    name: "QMS",
    iso: "ISO 9001",
    tagline: { tr: "Kalite Yönetim Sistemi (QMS)", az: "Keyfiyyət İdarəetmə Sistemi (QMS)", en: "Quality Management System (QMS)" },
    quoteOnly: true,
    overview: [
      "QMS modülü, kalite yönetim sisteminizi ISO 9001 doğrultusunda uçtan uca yönetmenizi sağlar. Süreçlerinizi, hedeflerinizi ve müşteri memnuniyeti göstergelerinizi tek platformda izlersiniz.",
      "Doküman ve kayıt yönetiminden uygunsuzluk ve düzeltici faaliyetlere, iç denetimden yönetimin gözden geçirmesine kadar tüm kalite döngüsünü dijitalleştirir; sürekli iyileştirmeyi kanıtlarıyla yürütürsünüz.",
    ],
    features: [
      { title: "Süreç yönetimi", desc: "Kalite süreçlerini, girdi/çıktı ve sorumlularıyla haritalayın ve izleyin." },
      { title: "Hedef & KPI takibi", desc: "Kalite hedeflerini ve performans göstergelerini periyodik olarak ölçün." },
      { title: "Doküman & kayıt yönetimi", desc: "Prosedür, talimat ve formları sürüm/onay akışıyla güncel tutun." },
      { title: "Uygunsuzluk & DÖF", desc: "Uygunsuzlukları kaydedin, kök neden analizi ve düzeltici faaliyete bağlayın." },
      { title: "İç denetim", desc: "Denetim planı, soru listeleri ve bulguları tek yerde yönetin." },
      { title: "Yönetimin gözden geçirmesi", desc: "YGG girdilerini otomatik toplayın, karar ve aksiyonları izleyin." },
    ],
    audience: "ISO 9001 belgesi olan ya da hedefleyen; kalite yönetimini sistematikleştirmek isteyen kurumlar.",
    standards: ["ISO 9001"],
    outcomes: ["Süreç envanteri", "Kalite hedefleri & KPI'lar", "Uygunsuzluk & DÖF kayıtları", "Denetim & YGG kanıtları"],
  },
  tisax: {
    code: "tisax",
    name: "TISAX",
    iso: "TISAX · VDA ISA",
    tagline: { tr: "Otomotiv Bilgi Güvenliği Değerlendirmesi (TISAX)", az: "Avtomobil İnformasiya Təhlükəsizliyi Qiymətləndirməsi (TISAX)", en: "Automotive Information Security Assessment (TISAX)" },
    quoteOnly: true,
    overview: [
      "TISAX modülü, otomotiv tedarik zincirinde talep edilen TISAX (VDA ISA) değerlendirmesine hazırlanmanızı sağlar. VDA ISA kontrol kataloğunu, olgunluk seviyelerini ve boşluk analizini yapılandırılmış biçimde yönetirsiniz.",
      "Bilgi güvenliği, prototip koruma ve veri koruma gereksinimlerini tek platformda izler; değerlendirme öncesi eksiklerinizi kapatıp kanıtlarınızı hazır tutarsınız.",
    ],
    features: [
      { title: "VDA ISA kontrol kataloğu", desc: "Kontrolleri olgunluk seviyeleriyle değerlendirin ve izleyin." },
      { title: "Boşluk (gap) analizi", desc: "Mevcut durum ile hedef seviye arasındaki farkı belirleyin." },
      { title: "Olgunluk seviyesi takibi", desc: "Her kontrol için olgunluk puanını ve gelişimi ölçün." },
      { title: "Prototip & veri koruma", desc: "Yüksek koruma gerektiren gereksinimleri ayrı ayrı yönetin." },
      { title: "Aksiyon & kanıt yönetimi", desc: "Eksikleri aksiyona bağlayın, kanıtları merkezî tutun." },
      { title: "Değerlendirmeye hazırlık", desc: "Değerlendirme öncesi öz-değerlendirmeyi eksiksiz tamamlayın." },
    ],
    audience: "Otomotiv OEM ve tedarikçileri — TISAX etiketi talep edilen ya da hedefleyen kurumlar.",
    standards: ["TISAX", "VDA ISA", "ISO/IEC 27001 (temel)"],
    outcomes: ["VDA ISA öz-değerlendirmesi", "Boşluk analizi raporu", "Olgunluk seviyesi kayıtları", "Aksiyon & kanıt dosyaları"],
  },
  soc2: {
    code: "soc2",
    name: "SOC 2",
    iso: "AICPA TSC",
    tagline: { tr: "SOC 2 Güven Hizmetleri Uyumu", az: "SOC 2 Etibar Xidmətləri Uyğunluğu", en: "SOC 2 Trust Services Compliance" },
    quoteOnly: true,
    overview: [
      "SOC 2 modülü, AICPA Güven Hizmetleri Kriterleri (TSC) doğrultusunda denetime hazırlanmanızı sağlar. Güvenlik, erişilebilirlik, işlem bütünlüğü, gizlilik ve mahremiyet kriterlerini tek platformda yönetirsiniz.",
      "Kontrolleri kriterlerle eşler, sorumlularını atar ve kanıtlarınızı sürekli biriktirirsiniz; Type I ve Type II denetimlerine boşluksuz girmeniz için hazır bir sistemle çalışırsınız.",
    ],
    features: [
      { title: "Güven Hizmetleri Kriterleri (TSC)", desc: "Security, Availability, Confidentiality, Processing Integrity ve Privacy kriterlerini haritalayın." },
      { title: "Kontrol eşleme", desc: "Kontrollerinizi ilgili kriterlere bağlayın, uygulama durumunu izleyin." },
      { title: "Kanıt toplama", desc: "Her kontrol için kanıtları merkezî ve denetime hazır biçimde biriktirin." },
      { title: "Boşluk (gap) analizi", desc: "Mevcut durum ile SOC 2 hedefi arasındaki farkı belirleyip aksiyona bağlayın." },
      { title: "Tedarikçi & alt hizmet sağlayıcı", desc: "Alt hizmet sağlayıcıların kontrollerini ve sorumluluk sınırını yönetin." },
      { title: "Denetim hazırlığı", desc: "Type I / Type II denetimi için gerekli kayıt ve raporları hazır tutun." },
    ],
    audience: "SaaS ve teknoloji şirketleri — müşterilerinden SOC 2 raporu talep edilen ya da hedefleyen kurumlar.",
    standards: ["SOC 2 (AICPA)", "Trust Services Criteria", "ISO/IEC 27001 (temel)"],
    outcomes: ["TSC kontrol matrisi", "Boşluk analizi raporu", "Kanıt dosyaları", "Denetime hazır kayıtlar"],
  },
  itsm: {
    code: "itsm",
    name: "ITSM",
    iso: "ISO/IEC 20000-1",
    tagline: { tr: "BT Hizmet Yönetim Sistemi (ITSM)", az: "İT Xidmət İdarəetmə Sistemi (ITSM)", en: "IT Service Management System (ITSM)" },
    quoteOnly: true,
    overview: [
      "ITSM modülü, BT hizmet yönetim sisteminizi ISO/IEC 20000-1 doğrultusunda yönetmenizi sağlar. Hizmet kataloğu, seviye anlaşmaları (SLA) ve hizmet süreçlerini tek platformda yürütürsünüz.",
      "Olay, problem ve değişiklik yönetiminden hizmet sürekliliğine kadar tüm ITSM döngüsünü dijitalleştirir; hizmet kalitesini ölçer ve sürekli iyileştirmeyi kanıtlarıyla yönetirsiniz.",
    ],
    features: [
      { title: "Hizmet kataloğu & SLA", desc: "Hizmetlerinizi tanımlayın, seviye hedeflerini ve raporlamayı yönetin." },
      { title: "Olay yönetimi", desc: "BT olaylarını kaydedin, önceliklendirin ve çözüm sürelerini izleyin." },
      { title: "Problem yönetimi", desc: "Tekrarlayan olayların kök nedenini bulun, kalıcı çözümlere bağlayın." },
      { title: "Değişiklik yönetimi", desc: "Değişiklik taleplerini değerlendirin, onaylayın ve kayıt altına alın." },
      { title: "Hizmet sürekliliği & kapasite", desc: "Süreklilik ve kapasite planlarını hizmet hedefleriyle hizalayın." },
      { title: "Ölçüm & sürekli iyileştirme", desc: "Hizmet KPI'larını izleyin, iyileştirme fırsatlarını aksiyona dönüştürün." },
    ],
    audience: "BT hizmeti sağlayan ekipler ve MSP'ler — ISO/IEC 20000 belgesi hedefleyen ya da hizmet yönetimini sistematikleştirmek isteyen kurumlar.",
    standards: ["ISO/IEC 20000-1", "ITIL (uyumlu)"],
    outcomes: ["Hizmet kataloğu & SLA'lar", "Olay & problem kayıtları", "Değişiklik kayıtları", "Hizmet KPI raporları"],
  },
  spice: {
    code: "spice",
    name: "SPICE",
    iso: "ISO/IEC 33000 · ASPICE",
    tagline: { tr: "Süreç Olgunluğu Değerlendirmesi (SPICE)", az: "Proses Yetkinliyi Qiymətləndirməsi (SPICE)", en: "Process Maturity Assessment (SPICE)" },
    quoteOnly: true,
    overview: [
      "SPICE modülü, yazılım ve sistem süreçlerinizi ISO/IEC 33000 ve Automotive SPICE (ASPICE) çerçevesinde değerlendirmenizi sağlar. Süreçleri, yetenek seviyelerini ve boşluk analizini yapılandırılmış biçimde yönetirsiniz.",
      "Değerlendirme öncesi öz-değerlendirmeyi eksiksiz yürütür, süreç göstergeleri ve kanıtlarını merkezî tutar; olgunluk seviyenizi kanıtlarıyla yükseltirsiniz.",
    ],
    features: [
      { title: "Süreç referans modeli", desc: "ASPICE / ISO 33000 süreçlerini kapsam ve sorumluluklarıyla haritalayın." },
      { title: "Yetenek seviyesi değerlendirmesi", desc: "Her süreç için yetenek seviyesini (Level 0-5) yapılandırılmış biçimde ölçün." },
      { title: "Boşluk (gap) analizi", desc: "Mevcut olgunluk ile hedef seviye arasındaki farkı belirleyin." },
      { title: "Süreç göstergeleri & kanıt", desc: "Süreç performans ve yetenek göstergelerini kanıtlarıyla toplayın." },
      { title: "İyileştirme yol haritası", desc: "Eksikleri iyileştirme aksiyonlarına ve sorumlularına bağlayın." },
      { title: "Değerlendirmeye hazırlık", desc: "Resmi değerlendirme öncesi öz-değerlendirmeyi eksiksiz tamamlayın." },
    ],
    audience: "Otomotiv ve gömülü yazılım geliştiren kurumlar — ASPICE / SPICE değerlendirmesi talep edilen ya da hedefleyen ekipler.",
    standards: ["ISO/IEC 33000", "Automotive SPICE (ASPICE)"],
    outcomes: ["Süreç yetenek matrisi", "Boşluk analizi raporu", "Olgunluk seviyesi kayıtları", "İyileştirme yol haritası"],
  },
  egitim: {
    code: "egitim",
    name: "Akademi",
    iso: "Eğitim & Farkındalık",
    tagline: { tr: "Eğitim ve Farkındalık Yönetimi", az: "Təlim və Məlumatlılıq İdarəetməsi", en: "Training & Awareness Management" },
    quoteOnly: true,
    overview: [
      "Akademi modülü, personel eğitim ve farkındalık süreçlerinizi Puki ile bütünleşik yönetmenizi sağlar. Complify Academy eğitim kataloğundan personelinize eğitim atar, tamamlanma ve sertifikaları tek yerden takip edersiniz.",
      "ISO 27001, KVKK ve diğer yönetim sistemlerinin gerektirdiği farkındalık yükümlülüklerini kanıtlarıyla karşılar; kim hangi eğitimi ne zaman tamamladı, denetime hazır biçimde raporlarsınız.",
    ],
    features: [
      { title: "Eğitim kataloğu entegrasyonu", desc: "Complify Academy kataloğundaki eğitimleri Puki içinden görüntüleyin ve seçin." },
      { title: "Personele eğitim atama", desc: "Kişi veya gruplara eğitim atayın; hesaplar otomatik açılır, davet e-postası gider." },
      { title: "Tamamlanma takibi", desc: "Atanan eğitimlerin ilerlemesini ve tamamlanma durumunu izleyin." },
      { title: "Sertifika yönetimi", desc: "Tamamlanan eğitimlerin sertifikalarını senkronize edin ve saklayın." },
      { title: "Farkındalık kanıtı", desc: "Yönetim sistemi denetimleri için eğitim ve farkındalık kayıtlarını hazır tutun." },
      { title: "Ayrı lisanslı modül", desc: "Eğitim ihtiyacı olan kurumlar için isteğe bağlı, ayrı lisanslanan bir modül." },
    ],
    audience: "Personel eğitim ve farkındalık yükümlülüklerini sistematik yönetmek isteyen; yönetim sistemi denetimlerine eğitim kanıtı sunması gereken kurumlar.",
    standards: ["ISO/IEC 27001 (A.6.3 farkındalık)", "KVKK farkındalık", "Genel eğitim yönetimi"],
    outcomes: ["Eğitim atama kayıtları", "Tamamlanma raporları", "Sertifika arşivi", "Farkındalık kanıtları"],
  },
};

export const moduleDetail = (code: string): ModuleDetail | undefined => MODULE_DETAILS[code];
export const allModuleCodes = () => Object.keys(MODULE_DETAILS);

// ---------------- Modül gövde çevirileri (AZ + EN) — TR kaynağı MODULE_DETAILS'te ----------------
export interface ModuleI18n {
  overview?: string[];
  features?: { title: string; desc: string }[];
  audience?: string;
  standards?: string[];
  outcomes?: string[];
}

export const MODULE_I18N: Record<string, Partial<Record<Lang, ModuleI18n>>> = {
  bgys: {
    en: {
      overview: [
        "The ISMS module lets you protect your organization's information assets with a risk-based approach. You inventory your assets, assess your risks and manage ISO/IEC 27001 Annex A controls end to end.",
        "Document, policy, incident and improvement flows come together on one platform; you automatically build the evidence needed for internal audit and management review. You work with a system that's ready for a certification audit.",
      ],
      features: [
        { title: "Asset inventory & classification", desc: "Record information assets with ownership, confidentiality and criticality levels." },
        { title: "Risk assessment & treatment", desc: "Threat/vulnerability analysis with a risk matrix, risk treatment plan and residual risk tracking." },
        { title: "SoA — Statement of Applicability", desc: "Select Annex A controls with justification and track implementation status." },
        { title: "Incident management", desc: "Log and classify information security incidents, link to root cause and action." },
        { title: "Policy & document management", desc: "Keep policies current with versioning, approval and publishing flows." },
        { title: "Internal audit & management review", desc: "Collect audit plans, findings and management review records in one place." },
      ],
      audience: "Small and medium organizations aiming for ISO 27001 certification or wanting to manage information security systematically.",
      standards: ["ISO/IEC 27001", "ISO/IEC 27002 (control guidance)"],
      outcomes: ["Asset & risk inventory", "Statement of Applicability (SoA)", "Risk treatment plan", "Audit & management review evidence"],
    },
    az: {
      overview: [
        "BGYS modulu təşkilatınızın informasiya aktivlərini risk əsaslı yanaşma ilə qorumağa imkan verir. Aktivlərinizi inventarlaşdırır, risklərinizi qiymətləndirir və ISO/IEC 27001 Annex A nəzarətlərini uçdan-uca idarə edirsiniz.",
        "Sənəd, siyasət, hadisə və təkmilləşdirmə axınları vahid platformada birləşir; daxili audit və rəhbərliyin nəzərdən keçirməsi üçün lazım olan sübutu avtomatik toplayırsınız. Sertifikasiya auditinə hazır bir sistemlə işləyirsiniz.",
      ],
      features: [
        { title: "Aktiv inventarı və təsnifatı", desc: "İnformasiya aktivlərini sahiblik, məxfilik və kritiklik səviyyəsi ilə qeydə alın." },
        { title: "Risk qiymətləndirmə və emalı", desc: "Risk matrisi ilə təhlükə/zəiflik təhlili, risk emalı planı və qalıq riskin izlənməsi." },
        { title: "SoA — Tətbiq oluna bilənlik Bəyannaməsi", desc: "Annex A nəzarətlərini əsaslandırma ilə seçin, tətbiq vəziyyətini izləyin." },
        { title: "Hadisə idarəetməsi", desc: "İnformasiya təhlükəsizliyi hadisələrini qeyd edin, təsnif edin, kök səbəb və tədbirə bağlayın." },
        { title: "Siyasət və sənəd idarəetməsi", desc: "Versiya, təsdiq və nəşr axını ilə siyasətləri güncəl saxlayın." },
        { title: "Daxili audit və RNK", desc: "Audit planı, tapıntılar və rəhbərliyin nəzərdən keçirməsi qeydlərini bir yerdə toplayın." },
      ],
      audience: "ISO 27001 sertifikatı hədəfləyən və ya informasiya təhlükəsizliyini sistemli idarə etmək istəyən kiçik və orta ölçülü təşkilatlar.",
      standards: ["ISO/IEC 27001", "ISO/IEC 27002 (nəzarət təlimatı)"],
      outcomes: ["Aktiv və risk inventarı", "Tətbiq oluna bilənlik Bəyannaməsi (SoA)", "Risk emalı planı", "Audit və RNK sübutları"],
    },
  },
  kvys: {
    en: {
      overview: [
        "The PIMS module lets you manage your KVKK (Turkish DPL) obligations and ISO/IEC 27701 (PIMS) requirements under one roof. You inventory your personal data processing activities and record their legal bases and retention periods.",
        "From data subject requests to breach notification, from privacy notices and consent management to disposal processes, it digitizes the entire data protection flow; you keep the evidence needed for registries and audits ready.",
      ],
      features: [
        { title: "Personal data inventory (ROPA)", desc: "Record of processing activities — data category, purpose, legal basis, recipient and retention period." },
        { title: "Privacy notice & explicit consent", desc: "Manage privacy notices and explicit consent records with versioning." },
        { title: "Data subject requests", desc: "Receive requests, track deadlines and store responses with evidence." },
        { title: "Data breach management", desc: "Breach logging, risk assessment and the 72-hour notification process." },
        { title: "Retention & disposal", desc: "Maintain compliance with retention plans and a periodic disposal schedule." },
        { title: "PIMS controls (27701)", desc: "Manage ISO 27701 requirements integrated with your ISMS." },
      ],
      audience: "Organizations that want to run data protection compliance regularly and/or seek ISO 27701 certification.",
      standards: ["Turkish DPL (Law No. 6698)", "ISO/IEC 27701", "ISO/IEC 27001 (baseline)"],
      outcomes: ["Personal data inventory (ROPA)", "Privacy notice & consent records", "Data subject request files", "Breach & disposal evidence"],
    },
    az: {
      overview: [
        "KVYS modulu KVKK öhdəliklərinizi və ISO/IEC 27701 (PIMS) tələblərini vahid çətir altında idarə etməyə imkan verir. Şəxsi məlumatların emalı fəaliyyətlərinizi inventarlaşdırır, hüquqi əsaslarını və saxlanma müddətlərini qeydə alırsınız.",
        "Subyekt müraciətlərindən məlumat pozuntusu bildirişinə, məlumatlandırma və razılıq idarəetməsindən məhv proseslərinə qədər bütün məlumatların qorunması axınını rəqəmsallaşdırır; reyestrlər və auditlər üçün lazım olan sübutu hazır saxlayırsınız.",
      ],
      features: [
        { title: "Şəxsi məlumat inventarı (ROPA)", desc: "Emal fəaliyyətləri qeydi — məlumat kateqoriyası, məqsəd, hüquqi əsas, alıcı və saxlanma müddəti." },
        { title: "Məlumatlandırma və açıq razılıq", desc: "Məlumatlandırma mətnləri və açıq razılıq qeydlərini versiyalı idarə edin." },
        { title: "Subyekt müraciətləri", desc: "Müraciətləri qəbul edin, müddəti izləyin və cavabları sübutu ilə saxlayın." },
        { title: "Məlumat pozuntusu idarəetməsi", desc: "Pozuntu qeydi, risk qiymətləndirməsi və 72 saatlıq bildiriş prosesi." },
        { title: "Saxlanma və məhv", desc: "Saxlanma planları və dövri məhv təqvimi ilə uyğunluğu qoruyun." },
        { title: "PIMS nəzarətləri (27701)", desc: "ISO 27701 tələblərini BGYS ilə inteqrasiya olunmuş idarə edin." },
      ],
      audience: "Məlumatların qorunması uyğunluğunu müntəzəm aparmaq və/və ya ISO 27701 sertifikatı istəyən təşkilatlar.",
      standards: ["KVKK (Qanun № 6698)", "ISO/IEC 27701", "ISO/IEC 27001 (baza)"],
      outcomes: ["Şəxsi məlumat inventarı (ROPA)", "Məlumatlandırma və razılıq qeydləri", "Subyekt müraciət faylları", "Pozuntu və məhv sübutları"],
    },
  },
  isys: {
    en: {
      overview: [
        "The BCMS module makes your critical business processes resilient to disruptions. With a business impact analysis (BIA) you identify your critical processes, recovery objectives (RTO/RPO) and dependencies.",
        "You build business continuity plans (BCP), test them with exercises, and work with ready steps to activate during an incident or crisis. An audit-ready evidence set for ISO 22301 is produced automatically.",
      ],
      features: [
        { title: "Business impact analysis (BIA)", desc: "Analyze critical processes, impacts and acceptable disruption times." },
        { title: "RTO / RPO objectives", desc: "Define recovery time and data loss objectives per process." },
        { title: "Business continuity plans (BCP)", desc: "Manage scenario-based recovery steps, roles and the communication plan." },
        { title: "Exercises & testing", desc: "Test plans with regular exercises, link findings to improvement." },
        { title: "Resource & dependency inventory", desc: "Map critical resources, suppliers and dependencies." },
        { title: "Incident & crisis management", desc: "Log disruption incidents, manage the crisis team and actions." },
      ],
      audience: "Organizations seeking resilience against operational disruptions or targeting ISO 22301.",
      standards: ["ISO 22301"],
      outcomes: ["Business impact analysis (BIA)", "Business continuity plans (BCP)", "Exercise records", "Resource & dependency inventory"],
    },
    az: {
      overview: [
        "İSYS modulu kritik biznes proseslərinizi fasilələrə qarşı dayanıqlı edir. Biznes təsir təhlili (BIA) ilə kritik proseslərinizi, bərpa hədəflərinizi (RTO/RPO) və asılılıqlarınızı müəyyən edirsiniz.",
        "Biznesin fasiləsizliyi planlarını (BCP) qurur, məşqlərlə sınaqdan keçirir və hadisə/böhran anında işə salacağınız hazır addımlarla işləyirsiniz. ISO 22301 auditinə hazır sübut dəsti avtomatik formalaşır.",
      ],
      features: [
        { title: "Biznes təsir təhlili (BIA)", desc: "Kritik prosesləri, təsirləri və qəbul edilə bilən fasilə müddətlərini təhlil edin." },
        { title: "RTO / RPO hədəfləri", desc: "Bərpa vaxtı və məlumat itkisi hədəflərini proses əsasında təyin edin." },
        { title: "Biznesin fasiləsizliyi planları (BCP)", desc: "Ssenari əsaslı bərpa addımlarını, rolları və əlaqə planını idarə edin." },
        { title: "Məşq və test", desc: "Planları müntəzəm məşqlərlə sınayın, tapıntıları təkmilləşdirməyə bağlayın." },
        { title: "Resurs və asılılıq inventarı", desc: "Kritik resursları, təchizatçıları və asılılıqları xəritələyin." },
        { title: "Hadisə və böhran idarəetməsi", desc: "Fasilə hadisələrini qeyd edin, böhran komandasını və tədbirləri idarə edin." },
      ],
      audience: "Əməliyyat fasilələrinə qarşı dayanıqlılıq istəyən və ya ISO 22301 hədəfləyən təşkilatlar.",
      standards: ["ISO 22301"],
      outcomes: ["Biznes təsir təhlili (BIA)", "Biznesin fasiləsizliyi planları (BCP)", "Məşq qeydləri", "Resurs və asılılıq inventarı"],
    },
  },
  yzys: {
    en: {
      overview: [
        "The AIMS module lets you manage your AI systems responsibly and transparently. You inventory the AI systems you use, run impact assessments and keep risks under control.",
        "In line with ISO/IEC 42001 requirements it manages lifecycle, supplier and accountability controls; you turn AI governance into an auditable system.",
      ],
      features: [
        { title: "AI system inventory", desc: "Record the AI systems in use with purpose, data and ownership." },
        { title: "AI impact assessment", desc: "Assess ethical, safety and individual impact in a structured way." },
        { title: "AI risk management", desc: "Identify AI-specific risks, treat them and monitor residual risk." },
        { title: "Transparency & accountability", desc: "Document roles, decisions and oversight controls." },
        { title: "Lifecycle management", desc: "Manage the AI lifecycle from design to decommissioning." },
        { title: "Supplier management", desc: "Assess and monitor third-party AI and model suppliers." },
      ],
      audience: "Organizations that use or develop AI and target responsible AI governance and ISO 42001.",
      standards: ["ISO/IEC 42001"],
      outcomes: ["AI system inventory", "AI impact assessments", "AI risk records", "Governance & supplier evidence"],
    },
    az: {
      overview: [
        "YZYS modulu süni intellekt sistemlərinizi məsuliyyətli və şəffaf şəkildə idarə etməyə imkan verir. İstifadə etdiyiniz Sİ sistemlərini inventarlaşdırır, təsir qiymətləndirməsi aparır və riskləri nəzarətdə saxlayırsınız.",
        "ISO/IEC 42001 tələblərinə uyğun olaraq həyat dövrü, təchizatçı və hesabatlılıq nəzarətlərini idarə edir; Sİ idarəçiliyini auditə yararlı sistemə çevirirsiniz.",
      ],
      features: [
        { title: "Sİ sistem inventarı", desc: "İstifadə olunan Sİ sistemlərini məqsəd, məlumat və sahibliklə qeydə alın." },
        { title: "Sİ təsir qiymətləndirməsi", desc: "Etik, təhlükəsizlik və fərdlərə təsiri strukturlaşdırılmış şəkildə qiymətləndirin." },
        { title: "Sİ risk idarəetməsi", desc: "Sİ-yə xas riskləri müəyyən edin, emal edin və qalıq riski izləyin." },
        { title: "Şəffaflıq və hesabatlılıq", desc: "Rolları, qərarları və nəzarət mexanizmlərini sənədləşdirin." },
        { title: "Həyat dövrü idarəetməsi", desc: "Dizayndan istismardan çıxarmaya qədər Sİ həyat dövrünü idarə edin." },
        { title: "Təchizatçı idarəetməsi", desc: "Üçüncü tərəf Sİ və model təchizatçılarını qiymətləndirin və izləyin." },
      ],
      audience: "Süni intellekt istifadə edən və ya hazırlayan, məsuliyyətli Sİ idarəçiliyi və ISO 42001 hədəfləyən təşkilatlar.",
      standards: ["ISO/IEC 42001"],
      outcomes: ["Sİ sistem inventarı", "Sİ təsir qiymətləndirmələri", "Sİ risk qeydləri", "İdarəçilik və təchizatçı sübutları"],
    },
  },
  qms: {
    en: {
      overview: [
        "The QMS module lets you manage your quality management system end to end in line with ISO 9001. You track your processes, objectives and customer satisfaction indicators on one platform.",
        "From document and record management to nonconformity and corrective actions, from internal audit to management review, it digitizes the entire quality cycle; you run continuous improvement with evidence.",
      ],
      features: [
        { title: "Process management", desc: "Map and track quality processes with inputs/outputs and owners." },
        { title: "Objective & KPI tracking", desc: "Measure quality objectives and performance indicators periodically." },
        { title: "Document & record management", desc: "Keep procedures, instructions and forms current with version/approval flow." },
        { title: "Nonconformity & CAPA", desc: "Log nonconformities, link to root cause analysis and corrective action." },
        { title: "Internal audit", desc: "Manage audit plans, checklists and findings in one place." },
        { title: "Management review", desc: "Automatically collect management review inputs, track decisions and actions." },
      ],
      audience: "Organizations that hold or target ISO 9001 and want to systematize quality management.",
      standards: ["ISO 9001"],
      outcomes: ["Process inventory", "Quality objectives & KPIs", "Nonconformity & CAPA records", "Audit & management review evidence"],
    },
    az: {
      overview: [
        "QMS modulu keyfiyyət idarəetmə sisteminizi ISO 9001-ə uyğun uçdan-uca idarə etməyə imkan verir. Proseslərinizi, hədəflərinizi və müştəri məmnuniyyəti göstəricilərinizi vahid platformada izləyirsiniz.",
        "Sənəd və qeyd idarəetməsindən uyğunsuzluq və düzəldici fəaliyyətlərə, daxili auditdən rəhbərliyin nəzərdən keçirməsinə qədər bütün keyfiyyət dövrünü rəqəmsallaşdırır; davamlı təkmilləşdirməni sübutlarla aparırsınız.",
      ],
      features: [
        { title: "Proses idarəetməsi", desc: "Keyfiyyət proseslərini giriş/çıxış və məsullarla xəritələyin və izləyin." },
        { title: "Hədəf və KPI izləmə", desc: "Keyfiyyət hədəflərini və performans göstəricilərini dövri ölçün." },
        { title: "Sənəd və qeyd idarəetməsi", desc: "Prosedur, təlimat və formaları versiya/təsdiq axını ilə güncəl saxlayın." },
        { title: "Uyğunsuzluq və DÖF", desc: "Uyğunsuzluqları qeyd edin, kök səbəb təhlili və düzəldici fəaliyyətə bağlayın." },
        { title: "Daxili audit", desc: "Audit planı, sual siyahıları və tapıntıları bir yerdə idarə edin." },
        { title: "Rəhbərliyin nəzərdən keçirməsi", desc: "RNK girişlərini avtomatik toplayın, qərar və tədbirləri izləyin." },
      ],
      audience: "ISO 9001 sertifikatı olan və ya hədəfləyən; keyfiyyət idarəetməsini sistemləşdirmək istəyən təşkilatlar.",
      standards: ["ISO 9001"],
      outcomes: ["Proses inventarı", "Keyfiyyət hədəfləri və KPI-lar", "Uyğunsuzluq və DÖF qeydləri", "Audit və RNK sübutları"],
    },
  },
  tisax: {
    en: {
      overview: [
        "The TISAX module helps you prepare for the TISAX (VDA ISA) assessment required in the automotive supply chain. You manage the VDA ISA control catalog, maturity levels and gap analysis in a structured way.",
        "It tracks information security, prototype protection and data protection requirements on one platform; you close gaps before the assessment and keep your evidence ready.",
      ],
      features: [
        { title: "VDA ISA control catalog", desc: "Assess and track controls with maturity levels." },
        { title: "Gap analysis", desc: "Identify the gap between the current state and the target level." },
        { title: "Maturity level tracking", desc: "Measure the maturity score and progress for each control." },
        { title: "Prototype & data protection", desc: "Manage high-protection requirements separately." },
        { title: "Action & evidence management", desc: "Link gaps to actions and keep evidence centralized." },
        { title: "Assessment readiness", desc: "Complete the self-assessment fully before the assessment." },
      ],
      audience: "Automotive OEMs and suppliers — organizations required to hold or targeting a TISAX label.",
      standards: ["TISAX", "VDA ISA", "ISO/IEC 27001 (baseline)"],
      outcomes: ["VDA ISA self-assessment", "Gap analysis report", "Maturity level records", "Action & evidence files"],
    },
    az: {
      overview: [
        "TISAX modulu avtomobil təchizat zəncirində tələb olunan TISAX (VDA ISA) qiymətləndirməsinə hazırlaşmağa kömək edir. VDA ISA nəzarət kataloqunu, yetkinlik səviyyələrini və boşluq təhlilini strukturlaşdırılmış şəkildə idarə edirsiniz.",
        "İnformasiya təhlükəsizliyi, prototip qorunması və məlumatların qorunması tələblərini vahid platformada izləyir; qiymətləndirmədən əvvəl boşluqlarınızı bağlayıb sübutlarınızı hazır saxlayırsınız.",
      ],
      features: [
        { title: "VDA ISA nəzarət kataloqu", desc: "Nəzarətləri yetkinlik səviyyələri ilə qiymətləndirin və izləyin." },
        { title: "Boşluq (gap) təhlili", desc: "Mövcud vəziyyət ilə hədəf səviyyə arasındakı fərqi müəyyən edin." },
        { title: "Yetkinlik səviyyəsi izləmə", desc: "Hər nəzarət üçün yetkinlik balını və inkişafı ölçün." },
        { title: "Prototip və məlumat qorunması", desc: "Yüksək qorunma tələb edən tələbləri ayrıca idarə edin." },
        { title: "Tədbir və sübut idarəetməsi", desc: "Boşluqları tədbirə bağlayın, sübutları mərkəzi saxlayın." },
        { title: "Qiymətləndirməyə hazırlıq", desc: "Qiymətləndirmədən əvvəl öz-qiymətləndirməni tam tamamlayın." },
      ],
      audience: "Avtomobil OEM və təchizatçıları — TISAX etiketi tələb olunan və ya hədəfləyən təşkilatlar.",
      standards: ["TISAX", "VDA ISA", "ISO/IEC 27001 (baza)"],
      outcomes: ["VDA ISA öz-qiymətləndirməsi", "Boşluq təhlili hesabatı", "Yetkinlik səviyyəsi qeydləri", "Tədbir və sübut faylları"],
    },
  },
  soc2: {
    en: {
      overview: [
        "The SOC 2 module helps you prepare for the audit in line with the AICPA Trust Services Criteria (TSC). You manage the Security, Availability, Processing Integrity, Confidentiality and Privacy criteria on one platform.",
        "It maps controls to criteria, assigns owners and continuously builds your evidence; you work with a system ready to enter Type I and Type II audits without gaps.",
      ],
      features: [
        { title: "Trust Services Criteria (TSC)", desc: "Map the Security, Availability, Confidentiality, Processing Integrity and Privacy criteria." },
        { title: "Control mapping", desc: "Link your controls to the relevant criteria and track implementation status." },
        { title: "Evidence collection", desc: "Build evidence for each control centrally and audit-ready." },
        { title: "Gap analysis", desc: "Identify the gap between the current state and the SOC 2 target and link to action." },
        { title: "Vendor & subservice organization", desc: "Manage subservice organizations' controls and responsibility boundaries." },
        { title: "Audit readiness", desc: "Keep the records and reports needed for Type I / Type II audits ready." },
      ],
      audience: "SaaS and technology companies — organizations asked for a SOC 2 report by their customers or targeting one.",
      standards: ["SOC 2 (AICPA)", "Trust Services Criteria", "ISO/IEC 27001 (baseline)"],
      outcomes: ["TSC control matrix", "Gap analysis report", "Evidence files", "Audit-ready records"],
    },
    az: {
      overview: [
        "SOC 2 modulu AICPA Etibar Xidmətləri Kriteriyaları (TSC) əsasında auditə hazırlaşmağa kömək edir. Təhlükəsizlik, Əlçatanlıq, Emal Bütövlüyü, Məxfilik və Şəxsi həyat kriteriyalarını vahid platformada idarə edirsiniz.",
        "Nəzarətləri kriteriyalarla uyğunlaşdırır, məsullarını təyin edir və sübutlarınızı davamlı toplayır; Type I və Type II auditlərinə boşluqsuz daxil olmaq üçün hazır sistemlə işləyirsiniz.",
      ],
      features: [
        { title: "Etibar Xidmətləri Kriteriyaları (TSC)", desc: "Security, Availability, Confidentiality, Processing Integrity və Privacy kriteriyalarını xəritələyin." },
        { title: "Nəzarət uyğunlaşdırma", desc: "Nəzarətlərinizi müvafiq kriteriyalara bağlayın, tətbiq vəziyyətini izləyin." },
        { title: "Sübut toplama", desc: "Hər nəzarət üçün sübutları mərkəzi və auditə hazır toplayın." },
        { title: "Boşluq (gap) təhlili", desc: "Mövcud vəziyyət ilə SOC 2 hədəfi arasındakı fərqi müəyyən edib tədbirə bağlayın." },
        { title: "Təchizatçı və alt-xidmət təşkilatı", desc: "Alt-xidmət təchizatçılarının nəzarətlərini və məsuliyyət sərhədini idarə edin." },
        { title: "Auditə hazırlıq", desc: "Type I / Type II auditi üçün lazım olan qeyd və hesabatları hazır saxlayın." },
      ],
      audience: "SaaS və texnologiya şirkətləri — müştərilərindən SOC 2 hesabatı tələb olunan və ya hədəfləyən təşkilatlar.",
      standards: ["SOC 2 (AICPA)", "Trust Services Criteria", "ISO/IEC 27001 (baza)"],
      outcomes: ["TSC nəzarət matrisi", "Boşluq təhlili hesabatı", "Sübut faylları", "Auditə hazır qeydlər"],
    },
  },
  itsm: {
    en: {
      overview: [
        "The ITSM module lets you manage your IT service management system in line with ISO/IEC 20000-1. You run the service catalog, service level agreements (SLA) and service processes on one platform.",
        "From incident, problem and change management to service continuity, it digitizes the entire ITSM cycle; you measure service quality and manage continuous improvement with evidence.",
      ],
      features: [
        { title: "Service catalog & SLA", desc: "Define your services, manage level targets and reporting." },
        { title: "Incident management", desc: "Log IT incidents, prioritize them and track resolution times." },
        { title: "Problem management", desc: "Find the root cause of recurring incidents, link to permanent solutions." },
        { title: "Change management", desc: "Assess, approve and record change requests." },
        { title: "Service continuity & capacity", desc: "Align continuity and capacity plans with service targets." },
        { title: "Measurement & continuous improvement", desc: "Track service KPIs, turn improvement opportunities into action." },
      ],
      audience: "IT service teams and MSPs — organizations targeting ISO/IEC 20000 or wanting to systematize service management.",
      standards: ["ISO/IEC 20000-1", "ITIL (aligned)"],
      outcomes: ["Service catalog & SLAs", "Incident & problem records", "Change records", "Service KPI reports"],
    },
    az: {
      overview: [
        "ITSM modulu İT xidmət idarəetmə sisteminizi ISO/IEC 20000-1-ə uyğun idarə etməyə imkan verir. Xidmət kataloqu, xidmət səviyyəsi razılaşmaları (SLA) və xidmət proseslərini vahid platformada aparırsınız.",
        "Hadisə, problem və dəyişiklik idarəetməsindən xidmət fasiləsizliyinə qədər bütün ITSM dövrünü rəqəmsallaşdırır; xidmət keyfiyyətini ölçür və davamlı təkmilləşdirməni sübutlarla idarə edirsiniz.",
      ],
      features: [
        { title: "Xidmət kataloqu və SLA", desc: "Xidmətlərinizi təyin edin, səviyyə hədəflərini və hesabatlılığı idarə edin." },
        { title: "Hadisə idarəetməsi", desc: "İT hadisələrini qeyd edin, prioritetləşdirin və həll müddətlərini izləyin." },
        { title: "Problem idarəetməsi", desc: "Təkrarlanan hadisələrin kök səbəbini tapın, daimi həllərə bağlayın." },
        { title: "Dəyişiklik idarəetməsi", desc: "Dəyişiklik tələblərini qiymətləndirin, təsdiqləyin və qeydə alın." },
        { title: "Xidmət fasiləsizliyi və tutum", desc: "Fasiləsizlik və tutum planlarını xidmət hədəfləri ilə uyğunlaşdırın." },
        { title: "Ölçmə və davamlı təkmilləşdirmə", desc: "Xidmət KPI-larını izləyin, təkmilləşdirmə imkanlarını tədbirə çevirin." },
      ],
      audience: "İT xidməti göstərən komandalar və MSP-lər — ISO/IEC 20000 hədəfləyən və ya xidmət idarəetməsini sistemləşdirmək istəyən təşkilatlar.",
      standards: ["ISO/IEC 20000-1", "ITIL (uyğun)"],
      outcomes: ["Xidmət kataloqu və SLA-lar", "Hadisə və problem qeydləri", "Dəyişiklik qeydləri", "Xidmət KPI hesabatları"],
    },
  },
  spice: {
    en: {
      overview: [
        "The SPICE module lets you assess your software and system processes within the ISO/IEC 33000 and Automotive SPICE (ASPICE) framework. You manage processes, capability levels and gap analysis in a structured way.",
        "It runs the self-assessment fully before the assessment, keeps process indicators and evidence centralized; you raise your maturity level with evidence.",
      ],
      features: [
        { title: "Process reference model", desc: "Map ASPICE / ISO 33000 processes with scope and responsibilities." },
        { title: "Capability level assessment", desc: "Measure the capability level (Level 0-5) for each process in a structured way." },
        { title: "Gap analysis", desc: "Identify the gap between the current maturity and the target level." },
        { title: "Process indicators & evidence", desc: "Collect process performance and capability indicators with evidence." },
        { title: "Improvement roadmap", desc: "Link gaps to improvement actions and owners." },
        { title: "Assessment readiness", desc: "Complete the self-assessment fully before the formal assessment." },
      ],
      audience: "Organizations developing automotive and embedded software — teams required to undergo or targeting an ASPICE / SPICE assessment.",
      standards: ["ISO/IEC 33000", "Automotive SPICE (ASPICE)"],
      outcomes: ["Process capability matrix", "Gap analysis report", "Maturity level records", "Improvement roadmap"],
    },
    az: {
      overview: [
        "SPICE modulu proqram təminatı və sistem proseslərinizi ISO/IEC 33000 və Automotive SPICE (ASPICE) çərçivəsində qiymətləndirməyə imkan verir. Prosesləri, qabiliyyət səviyyələrini və boşluq təhlilini strukturlaşdırılmış şəkildə idarə edirsiniz.",
        "Qiymətləndirmədən əvvəl öz-qiymətləndirməni tam aparır, proses göstəriciləri və sübutlarını mərkəzi saxlayır; yetkinlik səviyyənizi sübutlarla yüksəldirsiniz.",
      ],
      features: [
        { title: "Proses istinad modeli", desc: "ASPICE / ISO 33000 proseslərini əhatə və məsuliyyətlərlə xəritələyin." },
        { title: "Qabiliyyət səviyyəsi qiymətləndirməsi", desc: "Hər proses üçün qabiliyyət səviyyəsini (Level 0-5) strukturlaşdırılmış şəkildə ölçün." },
        { title: "Boşluq (gap) təhlili", desc: "Mövcud yetkinlik ilə hədəf səviyyə arasındakı fərqi müəyyən edin." },
        { title: "Proses göstəriciləri və sübut", desc: "Proses performans və qabiliyyət göstəricilərini sübutlarla toplayın." },
        { title: "Təkmilləşdirmə yol xəritəsi", desc: "Boşluqları təkmilləşdirmə tədbirlərinə və məsullara bağlayın." },
        { title: "Qiymətləndirməyə hazırlıq", desc: "Rəsmi qiymətləndirmədən əvvəl öz-qiymətləndirməni tam tamamlayın." },
      ],
      audience: "Avtomobil və gömülü proqram təminatı hazırlayan təşkilatlar — ASPICE / SPICE qiymətləndirməsi tələb olunan və ya hədəfləyən komandalar.",
      standards: ["ISO/IEC 33000", "Automotive SPICE (ASPICE)"],
      outcomes: ["Proses qabiliyyət matrisi", "Boşluq təhlili hesabatı", "Yetkinlik səviyyəsi qeydləri", "Təkmilləşdirmə yol xəritəsi"],
    },
  },
  egitim: {
    en: {
      overview: [
        "The Academy module lets you manage staff training and awareness processes integrated with Puki. You assign trainings to your staff from the Complify Academy catalog and track completion and certificates in one place.",
        "It meets the awareness obligations required by ISO 27001, KVKK and other management systems with evidence; you report who completed which training and when, audit-ready.",
      ],
      features: [
        { title: "Training catalog integration", desc: "View and select trainings from the Complify Academy catalog inside Puki." },
        { title: "Assign training to staff", desc: "Assign trainings to people or groups; accounts open automatically and an invite email is sent." },
        { title: "Completion tracking", desc: "Track the progress and completion status of assigned trainings." },
        { title: "Certificate management", desc: "Sync and store certificates of completed trainings." },
        { title: "Awareness evidence", desc: "Keep training and awareness records ready for management system audits." },
        { title: "Separately licensed module", desc: "An optional, separately licensed module for organizations that need training." },
      ],
      audience: "Organizations that want to manage staff training and awareness obligations systematically and need to present training evidence in management system audits.",
      standards: ["ISO/IEC 27001 (A.6.3 awareness)", "KVKK awareness", "General training management"],
      outcomes: ["Training assignment records", "Completion reports", "Certificate archive", "Awareness evidence"],
    },
    az: {
      overview: [
        "Akademiya modulu işçi təlimi və məlumatlılıq proseslərinizi Puki ilə inteqrasiya olunmuş idarə etməyə imkan verir. Complify Academy təlim kataloqundan işçilərinizə təlim təyin edir, tamamlanma və sertifikatları bir yerdən izləyirsiniz.",
        "ISO 27001, KVKK və digər idarəetmə sistemlərinin tələb etdiyi məlumatlılıq öhdəliklərini sübutlarla qarşılayır; kim hansı təlimi nə vaxt tamamladı, auditə hazır şəkildə hesabat verirsiniz.",
      ],
      features: [
        { title: "Təlim kataloqu inteqrasiyası", desc: "Complify Academy kataloqundakı təlimləri Puki daxilində görün və seçin." },
        { title: "İşçiyə təlim təyini", desc: "Şəxs və ya qruplara təlim təyin edin; hesablar avtomatik açılır, dəvət e-poçtu göndərilir." },
        { title: "Tamamlanma izləmə", desc: "Təyin olunmuş təlimlərin gedişatını və tamamlanma vəziyyətini izləyin." },
        { title: "Sertifikat idarəetməsi", desc: "Tamamlanmış təlimlərin sertifikatlarını sinxronlaşdırın və saxlayın." },
        { title: "Məlumatlılıq sübutu", desc: "İdarəetmə sistemi auditləri üçün təlim və məlumatlılıq qeydlərini hazır saxlayın." },
        { title: "Ayrıca lisenziyalı modul", desc: "Təlim ehtiyacı olan təşkilatlar üçün istəyə bağlı, ayrıca lisenziyalanan modul." },
      ],
      audience: "İşçi təlimi və məlumatlılıq öhdəliklərini sistemli idarə etmək istəyən; idarəetmə sistemi auditlərinə təlim sübutu təqdim etməli olan təşkilatlar.",
      standards: ["ISO/IEC 27001 (A.6.3 məlumatlılıq)", "KVKK məlumatlılıq", "Ümumi təlim idarəetməsi"],
      outcomes: ["Təlim təyini qeydləri", "Tamamlanma hesabatları", "Sertifikat arxivi", "Məlumatlılıq sübutları"],
    },
  },
};

export interface FlatModule {
  code: string;
  name: string;
  iso: string;
  quoteOnly?: boolean;
  tagline: string;
  overview: string[];
  features: { title: string; desc: string }[];
  audience: string;
  standards: string[];
  outcomes: string[];
}

// Modülü seçili dile göre düz metin döndürür; çevrilmeyen alan TR'ye düşer.
export function localizedModule(code: string, lang: Lang): FlatModule | undefined {
  const d = MODULE_DETAILS[code];
  if (!d) return undefined;
  const tx = MODULE_I18N[code]?.[lang];
  return {
    code: d.code,
    name: d.name,
    iso: d.iso,
    quoteOnly: d.quoteOnly,
    tagline: d.tagline[lang] ?? d.tagline.tr,
    overview: tx?.overview ?? d.overview,
    features: tx?.features ?? d.features,
    audience: tx?.audience ?? d.audience,
    standards: tx?.standards ?? d.standards,
    outcomes: tx?.outcomes ?? d.outcomes,
  };
}

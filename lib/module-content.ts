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
  tagline: string;
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
    tagline: "Bilgi Güvenliği Yönetim Sistemi (ISMS)",
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
    tagline: "Kişisel Veri Yönetim Sistemi (PIMS)",
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
    tagline: "İş Sürekliliği Yönetim Sistemi",
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
    tagline: "Yapay Zekâ Yönetim Sistemi",
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
    tagline: "Kalite Yönetim Sistemi (QMS)",
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
    tagline: "Otomotiv Bilgi Güvenliği Değerlendirmesi (TISAX)",
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
    tagline: "SOC 2 Güven Hizmetleri Uyumu",
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
    tagline: "BT Hizmet Yönetim Sistemi (ITSM)",
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
    tagline: "Süreç Olgunluğu Değerlendirmesi (SPICE)",
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
    tagline: "Eğitim ve Farkındalık Yönetimi",
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

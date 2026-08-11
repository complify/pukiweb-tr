import LegalLayout from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Kullanım Koşulları — Puki" };

export default function Page() {
  return (
    <LegalLayout
      title="Kullanım Koşulları"
      intro="Puki web sitesini ve hizmetlerini kullanımınıza ilişkin şartlar."
    >
      <h2>1. Taraflar ve Kapsam</h2>
      <p>Bu kullanım koşulları, <strong>{COMPANY.legalName}</strong> tarafından işletilen {COMPANY.website} web sitesi ve Puki hizmetlerinin kullanımını düzenler. Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.</p>

      <h2>2. Hizmetin Tanımı</h2>
      <p>Puki; bilgi güvenliği (ISO 27001), kişisel veri (KVKK/ISO 27701), iş sürekliliği (ISO 22301), yapay zekâ yönetimi (ISO 42001) ve ilgili diğer yönetim sistemleri için bulut tabanlı (SaaS) bir GRC platformudur. Hizmet, seçilen modüller ve kullanıcı sayısı kapsamında abonelik olarak sunulur.</p>

      <h2>3. Hesap ve Güvenlik</h2>
      <ul>
        <li>Hesap bilgilerinizin gizliliğinden ve hesabınız altında yapılan işlemlerden siz sorumlusunuz.</li>
        <li>Doğru, güncel ve eksiksiz bilgi vermeyi kabul edersiniz.</li>
        <li>Yetkisiz kullanım fark ederseniz derhal bize bildirmelisiniz.</li>
      </ul>

      <h2>4. Kabul Edilebilir Kullanım</h2>
      <p>Hizmeti hukuka aykırı amaçlarla, üçüncü kişilerin haklarını ihlal edecek şekilde veya sistemin güvenliğini/işleyişini tehlikeye atacak biçimde kullanamazsınız.</p>

      <h2>5. Ücretler ve Abonelik</h2>
      <p>Ücretler, sitede belirtilen güncel fiyatlandırmaya göre alınır. Aboneliğiniz, seçtiğiniz döneme (aylık/yıllık) göre yürütülür. Fiyat değişiklikleri yürürlükteki abonelik dönemini etkilemez.</p>

      <h2>6. Fikri Mülkiyet</h2>
      <p>Site ve hizmete ilişkin tüm haklar (yazılım, tasarım, marka, içerik) {COMPANY.legalName}’ye aittir. Size, hizmeti abonelik süresince kullanmanız için sınırlı, devredilemez bir kullanım hakkı tanınır.</p>

      <h2>7. Sorumluluğun Sınırlandırılması</h2>
      <p>Hizmet “olduğu gibi” sunulur. Mevzuatın izin verdiği ölçüde, dolaylı zararlardan sorumlu değiliz. Hizmetin kesintisiz veya hatasız olacağını garanti etmemekle birlikte, sürekliliği için makul çabayı gösteririz.</p>

      <h2>8. Değişiklikler ve Uygulanacak Hukuk</h2>
      <p>Bu koşulları güncelleyebiliriz; güncel sürüm bu sayfada yayımlanır. İşbu koşullara Türkiye Cumhuriyeti hukuku uygulanır; uyuşmazlıklarda Bursa Mahkemeleri ve İcra Daireleri yetkilidir.</p>

      <h2>9. İletişim</h2>
      <p>Sorularınız için: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · {COMPANY.phone}</p>
    </LegalLayout>
  );
}

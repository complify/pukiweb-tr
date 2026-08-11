import LegalLayout from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Gizlilik Politikası — Puki" };

export default function Page() {
  return (
    <LegalLayout
      title="Gizlilik Politikası"
      intro="Kişisel verilerinizin ve bilgilerinizin gizliliğini nasıl koruduğumuzu açıklar."
    >
      <h2>1. Genel</h2>
      <p><strong>{COMPANY.legalName}</strong> olarak kullanıcılarımızın gizliliğine önem veriyoruz. Bu politika, sitemiz ve hizmetlerimiz aracılığıyla topladığımız bilgileri, bunları nasıl kullandığımızı ve koruduğumuzu açıklar. Kişisel verilerin işlenmesine ilişkin detaylı bilgiye <a href="/aydinlatma-metni">Aydınlatma Metni</a>’nden ulaşabilirsiniz.</p>

      <h2>2. Topladığımız Bilgiler</h2>
      <ul>
        <li>Hesap ve sipariş sırasında verdiğiniz kimlik, iletişim ve şirket bilgileri,</li>
        <li>Ödeme ve fatura bilgileri (kart bilgileri tarafımızca saklanmaz),</li>
        <li>Site kullanımına ilişkin teknik veriler (IP, log, çerez).</li>
      </ul>

      <h2>3. Bilgilerin Kullanımı</h2>
      <p>Bilgilerinizi; hizmeti sunmak, siparişleri ve ödemeleri yönetmek, yasal yükümlülükleri yerine getirmek, güvenliği sağlamak ve hizmeti iyileştirmek amacıyla kullanırız. Onay vermediğiniz sürece pazarlama amaçlı ileti göndermeyiz.</p>

      <h2>4. Veri Güvenliği</h2>
      <p>Verilerinizi yetkisiz erişime karşı korumak için idari ve teknik tedbirler uygularız (erişim kontrolü, şifreleme, günlükleme vb.). Ödeme işlemleri, PCI-DSS uyumlu iyzico altyapısı üzerinden gerçekleştirilir.</p>

      <h2>5. Veri Bölgesi</h2>
      <p>Hesabınızın hangi bölgede (Türkiye veya Avrupa Birliği) barındırılacağını satın alma sırasında siz seçersiniz; verileriniz seçtiğiniz bölgede tutulur.</p>

      <h2>6. Üçüncü Taraflar</h2>
      <p>Bilgilerinizi yalnızca hizmetin sağlanması için gerekli olan tedarikçilerle (ödeme, barındırma, e-posta) ve yasal olarak zorunlu hallerde yetkili mercilerle paylaşırız. Bilgilerinizi satmayız.</p>

      <h2>7. Haklarınız ve İletişim</h2>
      <p>KVKK kapsamındaki haklarınızı kullanmak veya gizlilikle ilgili sorularınız için <a href={`mailto:${COMPANY.kvkkEmail}`}>{COMPANY.kvkkEmail}</a> adresine yazabilirsiniz.</p>
    </LegalLayout>
  );
}

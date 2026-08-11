import LegalLayout from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Aydınlatma Metni — Puki" };

export default function Page() {
  return (
    <LegalLayout
      title="Kişisel Verilerin Korunması Aydınlatma Metni"
      intro="6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizin işlenmesine ilişkin aydınlatma metni."
    >
      <h2>1. Veri Sorumlusu</h2>
      <p>
        Kişisel verileriniz, veri sorumlusu sıfatıyla <strong>{COMPANY.legalName}</strong> (“Puki”, “Şirket”) tarafından,
        6698 sayılı KVKK ve ilgili mevzuata uygun olarak işlenmektedir. İletişim: {COMPANY.address}, Tel: {COMPANY.phone},
        E-posta: {COMPANY.email}.
      </p>

      <h2>2. İşlenen Kişisel Veriler</h2>
      <p>Hizmetlerimizi sunarken aşağıdaki kişisel veri kategorilerini işleyebiliriz:</p>
      <ul>
        <li><strong>Kimlik:</strong> ad, soyad; fatura için gerektiğinde T.C. kimlik/vergi numarası.</li>
        <li><strong>İletişim:</strong> e-posta, telefon, adres.</li>
        <li><strong>Müşteri/İşlem:</strong> şirket unvanı, sipariş ve abonelik bilgileri, seçilen modüller.</li>
        <li><strong>Finans:</strong> ödeme, işlem tutarı ve fatura bilgileri (kart verileri Şirket tarafından saklanmaz; ödeme altyapısı sağlayıcısı iyzico tarafından işlenir).</li>
        <li><strong>İşlem Güvenliği:</strong> IP adresi, log kayıtları, çerez verileri.</li>
      </ul>

      <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
      <ul>
        <li>Üyelik ve hesap oluşturma, hizmetin sağlanması ve yönetimi,</li>
        <li>Sözleşmenin kurulması ve ifası, sipariş ve ödeme süreçlerinin yürütülmesi,</li>
        <li>Faturalandırma ve muhasebe/hukuki yükümlülüklerin yerine getirilmesi,</li>
        <li>Müşteri destek ve iletişim faaliyetlerinin yürütülmesi,</li>
        <li>Bilgi güvenliği, dolandırıcılığın önlenmesi ve hizmet iyileştirme.</li>
      </ul>

      <h2>4. Hukuki Sebepler (KVKK m.5)</h2>
      <p>Kişisel verileriniz; bir sözleşmenin kurulması veya ifası için gerekli olması, hukuki yükümlülüğün yerine getirilmesi, bir hakkın tesisi/kullanılması/korunması ve Şirketimizin meşru menfaatleri hukuki sebeplerine dayanılarak; gerekli hallerde açık rızanıza istinaden işlenir.</p>

      <h2>5. Kişisel Verilerin Aktarılması</h2>
      <p>Kişisel verileriniz; hizmetin sağlanması amacıyla ödeme kuruluşları (iyzico), barındırma/altyapı sağlayıcıları, e-posta ve yetkili kamu kurum ve kuruluşlarına, mevzuata uygun olarak ve gerekli güvenlik tedbirleri alınarak aktarılabilir. Verilerinizin saklandığı bölgeyi (Türkiye veya Avrupa Birliği) satın alma sırasında siz belirlersiniz.</p>

      <h2>6. Saklama Süresi</h2>
      <p>Kişisel verileriniz, işlenme amacının gerektirdiği süre ile ilgili mevzuatta öngörülen zamanaşımı ve saklama süreleri boyunca saklanır; sürenin sonunda silinir, yok edilir veya anonim hale getirilir.</p>

      <h2>7. İlgili Kişi Olarak Haklarınız (KVKK m.11)</h2>
      <p>KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt dışında aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini, şartları oluştuğunda silinmesini/yok edilmesini isteme ve bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme, işlenen verilerin analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve zarara uğramanız halinde zararın giderilmesini talep etme haklarına sahipsiniz.</p>

      <h2>8. Başvuru Yöntemi</h2>
      <p>Haklarınıza ilişkin taleplerinizi; kimliğinizi tevsik edici bilgilerle birlikte <a href={`mailto:${COMPANY.kvkkEmail}`}>{COMPANY.kvkkEmail}</a> adresine e-posta ile veya {COMPANY.address} adresine yazılı olarak iletebilirsiniz. Başvurunuz en geç 30 gün içinde sonuçlandırılır. VERBİS Kayıt No: {COMPANY.verbis}.</p>
    </LegalLayout>
  );
}

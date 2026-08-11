import LegalLayout from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Çerez Politikası — Puki" };

export default function Page() {
  return (
    <LegalLayout
      title="Çerez Politikası"
      intro="Bu politika, Puki web sitesinde kullanılan çerezleri ve tercihlerinizi nasıl yönetebileceğinizi açıklar."
    >
      <h2>1. Çerez Nedir?</h2>
      <p>Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını sağlamak, tercihlerinizi hatırlamak ve deneyiminizi iyileştirmek için kullanılır.</p>

      <h2>2. Kullandığımız Çerez Türleri</h2>
      <table>
        <thead>
          <tr><th>Tür</th><th>Amaç</th><th>Onay</th></tr>
        </thead>
        <tbody>
          <tr><td>Zorunlu</td><td>Oturum, güvenlik, temel site işlevleri ve ödeme akışı.</td><td>Gerekli (onay aranmaz)</td></tr>
          <tr><td>Tercih/İşlevsel</td><td>Dil, bölge ve arayüz tercihlerinin hatırlanması.</td><td>Onaya bağlı</td></tr>
          <tr><td>Analitik</td><td>Ziyaret istatistikleri ile sitenin iyileştirilmesi.</td><td>Onaya bağlı</td></tr>
          <tr><td>Pazarlama</td><td>İlgi alanına yönelik içerik/tanıtım (kullanılıyorsa).</td><td>Onaya bağlı</td></tr>
        </tbody>
      </table>

      <h2>3. Üçüncü Taraf Çerezleri</h2>
      <p>Ödeme işlemleri sırasında ödeme altyapısı sağlayıcımız iyzico kendi çerezlerini kullanabilir. Site içinde analitik araçlar kullanılması halinde, ilgili sağlayıcının çerezleri de yalnızca onayınızla yüklenir.</p>

      <h2>4. Çerez Tercihlerinizi Yönetme</h2>
      <p>Sitemize ilk girişinizde çıkan çerez bandından “Tümünü kabul et” veya “Sadece zorunlu” seçeneklerini kullanabilirsiniz. Ayrıca tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz; ancak zorunlu çerezleri engellemeniz halinde sitenin bazı bölümleri çalışmayabilir.</p>

      <h2>5. İletişim</h2>
      <p>Çerez uygulamalarımıza ilişkin sorularınız için <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> adresinden bize ulaşabilirsiniz. Kişisel verilerin işlenmesine dair ayrıntılar için <a href="/aydinlatma-metni">Aydınlatma Metni</a>’ni inceleyebilirsiniz.</p>
    </LegalLayout>
  );
}

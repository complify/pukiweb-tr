import LegalLayout from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Ön Bilgilendirme Formu — Puki" };

export default function Page() {
  return (
    <LegalLayout
      title="Ön Bilgilendirme Formu"
      intro="6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında ön bilgilendirme."
    >
      <h2>1. Satıcı Bilgileri</h2>
      <p><strong>{COMPANY.legalName}</strong><br />Adres: {COMPANY.address}<br />Telefon: {COMPANY.phone} · E-posta: {COMPANY.email}<br />MERSİS: {COMPANY.mersis}</p>

      <h2>2. Hizmetin Nitelikleri ve Bedeli</h2>
      <p>Sözleşmeye konu hizmet, Puki bulut GRC platformunun seçilen modüller ve kullanıcı sayısı kapsamında abonelik olarak sunulmasıdır. Hizmetin temel nitelikleri, seçilen abonelik dönemi (aylık/yıllık) ve toplam bedel (varsa vergiler ve indirimler dâhil), ödeme sayfasındaki <strong>sipariş özetinde</strong> gösterilir ve ödemeden önce onayınıza sunulur.</p>

      <h2>3. Ödeme ve Teslim (İfa) Şekli</h2>
      <p>Ödeme, iyzico güvenli ödeme altyapısı üzerinden kredi/banka kartı ile yapılır. Ödeme onaylandıktan sonra siparişiniz değerlendirmeye alınır; onayın ardından hesabınız oluşturulur ve giriş bilgileriniz e-posta ile tarafınıza iletilir (hizmet elektronik ortamda ifa edilir).</p>

      <h2>4. Cayma Hakkı</h2>
      <p>Mesafeli Sözleşmeler Yönetmeliği uyarınca, elektronik ortamda anında ifa edilen hizmetlerde ve tüketicinin onayı ile ifasına başlanan hizmetlerde cayma hakkı bulunmayabilir. Cayma hakkının geçerli olduğu hallerde, hizmetin ifasına başlanmadan önce <strong>14 gün</strong> içinde cayma hakkınızı kullanabilirsiniz. Ayrıntılar <a href="/mesafeli-satis">Mesafeli Satış Sözleşmesi</a>’nde yer alır.</p>

      <h2>5. Şikâyet ve İtiraz</h2>
      <p>Talep ve şikâyetlerinizi {COMPANY.email} adresine iletebilir; uyuşmazlık hâlinde Ticaret Bakanlığınca belirlenen parasal sınırlar dâhilinde Tüketici Hakem Heyetleri veya Tüketici Mahkemelerine başvurabilirsiniz.</p>

      <p className="text-sm text-muted">Bu form, ödeme öncesinde onayınıza sunulur; “Ön bilgilendirme formunu ve mesafeli satış sözleşmesini okudum, onaylıyorum” kutusunu işaretlemeniz hâlinde bilgilendirildiğiniz kabul edilir.</p>
    </LegalLayout>
  );
}

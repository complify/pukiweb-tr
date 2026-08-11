import LegalLayout from "@/components/LegalLayout";
import { COMPANY } from "@/lib/company";

export const metadata = { title: "Mesafeli Satış Sözleşmesi — Puki" };

export default function Page() {
  return (
    <LegalLayout
      title="Mesafeli Satış Sözleşmesi"
      intro="6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında, elektronik ortamda kurulan satış sözleşmesi."
    >
      <h2>1. Taraflar</h2>
      <p><strong>Satıcı:</strong> {COMPANY.legalName} — {COMPANY.address} — Tel: {COMPANY.phone} — E-posta: {COMPANY.email}.</p>
      <p><strong>Alıcı:</strong> Ödeme sırasında bilgilerini beyan eden müşteri (ad, soyad, şirket, e-posta ve iletişim bilgileri sipariş kaydında yer alır).</p>

      <h2>2. Konu</h2>
      <p>İşbu sözleşmenin konusu, Alıcı’nın {COMPANY.website} üzerinden elektronik ortamda sipariş verdiği Puki GRC aboneliğinin (seçilen modüller, kullanıcı sayısı ve dönem) satışı ve ifasına ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>

      <h2>3. Sözleşme Konusu Hizmet ve Bedel</h2>
      <p>Hizmetin temel nitelikleri, seçilen abonelik dönemi ve toplam bedel (varsa indirim ve vergiler dâhil) sipariş özetinde gösterilir. Alıcı, ödeme adımından önce <a href="/on-bilgilendirme">Ön Bilgilendirme Formu</a>’nu ve işbu sözleşmeyi okuyup onayladığını kabul eder.</p>

      <h2>4. Ödeme</h2>
      <p>Ödeme, iyzico güvenli ödeme altyapısı üzerinden yapılır. Kart bilgileri Satıcı tarafından saklanmaz. Ödeme onaylandığında sipariş, Satıcı tarafından değerlendirmeye (onaya) alınır.</p>

      <h2>5. İfa (Teslim)</h2>
      <p>Hizmet, elektronik ortamda ifa edilir. Ödemenin onaylanması ve siparişin Satıcı tarafından onaylanmasının ardından, Alıcı’nın hesabı oluşturulur ve giriş bilgileri e-posta ile iletilir. İfa süresi, mevzuattaki azami süreyi aşmaz.</p>

      <h2>6. Cayma Hakkı</h2>
      <p>Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi uyarınca, elektronik ortamda anında ifa edilen hizmetlere ve Alıcı’nın onayı ile ifasına başlanan hizmetlere ilişkin cayma hakkı kullanılamaz. Cayma hakkının uygulanabildiği hâllerde Alıcı, hizmetin ifasına başlanmadan önce 14 gün içinde, herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkını kullanabilir. Cayma bildirimleri {COMPANY.email} adresine iletilir.</p>

      <h2>7. İptal ve İade</h2>
      <p>Onaylanan ve ifasına başlanan aboneliklerde, ilgili dönem için iade yapılmayabilir. İfaya başlanmadan önce iptal edilen siparişlerde alınan bedel, aynı ödeme yöntemiyle iade edilir. İade süreçleri ödeme kuruluşunun kurallarına tabidir.</p>

      <h2>8. Uyuşmazlık</h2>
      <p>İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığınca ilan edilen parasal sınırlar dâhilinde Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir. İşbu sözleşme, Alıcı tarafından elektronik ortamda onaylandığı tarihte yürürlüğe girer.</p>
    </LegalLayout>
  );
}

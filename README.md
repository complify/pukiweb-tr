# pukiweb-tr — puki.com.tr satış sitesi

Puki GRC ürününün self-service satış sitesi. **Next.js (App Router) + Tailwind.**
Fiyat/promosyon burada yönetilir; GRC ürünü yalnız provizyon yapar.

## Ne var (bu ilk sürüm)
- Modern **landing** (`/`) — hero, modüller, neden Puki.
- **Fiyatlandırma / konfigüratör** (`/fiyatlandirma`) — modül seç + koltuk + aylık/yıllık + promosyon → canlı fiyat. Fiyatlar `lib/catalog.ts`'te.
- **Provizyon orkestrasyon iskeleti** — `lib/provision.ts` (HMAC ile GRC provizyon API çağrısı) + `app/api/provision/route.ts` (onay panelinden tetiklenecek).

## Sonraki adımlar (yapılacak)
- iyzico ödeme entegrasyonu + checkout formu (müşteri/şirket bilgileri).
- Sipariş DB'si (`orders`) + **onay paneli** (ödenen siparişi yetkili onaylayınca `/api/provision` tetiklenir).
- Fiyat/promosyon yönetimi için basit admin (şimdilik `lib/catalog.ts`).

## Çalıştırma (yerel)
```bash
npm install
cp .env.example .env.local   # değerleri doldur
npm run dev                  # http://localhost:3000
```

## Bu repoya push
```bash
git init
git add .
git commit -m "Puki satış sitesi — ilk sürüm (landing + fiyat konfigüratörü + provizyon iskeleti)"
git branch -M main
git remote add origin https://github.com/complify/pukiweb-tr.git
git push -u origin main
```

## Vercel'e deploy
1. Vercel'de **New Project** → `complify/pukiweb-tr` reposunu import et.
2. Framework otomatik **Next.js** algılanır.
3. **Environment Variables** ekle (`.env.example`'daki anahtarlar):
   - `PROVISION_URL_TR`, `PROVISION_URL_EU`
   - `PROVISIONING_API_SECRET` (GRC'deki ile **aynı**)
   - `INTERNAL_API_KEY`
4. Deploy. Sonra `puki.com.tr` domainini Vercel projesine bağla.

## Mimari
```
Müşteri → puki.com.tr (bu site)
  → iyzico ödeme (yakında)
  → sipariş "ödendi" → onay kuyruğu
  → yetkili onayı → /api/provision → lib/provision.ts (HMAC)
      → tr/eu.pukisoft.com /api/provisioning/accounts
          → GRC: org + admin + modül lisansları + hoş geldin maili
```
Fiyat/promosyon: **bu sitede**. Modül→lisans eşlemesi: **GRC'de** (`PukiCatalog`).

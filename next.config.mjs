/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // iyzipay çalışırken kendi 'resources' klasörünü fs ile okuyor.
    // Bundle'a girerse __dirname kayıyor; dışlayınca node_modules'ten çalışır.
    serverComponentsExternalPackages: ["iyzipay"],
    // Vercel serverless fonksiyonuna iyzipay dosyalarını dahil et (nft).
    outputFileTracingIncludes: {
      "/api/checkout/init": ["./node_modules/iyzipay/**/*"],
      "/api/checkout/callback": ["./node_modules/iyzipay/**/*"],
    },
  },
};
export default nextConfig;

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { LangProvider } from "@/components/LangProvider";
import { getLang } from "@/lib/lang-server";

export const metadata: Metadata = {
  title: "Puki — ISO 27001, KVKK, İş Sürekliliği ve YZ Yönetim Sistemleri (GRC SaaS)",
  description:
    "Puki ile BGYS (ISO 27001), KVYS (KVKK & ISO 27701), İSYS (ISO 22301) ve YZYS (ISO 42001) yönetim sistemlerinizi tek platformda yönetin. Küçük işletmeler için bulut GRC.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = getLang();
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <LangProvider lang={lang}>
          <Header lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} />
          <CookieConsent />
        </LangProvider>
      </body>
    </html>
  );
}

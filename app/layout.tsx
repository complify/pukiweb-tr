import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { LangProvider } from "@/components/LangProvider";
import { getLang } from "@/lib/lang-server";
import { getDict } from "@/lib/i18n";

export function generateMetadata(): Metadata {
  const m = getDict(getLang()).meta;
  return { title: m.homeTitle, description: m.homeDesc };
}

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

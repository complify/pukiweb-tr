"use client";

import Script from "next/script";

// GA4 Measurement ID
const GA_ID = "G-0BNH0MXGLR";

/**
 * Google Analytics 4 + Google Consent Mode v2.
 * Varsayılan olarak tüm depolama izinleri "denied". Kullanıcı çerez
 * banner'ında "Tümünü kabul et" derse analytics_storage "granted" olur
 * (bkz. components/CookieConsent.tsx). KVKK/GDPR uyumlu.
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script id="ga-base" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          try {
            var c = JSON.parse(localStorage.getItem('puki_cookie_consent') || 'null');
            if (c && c.choice === 'all') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}

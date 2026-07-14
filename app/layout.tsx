import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
  Tajawal,
} from "next/font/google";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";
import "./globals.css";

const LANG_HEADER = "x-binaa-lang";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
const arabic = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Binaa Labs — Custom Software Studio for the Gulf",
  description:
    "Binaa Labs is a Dubai software studio that moves Gulf businesses fully online — custom web apps, mobile apps, process automation and system integrations, built Arabic-first.",
  keywords: [
    "software studio",
    "Dubai",
    "Gulf",
    "web applications",
    "mobile apps",
    "automation",
    "Arabic-first",
    "Binaa Labs",
  ],
  authors: [{ name: "Binaa Labs" }],
  openGraph: {
    title: "Binaa Labs — Custom Software Studio for the Gulf",
    description:
      "We move your business fully online and automate the busywork — custom-built, launched fast, and yours to keep.",
    siteName: "Binaa Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binaa Labs — Custom Software Studio for the Gulf",
    description:
      "We move your business fully online and automate the busywork — custom-built, launched fast, and yours to keep.",
  },
};

// Organization structured data for richer search results.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Binaa Labs",
  url: SITE_URL,
  description:
    "Dubai software studio building custom web apps, mobile apps, process automation and system integrations, Arabic-first.",
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

// Runs before paint: apply the saved theme and flag JS so reveal styles engage
// without a flash of fully-shown content. Language is set server-side from the
// route (see middleware.ts), so the boot script no longer touches it.
// Also flags an already-seen intro splash (sessionStorage, once per session)
// so repeat loads hide the overlay before paint — no flash, no layout shift.
const bootScript = `(function(){try{var t=localStorage.getItem('binaa-theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add('js');}catch(e){document.documentElement.setAttribute('data-theme','dark');}try{if(sessionStorage.getItem('binaa-splash-seen')==='1'){document.documentElement.classList.add('splash-seen');}}catch(e){}})();`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const lang = requestHeaders.get(LANG_HEADER) === "ar" ? "ar" : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${arabic.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
  Tajawal,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
  ],
};

// Runs before paint: apply the saved theme and flag JS so reveal styles engage
// without a flash of fully-shown content.
const bootScript = `(function(){try{var t=localStorage.getItem('binaa-theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add('js');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${arabic.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

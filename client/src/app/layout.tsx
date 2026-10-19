import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import CookieBanner from "@/components/site/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Colegio Científico de Alajuela (CCAL)",
    template: "%s · CCAL",
  },
  description:
    "Educación científica de excelencia en Costa Rica. Formamos líderes del futuro con valores y conocimiento.",
  keywords: [
    "Colegio Científico",
    "Alajuela",
    "Costa Rica",
    "educación científica",
    "excelencia académica",
    "CCAL",
  ],
  authors: [{ name: "CCAL" }],
  creator: "CCAL",
  publisher: "Colegio Científico de Alajuela",
  icons: {
    icon: [
      { url: '/Logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
  metadataBase: new URL('https://www.ccalajuela.ed.cr'),
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://www.ccalajuela.ed.cr',
    title: 'CCAL - Colegio Científico de Alajuela',
    description: 'Educación científica de excelencia en Costa Rica. Formamos líderes del futuro con valores y conocimiento.',
    siteName: 'Colegio Científico de Alajuela',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CCAL - Colegio Científico de Alajuela',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CCAL - Colegio Científico de Alajuela',
    description: 'Educación científica de excelencia en Costa Rica. Formamos líderes del futuro con valores y conocimiento.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Colegio Científico de Alajuela',
    alternateName: 'CCAL',
    url: 'https://www.ccalajuela.ed.cr',
    logo: 'https://www.ccalajuela.ed.cr/Logo.svg',
    description: 'Educación científica de excelencia en Costa Rica. Formamos líderes del futuro con valores y conocimiento.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Alajuela',
      addressCountry: 'CR',
    },
    sameAs: [
      'https://www.facebook.com/ccalajuela',
      'https://www.instagram.com/ccalajuela',
    ],
  }

  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Saltar al contenido
        </a>
        <GoogleAnalytics />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

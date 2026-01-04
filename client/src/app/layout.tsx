import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CCAL - Colegio Científico de Alajuela",
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
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <LoadingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </LoadingProvider>
      </body>
    </html>
  );
}

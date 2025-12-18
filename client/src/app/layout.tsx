import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CCAL - Colegio Científico de Alajuela",
  description:
    "Educación científica de excelencia en Costa Rica. Formamos líderes del futuro con valores y conocimiento.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LoadingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}

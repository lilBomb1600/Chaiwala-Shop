import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { StructuredData } from "@/components/StructuredData";
import { business } from "@/data/business";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.chaiwalashop.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Authentic Chai & Snacks in Concord, CA`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  keywords: [
    "chaiwala",
    "chai shop Concord",
    "masala chai",
    "kesari chai",
    "Indian snacks Concord CA",
    "vegetarian cafe Concord",
  ],
  openGraph: {
    title: `${business.name} | Authentic Chai & Snacks in Concord, CA`,
    description: business.description,
    url: siteUrl,
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Authentic Chai & Snacks in Concord, CA`,
    description: business.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <StructuredData />
        <Navbar />
        <main id="main-content" className="flex-1 pb-20 sm:pb-0">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <FloatingActions />
      </body>
    </html>
  );
}

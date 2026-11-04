/*
Design contract (source only: design notes never ship in the page HTML).
THESIS: Chaiwala as a chai stall's painted rate board: enamel signboards hung over the real Concord room. Refuses the
cream-and-serif cafe page the first build was, and the near-black cinematic default.
OWN-WORLD: the shop's maroon enamel drenching boards and whole sections; turmeric for letter shade, prices and the
button you press; tea-black night behind the boards; unglazed kullad terracotta. Shrikhand painted display with a
hard sign-painter shade, Anek Latin condensed caps for rate lists and prices, Anek for body. Boards carry an inset
keyline with a painted dot at each corner, dotted leaders and the green veg mark.
STORY: see the real room, learn ten chais at $4.50 / $6.50, build a cup and hear it poured, scan the board, read
regulars, tap Call or Directions.
FIRST VIEWPORT: the room photo full bleed, slow push; a maroon board hung on two cords at right (phones: under the
photo), swinging with scroll and settling; "Take a chai break." in Shrikhand; the turmeric rate line; Make my chai +
Call plates; an open tag hung below, swinging on its own.
FORM: hand-painted shop signboard, candidate 5 of 7, seed ff4ec2c6.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and
every shipping raster carrying its provenance.
*/
import type { Metadata, Viewport } from "next";
import { Anek_Latin, Shrikhand } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ActionBar } from "@/components/ActionBar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { business, siteUrl } from "@/data/business";
import { averageRating, reviewCount } from "@/data/reviews";
import { hhmm, week } from "@/lib/hours";

// Shrikhand: a heavy display face drawn from Gujarati lettering; it paints like a desi shop sign.
const paint = Shrikhand({ variable: "--font-shrikhand", subsets: ["latin"], weight: "400", display: "swap" });
// Anek Latin: an Indian multi-script family with a width axis; condensed caps for the rate board, normal for reading.
const anek = Anek_Latin({ variable: "--font-anek", subsets: ["latin"], axes: ["wdth"], display: "swap" });

const title = `${business.name} | Authentic Chai & Snacks in Concord, CA`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
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
    title,
    description: business.description,
    url: siteUrl,
    siteName: business.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Inside Chaiwala Shop on Salvio St, Concord" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: business.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1a0d0b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: business.name,
  url: siteUrl,
  image: `${siteUrl}/og.jpg`,
  description: business.description,
  telephone: business.phone,
  priceRange: business.priceRange,
  servesCuisine: "Indian",
  hasMenu: `${siteUrl}/menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.line1,
    addressLocality: "Concord",
    addressRegion: "CA",
    postalCode: "94520",
    addressCountry: "US",
  },
  openingHoursSpecification: week.map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d.day,
    opens: hhmm(d.open),
    closes: hhmm(d.close),
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: averageRating,
    reviewCount,
  },
  sameAs: [business.social.instagram, business.social.facebook],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${paint.variable} ${anek.variable} antialiased`}>
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <Nav />
        <main id="main-content" className="overflow-x-clip">
          {children}
        </main>
        <Footer />
        <ActionBar />
      </body>
    </html>
  );
}

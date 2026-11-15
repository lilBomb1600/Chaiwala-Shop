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
import { JsonLd } from "@/components/JsonLd";
import { business } from "@/data/business";
import { siteJsonLd } from "@/lib/seo/jsonld";
import { rootMetadata } from "@/lib/seo/metadata";

// Shrikhand: a heavy display face drawn from Gujarati lettering; it paints like a desi shop sign.
const paint = Shrikhand({ variable: "--font-shrikhand", subsets: ["latin"], weight: "400", display: "swap" });
// Anek Latin: an Indian multi-script family with a width axis; condensed caps for the rate board, normal for reading.
const anek = Anek_Latin({ variable: "--font-anek", subsets: ["latin"], axes: ["wdth"], display: "swap" });

const title = `${business.name} | Authentic Chai & Snacks in Concord, CA`;

// Base URL, robots (noindex while it's an unpaid preview), share card: src/lib/seo (LAUNCH-STANDARD.md).
export const metadata: Metadata = {
  ...rootMetadata({ title, description: business.description }),
  keywords: [
    "chaiwala",
    "chai shop Concord",
    "masala chai",
    "kesari chai",
    "Indian snacks Concord CA",
    "vegetarian cafe Concord",
  ],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1a0d0b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${paint.variable} ${anek.variable} antialiased`}>
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={siteJsonLd()} />
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

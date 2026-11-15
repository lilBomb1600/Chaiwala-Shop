/**
 * SEO kit config for Chaiwala Shop (the only kit file edited for this project).
 *
 * Every value is read from src/data/business.ts (the shop's own boards, Google listing and photos). Nothing is typed
 * here as a new fact. Left out on purpose:
 * - the email and the Instagram/Facebook handles (CONFIRM.md #13, #14: never checked against the shop's accounts),
 * - chaiwalashop.com (CONFIRM.md #15: a different live site; we don't know the shop owns it),
 * - the opening year (CONFIRM.md #11) and any rating or review count (self-serving stars, LAUNCH-STANDARD.md B5).
 */
import { business, siteUrl } from "@/data/business";
import { hhmm, week } from "@/lib/hours";
import type { BusinessFacts, DayOfWeek, Locale, OgImage, PageEntry, ServiceFact } from "./types";

/** The preview URL. On launch: NEXT_PUBLIC_SITE_URL=https://www.the-shops-domain.com in Vercel instead of editing this. */
export const FALLBACK_URL: string = siteUrl;

/** One URL per page, English only. */
export const LOCALES: Locale[] = ["en"];
export const DEFAULT_LOCALE: Locale = "en";

/** public/og.jpg: the shop's own Google photo of the Concord room at 1200 x 630 (public/photos/CREDITS.md). */
export const OG_IMAGE: OgImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `Inside ${business.name} on Salvio St, Concord`,
};

/** "Concord, CA 94520" -> locality, region, postal code. */
const [, locality, region, postalCode] = business.address.line2.match(/^(.+), ([A-Z]{2}) (\d{5})$/) ?? [];

export const facts: BusinessFacts = {
  name: business.name,
  type: "CafeOrCoffeeShop",
  description: business.description,
  telephone: business.phoneHref.replace(/^tel:/, ""),
  // Storefront: the street address on its Google listing.
  address: { street: business.address.line1, locality, region, postalCode },
  serviceArea: [`${locality}, ${region}`],
  image: [OG_IMAGE.url],
  // Google listing hours (business.hours), in schema.org 24h form.
  hours: week.map((d) => ({ days: [d.day as DayOfWeek], opens: hhmm(d.open), closes: hhmm(d.close) })),
  priceRange: business.priceRange,
  menu: "/menu",
  // The data file's own words: "chai ... with vegetarian desi street food" (business.description).
  servesCuisine: ["Indian"],
};

/** A cafe: the menu is the offer, so no Service nodes. */
export const services: ServiceFact[] = [];

/** Every page (used by the live sitemap only; the preview sitemap is empty). */
export const pages: PageEntry[] = [
  { path: "/" },
  { path: "/menu" },
  { path: "/gallery" },
  { path: "/about" },
  { path: "/contact" },
];

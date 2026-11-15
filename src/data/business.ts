// The preview's own URL (canonical, og:url, JSON-LD). Not www.chaiwalashop.com: that is a different live site, and
// whether the shop owns the domain is still open (CONFIRM.md #15). On launch set NEXT_PUBLIC_SITE_URL instead.
export const siteUrl = "https://chaiwala-shop.vercel.app";

export const business = {
  name: "Chaiwala Shop",
  shortName: "Chaiwala",
  tagline: "Experience Authentic Chai",
  established: 2025,
  description:
    "A neighborhood chaiwala on Salvio St in downtown Concord: ten chais, hot or iced, in a clay kullad if you like, with vegetarian desi street food.",
  phone: "(925) 465-6886",
  phoneHref: "tel:+19254656886",
  // CONFIRM: not on any of the shop's boards or listings; kept in data, not shown on the page
  email: "hello@chaiwalashop.com",
  address: {
    line1: "2008 Salvio St",
    line2: "Concord, CA 94520",
    full: "2008 Salvio St, Concord, CA 94520",
  },
  mapsHref: "https://www.google.com/maps/search/?api=1&query=2008+Salvio+St+Concord+CA+94520",
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Chaiwala+Shop%2C+2008+Salvio+St%2C+Concord%2C+CA+94520",
  priceRange: "$10–$20 per person",
  serviceOptions: ["Vegetarian options", "Kids' menu", "Dine-in", "Takeout"],
  /** Google listing hours, Monday first. Times are Concord local (America/Los_Angeles). */
  hours: [
    { day: "Monday", hours: "10:00 AM – 9:00 PM" },
    { day: "Tuesday", hours: "10:00 AM – 9:00 PM" },
    { day: "Wednesday", hours: "10:00 AM – 9:00 PM" },
    { day: "Thursday", hours: "10:00 AM – 9:00 PM" },
    { day: "Friday", hours: "10:00 AM – 10:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 10:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 9:00 PM" },
  ],
  social: {
    // CONFIRM: handles carried over from the first build; not verified against the shop's accounts
    instagram: "https://instagram.com/chaiwalashop",
    facebook: "https://facebook.com/chaiwalashop",
  },
} as const;

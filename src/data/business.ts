export const business = {
  name: "Chaiwala Shop",
  shortName: "Chaiwala",
  tagline: "Experience Authentic Chai",
  established: 2025,
  description:
    "A neighborhood chaiwala serving hand-brewed masala and kesari chai alongside Indian-street-inspired snacks, sandwiches, and Kullad-style comfort food — made fresh, served warm, every single day.",
  phone: "(925) 465-6886",
  phoneHref: "tel:+19254656886",
  email: "hello@chaiwalashop.com",
  address: {
    line1: "2008 Salvio St",
    line2: "Concord, CA 94520",
    full: "2008 Salvio St, Concord, CA 94520",
  },
  mapsHref: "https://www.google.com/maps/search/?api=1&query=2008+Salvio+St+Concord+CA+94520",
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=2008%20Salvio%20St%2C%20Concord%2C%20CA%2094520&output=embed",
  priceRange: "$10–$20 per person",
  serviceOptions: ["Vegetarian options", "Kids' menu", "Dine-in", "Takeout"],
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
    instagram: "https://instagram.com/chaiwalashop",
    facebook: "https://facebook.com/chaiwalashop",
    yelp: "https://www.yelp.com",
  },
} as const;

export function getTodayHoursLabel(): { day: string; hours: string; isToday: boolean }[] {
  return business.hours.map((h) => ({ ...h, isToday: false }));
}

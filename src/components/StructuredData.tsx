import { business } from "@/data/business";
import { averageRating, reviewCount } from "@/data/reviews";

function toOpeningHours() {
  return business.hours.map((h) => {
    const [open, close] = h.hours.split("–").map((t) => t.trim());
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: to24h(open),
      closes: to24h(close),
    };
  });
}

function to24h(time: string) {
  const [t, meridiem] = time.split(" ");
  const [hourStr, minute] = t.split(":");
  let hour = parseInt(hourStr, 10);
  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: business.name,
    description: business.description,
    telephone: business.phone,
    priceRange: business.priceRange,
    servesCuisine: "Indian",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.line1,
      addressLocality: "Concord",
      addressRegion: "CA",
      postalCode: "94520",
      addressCountry: "US",
    },
    openingHoursSpecification: toOpeningHours(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount,
    },
    sameAs: [business.social.instagram, business.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

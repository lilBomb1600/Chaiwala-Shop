import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { business } from "@/data/business";
import { FacebookIcon, InstagramIcon } from "@/components/BrandIcons";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Photos" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Visit" },
];

/** The shop's name painted big across the wall, then the one line everyone needs. */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-maroon pb-28 pt-16 text-enamel md:pb-12 md:pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-multiply [background-image:var(--grain)] [background-size:180px]" />
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
        <p aria-hidden className="paint select-none whitespace-nowrap text-[length:calc((100vw-2rem)/8)] leading-[0.9] text-enamel md:text-[length:calc((100vw-3rem)/8)] lg:text-[length:calc((min(100vw,1440px)-6rem)/8)]">
          Chaiwala <span className="text-turmeric [--shade:var(--maroon-deep)]">Shop</span>
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t-2 border-turmeric/60 pt-8 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
          <div className="text-[1.05rem] leading-relaxed text-enamel/90">
            <p className="rate text-[1.2rem] text-enamel">{business.name}</p>
            <p>{business.address.full}</p>
            <p>Every day from 10 AM. Until 9 PM Sunday to Thursday, 10 PM Friday and Saturday.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rate-wide text-[0.85rem] text-enamel/85 no-underline hover:text-turmeric">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Chaiwala Shop on Instagram"
              className="plate plate-ghost !min-h-11 !w-11 !p-0"
            >
              <InstagramIcon className="h-[18px] w-[18px]" aria-hidden />
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Chaiwala Shop on Facebook"
              className="plate plate-ghost !min-h-11 !w-11 !p-0"
            >
              <FacebookIcon className="h-[18px] w-[18px]" aria-hidden />
            </a>
          </div>
        </div>

        <div id="footer-ctas" className="mt-8 flex flex-wrap gap-3">
          <a href={business.phoneHref} className="plate">
            <Phone size={17} strokeWidth={2.4} aria-hidden /> Call {business.phone}
          </a>
          <a href={business.directionsHref} target="_blank" rel="noopener" className="plate plate-ghost">
            <MapPin size={18} strokeWidth={2.4} aria-hidden /> Directions
          </a>
        </div>

        <p className="mt-10 text-[0.85rem] text-enamel/65">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

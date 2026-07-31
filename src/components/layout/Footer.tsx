import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon } from "@/components/ui/BrandIcons";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const exploreLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-beige bg-espresso text-cream">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="dark" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            {business.description}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Chaiwala Shop on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-saffron hover:text-saffron"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Chaiwala Shop on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-saffron hover:text-saffron"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={business.social.yelp}
              target="_blank"
              rel="noreferrer"
              aria-label="Chaiwala Shop on Yelp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-saffron hover:text-saffron"
            >
              <Star className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-cream/75 transition-colors hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Visit Us
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-cream/75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-light" />
              <a href={business.mapsHref} target="_blank" rel="noreferrer" className="hover:text-cream">
                {business.address.line1}
                <br />
                {business.address.line2}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron-light" />
              <a href={business.phoneHref} className="hover:text-cream">
                {business.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-saffron-light">
            Stay in the Loop
          </h3>
          <p className="mt-5 text-sm text-cream/75">
            New seasonal chai, weekly specials, and first word on events.
          </p>
          <NewsletterForm variant="dark" />
        </div>
      </Container>

      <div className="border-t border-cream/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>{business.address.full}</p>
        </Container>
      </div>
    </footer>
  );
}

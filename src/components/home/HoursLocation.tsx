import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/data/business";

export function HoursLocation() {
  return (
    <section className="bg-cream-dark py-24 sm:py-28">
      <Container className="grid gap-8 lg:grid-cols-2">
        <Reveal className="rounded-3xl bg-white p-8 shadow-sm shadow-espresso/5 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine/10 text-pine">
              <Clock className="h-5 w-5" />
            </span>
            <h3 className="font-display text-2xl font-semibold text-espresso">Business Hours</h3>
          </div>
          <ul className="mt-6 divide-y divide-beige text-sm">
            {business.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between py-3">
                <span className="font-medium text-espresso">{h.day}</span>
                <span className="text-espresso-light">{h.hours}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl shadow-sm shadow-espresso/5">
          <iframe
            title="Chaiwala Shop location on Google Maps"
            src={business.mapsEmbedSrc}
            className="h-72 w-full border-0 sm:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-col gap-4 bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-maroon" />
              <div>
                <p className="font-display text-lg font-semibold text-espresso">Visit Us</p>
                <p className="text-sm text-espresso-light">{business.address.full}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-maroon"
            >
              Get Directions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/data/business";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-maroon py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-saffron blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-cream blur-3xl" />
      </div>
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <Reveal>
          <h2 className="font-display text-balance text-3xl font-semibold text-cream sm:text-4xl lg:text-[2.75rem]">
            Your next cup of chai is a five minute drive away
          </h2>
          <p className="mt-4 text-balance text-lg text-cream/80">
            {business.address.full} · Open until {business.hours[0].hours.split("–")[1].trim()}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-maroon shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <MapPin className="h-4 w-4" />
            Get Directions
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream"
          >
            <Phone className="h-4 w-4" />
            {business.phone}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

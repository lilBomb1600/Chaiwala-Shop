import Link from "next/link";
import { ArrowRight, Leaf, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { galleryImages } from "@/data/gallery";
import { business } from "@/data/business";

const points = [
  { icon: Leaf, label: "100% vegetarian menu" },
  { icon: Sparkles, label: "Hand-brewed chai, never powdered mix" },
  { icon: Users, label: "Kids' menu & family friendly" },
];

const image = galleryImages.find((g) => g.id === "brand-flatlay")!;

export function AboutPreview() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-espresso/15">
          <SmartImage src={image.src} alt={image.alt} ready={image.ready} icon="cup" sizes="560px" />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
            <span className="h-px w-6 bg-saffron" />
            Our Story
          </span>
          <h2 className="font-display text-3xl font-semibold text-balance text-espresso sm:text-4xl">
            A chaiwala&apos;s cup, right here in Concord
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-espresso-light sm:text-lg">
            Chaiwala Shop opened its doors in {business.established} with one goal: bring the warmth of a
            neighborhood tea stall — the kind you&apos;d find on a street corner back home — to
            Concord. Every cup is brewed to order, every snack made fresh, and every visit treated
            like you&apos;re dropping by a friend&apos;s kitchen.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-espresso">{label}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-maroon"
          >
            Read Our Full Story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

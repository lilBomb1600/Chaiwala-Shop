import Link from "next/link";
import { ArrowRight, Coffee } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { menu } from "@/data/menu";

const chai = menu.find((c) => c.id === "chai")!;
const featuredNames = ["Masala Chai", "Kesari Chai", "Rose Chai", "Chai Biscuits"];
const featuredDrinks = featuredNames
  .map((name) => chai.items.find((i) => i.name === name))
  .filter((i): i is NonNullable<typeof i> => Boolean(i));

export function FeaturedDrinks() {
  return (
    <section className="bg-pine py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Featured Drinks"
          title="The chai that started it all"
          description="Hand-brewed in small batches, all day long — this is the counter regulars head straight for."
          light
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDrinks.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col rounded-3xl border border-cream/10 bg-pine-dark/60 p-8 transition-colors hover:border-saffron/40">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron/15 text-saffron-light">
                  <Coffee className="h-6 w-6" />
                </div>
                {item.popular && (
                  <Badge variant="saffron" className="absolute right-6 top-6">
                    Fan Favorite
                  </Badge>
                )}
                <h3 className="mt-6 font-display text-2xl font-semibold text-cream">{item.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/70">{item.description}</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-saffron-light">
                  {item.priceNote ?? item.price}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            href="/menu#chai"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-saffron-light"
          >
            See the Full Drinks Menu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

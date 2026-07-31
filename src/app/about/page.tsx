import type { Metadata } from "next";
import { Coffee, Heart, Leaf, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { business } from "@/data/business";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Chaiwala Shop — a neighborhood chai stall bringing authentic, hand-brewed chai and vegetarian street food to Concord, CA.",
};

const values = [
  {
    icon: Coffee,
    title: "Brewed, Not Mixed",
    description: "Every cup starts from real tea leaves, milk, and whole spices — never a powdered shortcut.",
  },
  {
    icon: Leaf,
    title: "Fully Vegetarian",
    description: "Our entire menu, from Maggi to Kullad pizza, is vegetarian — no exceptions, no substitutions needed.",
  },
  {
    icon: Heart,
    title: "Made Like Home",
    description: "Recipes passed down and perfected — the kind of food meant to be shared, not rushed.",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "A kids' menu and an easygoing space mean the whole family is always welcome at our counter.",
  },
];

const heroImage = galleryImages.find((g) => g.id === "peri-peri-fries")!;
const storyImage = galleryImages.find((g) => g.id === "brand-flatlay")!;

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
              <span className="h-px w-6 bg-saffron" />
              About Us
            </span>
            <h1 className="font-display text-balance text-4xl font-bold text-espresso sm:text-5xl">
              A cup of home, brewed daily in Concord
            </h1>
            <p className="mt-5 text-balance text-lg leading-relaxed text-espresso-light">
              {business.description}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-square overflow-hidden rounded-[2rem] shadow-2xl shadow-espresso/15">
            <SmartImage src={heroImage.src} alt={heroImage.alt} ready={heroImage.ready} icon="photo" sizes="560px" priority />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream-dark py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
              <span className="h-px w-6 bg-saffron" />
              Our Story
            </span>
            <h2 className="font-display text-3xl font-semibold text-balance text-espresso sm:text-4xl">
              From a chaiwala&apos;s cart to a corner of Concord
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-espresso-light sm:text-lg">
              <p>
                Long before it had a storefront, Chaiwala Shop was an idea rooted in something much
                simpler: the corner tea stall. The kind of place where the chai is always brewing,
                where a five-minute stop turns into an hour of conversation, and where everyone —
                regular or first-timer — gets treated like family.
              </p>
              <p>
                We opened our doors in {business.established} at {business.address.line1} with that
                same spirit. Every cup of Masala or Kesari chai is brewed to order, our snacks and
                sandwiches are made fresh through the day, and our Kullad pizzas come out of the
                kitchen the same way they would back home — in a clay pot, piping hot.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative order-1 aspect-[6/5] overflow-hidden rounded-[2rem] shadow-xl shadow-espresso/10 lg:order-2">
            <SmartImage src={storyImage.src} alt={storyImage.alt} ready={storyImage.ready} icon="photo" sizes="560px" />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Mission"
            title="Bring the neighborhood tea stall to Concord"
            description="We want Chaiwala Shop to be the place you stop by without thinking twice — for a quick chai between errands, or a slow evening with friends over Kullad pizza."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 0.08} className="rounded-3xl bg-white p-8 text-center shadow-sm shadow-espresso/5">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pine/10 text-pine">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-espresso">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-light">{description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

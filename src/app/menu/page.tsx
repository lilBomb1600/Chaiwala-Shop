import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { CategorySection } from "@/components/menu/CategorySection";
import { menu } from "@/data/menu";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the full Chaiwala Shop menu — hand-brewed chai, Maggi, sandwiches, Kullad pizza, burgers, and snacks, all vegetarian.",
};

export default function MenuPage() {
  return (
    <div className="bg-cream">
      <section className="bg-cream-dark pb-16 pt-32 sm:pt-40">
        <Container className="text-center">
          <Reveal>
            <span className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
              <span className="h-px w-6 bg-saffron" />
              Our Menu
              <span className="h-px w-6 bg-saffron" />
            </span>
            <h1 className="font-display text-4xl font-bold text-espresso sm:text-5xl">
              Everything, made fresh to order
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-espresso-light">
              {`100% vegetarian · ${business.priceRange} · Kids' menu available`}
            </p>
          </Reveal>
        </Container>
      </section>

      <CategoryNav />

      <Container>
        <div className="divide-y divide-beige">
          {menu.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </div>
  );
}

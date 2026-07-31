import { Reveal } from "@/components/ui/Reveal";
import { MenuItemCard } from "./MenuItemCard";
import type { MenuCategory } from "@/data/menu";

export function CategorySection({ category }: { category: MenuCategory }) {
  return (
    <section id={category.id} className="scroll-mt-40 py-16">
      <Reveal className="mb-10 max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">{category.title}</h2>
        {category.subtitle && <p className="mt-2 text-espresso-light">{category.subtitle}</p>}
      </Reveal>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.06}>
            <MenuItemCard item={item} chaiStyle={category.id === "chai"} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";
import { menu } from "@/data/menu";
import { galleryImages } from "@/data/gallery";

const bestSellers = [
  { item: menu.find((c) => c.id === "sandwiches")!.items.find((i) => i.name === "Tandoori Paneer")!, imageId: "tandoori-paneer-sandwich" },
  { item: menu.find((c) => c.id === "kullad-pizza")!.items.find((i) => i.name === "Kullad Paneer")!, imageId: "kullad-paneer" },
  { item: menu.find((c) => c.id === "snacks")!.items.find((i) => i.name === "Peri Peri Fries")!, imageId: "peri-peri-fries" },
  { item: menu.find((c) => c.id === "maggi")!.items.find((i) => i.name === "Paneer Masala")!, imageId: "corn-masala" },
];

export function BestSellers() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Best Sellers"
            title="What everyone orders twice"
            align="left"
            className="mx-0"
          />
          <Link
            href="/menu"
            className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-maroon"
          >
            See Full Menu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map(({ item, imageId }, i) => {
            const image = galleryImages.find((g) => g.id === imageId)!;
            return (
              <Reveal key={item.name} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-3xl bg-white shadow-sm shadow-espresso/5 transition-shadow hover:shadow-xl hover:shadow-espresso/10">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <SmartImage
                      src={image.src}
                      alt={image.alt}
                      ready={image.ready}
                      icon="photo"
                      sizes="(min-width: 1024px) 280px, 45vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <Badge variant="saffron" className="absolute left-4 top-4">
                      Popular
                    </Badge>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-espresso">{item.name}</h3>
                      <span className="shrink-0 font-display text-lg font-semibold text-maroon">
                        {item.priceNote ?? `$${item.price}`}
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-espresso-light">{item.description}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

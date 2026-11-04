import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHead } from "@/components/PageHead";
import { BoardWall } from "@/components/menu/RateBoards";
import { VegMark } from "@/components/Paint";
import { business } from "@/data/business";
import { itemCount } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The Chaiwala Shop menu with prices: ten chais hot or iced, refreshers, coffee, shakes, Maggi, buns, sandwiches, pizza, kullad pizza, pasta and burgers. All vegetarian.",
};

export default function MenuPage() {
  return (
    <>
      <PageHead
        title="The whole board."
        aside={
          <div className="flex flex-col gap-3 lg:items-end lg:pb-3">
            <p className="flex items-center gap-2 text-enamel/85">
              <VegMark /> {itemCount} items, all vegetarian
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#chai" className="plate">
                Make my chai <ArrowRight size={18} strokeWidth={2.4} aria-hidden />
              </Link>
              <a href={business.phoneHref} className="plate plate-ghost">
                <Phone size={17} strokeWidth={2.4} aria-hidden /> Order by phone
              </a>
            </div>
          </div>
        }
      >
        Every price here is from the two screens over my counter on Salvio St. A kullad (clay cup) is $1 more on any drink,
        and so is soy, almond or oat milk.
      </PageHead>
      <section className="bg-tea pb-24 pt-2">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
          <BoardWall />
        </div>
      </section>
    </>
  );
}

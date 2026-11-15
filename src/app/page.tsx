import { Hero } from "@/components/home/Hero";
import { ChaiBuilder } from "@/components/home/ChaiBuilder";
import { BoardSection, FromCounter, Reviews } from "@/components/home/Sections";
import { Visit } from "@/components/Visit";
import { business } from "@/data/business";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: `${business.name} | Authentic Chai & Snacks in Concord, CA`,
  description: business.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <ChaiBuilder />
      <BoardSection />
      <FromCounter />
      <Reviews />
      <Visit />
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { ChaiBuilder } from "@/components/home/ChaiBuilder";
import { BoardSection, FromCounter, Reviews } from "@/components/home/Sections";
import { Visit } from "@/components/Visit";

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

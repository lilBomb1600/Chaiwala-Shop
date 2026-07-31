import { Hero } from "@/components/home/Hero";
import { FeaturedDrinks } from "@/components/home/FeaturedDrinks";
import { BestSellers } from "@/components/home/BestSellers";
import { Testimonials } from "@/components/home/Testimonials";
import { AboutPreview } from "@/components/home/AboutPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { CTASection } from "@/components/home/CTASection";
import { HoursLocation } from "@/components/home/HoursLocation";
import { InstagramSection } from "@/components/home/InstagramSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDrinks />
      <BestSellers />
      <Testimonials />
      <AboutPreview />
      <GalleryPreview />
      <CTASection />
      <HoursLocation />
      <InstagramSection />
    </>
  );
}

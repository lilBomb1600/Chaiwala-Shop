import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look inside Chaiwala Shop — our chai, our snacks, our space in Concord, CA.",
};

export default function GalleryPage() {
  return (
    <div className="bg-cream pb-24 pt-32 sm:pt-40">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <span className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
            <span className="h-px w-6 bg-saffron" />
            Gallery
            <span className="h-px w-6 bg-saffron" />
          </span>
          <h1 className="font-display text-4xl font-bold text-espresso sm:text-5xl">
            A look inside the shop
          </h1>
          <p className="mt-4 text-balance text-lg text-espresso-light">
            Every cup, every plate, every corner — this is Chaiwala Shop.
          </p>
        </Reveal>

        <MasonryGallery />
      </Container>
    </div>
  );
}

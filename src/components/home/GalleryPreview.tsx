import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { galleryImages } from "@/data/gallery";

const preview = galleryImages.slice(0, 6);

export function GalleryPreview() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Gallery" title="A peek inside the kitchen" align="left" className="mx-0" />
          <Link href="/gallery" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-maroon">
            View Full Gallery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {preview.map((image, i) => (
            <Reveal key={image.id} delay={i * 0.05} className={i === 0 || i === 3 ? "col-span-2 row-span-2" : ""}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  ready={image.ready}
                  icon="photo"
                  sizes="(min-width: 1024px) 200px, 40vw"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-espresso/0 transition-colors duration-300 group-hover:bg-espresso/20" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

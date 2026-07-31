import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { business } from "@/data/business";
import { galleryImages } from "@/data/gallery";

const tiles = galleryImages.slice(0, 6);

export function InstagramSection() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
            <span className="h-px w-6 bg-saffron" />
            Follow Along
            <span className="h-px w-6 bg-saffron" />
          </span>
          <h2 className="font-display text-3xl font-semibold text-espresso sm:text-4xl">@chaiwalashop</h2>
          <a
            href={business.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-maroon"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow us on Instagram
          </a>
        </Reveal>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
          {tiles.map((image) => (
            <a
              key={image.id}
              href={business.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <SmartImage src={image.src} alt={image.alt} ready={image.ready} icon="photo" sizes="180px" />
              <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 text-cream opacity-0 transition-all duration-300 group-hover:bg-espresso/40 group-hover:opacity-100">
                <InstagramIcon className="h-5 w-5" />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

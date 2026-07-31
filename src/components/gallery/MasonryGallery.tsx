"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Expand } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";
import { galleryImages, type GalleryImage } from "@/data/gallery";

const filters = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "chai", label: "Chai" },
] as const;

// Aspect ratios vary per tile so the masonry grid feels editorial, not gridlocked.
const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

export function MasonryGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [index, setIndex] = useState(-1);

  const filtered = useMemo(
    () => (filter === "all" ? galleryImages : galleryImages.filter((g) => g.category === filter)),
    [filter]
  );

  const readyImages = filtered.filter((g) => g.ready);
  const slides = readyImages.map((g: GalleryImage) => ({ src: g.src, alt: g.alt }));

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              filter === f.id ? "bg-maroon text-cream" : "bg-white text-espresso-light hover:bg-cream-dark"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 sm:columns-3 [column-fill:balance]">
        {filtered.map((image, i) => (
          <Reveal
            key={image.id}
            delay={(i % 6) * 0.05}
            className="mb-4 break-inside-avoid"
          >
            <button
              type="button"
              disabled={!image.ready}
              onClick={() => setIndex(readyImages.findIndex((g) => g.id === image.id))}
              className={cn(
                "group relative block w-full overflow-hidden rounded-2xl",
                image.ready ? "cursor-pointer" : "cursor-default",
                ratios[i % ratios.length]
              )}
            >
              <SmartImage
                src={image.src}
                alt={image.alt}
                ready={image.ready}
                icon={image.category === "chai" ? "cup" : "photo"}
                sizes="(min-width: 1024px) 320px, 45vw"
                className="transition-transform duration-700 group-hover:scale-110"
              />
              {image.ready && (
                <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 opacity-0 transition-all duration-300 group-hover:bg-espresso/30 group-hover:opacity-100">
                  <Expand className="h-6 w-6 text-cream" />
                </div>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(52, 33, 26, 0.95)" } }}
      />
    </div>
  );
}

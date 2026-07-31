"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { reviews, averageRating, reviewCount } from "@/data/reviews";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-cream-dark py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="What Concord is saying"
          description="Real words from real regulars — sourced straight from Yelp."
        />

        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <StarRating rating={averageRating} size={20} />
          <span className="font-display text-xl font-semibold text-espresso">{averageRating.toFixed(1)}</span>
          <span className="text-sm text-espresso-light">based on {reviewCount} verified reviews</span>
        </div>

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-6 flex">
              {reviews.map((review) => (
                <div key={review.name} className="min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3">
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm shadow-espresso/5",
                      review.featured && "ring-2 ring-saffron"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <Quote className="h-8 w-8 text-saffron/50" />
                      {review.featured && <Badge variant="saffron">Standout Review</Badge>}
                    </div>
                    <StarRating rating={review.rating} className="mt-4" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-espresso-light">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="mt-6 border-t border-beige pt-4">
                      <p className="font-display font-semibold text-espresso">{review.name}</p>
                      <p className="text-xs text-espresso-light">
                        {review.location} · {review.date}
                      </p>
                      {review.badge && (
                        <p className="mt-1 text-xs font-medium text-maroon">{review.badge}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-beige text-espresso transition-colors hover:border-maroon hover:text-maroon"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    selectedIndex === i ? "w-6 bg-maroon" : "w-2 bg-beige"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-beige text-espresso transition-colors hover:border-maroon hover:text-maroon"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

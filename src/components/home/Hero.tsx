"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StarRating } from "@/components/ui/StarRating";
import { SmartImage } from "@/components/ui/SmartImage";
import { business } from "@/data/business";
import { averageRating, reviewCount } from "@/data/reviews";
import { galleryImages } from "@/data/gallery";

const heroImage = galleryImages.find((g) => g.id === "brand-flatlay")!;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-pine/10 blur-3xl" />
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-beige bg-white/60 px-4 py-2 text-xs font-medium text-espresso-light"
          >
            <StarRating rating={averageRating} size={13} />
            <span>{averageRating.toFixed(1)} · {reviewCount} verified reviews</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-balance text-5xl font-bold leading-[1.05] text-espresso sm:text-6xl lg:text-[4.2rem]"
          >
            Chai, brewed slow.
            <br />
            <span className="text-maroon">Served with heart.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-espresso-light"
          >
            {business.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/menu"
              className="group flex items-center gap-2 rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-maroon/25 transition-all hover:-translate-y-0.5 hover:bg-maroon-dark"
            >
              View Full Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 rounded-full border border-espresso/15 px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:border-maroon hover:text-maroon"
            >
              <PlayCircle className="h-4 w-4" />
              Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center gap-2 text-sm text-espresso-light"
          >
            <MapPin className="h-4 w-4 text-maroon" />
            <a href={business.mapsHref} target="_blank" rel="noreferrer" className="hover:text-maroon">
              {business.address.full}
            </a>
          </motion.div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[6/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-espresso/20">
            <SmartImage
              src={heroImage.src}
              alt={heroImage.alt}
              ready={heroImage.ready}
              icon="photo"
              sizes="560px"
              priority
            />
          </div>
          <div className="absolute -left-8 top-1/4 rounded-2xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur">
            <p className="font-display text-2xl font-bold text-maroon">Est. {business.established}</p>
            <p className="text-xs uppercase tracking-widest text-espresso-light">Concord, CA</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

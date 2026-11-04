import type { CSSProperties } from "react";
import { photos, type PhotoName } from "@/data/photos";

/** srcset for one slot: every pre-cut width (scripts/build_photos.py), never wider than the source */
export function srcSet(name: PhotoName) {
  return photos[name].widths.map((w) => `/photos/${name}-${w}.webp ${w}w`).join(", ");
}

function fallback(name: PhotoName) {
  const ws = photos[name].widths;
  return `/photos/${name}-${ws[Math.min(1, ws.length - 1)]}.webp`;
}

type Props = {
  name: PhotoName;
  sizes: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

/** One of the shop's photos as a responsive WebP: the browser picks the width from `sizes`; nothing is upscaled. */
export function Photo({ name, sizes, alt, className, style, priority }: Props) {
  const p = photos[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-cut responsive WebP set from scripts/build_photos.py
    <img
      src={fallback(name)}
      srcSet={srcSet(name)}
      sizes={sizes}
      alt={alt ?? p.alt}
      width={p.w}
      height={p.h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      draggable={false}
      className={className}
      style={style}
    />
  );
}

/** Art direction: one crop for phones, another from `breakpoint` up. */
export function ArtPhoto({
  phone,
  wide,
  breakpoint = 768,
  alt,
  className,
  priority,
}: {
  phone: PhotoName;
  wide: PhotoName;
  breakpoint?: number;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const p = photos[wide];
  return (
    <picture>
      <source media={`(max-width: ${breakpoint - 1}px)`} srcSet={srcSet(phone)} sizes="100vw" />
      <img
        src={fallback(wide)}
        srcSet={srcSet(wide)}
        sizes="100vw"
        alt={alt ?? p.alt}
        width={p.w}
        height={p.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        draggable={false}
        className={className}
      />
    </picture>
  );
}

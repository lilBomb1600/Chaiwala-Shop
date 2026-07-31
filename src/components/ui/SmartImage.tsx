import Image from "next/image";
import { PlaceholderImage } from "./PlaceholderImage";
import { cn } from "@/lib/utils";

/**
 * Renders the real photo once it exists on disk, otherwise falls back to a
 * branded placeholder so the layout still looks intentional. Set `ready`
 * to true (in the relevant data file) the moment a real file is dropped in.
 */
export function SmartImage({
  src,
  alt,
  ready,
  icon,
  fill = true,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  ready: boolean;
  icon?: "cup" | "shop" | "photo";
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (!ready) {
    return <PlaceholderImage icon={icon} className={className} />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("object-cover", className)}
    />
  );
}

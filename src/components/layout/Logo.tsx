import Link from "next/link";
import { cn } from "@/lib/utils";
import { business } from "@/data/business";

/**
 * Typographic wordmark based on the brand's storefront signage (bold red
 * script "Chaiwala Shop" with a steam-wisp flourish). Recreated in CSS/SVG
 * so it stays crisp at every size — replace with a vector logo file here
 * if one becomes available.
 */
export function Logo({
  variant = "light",
  showTagline = false,
  className,
}: {
  variant?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}) {
  const textColor = variant === "light" ? "text-maroon" : "text-cream";
  const taglineColor = variant === "light" ? "text-espresso-light" : "text-cream/70";

  return (
    <Link href="/" className={cn("group inline-flex flex-col items-start", className)}>
      <span className="relative inline-flex items-center">
        <svg
          viewBox="0 0 60 20"
          className={cn(
            "absolute -top-3 left-1 h-4 w-14 opacity-70",
            variant === "light" ? "text-saffron" : "text-saffron-light"
          )}
          fill="none"
        >
          <path
            d="M2 16C8 10 8 6 4 2M18 16C24 10 24 6 20 2M34 16C40 10 40 6 36 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        <span
          className={cn(
            "font-display text-2xl font-bold tracking-tight sm:text-[1.75rem]",
            textColor
          )}
        >
          Chaiwala
        </span>
      </span>
      <span
        className={cn(
          "-mt-1 self-end font-display text-sm font-semibold tracking-[0.35em] uppercase sm:text-base",
          textColor
        )}
      >
        Shop
      </span>
      {showTagline && (
        <span className={cn("mt-1 text-[0.65rem] uppercase tracking-[0.25em]", taglineColor)}>
          {business.tagline} · Est. {business.established}
        </span>
      )}
    </Link>
  );
}

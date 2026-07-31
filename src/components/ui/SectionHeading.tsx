import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-saffron-light" : "text-saffron"
          )}
        >
          <span className={cn("h-px w-6", light ? "bg-saffron-light" : "bg-saffron")} />
          {eyebrow}
          {align === "center" && (
            <span className={cn("h-px w-6", light ? "bg-saffron-light" : "bg-saffron")} />
          )}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-[2.75rem]",
          light ? "text-cream" : "text-espresso"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-balance text-base leading-relaxed sm:text-lg",
            light ? "text-cream/80" : "text-espresso-light/90"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

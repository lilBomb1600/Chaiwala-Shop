import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The top of an inner page: the heading painted big on the wall, one plain line under it. */
export function PageHead({
  title,
  children,
  tone = "maroon",
  aside,
}: {
  title: ReactNode;
  children?: ReactNode;
  tone?: "maroon" | "tea";
  aside?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative isolate pb-14 pt-32 md:pb-20 md:pt-44",
        tone === "maroon" ? "bg-maroon" : "bg-tea",
      )}
    >
      {tone === "maroon" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-multiply [background-image:var(--grain)] [background-size:180px]" />
      )}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-14 lg:px-12">
        <div className="min-w-0">
          <h1 className={cn("paint text-[clamp(3rem,10vw,6rem)] text-enamel", tone === "tea" && "[--shade:var(--maroon)]")}>
            {title}
          </h1>
          {children && <div className="mt-5 max-w-[46ch] text-[1.15rem] leading-relaxed text-enamel/85">{children}</div>}
        </div>
        {aside && <div className="min-w-0">{aside}</div>}
      </div>
    </section>
  );
}

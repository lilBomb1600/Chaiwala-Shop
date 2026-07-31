import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "saffron",
  className,
}: {
  children: React.ReactNode;
  variant?: "saffron" | "pine" | "maroon" | "cream";
  className?: string;
}) {
  const styles = {
    saffron: "bg-saffron text-espresso",
    pine: "bg-pine text-cream",
    maroon: "bg-maroon text-cream",
    cream: "bg-cream text-espresso border border-beige",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider shadow-sm",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";

type GridSectionProps = {
  title?: ReactNode;
  children: ReactNode;
  variant?: "primary" | "secondary";
  columns?: {
    default?: number;
    md?: number;
    lg?: number;
  };
  maxWidth?:
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";
} & ComponentPropsWithoutRef<"section">;

/**
 * Generic grid section component with consistent styling and gradient background
 */
export const GridSection = ({
  title,
  children,
  variant = "secondary",
  columns = { default: 1, md: 2, lg: 2 },
  maxWidth = "5xl",
  ...props
}: GridSectionProps) => {
  const gradientClass =
    variant === "primary"
      ? "from-transparent via-primary/5 to-transparent dark:via-primary/10"
      : "from-transparent via-secondary/30 to-transparent dark:via-secondary/10";

  const gridClass = [
    "grid gap-6 md:gap-8",
    columns.default === 1 && "grid-cols-1",
    columns.default === 2 && "grid-cols-2",
    columns.default === 3 && "grid-cols-3",
    columns.md === 1 && "md:grid-cols-1",
    columns.md === 2 && "md:grid-cols-2",
    columns.md === 3 && "md:grid-cols-3",
    columns.lg === 1 && "lg:grid-cols-1",
    columns.lg === 2 && "lg:grid-cols-2",
    columns.lg === 3 && "lg:grid-cols-3",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className={`container mx-auto px-4 py-16 md:py-24 relative`}
      {...props}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${gradientClass} -z-10`}
      />

      {title && <SectionHeader title={title} className="mb-12 md:mb-16" />}
      <div className={`${gridClass} max-w-${maxWidth} mx-auto`}>{children}</div>
    </section>
  );
};

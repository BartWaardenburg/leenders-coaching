import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Section } from "@/components/ui/Section";
import { Grid } from "@/components/ui/Grid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";

type GridSectionProps = {
  title?: ReactNode;
  children: ReactNode;
  variant?: "primary" | "secondary";
  columns?: {
    default?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
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
 * Generic grid section component with consistent styling
 */
export const GridSection = ({
  title,
  children,
  variant = "secondary",
  columns = { default: 1, md: 2, lg: 2 },
  maxWidth = "5xl",
  className,
  ...props
}: GridSectionProps) => {
  return (
    <Section
      className={twMerge(
        "py-16 md:py-24",
        variant === "primary" ? "bg-primary/5" : "bg-secondary/10",
        className
      )}
      {...props}
    >
      <Container>
        {title && <SectionHeader title={title} className="mb-12 md:mb-16" />}
        <Grid
          columns={columns}
          gap={6}
          maxWidth={maxWidth}
          className="md:gap-8"
        >
          {children}
        </Grid>
      </Container>
    </Section>
  );
};

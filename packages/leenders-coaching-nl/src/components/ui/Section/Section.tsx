import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Box } from "@/components/ui/Box";
import { Container } from "@/components/ui/Container";

export type PastelColor = "blue" | "purple" | "green" | "pink" | "yellow" | "teal";

const backgroundStyles: Record<PastelColor, string> = {
  blue: "bg-pastel-blue dark:bg-pastel-blue-dark",
  purple: "bg-pastel-purple dark:bg-pastel-purple-dark",
  green: "bg-pastel-green dark:bg-pastel-green-dark",
  pink: "bg-pastel-pink dark:bg-pastel-pink-dark",
  yellow: "bg-pastel-yellow dark:bg-pastel-yellow-dark",
  teal: "bg-pastel-teal dark:bg-pastel-teal-dark",
};

const borderStyles: Record<PastelColor, string> = {
  blue: "border-pastel-blue-dark dark:border-pastel-blue",
  purple: "border-pastel-purple-dark dark:border-pastel-purple",
  green: "border-pastel-green-dark dark:border-pastel-green",
  pink: "border-pastel-pink-dark dark:border-pastel-pink",
  yellow: "border-pastel-yellow-dark dark:border-pastel-yellow",
  teal: "border-pastel-teal-dark dark:border-pastel-teal",
};

type SectionProps = {
  children: React.ReactNode;
  background?: PastelColor;
  border?: boolean;
} & ComponentPropsWithoutRef<"section">;

/**
 * Generic section component with consistent spacing and container
 */
export const Section = ({
  children,
  background,
  border = false,
  className,
  ...props
}: SectionProps) => {
  return (
    <Box
      as="section"
      className={twMerge(
        "py-12 transition-theme bg-white dark:bg-zinc-950",
        background && backgroundStyles[background],
        border && background && [
          "border-y",
          borderStyles[background]
        ],
        className
      )}
      {...props}
    >
      <Container>
        {children}
      </Container>
    </Box>
  );
};

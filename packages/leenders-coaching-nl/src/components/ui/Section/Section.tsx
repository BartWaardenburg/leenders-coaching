import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Box } from "@/components/ui/Box";

type SectionProps = ComponentPropsWithoutRef<"section">;

/**
 * Generic section component with consistent spacing
 */
export const Section = ({ children, className, ...props }: SectionProps) => {
  return (
    <Box
      as="section"
      className={twMerge(
        "py-12",
        "transition-colors duration-300 bg-background",
        className
      )}
      {...props}
    >
      {children}
    </Box>
  );
};

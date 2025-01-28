import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";

type FooterHeadingProps = {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"h3">;

/**
 * Consistent heading style for footer sections with gradient
 */
export const FooterHeading = ({
  children,
  className,
  ...props
}: FooterHeadingProps) => {
  return (
    <Heading
      level="h3"
      variant="menu"
      weight="normal"
      spacing="none"
      className={twMerge("text-lg", className)}
      {...props}
    >
      {children}
    </Heading>
  );
};

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";

type FooterHeadingProps = {
  children: ReactNode;
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
      variant="gradient"
      font="playfair"
      weight="bold"
      className={twMerge("text-lg mb-4", className)}
      {...props}
    >
      {children}
    </Heading>
  );
};

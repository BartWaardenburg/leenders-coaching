import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";

type GradientTitleProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"h1">;

/**
 * A title component with gradient styling
 */
export const GradientTitle = ({
  children,
  className,
  ...props
}: GradientTitleProps) => {
  return (
    <Heading
      level="h1"
      variant="gradient"
      font="playfair"
      weight="extrabold"
      className={twMerge("text-5xl md:text-7xl", className)}
      {...props}
    >
      {children}
    </Heading>
  );
};

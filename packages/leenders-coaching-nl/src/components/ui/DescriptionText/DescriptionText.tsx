import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";

type DescriptionTextProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"p">;

/**
 * A styled paragraph component for descriptions
 */
export const DescriptionText = ({
  children,
  className,
  ...props
}: DescriptionTextProps) => {
  return (
    <Text
      variant="large"
      weight="medium"
      className={twMerge(
        "text-foreground/80 dark:text-foreground/90 my-8",
        className,
      )}
      {...props}
    >
      {children}
    </Text>
  );
};

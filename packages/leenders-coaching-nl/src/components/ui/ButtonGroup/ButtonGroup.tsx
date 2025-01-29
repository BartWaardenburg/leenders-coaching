import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Flex } from "@/components/ui/Flex";

type ButtonGroupProps = {
  children: ReactNode;
  /** Whether to stack buttons vertically on mobile */
  stackOnMobile?: boolean;
} & ComponentPropsWithoutRef<"div">;

/**
 * A component for grouping buttons with responsive layout
 */
export const ButtonGroup = ({
  children,
  className,
  stackOnMobile = true,
  ...props
}: ButtonGroupProps) => {
  return (
    <Flex
      direction={stackOnMobile ? "column" : "row"}
      items="center"
      justify="center"
      gap={4}
      className={twMerge(
        stackOnMobile && "sm:flex-row",
        className,
      )}
      {...props}
    >
      {children}
    </Flex>
  );
};

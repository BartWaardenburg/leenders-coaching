import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Flex } from "@/components/ui/Flex";

type ResponsiveValue<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

type JustifyValue = "start" | "end" | "center";
type WidthValue = "full" | "auto";

type ButtonGroupProps = {
  children: ReactNode;
  /** Whether to stack buttons vertically on mobile */
  stackOnMobile?: boolean;
  /** Justify content alignment with responsive values */
  justify?: JustifyValue | ResponsiveValue<JustifyValue>;
  /** Width control with responsive values */
  width?: WidthValue | ResponsiveValue<WidthValue>;
  /** Whether to wrap the buttons in a flex container */
  flex?: boolean;
} & ComponentPropsWithoutRef<"div">;

/**
 * A component for grouping buttons with responsive layout
 */
export const ButtonGroup = ({
  children,
  className,
  stackOnMobile = true,
  justify = "center",
  width = "auto",
  flex = false,
  ...props
}: ButtonGroupProps) => {
  /* Convert justify prop to responsive classes */
  const getJustifyClasses = () => {
    if (typeof justify === "string") {
      return `justify-${justify}`;
    }

    return Object.entries(justify).map(([breakpoint, value]) =>
      breakpoint === "base" ? `justify-${value}` : `${breakpoint}:justify-${value}`
    ).join(" ");
  };

  /* Convert width prop to responsive classes */
  const getWidthClasses = () => {
    if (typeof width === "string") {
      return `w-${width}`;
    }

    return Object.entries(width).map(([breakpoint, value]) =>
      breakpoint === "base" ? `w-${value}` : `${breakpoint}:w-${value}`
    ).join(" ");
  };

  return (
    <Flex
      direction={stackOnMobile ? "column" : "row"}
      items="center"
      gap={4}
      className={twMerge(
        getJustifyClasses(),
        getWidthClasses(),
        stackOnMobile && "sm:flex-row",
        flex && "flex",
        className,
      )}
      {...props}
    >
      {children}
    </Flex>
  );
};

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type StackProps<T extends ElementType = "div"> = {
  children: ReactNode;
  space?: number;
  direction?: "row" | "col";
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Reusable stack component for vertical or horizontal spacing with polymorphic as prop
 */
export const Stack = <T extends ElementType = "div">({
  children,
  space = 4,
  direction = "col",
  as,
  className,
  ...props
}: StackProps<T>) => {
  const Component = as || "div";
  const stackClass = twMerge(
    direction === "col" ? `space-y-${space}` : `flex space-x-${space}`,
    className
  );

  return <Component className={stackClass} {...props}>{children}</Component>;
};

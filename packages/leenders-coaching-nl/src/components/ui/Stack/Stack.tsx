import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type StackProps = {
  children: ReactNode;
  space?: number;
  gap?: number;
  direction?: "col" | "row";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  as?: "div";
} & Omit<ComponentPropsWithoutRef<"div">, "ref">;

/**
 * Stack component for managing layout of elements
 */
export const Stack = ({
  children,
  space,
  gap,
  direction = "col",
  justify = "start",
  as: Component = "div",
  className,
  ...props
}: StackProps) => {
  return (
    <Component
      className={twMerge(
        direction === "col" ? "flex-col" : "flex-row",
        "flex",
        gap && `gap-${gap}`,
        space && `space-${direction === "col" ? "y" : "x"}-${space}`,
        justify && `justify-${justify}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

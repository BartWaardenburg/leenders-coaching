import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TextProps<T extends ElementType = "p"> = {
  children: ReactNode;
  variant?:
  | "default"
  | "muted"
  | "large"
  | "small"
  | "label"
  | "error"
  | "playfair"
  | "navigation"
  | "card-meta"
  | "card-excerpt";
  weight?: "normal" | "medium" | "bold";
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Reusable text component with consistent styling
 */
export const Text = <T extends ElementType = "p">({
  children,
  variant = "default",
  weight = "normal",
  as,
  className,
  ...props
}: TextProps<T>) => {
  const Component = as || "p";

  return (
    <Component
      className={twMerge(
        "leading-relaxed",
        /* Font family */
        variant !== "playfair" && variant !== "navigation" && "font-montserrat",
        (variant === "playfair" || variant === "navigation") && "font-playfair",
        /* Font weight */
        weight === "normal" && "font-normal",
        weight === "medium" && "font-medium",
        weight === "bold" && "font-bold",
        /* Variants */
        variant === "default" && "text-foreground",
        variant === "muted" && "text-muted-foreground",
        variant === "large" && "text-lg text-foreground/90",
        variant === "small" && "text-sm text-foreground/80",
        variant === "label" && "text-md font-medium text-foreground",
        variant === "error" && "text-sm text-destructive",
        variant === "playfair" && "text-lg text-foreground",
        variant === "navigation" && "text-4xl text-inherit",
        variant === "card-meta" && "text-[13px] uppercase text-foreground/60 dark:text-foreground/80",
        variant === "card-excerpt" && "text-base leading-relaxed text-foreground/70 dark:text-foreground/90",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

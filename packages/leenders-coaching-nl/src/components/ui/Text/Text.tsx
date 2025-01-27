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
    | "cormorant"
    | "playfair";
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
        variant !== "cormorant" && variant !== "playfair" && "font-montserrat",
        variant === "cormorant" && "font-cormorant",
        variant === "playfair" && "font-playfair",
        /* Font weight */
        weight === "normal" && "font-normal",
        weight === "medium" && "font-medium",
        weight === "bold" && "font-bold",
        /* Variants */
        variant === "default" && "text-foreground",
        variant === "muted" && "text-muted-foreground",
        variant === "large" && "text-lg text-foreground/90",
        variant === "small" && "text-sm text-foreground/80",
        variant === "label" && "text-sm font-medium text-foreground",
        variant === "error" && "text-sm text-destructive",
        variant === "cormorant" && "text-lg text-muted-foreground",
        variant === "playfair" && "text-lg text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

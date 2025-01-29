import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  level?: HeadingLevel;
  children: ReactNode;
  variant?: "default" | "gradient" | "large" | "small" | "menu" | "card";
  weight?: "bold" | "extrabold" | "normal";
  spacing?: "none" | "normal";
} & ComponentPropsWithoutRef<"h1">;

/**
 * Reusable heading component with consistent styling
 */
export const Heading = ({
  level = "h1",
  children,
  variant = "default",
  weight = "extrabold",
  spacing = "normal",
  className,
  ...props
}: HeadingProps) => {
  const Component = level;

  const styles = twMerge(
    /* Font family */
    "font-playfair",
    "tracking-tight !leading-tight md:!leading-tight",
    /* Font weight */
    weight === "bold" && "font-bold",
    weight === "extrabold" && "font-extrabold",
    weight === "normal" && "font-normal",
    /* Base sizes by level */
    level === "h1" && "text-4xl md:text-5xl",
    level === "h2" && "text-3xl md:text-4xl",
    level === "h3" && "text-2xl md:text-3xl",
    /* Spacing */
    spacing === "normal" && [
      level === "h1" && "mb-8 md:mb-10",
      level === "h2" && "mb-6",
      level === "h3" && "mb-4",
    ],
    /* Variants */
    variant === "default" && "transition-theme bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary to-primary/80",
    variant === "gradient" && [
      "transition-theme bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary to-primary/80",
    ],
    variant === "large" && [
      level === "h1" && "text-5xl md:text-7xl",
      level === "h2" && "text-4xl md:text-6xl",
      level === "h3" && "text-3xl md:text-5xl",
    ],
    variant === "small" && [
      level === "h1" && "text-3xl md:text-4xl",
      level === "h2" && "text-2xl md:text-3xl",
      level === "h3" && "text-xl md:text-2xl",
    ],
    variant === "menu" && [
      "text-lg md:text-xl font-normal text-foreground transition-theme",
    ],
    variant === "card" && [
      "text-3xl leading-[1.1] text-foreground/90 dark:text-foreground sm:text-4xl md:text-[42px]",
    ],
    className,
  );

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
};

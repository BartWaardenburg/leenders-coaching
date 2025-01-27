import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  level?: HeadingLevel;
  children: ReactNode;
  variant?: "default" | "gradient" | "large" | "small";
  weight?: "bold" | "extrabold";
  font?: "playfair" | "montserrat";
  spacing?: "none" | "normal";
} & ComponentPropsWithoutRef<"h1">;

/**
 * Reusable heading component with consistent styling
 */
export const Heading = ({
  level = "h1",
  children,
  variant = "default",
  weight = "bold",
  font = "playfair",
  spacing = "normal",
  className,
  ...props
}: HeadingProps) => {
  const Component = level;

  const styles = twMerge(
    /* Font family */
    font === "playfair" && "font-playfair",
    font === "montserrat" && "font-montserrat",
    /* Font weight */
    weight === "bold" && "font-bold",
    weight === "extrabold" && "font-extrabold",
    /* Line heights */
    level === "h1" && "leading-[1.6] md:leading-[1.6]",
    level === "h2" && "leading-[1.5]",
    level === "h3" && "leading-[1.5]",
    /* Base sizes by level */
    level === "h1" && "text-4xl md:text-5xl",
    level === "h2" && "text-3xl md:text-4xl",
    level === "h3" && "text-2xl md:text-3xl",
    level === "h4" && "text-xl md:text-2xl",
    level === "h5" && "text-lg md:text-xl",
    level === "h6" && "text-base md:text-lg",
    /* Spacing */
    spacing === "normal" && [
      level === "h1" && "mb-8 md:mb-10",
      level === "h2" && "mb-6",
      level === "h3" && "mb-4",
      level === "h4" && "mb-3",
      level === "h5" && "mb-2",
      level === "h6" && "mb-2",
    ],
    /* Variants */
    variant === "default" && "text-foreground",
    variant === "gradient" && [
      "bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary to-primary/80",
      "tracking-tight !leading-[1.3] md:!leading-[1.3]",
      level === "h1" && "text-5xl md:text-7xl",
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
    className,
  );

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
};

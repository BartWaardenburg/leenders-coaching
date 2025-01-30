import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Box } from "@/components/ui/Box";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingColor = "default" | "muted";
type BorderColor = "default" | "blue" | "purple" | "green" | "pink" | "yellow" | "teal";

const borderColors: Record<BorderColor, string> = {
  default: "bg-foreground/40 dark:bg-foreground/60",
  blue: "bg-pastel-blue-dark dark:bg-pastel-blue-light",
  purple: "bg-pastel-purple-dark dark:bg-pastel-purple-light",
  green: "bg-pastel-green-dark dark:bg-pastel-green-light",
  pink: "bg-pastel-pink-dark dark:bg-pastel-pink-light",
  yellow: "bg-pastel-yellow-dark dark:bg-pastel-yellow-light",
  teal: "bg-pastel-teal-dark dark:bg-pastel-teal-light",
};

type HeadingProps = {
  level?: HeadingLevel;
  children: ReactNode;
  variant?: "default" | "large" | "medium" | "small";
  weight?: "bold" | "normal";
  spacing?: "none" | "normal";
  showBorder?: boolean;
  borderColor?: BorderColor;
  color?: HeadingColor;
  textAlign?: "left" | "center" | "right";
} & ComponentPropsWithoutRef<"h1">;

/**
 * Reusable heading component with consistent styling
 */
export const Heading = ({
  level = "h1",
  children,
  variant = "default",
  weight = "bold",
  spacing = "normal",
  showBorder = false,
  borderColor = "default",
  color = "default",
  textAlign = "left",
  className,
  ...props
}: HeadingProps) => {
  const Component = level;

  return (
    <Box className="relative inline-block w-full">
      <Component className={twMerge(
        /* Font family */
        "font-playfair w-full",
        "tracking-tight !leading-tight md:!leading-tight",
        /* Word breaking */
        "break-words hyphens-auto [word-break:break-word]",
        /* Font weight */
        weight === "bold" && "font-bold",
        weight === "normal" && "font-normal",
        /* Spacing */
        spacing === "normal" && "mb-6",
        /* Colors */
        color === "default" && "text-foreground",
        color === "muted" && "text-foreground/80",
        /* Variants */
        variant === "default" && "text-3xl md:text-4xl",
        variant === "large" && "text-5xl md:text-7xl",
        variant === "medium" && "text-3xl sm:text-4xl md:text-[42px] leading-[1.1]",
        variant === "small" && "text-lg md:text-xl",
        /* Text alignment */
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right",
        className
      )} {...props}>
        {children}
      </Component>
      {showBorder && (
        <Box className={twMerge(
          "absolute bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] w-24",
          borderColors[borderColor]
        )} />
      )}
    </Box>
  );
};

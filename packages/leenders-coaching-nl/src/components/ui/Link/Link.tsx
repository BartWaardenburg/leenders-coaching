import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type LinkProps = {
  children: ReactNode;
  variant?: "default" | "subtle" | "underline";
} & ComponentPropsWithoutRef<"a">;

/**
 * Reusable link component with consistent styling
 */
export const Link = ({
  children,
  variant = "default",
  className,
  ...props
}: LinkProps) => {
  return (
    <a
      className={twMerge(
        "transition-colors",
        variant === "default" && "text-primary hover:text-primary/80",
        variant === "subtle" && "text-muted-foreground hover:text-foreground",
        variant === "underline" &&
          "text-foreground hover:text-primary underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};

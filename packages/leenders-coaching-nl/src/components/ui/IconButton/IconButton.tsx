import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = {
  children: ReactNode;
  label: string;
  variant?: "primary" | "ghost";
} & ComponentPropsWithoutRef<"button">;

/**
 * Generic icon button with consistent styling
 */
export const IconButton = ({
  children,
  label,
  variant = "primary",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={twMerge(
        "p-2 rounded-full transition-colors",
        variant === "primary" && "bg-primary/10 hover:bg-primary/20",
        variant === "ghost" && "hover:bg-foreground/10",
        className,
      )}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
};

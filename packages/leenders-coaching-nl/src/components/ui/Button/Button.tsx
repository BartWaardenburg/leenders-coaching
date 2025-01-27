import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidthOnMobile?: boolean;
};

/**
 * Modern button component with different variants, sizes, and loading state
 */
export const Button = ({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidthOnMobile = false,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = `
        inline-flex items-center justify-center rounded-lg font-medium
        transition-all duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background
        dark:focus-visible:ring-ring/40
        disabled:pointer-events-none disabled:opacity-50
        active:scale-[0.98]
        relative overflow-hidden
    `;

  const variants = {
    primary: `
            bg-primary text-primary-foreground
            hover:bg-primary/90
            shadow-[0_1px_2px_0_hsl(var(--shadow-color)/calc(var(--shadow-strength)_+_2%))]
            dark:shadow-[0_1px_3px_0_hsl(var(--shadow-color)/calc(var(--shadow-strength)_+_5%))]
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent
            before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
            dark:before:from-white/20
        `,
    secondary: `
            bg-secondary text-secondary-foreground
            hover:bg-secondary/80
            shadow-[0_1px_2px_0_hsl(var(--shadow-color)/calc(var(--shadow-strength)_+_2%))]
            dark:shadow-[0_1px_3px_0_hsl(var(--shadow-color)/calc(var(--shadow-strength)_+_5%))]
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent
            before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
            dark:before:from-primary/10
        `,
    outline: `
            border-2 border-primary/80 bg-transparent text-primary
            hover:bg-primary/10 hover:border-primary
            dark:border-primary/60 dark:text-primary-foreground
            dark:hover:bg-primary/20 dark:hover:border-primary/80
        `,
    ghost: `
            bg-transparent text-foreground hover:bg-accent/50
            hover:text-accent-foreground
            dark:text-foreground dark:hover:bg-accent/30
        `,
    link: `
            text-primary underline-offset-4 hover:underline
            dark:text-primary-foreground
            p-0 h-auto
        `,
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-6 py-2",
    lg: "h-12 px-8 text-lg",
  };

  const loadingStyles = isLoading
    ? "relative text-transparent transition-none hover:text-transparent"
    : "";

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        loadingStyles,
        fullWidthOnMobile && "w-full sm:w-auto",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-current opacity-80" />
        </div>
      )}
    </button>
  );
};

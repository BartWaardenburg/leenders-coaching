import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type GradientBackgroundProps = {
  children: ReactNode;
  variant?: "default" | "footer";
} & ComponentPropsWithoutRef<"div">;

/**
 * A reusable gradient background component with decorative elements
 */
export const GradientBackground = ({
  children,
  variant = "default",
  className,
  ...props
}: GradientBackgroundProps) => {
  return (
    <div className={twMerge("relative", className)} {...props}>
      {/* Main gradient background */}
      <div
        className={twMerge(
          "absolute inset-0",
          variant === "default" &&
            "bg-gradient-to-br from-background via-secondary/20 to-secondary/30",
          variant === "footer" &&
            "bg-gradient-to-b from-background via-secondary/30 to-secondary/50 dark:from-background dark:via-secondary/20 dark:to-secondary/30",
        )}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-radial from-primary/10 to-transparent dark:from-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent dark:from-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
};

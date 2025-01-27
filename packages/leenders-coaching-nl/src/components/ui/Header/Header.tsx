import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Navigation } from "@/components/ui/Navigation";

type HeaderProps = ComponentPropsWithoutRef<"header">;

/**
 * Header component with glass effect and navigation
 */
export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header
      className={twMerge(
        "sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border/40 supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      {...props}
    >
      <Navigation />
    </header>
  );
};

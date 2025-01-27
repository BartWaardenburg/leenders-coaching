import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type NavigationLinkProps = {
  href: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

/**
 * Consistent navigation link styling
 */
export const NavigationLink = ({
  href,
  children,
  className,
  ...props
}: NavigationLinkProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "text-xl text-foreground/80 hover:text-primary transition-colors font-montserrat",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

/**
 * Brand link with consistent styling
 */
export const BrandLink = ({
  href,
  children,
  className,
  ...props
}: NavigationLinkProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "text-2xl font-playfair font-bold text-foreground hover:text-primary transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

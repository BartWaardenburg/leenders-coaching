import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FooterSectionProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

/**
 * Consistent section style for footer content
 */
export const FooterSection = ({
  children,
  className,
  ...props
}: FooterSectionProps) => {
  return (
    <div className={twMerge("grid gap-8 md:grid-cols-4", className)} {...props}>
      {children}
    </div>
  );
};

type FooterSectionItemProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

/**
 * Consistent section item style for footer content
 */
export const FooterSectionItem = ({
  children,
  className,
  ...props
}: FooterSectionItemProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

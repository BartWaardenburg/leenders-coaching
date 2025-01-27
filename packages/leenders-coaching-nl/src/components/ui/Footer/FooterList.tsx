import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FooterListProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"ul">;

/**
 * Consistent list style for footer sections
 */
export const FooterList = ({
  children,
  className,
  ...props
}: FooterListProps) => {
  return (
    <ul
      className={twMerge(
        "space-y-2 text-muted-foreground font-montserrat",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

type FooterListItemProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"li">;

/**
 * Consistent list item style for footer sections
 */
export const FooterListItem = ({
  children,
  className,
  ...props
}: FooterListItemProps) => {
  return (
    <li className={twMerge("text-muted-foreground", className)} {...props}>
      {children}
    </li>
  );
};

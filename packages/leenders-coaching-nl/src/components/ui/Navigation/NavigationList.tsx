import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

import type { NavItem } from "@/config/navigation";

import { NavigationLink } from "./NavigationLink";

type NavigationListProps = {
  items: NavItem[];
  cta?: {
    href: string;
    label: string;
  };
  onItemClick?: () => void;
  size?: "default" | "large";
} & ComponentPropsWithoutRef<"ul">;

/**
 * Generic navigation list component
 */
export const NavigationList = ({
  items,
  cta,
  onItemClick,
  size = "default",
  className,
  ...props
}: NavigationListProps) => {
  return (
    <ul
      className={twMerge("space-y-8 text-center w-full", className)}
      {...props}
    >
      {items.map((item) => (
        <li key={item.href}>
          <NavigationLink
            href={item.href}
            className="inline-block transition-colors"
            onClick={onItemClick}
          >
            <Text
              variant="playfair"
              className={twMerge(
                "text-primary hover:text-primary/80",
                size === "large" && "text-4xl",
                size === "default" && "text-xl",
              )}
            >
              {item.label}
            </Text>
          </NavigationLink>
        </li>
      ))}
      {cta && (
        <li className="pt-8">
          <NavigationLink href={cta.href} onClick={onItemClick}>
            <Button variant="primary" className="px-8 py-4 min-w-[200px]">
              <Text variant="playfair" className="text-xl">
                {cta.label}
              </Text>
            </Button>
          </NavigationLink>
        </li>
      )}
    </ul>
  );
};

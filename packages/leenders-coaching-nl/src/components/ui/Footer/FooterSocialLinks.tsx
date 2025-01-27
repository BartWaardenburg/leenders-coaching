import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";

import type { SocialLink } from "./Footer";

type FooterSocialLinksProps = {
  items: SocialLink[];
} & ComponentPropsWithoutRef<"div">;

/**
 * Consistent social links style for footer
 */
export const FooterSocialLinks = ({
  items,
  className,
  ...props
}: FooterSocialLinksProps) => {
  return (
    <div className={twMerge("flex gap-4", className)} {...props}>
      {items.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
        >
          <Text variant="muted">{link.label}</Text>
        </Link>
      ))}
    </div>
  );
};

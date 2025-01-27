import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";

type FooterCopyrightProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

/**
 * Consistent copyright section style for footer
 */
export const FooterCopyright = ({
  children,
  className,
  ...props
}: FooterCopyrightProps) => {
  return (
    <div
      className={twMerge(
        "mt-8 pt-8 border-t border-border text-center",
        className,
      )}
      {...props}
    >
      <Text variant="muted" className="text-sm">
        {children}
      </Text>
    </div>
  );
};

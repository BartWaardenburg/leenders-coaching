import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import { uiConfig } from "@/config/ui.config";
import { iconPaths } from "@/config/icons.config";

type MobileMenuButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-label"
>;

/**
 * Mobile menu button with consistent styling
 */
export const MobileMenuButton = ({
  className,
  ...props
}: MobileMenuButtonProps) => {
  return (
    <IconButton
      label={uiConfig.mobileMenu.toggleButton}
      className={twMerge("md:hidden", className)}
      {...props}
    >
      <Icon path={iconPaths.menu.hamburger} />
    </IconButton>
  );
};

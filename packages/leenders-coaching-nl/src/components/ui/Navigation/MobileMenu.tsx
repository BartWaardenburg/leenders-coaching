import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";

import { navigationConfig } from "@/config/navigation";
import { uiConfig } from "@/config/ui.config";
import { iconPaths } from "@/config/icons.config";

import { NavigationList } from "./NavigationList";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
} & ComponentPropsWithoutRef<"div">;

/**
 * Mobile navigation menu component
 */
export const MobileMenu = ({
  isOpen,
  onClose,
  className,
  ...props
}: MobileMenuProps) => {
  return (
    <Modal
      isOpen={isOpen}
      label={uiConfig.mobileMenu.menuLabel}
      className={twMerge("flex flex-col", className)}
      {...props}
    >
      {/* Close button positioned absolutely to match header button exactly */}
      <div className="absolute top-4 right-4 md:hidden">
        <IconButton label={uiConfig.mobileMenu.closeButton} onClick={onClose}>
          <Icon path={iconPaths.menu.close} />
        </IconButton>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <NavigationList
          items={navigationConfig.items}
          cta={navigationConfig.cta}
          onItemClick={onClose}
          size="large"
        />
      </div>
    </Modal>
  );
};

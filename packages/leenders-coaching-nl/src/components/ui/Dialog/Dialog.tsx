import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
} & ComponentPropsWithoutRef<"div">;

/**
 * Dialog component for modal content
 */
export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className,
  ...props
}: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={twMerge(
          "relative bg-background rounded-lg shadow-lg animate-in fade-in zoom-in-95",
          size === "sm" && "w-full max-w-sm",
          size === "md" && "w-full max-w-md",
          size === "lg" && "w-full max-w-lg",
          className,
        )}
        {...props}
      >
        {/* Close button */}
        <IconButton
          label="Close dialog"
          onClick={onClose}
          className="absolute right-2 top-2"
        >
          <Icon path="M6 18L18 6M6 6l12 12" />
        </IconButton>

        {/* Content */}
        <div className="p-6">
          {title && (
            <Heading level="h2" className="mb-4">
              {title}
            </Heading>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

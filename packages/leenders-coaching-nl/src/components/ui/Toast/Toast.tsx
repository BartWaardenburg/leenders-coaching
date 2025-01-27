import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { uiConfig } from "@/config/ui.config";
import { iconPaths } from "@/config/icons.config";

type ToastProps = {
  title?: string;
  children: ReactNode;
  variant?: "default" | "success" | "error" | "warning";
  onClose?: () => void;
} & ComponentPropsWithoutRef<"div">;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path fillRule="evenodd" d={iconPaths.close} clipRule="evenodd" />
  </svg>
);

/**
 * Toast notification component with different variants
 */
export const Toast = ({
  title,
  children,
  variant = "default",
  onClose,
  className,
  ...props
}: ToastProps) => {
  return (
    <div
      className={twMerge(
        "fixed bottom-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg",
        "animate-in slide-in-from-bottom-2 fade-in",
        "bg-background border",
        variant === "success" && "border-l-4 border-l-success",
        variant === "error" && "border-l-4 border-l-destructive",
        variant === "warning" && "border-l-4 border-l-warning",
        className,
      )}
      role="alert"
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <Heading level="h3" className="font-medium mb-1">
            {title}
          </Heading>
          <Text variant="muted" className="text-sm">
            {children}
          </Text>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label={uiConfig.notifications.closeButton}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

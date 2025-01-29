import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";
import { Box } from "@/components/ui/Box";

type AlertProps = {
  children: ReactNode;
  variant?: "success" | "error" | "warning";
} & ComponentPropsWithoutRef<"div">;

/**
 * Alert component for displaying important messages
 */
export const Alert = ({
  children,
  variant = "success",
  className,
  ...props
}: AlertProps) => {
  return (
    <Box
      className={twMerge(
        "p-4 rounded-lg border",
        variant === "success" && "bg-success/10 border-success text-success",
        variant === "error" && "bg-destructive/10 border-destructive text-destructive",
        variant === "warning" && "bg-warning/10 border-warning text-warning",
        className,
      )}
      role="alert"
      {...props}
    >
      <Text variant="muted" className="text-inherit">
        {children}
      </Text>
    </Box>
  );
};

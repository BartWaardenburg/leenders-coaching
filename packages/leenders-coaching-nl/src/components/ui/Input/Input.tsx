import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";
import { Box } from "@/components/ui/Box";
import { Stack } from "@/components/ui/Stack";

type InputProps = {
  label?: string;
  error?: string;
  className?: string;
  as?: "input" | "textarea";
} & (
    | ComponentPropsWithoutRef<"input">
    | ComponentPropsWithoutRef<"textarea">
  );

/**
 * A minimal input component with clean styling
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ label, error, className, as, ...props }, ref) => {
  const baseInputStyles = twMerge(
    "w-full px-4 py-2 bg-background border rounded-md",
    "focus:outline-none focus:ring-1 focus:ring-primary",
    "placeholder:text-muted-foreground",
    error && "border-destructive"
  );

  return (
    <Stack space={2}>
      {label && (
        <Text variant="label">
          {label}
        </Text>
      )}
      <Box>
        {as === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={twMerge(
              baseInputStyles,
              "min-h-[120px] resize-y",
              className,
            )}
            {...(props as ComponentPropsWithoutRef<"textarea">)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={twMerge(
              baseInputStyles,
              className,
            )}
            {...(props as ComponentPropsWithoutRef<"input">)}
          />
        )}
      </Box>
      {error && (
        <Text variant="error">
          {error}
        </Text>
      )}
    </Stack>
  );
});

Input.displayName = "Input";

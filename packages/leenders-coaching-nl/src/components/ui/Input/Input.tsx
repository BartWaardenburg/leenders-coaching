import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";

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
  const baseInputStyles =
    "w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground";

  return (
    <div>
      {label && (
        <Text variant="label" className="block mb-2">
          {label}
        </Text>
      )}
      <div>
        {as === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={twMerge(
              baseInputStyles,
              "min-h-[120px] resize-y",
              error && "border-destructive",
              className,
            )}
            {...(props as ComponentPropsWithoutRef<"textarea">)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={twMerge(
              baseInputStyles,
              error && "border-destructive",
              className,
            )}
            {...(props as ComponentPropsWithoutRef<"input">)}
          />
        )}
      </div>

      {error && (
        <Text variant="error" className="mt-1 text-sm">
          {error}
        </Text>
      )}
    </div>
  );
});

Input.displayName = "Input";

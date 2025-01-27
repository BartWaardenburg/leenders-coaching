import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Text } from "@/components/ui/Text";

type TextFieldProps = {
  label?: string;
  error?: string;
  helper?: string;
} & ComponentPropsWithoutRef<"input">;

/**
 * Reusable text input component with label and error handling
 */
export const TextField = ({
  label,
  error,
  helper,
  className,
  id,
  ...props
}: TextFieldProps) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2">
      {label && (
        <Text as="label" htmlFor={inputId} variant="label">
          {label}
        </Text>
      )}
      <input
        id={inputId}
        className={twMerge(
          "w-full px-4 py-2 rounded-lg border bg-background",
          "text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-destructive" : "border-border",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <Text id={`${inputId}-error`} variant="error">
          {error}
        </Text>
      )}
      {!error && helper && (
        <Text id={`${inputId}-helper`} variant="muted" className="text-sm">
          {helper}
        </Text>
      )}
    </div>
  );
};

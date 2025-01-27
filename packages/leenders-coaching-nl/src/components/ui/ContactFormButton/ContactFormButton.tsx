import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type ContactFormButtonProps = {
  status: "idle" | "loading" | "success" | "error";
} & ComponentPropsWithoutRef<"button">;

/**
 * Submit button component for contact form with loading state and hover effects
 */
export const ContactFormButton = ({
  status,
  className,
  ...props
}: ContactFormButtonProps) => {
  return (
    <Button
      type="submit"
      className={twMerge(
        "w-full group relative overflow-hidden rounded-2xl border-2 border-primary/20 dark:border-primary/10",
        className
      )}
      isLoading={status === "loading"}
      disabled={status === "loading"}
      {...props}
    >
      <Text variant="playfair" weight="medium" className="relative z-10">
        {status === "loading" ? "Sending..." : "Send Message"}
      </Text>

      {/* Button hover effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 dark:from-primary/30 dark:via-accent/30 dark:to-primary/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 dark:from-accent/20 dark:via-secondary/20 dark:to-accent/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 delay-100" />
    </Button>
  );
};

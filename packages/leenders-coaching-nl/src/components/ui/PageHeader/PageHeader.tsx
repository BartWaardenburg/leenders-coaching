import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Stack } from "@/components/ui/Stack";

type PageHeaderProps = {
  title: ReactNode;
  description?: string;
} & ComponentPropsWithoutRef<"header">;

/**
 * Page header with title and optional description
 */
export const PageHeader = ({
  title,
  description,
  className,
  ...props
}: PageHeaderProps) => {
  return (
    <Stack
      as="header"
      className={twMerge(
        "py-12 md:py-16",
        "transition-colors duration-300 bg-background",
        className
      )}
      {...props}
    >
      <Heading
        level="h1"
        variant="large"
        weight="bold"
      >
        {title}
      </Heading>
      {description && (
        <Text variant="muted" className="text-lg md:text-xl">
          {description}
        </Text>
      )}
    </Stack>
  );
};

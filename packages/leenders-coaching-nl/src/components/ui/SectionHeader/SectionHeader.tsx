import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Box } from "@/components/ui/Box";
import { Stack } from "@/components/ui/Stack";

type SectionHeaderProps = {
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
} & ComponentPropsWithoutRef<"div">;

/**
 * Section header with title and optional description
 */
export const SectionHeader = ({
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <Box
      className={twMerge(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      <Stack space={6}>
        <Heading
          level="h2"
          variant="large"
          weight="bold"
        >
          {title}
        </Heading>
        {description && (
          <Text variant="muted" className="text-lg">
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  );
};

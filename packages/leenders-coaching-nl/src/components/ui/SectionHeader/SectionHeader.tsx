import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type SectionHeaderProps = {
  title: ReactNode;
  description?: string;
  className?: string;
};

/**
 * Generic section header component with title and optional description
 */
export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={twMerge("text-center max-w-3xl mx-auto mb-12", className)}>
      <Heading
        level="h2"
        variant="large"
        font="playfair"
        weight="bold"
        className="mb-4"
      >
        {title}
      </Heading>
      {description && (
        <Text variant="large" weight="medium" className="text-foreground/80">
          {description}
        </Text>
      )}
    </div>
  );
};

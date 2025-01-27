import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type PageHeaderProps = {
  title: string;
  description?: string;
} & ComponentPropsWithoutRef<"div">;

/**
 * Page header component with title and optional description
 */
export const PageHeader = ({
  title,
  description,
  className,
  ...props
}: PageHeaderProps) => {
  return (
    <div className={twMerge("text-center max-w-4xl mx-auto", className)} {...props}>
      <Heading
        level="h1"
        variant="gradient"
        font="playfair"
        weight="extrabold"
        className="text-5xl md:text-7xl mb-6"
      >
        {title}
      </Heading>
      {description && (
        <Text variant="large" className="mb-8">
          {description}
        </Text>
      )}
    </div>
  );
};

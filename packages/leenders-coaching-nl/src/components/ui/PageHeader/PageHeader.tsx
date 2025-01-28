import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

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
    <header
      className={twMerge("py-24 md:py-32", className)}
      {...props}
    >
      <Container>
        <div className="max-w-3xl">
          <Heading
            level="h1"
            variant="large"
            weight="bold"
            className="mb-6"
          >
            {title}
          </Heading>
          {description && (
            <Text variant="muted" className="text-lg md:text-xl">
              {description}
            </Text>
          )}
        </div>
      </Container>
    </header>
  );
};

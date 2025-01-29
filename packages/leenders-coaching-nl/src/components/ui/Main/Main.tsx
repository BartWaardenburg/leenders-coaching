import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/ui/Container";
import { Flex } from "@/components/ui/Flex";

type MainProps = ComponentPropsWithoutRef<"main">;

/**
 * Main content component with animation and consistent styling
 */
export const Main = ({ children, className, ...props }: MainProps) => {
  return (
    <Flex
      as="main"
      direction="column"
      className={twMerge(
        "flex-grow transition-colors duration-300 bg-background mt-[125px]",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </Flex>
  );
};

import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
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
        "flex-grow mt-[125px]",
        className,
      )}
      {...props}
    >
      {children}
    </Flex>
  );
};

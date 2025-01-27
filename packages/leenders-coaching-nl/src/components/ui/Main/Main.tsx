import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Container } from "@/components/ui/Container";

type MainProps = ComponentPropsWithoutRef<"main">;

/**
 * Main content component with animation and consistent styling
 */
export const Main = ({ children, className, ...props }: MainProps) => {
  return (
    <main
      className={twMerge(
        "flex-grow animate-in fade-in duration-500",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </main>
  );
};

import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Box } from "@/components/ui/Box";

type ContainerProps = ComponentProps<"div">;

/**
 * Container component for consistent page layouts and spacing
 */
export const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <Box
      className={twMerge(
        "container mx-auto px-4 sm:px-8 md:px-12 lg:px-16",
        className
      )}
      {...props}
    />
  );
};

import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Container component for consistent page layouts and spacing
 */
export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge("container mx-auto px-4", className)}>
      {children}
    </div>
  );
};

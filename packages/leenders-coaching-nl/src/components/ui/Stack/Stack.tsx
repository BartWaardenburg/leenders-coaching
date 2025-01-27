import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type StackProps = {
  children: ReactNode;
  space?: number;
  className?: string;
};

/**
 * Reusable stack component for vertical spacing
 */
export const Stack: FC<StackProps> = ({ children, space = 4, className }) => {
  const stackClass = twMerge(`space-y-${space}`, className);

  return <div className={stackClass}>{children}</div>;
};

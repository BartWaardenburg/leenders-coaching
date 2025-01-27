import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Generic section component with consistent spacing
 */
export const Section: FC<SectionProps> = ({ children, className }) => {
  return <section className={twMerge("py-12", className)}>{children}</section>;
};

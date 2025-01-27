import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type GridProps = {
  children: ReactNode;
  columns?: {
    default?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
  className?: string;
};

/**
 * Reusable grid component with responsive column support
 */
export const Grid: FC<GridProps> = ({
  children,
  columns = {
    default: 1,
    md: 2,
    lg: 3,
  },
  gap = 8,
  className,
}) => {
  const gridClass = twMerge(
    "grid",
    `gap-${gap}`,
    columns.default && `grid-cols-${columns.default}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    "mx-auto",
    className,
  );

  return <div className={gridClass}>{children}</div>;
};

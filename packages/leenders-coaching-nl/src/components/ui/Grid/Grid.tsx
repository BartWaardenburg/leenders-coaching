import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Children, isValidElement, Fragment } from "react";

type ResponsiveColumns = {
  default: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
};

type GridProps = {
  children: ReactNode;
  maxColumns?: number;
  columns?: ResponsiveColumns;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
};

const countChildren = (children: ReactNode): number => {
  let count = 0;
  Children.forEach(children, (child) => {
    if (isValidElement<{ children?: ReactNode }>(child)) {
      if (child.type === Fragment) {
        count += countChildren(child.props.children);
      } else {
        count++;
      }
    }
  });
  return count;
};

const getGridColumns = (childCount: number, maxColumns?: number, columns?: ResponsiveColumns) => {
  if (columns) {
    const breakpoints = {
      default: columns.default,
      sm: columns.sm,
      md: columns.md,
      lg: columns.lg,
      xl: columns.xl,
      "2xl": columns["2xl"],
    };

    return Object.entries(breakpoints)
      .filter(([_, value]) => value !== undefined)
      .map(([breakpoint, value]) => {
        const prefix = breakpoint === 'default' ? '' : `${breakpoint}:`;
        return `${prefix}grid-cols-${value}`;
      })
      .join(' ');
  }

  const cols = Math.min(childCount, maxColumns || 3);
  if (cols === 1) return 'grid-cols-1';
  if (cols === 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
};

const getGapClass = (gap: GridProps['gap']) => {
  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    7: 'gap-7',
    8: 'gap-8',
    9: 'gap-9',
    10: 'gap-10',
    11: 'gap-11',
    12: 'gap-12',
  };

  return gap !== undefined ? gapClasses[gap] : '';
};

const getMaxWidthClass = (maxWidth: GridProps['maxWidth']) => {
  return maxWidth ? `max-w-${maxWidth}` : '';
};

/**
 * A flexible grid component that supports responsive layouts and various customization options.
 * 
 * @param {GridProps} props - The component props
 * @param {ReactNode} props.children - The grid items to be rendered
 * @param {number} [props.maxColumns] - Legacy prop to set maximum number of columns (defaults to 3)
 * @param {ResponsiveColumns} [props.columns] - Object defining number of columns at different breakpoints
 * @param {number} [props.gap=8] - Space between grid items (0-12)
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.maxWidth="7xl"] - Maximum width constraint of the grid
 * 
 * @example
 * // Basic usage with fixed columns
 * <Grid maxColumns={3}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 * 
 * @example
 * // Responsive columns with custom gap and max width
 * <Grid 
 *   columns={{ 
 *     default: 1,
 *     sm: 2, 
 *     md: 3,
 *     lg: 4 
 *   }}
 *   gap={4}
 *   maxWidth="6xl"
 * >
 *   <Card />
 *   <Card />
 * </Grid>
 */
export const Grid: FC<GridProps> = ({
  children,
  maxColumns,
  columns,
  gap = 8,
  className,
  maxWidth = "7xl",
}) => {
  const childCount = countChildren(children);

  return (
    <div
      className={twMerge(
        'grid',
        getGridColumns(childCount, maxColumns, columns),
        getGapClass(gap),
        getMaxWidthClass(maxWidth),
        'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

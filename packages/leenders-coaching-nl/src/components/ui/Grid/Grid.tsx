import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { forwardRef, Children, isValidElement, Fragment } from 'react';

import { Box } from '@/components/ui/Box';

type BreakpointValue = 1 | 2 | 3 | 4;

/* Support both container queries and regular breakpoints */
type ResponsiveColumns = {
  default: BreakpointValue;
  /* Container queries */
  '@xs'?: BreakpointValue;
  '@sm'?: BreakpointValue;
  '@md'?: BreakpointValue;
  '@lg'?: BreakpointValue;
  '@xl'?: BreakpointValue;
  '@2xl'?: BreakpointValue;
  '@3xl'?: BreakpointValue;
  '@4xl'?: BreakpointValue;
  '@5xl'?: BreakpointValue;
  '@6xl'?: BreakpointValue;
  '@7xl'?: BreakpointValue;
  /* Regular breakpoints */
  'xs'?: BreakpointValue;
  'sm'?: BreakpointValue;
  'md'?: BreakpointValue;
  'lg'?: BreakpointValue;
  'xl'?: BreakpointValue;
  '2xl'?: BreakpointValue;
};

type GridProps = {
  children: ReactNode;
  maxColumns?: number;
  columns?: ResponsiveColumns;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
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

/* Static classes that Tailwind can detect during build */
const gridColClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

/* Container query classes */
const containerQueryClasses = {
  '@xs': {
    1: '@xs:grid-cols-1',
    2: '@xs:grid-cols-2',
    3: '@xs:grid-cols-3',
    4: '@xs:grid-cols-4',
  },
  '@sm': {
    1: '@sm:grid-cols-1',
    2: '@sm:grid-cols-2',
    3: '@sm:grid-cols-3',
    4: '@sm:grid-cols-4',
  },
  '@md': {
    1: '@md:grid-cols-1',
    2: '@md:grid-cols-2',
    3: '@md:grid-cols-3',
    4: '@md:grid-cols-4',
  },
  '@lg': {
    1: '@lg:grid-cols-1',
    2: '@lg:grid-cols-2',
    3: '@lg:grid-cols-3',
    4: '@lg:grid-cols-4',
  },
  '@xl': {
    1: '@xl:grid-cols-1',
    2: '@xl:grid-cols-2',
    3: '@xl:grid-cols-3',
    4: '@xl:grid-cols-4',
  },
  '@2xl': {
    1: '@2xl:grid-cols-1',
    2: '@2xl:grid-cols-2',
    3: '@2xl:grid-cols-3',
    4: '@2xl:grid-cols-4',
  },
  '@3xl': {
    1: '@3xl:grid-cols-1',
    2: '@3xl:grid-cols-2',
    3: '@3xl:grid-cols-3',
    4: '@3xl:grid-cols-4',
  },
  '@4xl': {
    1: '@4xl:grid-cols-1',
    2: '@4xl:grid-cols-2',
    3: '@4xl:grid-cols-3',
    4: '@4xl:grid-cols-4',
  },
  '@5xl': {
    1: '@5xl:grid-cols-1',
    2: '@5xl:grid-cols-2',
    3: '@5xl:grid-cols-3',
    4: '@5xl:grid-cols-4',
  },
  '@6xl': {
    1: '@6xl:grid-cols-1',
    2: '@6xl:grid-cols-2',
    3: '@6xl:grid-cols-3',
    4: '@6xl:grid-cols-4',
  },
  '@7xl': {
    1: '@7xl:grid-cols-1',
    2: '@7xl:grid-cols-2',
    3: '@7xl:grid-cols-3',
    4: '@7xl:grid-cols-4',
  },
};

/* Regular media query classes */
const mediaQueryClasses = {
  'xs': {
    1: 'xs:grid-cols-1',
    2: 'xs:grid-cols-2',
    3: 'xs:grid-cols-3',
    4: 'xs:grid-cols-4',
  },
  'sm': {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
  },
  'md': {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  },
  'lg': {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  },
  'xl': {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
  },
  '2xl': {
    1: '2xl:grid-cols-1',
    2: '2xl:grid-cols-2',
    3: '2xl:grid-cols-3',
    4: '2xl:grid-cols-4',
  },
};

const getGridColumns = (
  childCount: number,
  maxColumns?: number,
  columns?: ResponsiveColumns,
) => {
  if (columns) {
    const classes = [];

    // Add default columns
    if (columns.default && gridColClasses[columns.default]) {
      classes.push(gridColClasses[columns.default]);
    }

    // Add breakpoint classes
    Object.entries(columns).forEach(([breakpoint, value]) => {
      if (breakpoint === 'default' || !value) return;

      // Handle container queries (with @)
      if (breakpoint.startsWith('@') && containerQueryClasses[breakpoint as keyof typeof containerQueryClasses]?.[value]) {
        classes.push(containerQueryClasses[breakpoint as keyof typeof containerQueryClasses][value]);
      }
      // Handle regular media queries
      else if (mediaQueryClasses[breakpoint as keyof typeof mediaQueryClasses]?.[value]) {
        classes.push(mediaQueryClasses[breakpoint as keyof typeof mediaQueryClasses][value]);
      }
    });

    return classes.join(' ');
  }

  const cols = Math.min(childCount, maxColumns || 3);
  if (cols === 1) return gridColClasses[1];
  if (cols === 2) return `${gridColClasses[1]} md:grid-cols-2`;
  return `${gridColClasses[1]} md:grid-cols-2 lg:grid-cols-3`;
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
 * A flexible grid component that supports responsive layouts using container queries
 *
 * @param {GridProps} props - The component props
 * @param {ReactNode} props.children - The grid items to be rendered
 * @param {number} [props.maxColumns] - Legacy prop to set maximum number of columns (defaults to 3)
 * @param {ResponsiveColumns} [props.columns] - Object defining number of columns at different container breakpoints
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
 * // Responsive columns with container queries
 * <Grid
 *   columns={{
 *     default: 1,
 *     '@[800px]': 3,
 *   }}
 *   gap={4}
 *   maxWidth="6xl"
 * >
 *   <Card />
 *   <Card />
 * </Grid>
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  children,
  maxColumns,
  columns,
  gap = 8,
  className,
  maxWidth = '7xl',
}, ref) => {
  const childCount = countChildren(children);

  return (
    <Box className="@container w-full">
      <div
        ref={ref}
        className={twMerge(
          'grid w-full',
          getGridColumns(childCount, maxColumns, columns),
          getGapClass(gap),
          getMaxWidthClass(maxWidth),
          'mx-auto',
          className
        )}
      >
        {children}
      </div>
    </Box>
  );
});

Grid.displayName = 'Grid';

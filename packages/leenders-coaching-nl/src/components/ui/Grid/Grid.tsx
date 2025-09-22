import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type Col = 1 | 2 | 3 | 4 | 5 | 6;
type Cols = Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', Col>>;

type GridProps = {
  children: ReactNode;
  cols?: Cols;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  as?: React.ElementType;
  className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const GAP = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
} as const;

const COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
} as const;

const col = (n?: Col, bp?: 'sm' | 'md' | 'lg' | 'xl' | '2xl') =>
  n ? `${bp ? `${bp}:` : ''}${COLS[n]}` : '';

/**
 * A simple, explicit grid component that provides responsive column layouts.
 *
 * Uses explicit column definitions rather than magic child counting.
 * Relies on Tailwind's built-in breakpoints and grid utilities.
 *
 * @example
 * // Basic responsive grid
 * <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={4}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 *
 * @example
 * // Fixed columns
 * <Grid cols={{ base: 2 }} gap={6}>
 *   <Card />
 *   <Card />
 * </Grid>
 */

/* Tailwind classes used by this component:
 * grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6
 * sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6
 * md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6
 * lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6
 * xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6
 * 2xl:grid-cols-1 2xl:grid-cols-2 2xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-cols-5 2xl:grid-cols-6
 * gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-8 gap-10 gap-12
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      cols = { base: 1 },
      gap = 8,
      as: C = 'div',
      className,
      ...rest
    },
    ref
  ) => {
    const classes = cn(
      'grid',
      col(cols.base as keyof typeof COLS),
      col(cols.sm as keyof typeof COLS, 'sm'),
      col(cols.md as keyof typeof COLS, 'md'),
      col(cols.lg as keyof typeof COLS, 'lg'),
      col(cols.xl as keyof typeof COLS, 'xl'),
      col(cols['2xl'] as keyof typeof COLS, '2xl'),
      gap !== undefined ? GAP[gap] : undefined,
      className
    );

    return (
      <C ref={ref} className={classes} {...rest}>
        {children}
      </C>
    );
  }
);

Grid.displayName = 'Grid';

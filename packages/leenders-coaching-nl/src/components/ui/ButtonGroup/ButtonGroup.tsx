import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utilities/cn';
import { Flex } from '@/components/ui/Flex';

type ResponsiveValue<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

type JustifyValue = 'start' | 'end' | 'center';
type WidthValue = 'full' | 'auto';
type AlignValue = 'start' | 'end' | 'center';

const JUSTIFY = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
} as const;

const WIDTH = {
  full: 'w-full',
  auto: 'w-auto',
} as const;

const ALIGN = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
} as const;

type ButtonGroupProps = {
  children: ReactNode;
  /** Whether to stack buttons vertically on mobile */
  stackOnMobile?: boolean;
  /** Justify content alignment with responsive values */
  justify?: JustifyValue | ResponsiveValue<JustifyValue>;
  /** Width control with responsive values */
  width?: WidthValue | ResponsiveValue<WidthValue>;
  /** Container alignment with responsive values */
  align?: AlignValue | ResponsiveValue<AlignValue>;
} & ComponentPropsWithoutRef<'div'>;

/**
 * A component for grouping buttons with responsive layout
 */
export const ButtonGroup = ({
  children,
  className,
  stackOnMobile = true,
  justify = 'center',
  width = 'auto',
  align = 'center',
  ...props
}: ButtonGroupProps) => {
  /* Convert responsive values to classes using explicit maps */
  const getResponsiveClasses = <T extends Record<string, string>>(
    value: string | Record<string, keyof T>,
    map: T
  ) => {
    if (typeof value === 'string') {
      return map[value];
    }

    return Object.entries(value)
      .map(([breakpoint, key]) =>
        breakpoint === 'base' ? map[key] : `${breakpoint}:${map[key]}`
      )
      .join(' ');
  };

  return (
    <Flex
      direction={stackOnMobile ? 'column' : 'row'}
      gap={4}
      className={cn(
        getResponsiveClasses(justify, JUSTIFY),
        getResponsiveClasses(width, WIDTH),
        getResponsiveClasses(align, ALIGN),
        stackOnMobile && '@lg:flex-row',
        className
      )}
      {...props}
    >
      {children}
    </Flex>
  );
};

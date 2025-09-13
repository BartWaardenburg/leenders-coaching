import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type SpaceValue = 0 | 1 | 2 | 3 | 4 | 'px' | 'x-reverse' | 'y-reverse';

type StackProps = {
  children: ReactNode;
  space?: SpaceValue;
  gap?: number;
  direction?: 'col' | 'row';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  as?: 'div';
  testid?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'ref'>;

/**
 * Stack component for managing layout of elements with flexible spacing and alignment options
 *
 * @param props - The component props
 * @param props.children - The child elements to be stacked
 * @param props.space - Spacing between elements using Tailwind space utilities (0-4, 'px', 'x-reverse', 'y-reverse')
 * @param props.gap - Gap between elements using CSS gap property
 * @param props.direction - Stack direction, either 'col' (column) or 'row' (row)
 * @param props.justify - Justification alignment for elements ('start', 'end', 'center', 'between', 'around', 'evenly')
 * @param props.as - HTML element to render as (currently only supports 'div')
 * @param props.testid - Test identifier for testing purposes
 * @returns A flex container with configurable spacing and alignment
 */
export const Stack = ({
  children,
  space,
  gap,
  direction = 'col',
  justify = 'start',
  as: Component = 'div',
  className,
  testid,
  ...props
}: StackProps) => {
  return (
    <Component
      data-testid={testid}
      className={twMerge(
        direction === 'col' ? 'flex-col' : 'flex-row',
        'flex w-full',
        gap && `gap-${gap}`,
        space && `space-${direction === 'col' ? 'y' : 'x'}-${space}`,
        justify && `justify-${justify}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

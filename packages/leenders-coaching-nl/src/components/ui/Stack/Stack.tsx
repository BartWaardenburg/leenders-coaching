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
} & Omit<ComponentPropsWithoutRef<'div'>, 'ref'>;

/**
 * Stack component for managing layout of elements
 * @example
 * // Using space (for margin between elements)
 * <Stack space={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 *
 * // Using gap (for grid-like spacing)
 * <Stack gap={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 */
export const Stack = ({
  children,
  space,
  gap,
  direction = 'col',
  justify = 'start',
  as: Component = 'div',
  className,
  ...props
}: StackProps) => {
  return (
    <Component
      className={twMerge(
        direction === 'col' ? 'flex-col' : 'flex-row',
        'flex',
        gap && `gap-${gap}`,
        space && `space-${direction === 'col' ? 'y' : 'x'}-${space}`,
        justify && `justify-${justify}`,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

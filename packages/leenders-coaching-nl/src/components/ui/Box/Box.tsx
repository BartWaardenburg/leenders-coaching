import type { ComponentProps, ElementType } from 'react';
import { forwardRef } from 'react';

type BoxProps<T extends ElementType> = {
  as?: T;
} & ComponentProps<T>;

/**
 * Basic layout component that can render as any HTML element
 */
export const Box = forwardRef<HTMLElement, BoxProps<ElementType>>(
  ({ as, ...props }, ref) => {
    const Component = as || 'div';
    return <Component ref={ref} {...props} />;
  }
);

Box.displayName = 'Box';

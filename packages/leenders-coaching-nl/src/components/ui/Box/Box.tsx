import type { ComponentProps, ElementType } from 'react';

type BoxProps<T extends ElementType> = {
  as?: T;
} & ComponentProps<T>;

/**
 * Basic layout component that can render as any HTML element
 */
export const Box = <T extends ElementType = 'div'>({
  as,
  ...props
}: BoxProps<T>) => {
  const Component = as || 'div';
  return <Component {...props} />;
};

import { twMerge } from 'tailwind-merge';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20;

type FlexProps<T extends ElementType = 'div'> = {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: JustifyContent;
  items?: AlignItems;
  gap?: Gap;
  as?: T;
  testid?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/**
 * A flexible layout component that wraps any HTML element with flexbox properties
 */
const Flex = <T extends ElementType = 'div'>({
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  items = 'stretch',
  gap = 0,
  as,
  className,
  children,
  testid,
  ...props
}: FlexProps<T>) => {
  const Component = as || 'div';

  return (
    <Component
      data-testid={testid}
      className={twMerge(
        'flex',
        /* Direction classes */
        direction === 'row' && 'flex-row',
        direction === 'row-reverse' && 'flex-row-reverse',
        direction === 'column' && 'flex-col',
        direction === 'column-reverse' && 'flex-col-reverse',
        /* Wrap classes */
        wrap === 'nowrap' && 'flex-nowrap',
        wrap === 'wrap' && 'flex-wrap',
        wrap === 'wrap-reverse' && 'flex-wrap-reverse',
        /* Justify content classes */
        justify === 'start' && 'justify-start',
        justify === 'end' && 'justify-end',
        justify === 'center' && 'justify-center',
        justify === 'between' && 'justify-between',
        justify === 'around' && 'justify-around',
        justify === 'evenly' && 'justify-evenly',
        /* Align items classes */
        items === 'start' && 'items-start',
        items === 'end' && 'items-end',
        items === 'center' && 'items-center',
        items === 'baseline' && 'items-baseline',
        items === 'stretch' && 'items-stretch',
        /* Gap classes */
        gap === 0 && 'gap-0',
        gap === 1 && 'gap-1',
        gap === 2 && 'gap-2',
        gap === 3 && 'gap-3',
        gap === 4 && 'gap-4',
        gap === 5 && 'gap-5',
        gap === 6 && 'gap-6',
        gap === 7 && 'gap-7',
        gap === 8 && 'gap-8',
        gap === 9 && 'gap-9',
        gap === 10 && 'gap-10',
        gap === 11 && 'gap-11',
        gap === 12 && 'gap-12',
        gap === 14 && 'gap-14',
        gap === 16 && 'gap-16',
        gap === 20 && 'gap-20',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Flex;

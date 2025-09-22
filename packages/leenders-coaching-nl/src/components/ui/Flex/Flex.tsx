import type { ComponentRef, ElementType, ReactElement } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utilities/cn';
import type {
  PolymorphicProps,
  BaseComponentProps,
  FlexDirectionVariant,
  FlexWrapVariant,
  JustifyContentVariant,
  AlignItemsVariant,
  GapVariant,
} from '@/utilities/types';

type FlexProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  BaseComponentProps & {
    direction?: FlexDirectionVariant;
    wrap?: FlexWrapVariant;
    justify?: JustifyContentVariant;
    items?: AlignItemsVariant;
    gap?: GapVariant;
    divide?: 'x' | 'y' | 'x-reverse' | 'y-reverse';
    inline?: boolean;
  }
>;

/**
 * A minimal flexbox layout component focused on flex-specific properties.
 *
 * Provides a clean API for common flex layouts without re-implementing
 * all Tailwind utilities. Use Box + Tailwind classes for other styling.
 */
const FlexComponent = forwardRef<Element, FlexProps<ElementType>>(
  (
    {
      direction = 'row',
      wrap = 'nowrap',
      justify = 'start',
      items = 'stretch',
      gap,
      divide,
      inline = false,
      as,
      className,
      children,
      testid,
      ...props
    },
    ref
  ) => {
    const Component = (as || 'div') as ElementType;

    return (
      <Component
        ref={ref}
        data-testid={testid}
        className={cn(
          inline ? 'inline-flex' : 'flex',
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
          /* Divide classes */
          divide === 'x' && 'divide-x',
          divide === 'y' && 'divide-y',
          divide === 'x-reverse' && 'divide-x-reverse',
          divide === 'y-reverse' && 'divide-y-reverse',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

FlexComponent.displayName = 'Flex';

const Flex = FlexComponent as <C extends ElementType = 'div'>(
  props: FlexProps<C> & {
    ref?: React.Ref<ComponentRef<C>>;
  }
) => ReactElement;

export { Flex };

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utilities/cn';

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
type GapKey = keyof typeof GAP;

const JUSTIFY = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const SPACE_Y: Record<0 | 1 | 2 | 3 | 4 | 'px', string> = {
  0: 'space-y-0',
  1: 'space-y-1',
  2: 'space-y-2',
  3: 'space-y-3',
  4: 'space-y-4',
  px: 'space-y-px',
};
const SPACE_X: Record<0 | 1 | 2 | 3 | 4 | 'px', string> = {
  0: 'space-x-0',
  1: 'space-x-1',
  2: 'space-x-2',
  3: 'space-x-3',
  4: 'space-x-4',
  px: 'space-x-px',
};

type SpaceValue = 0 | 1 | 2 | 3 | 4 | 'px';

type PolymorphicProps<C extends ElementType, P = {}> = P & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | keyof P>;

type StackProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    children: ReactNode;
    space?: SpaceValue;
    gap?: GapKey;
    direction?: 'col' | 'row';
    reverse?: boolean;
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    testid?: string;
    className?: string;
  }
>;

/**
 * Stack component for managing layout of elements with flexible spacing and alignment options
 *
 * @param props - The component props
 * @param props.children - The child elements to be stacked
 * @param props.space - Spacing between elements using Tailwind space utilities (0-4, 'px', 'x-reverse', 'y-reverse')
 * @param props.gap - Gap between elements using CSS gap property
 * @param props.direction - Stack direction, either 'col' (column) or 'row' (row)
 * @param props.justify - Justification alignment for elements ('start', 'end', 'center', 'between', 'around', 'evenly')
 * @param props.as - HTML element to render as
 * @param props.testid - Test identifier for testing purposes
 * @returns A flex container with configurable spacing and alignment
 */
const StackComponent = forwardRef<Element, StackProps<ElementType>>(
  (
    {
      children,
      space,
      gap,
      direction = 'col',
      reverse = false,
      justify = 'start',
      as,
      className,
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
          direction === 'col' ? 'flex-col' : 'flex-row',
          'flex w-full',
          gap !== undefined && GAP[gap as keyof typeof GAP],
          space !== undefined &&
            (direction === 'col'
              ? SPACE_Y[space as keyof typeof SPACE_Y]
              : SPACE_X[space as keyof typeof SPACE_X]),
          reverse &&
            (direction === 'col' ? 'space-y-reverse' : 'space-x-reverse'),
          JUSTIFY[justify as keyof typeof JUSTIFY],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

StackComponent.displayName = 'Stack';

export const Stack = StackComponent as <C extends ElementType = 'div'>(
  props: StackProps<C> & { ref?: React.Ref<ComponentRef<C>> }
) => ReactElement;

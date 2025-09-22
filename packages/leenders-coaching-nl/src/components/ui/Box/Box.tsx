import type { ComponentRef, ElementType, ReactElement } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utilities/cn';
import type { PolymorphicProps, BaseComponentProps } from '@/utilities/types';

/**
 * Minimal polymorphic wrapper component that provides semantic element switching
 * and className merging without re-implementing Tailwind utilities.
 *
 * Use this for semantic HTML elements and className composition.
 * For layout, use Flex or Grid components instead.
 */
const BoxComponent = forwardRef<
  Element,
  PolymorphicProps<ElementType, BaseComponentProps>
>(({ as, className, testid, ...rest }, ref) => {
  const Comp = (as || 'div') as ElementType;
  return (
    <Comp ref={ref} className={cn(className)} data-testid={testid} {...rest} />
  );
});

BoxComponent.displayName = 'Box';

export const Box = BoxComponent as <C extends ElementType = 'div'>(
  props: PolymorphicProps<C, BaseComponentProps> & {
    ref?: React.Ref<ComponentRef<C>>;
  }
) => ReactElement;

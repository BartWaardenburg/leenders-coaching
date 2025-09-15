import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  ReactElement,
} from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utilities/cn';

type PolymorphicProps<C extends ElementType, P = {}> = P & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | keyof P>;

/**
 * Minimal polymorphic wrapper component that provides semantic element switching
 * and className merging without re-implementing Tailwind utilities.
 *
 * Use this for semantic HTML elements and className composition.
 * For layout, use Flex or Grid components instead.
 */
const BoxComponent = forwardRef<
  Element,
  PolymorphicProps<ElementType, { className?: string }>
>(({ as, className, ...rest }, ref) => {
  const Comp = (as || 'div') as ElementType;
  return <Comp ref={ref} className={cn(className)} {...rest} />;
});

BoxComponent.displayName = 'Box';

export const Box = BoxComponent as <C extends ElementType = 'div'>(
  props: PolymorphicProps<C, { className?: string }> & {
    ref?: React.Ref<ComponentRef<C>>;
  }
) => ReactElement;

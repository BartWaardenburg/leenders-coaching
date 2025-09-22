import type { ComponentPropsWithoutRef, ElementType } from 'react';

/**
 * Polymorphic props type that allows components to render as different HTML elements
 * while maintaining type safety for element-specific props.
 *
 * @template C - The element type (e.g., 'div', 'span', 'button')
 * @template P - Additional props specific to the component
 */
export type PolymorphicProps<C extends ElementType, P = {}> = P & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, 'as' | keyof P>;

/**
 * Base component props that are commonly used across all components
 */
export type BaseComponentProps = {
  /** Test identifier for testing purposes */
  testid?: string;
  /** CSS classes for styling */
  className?: string;
};

/**
 * Common size variants used across components
 */
export type SizeVariant =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

/**
 * Common color variants used across components
 */
export type ColorVariant =
  | 'default'
  | 'muted'
  | 'foreground'
  | 'primary'
  | 'secondary'
  | 'destructive';

/**
 * Common max width variants used across components
 */
export type MaxWidthVariant =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full';

/**
 * Common flex direction variants
 */
export type FlexDirectionVariant =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';

/**
 * Common flex wrap variants
 */
export type FlexWrapVariant = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Common justify content variants
 */
export type JustifyContentVariant =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';

/**
 * Common align items variants
 */
export type AlignItemsVariant =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch';

/**
 * Common gap variants
 */
export type GapVariant =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20;

/**
 * Common space variants for spacing utilities
 */
export type SpaceVariant = 0 | 1 | 2 | 3 | 4 | 'px';

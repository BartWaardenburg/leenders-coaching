import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utilities/cn';
import type {
  BaseComponentProps,
  SizeVariant,
  ColorVariant,
  MaxWidthVariant,
} from '@/utilities/types';

const textVariants = cva('leading-relaxed transition-theme', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      large: 'text-lg text-foreground/90',
      small: 'text-sm text-foreground/80',
      label: 'text-md font-medium text-foreground',
      error: 'text-sm text-destructive',
      playfair: 'font-playfair text-lg text-foreground',
      navigation: 'font-playfair text-4xl text-inherit',
      'card-meta':
        'text-[13px] uppercase text-foreground/60 dark:text-foreground/80',
      'card-excerpt':
        'text-base leading-relaxed text-foreground/70 dark:text-foreground/90',
      quote: 'text-xl md:text-2xl text-foreground',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
    textAlign: {
      left: '',
      center: 'text-center',
      right: 'text-right',
    },
    italic: {
      true: 'italic',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    weight: 'normal',
    textAlign: 'left',
    italic: false,
  },
});

type TextProps<T extends ElementType = 'p'> = BaseComponentProps & {
  children: ReactNode;
  as?: T;
  /** Text size - overrides variant size */
  size?: SizeVariant;
  /** Text color - overrides variant color */
  color?: ColorVariant;
  /** Maximum width constraint */
  maxWidth?: MaxWidthVariant;
  /** Text opacity (0-100) */
  opacity?: number;
} & VariantProps<typeof textVariants> &
  Omit<ComponentPropsWithoutRef<T>, 'as'>;

/**
 * Reusable text component with consistent styling
 */
export const Text = forwardRef<HTMLElement, TextProps<ElementType>>(
  (
    {
      children,
      variant,
      weight,
      as,
      className,
      textAlign,
      italic,
      testid,
      size,
      color,
      maxWidth,
      opacity,
      ...props
    },
    ref
  ) => {
    const Component = as || 'p';

    return (
      <Component
        ref={ref}
        data-testid={testid}
        style={opacity !== undefined ? { opacity: opacity / 100 } : undefined}
        className={cn(
          textVariants({ variant, weight, textAlign, italic }),
          /* Font family - only apply if not using playfair variants */
          variant !== 'playfair' &&
            variant !== 'navigation' &&
            'font-montserrat',
          /* Size overrides */
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-sm',
          size === 'base' && 'text-base',
          size === 'lg' && 'text-lg',
          size === 'xl' && 'text-xl',
          size === '2xl' && 'text-2xl',
          size === '3xl' && 'text-3xl',
          size === '4xl' && 'text-4xl',
          /* Color overrides */
          color === 'default' && 'text-foreground',
          color === 'muted' && 'text-muted-foreground',
          color === 'foreground' && 'text-foreground',
          color === 'primary' && 'text-primary',
          color === 'secondary' && 'text-secondary',
          color === 'destructive' && 'text-destructive',
          /* Max width */
          maxWidth === 'xs' && 'max-w-xs',
          maxWidth === 'sm' && 'max-w-sm',
          maxWidth === 'md' && 'max-w-md',
          maxWidth === 'lg' && 'max-w-lg',
          maxWidth === 'xl' && 'max-w-xl',
          maxWidth === '2xl' && 'max-w-2xl',
          maxWidth === '3xl' && 'max-w-3xl',
          maxWidth === '4xl' && 'max-w-4xl',
          maxWidth === '5xl' && 'max-w-5xl',
          maxWidth === '6xl' && 'max-w-6xl',
          maxWidth === '7xl' && 'max-w-7xl',
          maxWidth === 'full' && 'max-w-full',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

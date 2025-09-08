import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TextProps<T extends ElementType = 'p'> = {
  children: ReactNode;
  variant?:
    | 'default'
    | 'muted'
    | 'large'
    | 'small'
    | 'label'
    | 'error'
    | 'playfair'
    | 'navigation'
    | 'card-meta'
    | 'card-excerpt'
    | 'quote';
  weight?: 'normal' | 'medium' | 'bold';
  as?: T;
  textAlign?: 'left' | 'center' | 'right';
  italic?: boolean;
  testid?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/**
 * Reusable text component with consistent styling
 */
export const Text = <T extends ElementType = 'p'>({
  children,
  variant = 'default',
  weight = 'normal',
  as,
  className,
  textAlign,
  italic,
  testid,
  ...props
}: TextProps<T>) => {
  const Component = as || 'p';

  return (
    <Component
      data-testid={testid}
      className={twMerge(
        'leading-relaxed transition-theme',
        /* Font family */
        variant !== 'playfair' && variant !== 'navigation' && 'font-montserrat',
        (variant === 'playfair' || variant === 'navigation') && 'font-playfair',
        /* Font weight */
        weight === 'normal' && 'font-normal',
        weight === 'medium' && 'font-medium',
        weight === 'bold' && 'font-bold',
        /* Variants */
        variant === 'default' && 'text-foreground',
        variant === 'muted' && 'text-muted-foreground',
        variant === 'large' && 'text-lg text-foreground/90',
        variant === 'small' && 'text-sm text-foreground/80',
        variant === 'label' && 'text-md font-medium text-foreground',
        variant === 'error' && 'text-sm text-destructive',
        variant === 'playfair' && 'text-lg text-foreground',
        variant === 'navigation' && 'text-4xl text-inherit',
        variant === 'card-meta' &&
          'text-[13px] uppercase text-foreground/60 dark:text-foreground/80',
        variant === 'card-excerpt' &&
          'text-base leading-relaxed text-foreground/70 dark:text-foreground/90',
        variant === 'quote' && 'text-xl md:text-2xl text-foreground',
        textAlign === 'center' && 'text-center',
        textAlign === 'right' && 'text-right',
        italic && 'italic',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

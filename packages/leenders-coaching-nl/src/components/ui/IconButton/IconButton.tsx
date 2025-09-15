import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utilities/cn';

const iconButtonVariants = cva(
  'p-2 flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30',
        ghost:
          'bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground dark:bg-transparent dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground',
      },
      shape: {
        round: 'rounded-full',
        square: 'rounded-none',
      },
      bordered: {
        true: 'border border-foreground/80 dark:border-foreground/40',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shape: 'round',
      bordered: false,
    },
  }
);

type IconButtonProps = {
  children: ReactNode;
  label: string;
} & VariantProps<typeof iconButtonVariants> &
  ComponentPropsWithoutRef<'button'>;

/**
 * Generic icon button with consistent styling
 * @param shape - 'round' (default) or 'square'
 * @param bordered - Whether to show a border (default: false)
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      label,
      variant = 'primary',
      shape = 'round',
      bordered = false,
      className,
      ...props
    },
    ref
  ) => {
    const buttonStyles = cn(
      iconButtonVariants({ variant, shape, bordered }),
      className
    );

    return (
      <button
        ref={ref}
        type="button"
        className={buttonStyles}
        aria-label={label}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = {
  children: ReactNode;
  label: string;
  /** Visual style variant of the button */
  variant?: 'primary' | 'ghost';
  /** Shape of the button */
  shape?: 'round' | 'square';
  /** Whether to show a border */
  bordered?: boolean;
} & ComponentPropsWithoutRef<'button'>;

/**
 * Generic icon button with consistent styling
 * @param shape - 'round' (default) or 'square'
 * @param bordered - Whether to show a border (default: false)
 */
export const IconButton = ({
  children,
  label,
  variant = 'primary',
  shape = 'round',
  bordered = false,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={twMerge(
        'p-2 transition-colors flex items-center justify-center',
        /* Shape variants */
        shape === 'round' && 'rounded-full',
        shape === 'square' && 'rounded-none',
        /* Border styles */
        bordered && 'border border-foreground/80 dark:border-background/80',
        /* Color variants */
        variant === 'primary' && 'bg-primary/10 hover:bg-primary/20',
        variant === 'ghost' && [
          'hover:bg-foreground hover:text-background',
          'dark:hover:bg-background dark:hover:text-foreground',
        ],
        className,
      )}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
};

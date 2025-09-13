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
  const baseStyles = `
    p-2 flex items-center justify-center cursor-pointer
    transition-colors duration-200
  `;

  const shapeStyles = {
    round: 'rounded-full',
    square: 'rounded-none',
  };

  const borderStyles = bordered
    ? 'border border-foreground/80 dark:border-background/80'
    : '';

  const variants = {
    primary: `
      bg-primary/10 hover:bg-primary/20
      dark:bg-primary/20 dark:hover:bg-primary/30
    `,
    ghost: `
      bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground
      dark:bg-transparent dark:text-foreground dark:hover:bg-foreground/10 dark:hover:text-foreground
    `,
  };

  const buttonStyles = twMerge(
    baseStyles,
    shapeStyles[shape],
    borderStyles,
    variants[variant],
    className
  );

  return (
    <button className={buttonStyles} aria-label={label} {...props}>
      {children}
    </button>
  );
};

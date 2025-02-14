import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ButtonBaseProps = {
  variant?:
  | 'black'
  | 'transparent'
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'teal';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidthOnContainer?: boolean;
  disabled?: boolean;
};

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href' | keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/**
 * Modern button component with different variants and sizes
 * Can be rendered as a button or a Next.js Link component when href is provided
 */
export const Button = ({
  className,
  variant = 'black',
  size = 'md',
  isLoading = false,
  fullWidthOnContainer = false,
  children,
  disabled,
  href,
  ...props
}: ButtonProps) => {
  const baseStyles = `
    transition-theme
    inline-flex items-center justify-center
    font-montserrat uppercase tracking-[0.1em] text-[13px]
    transition-all duration-200 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background
    dark:focus-visible:ring-ring/40
    disabled:pointer-events-none disabled:opacity-50
    relative overflow-hidden
    border border-foreground/80 dark:border-background/80
  `;

  const variants = {
    black: `
      bg-foreground text-background hover:bg-background hover:text-foreground
      dark:bg-background dark:text-foreground dark:hover:bg-foreground dark:hover:text-background
      dark:border-foreground/80
    `,
    transparent: `
      bg-transparent text-foreground hover:bg-foreground hover:text-background
      dark:bg-transparent dark:text-foreground dark:border-foreground/80 dark:hover:bg-foreground dark:hover:text-background
    `,
    blue: `
      bg-pastel-blue text-foreground hover:bg-pastel-blue-dark hover:text-background
      dark:bg-pastel-blue-dark dark:text-pastel-blue dark:hover:bg-pastel-blue dark:hover:text-pastel-blue-dark
      dark:border-pastel-blue
    `,
    purple: `
      bg-pastel-purple text-foreground hover:bg-pastel-purple-dark hover:text-background
      dark:bg-pastel-purple-dark dark:text-pastel-purple dark:hover:bg-pastel-purple dark:hover:text-pastel-purple-dark
      dark:border-pastel-purple
    `,
    green: `
      bg-pastel-green text-foreground hover:bg-pastel-green-dark hover:text-background
      dark:bg-pastel-green-dark dark:text-pastel-green dark:hover:bg-pastel-green dark:hover:text-pastel-green-dark
      dark:border-pastel-green
    `,
    pink: `
      bg-pastel-pink text-foreground hover:bg-pastel-pink-dark hover:text-background
      dark:bg-pastel-pink-dark dark:text-pastel-pink dark:hover:bg-pastel-pink dark:hover:text-pastel-pink-dark
      dark:border-pastel-pink
    `,
    yellow: `
      bg-pastel-yellow text-foreground hover:bg-pastel-yellow-dark hover:text-background
      dark:bg-pastel-yellow-dark dark:text-pastel-yellow dark:hover:bg-pastel-yellow dark:hover:text-pastel-yellow-dark
      dark:border-pastel-yellow
    `,
    teal: `
      bg-pastel-teal text-foreground hover:bg-pastel-teal-dark hover:text-background
      dark:bg-pastel-teal-dark dark:text-pastel-teal dark:hover:bg-pastel-teal dark:hover:text-pastel-teal-dark
      dark:border-pastel-teal
    `,
  };

  const sizes = {
    sm: 'h-9 px-4',
    md: 'h-11 px-8',
    lg: 'h-12 px-12',
  };

  const loadingStyles = isLoading
    ? 'relative text-transparent transition-none hover:text-transparent'
    : '';

  const buttonStyles = twMerge(
    baseStyles,
    variants[variant],
    sizes[size],
    loadingStyles,
    fullWidthOnContainer && 'w-full @md:w-auto',
    className,
  );

  const loadingSpinner = isLoading && (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-current opacity-80" />
    </div>
  );

  if (href) {
    const { href: unused, ...linkProps } = props as ButtonAsLinkProps;
    return (
      <Link
        href={href}
        className={twMerge(
          buttonStyles,
          (disabled || isLoading) && 'pointer-events-none opacity-50',
        )}
        aria-disabled={disabled || isLoading}
        {...linkProps}
      >
        {children}
        {loadingSpinner}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;
  return (
    <button
      className={buttonStyles}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {children}
      {loadingSpinner}
    </button>
  );
};

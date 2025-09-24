'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utilities/cn';
import { pastelVariant } from '@/utilities/tokens';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-center font-montserrat uppercase tracking-[0.1em] text-[13px] transition-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden border border-foreground/80 dark:border-background/80 cursor-pointer',
  {
    variants: {
      variant: {
        black:
          'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-foreground dark:text-background dark:hover:bg-foreground/80 dark:hover:text-background dark:border-foreground/80',
        transparent:
          'bg-transparent text-foreground hover:bg-foreground hover:text-background dark:bg-transparent dark:text-foreground dark:border-foreground/80 dark:hover:bg-foreground dark:hover:text-background',
        blue: `${pastelVariant.blue.bg} text-foreground hover:bg-pastel-blue-dark hover:text-background dark:text-pastel-blue dark:hover:bg-pastel-blue dark:hover:text-pastel-blue-dark ${pastelVariant.blue.borderDark}`,
        purple: `${pastelVariant.purple.bg} text-foreground hover:bg-pastel-purple-dark hover:text-background dark:text-pastel-purple dark:hover:bg-pastel-purple dark:hover:text-pastel-purple-dark ${pastelVariant.purple.borderDark}`,
        green: `${pastelVariant.green.bg} text-foreground hover:bg-pastel-green-dark hover:text-background dark:text-pastel-green dark:hover:bg-pastel-green dark:hover:text-pastel-green-dark ${pastelVariant.green.borderDark}`,
        pink: `${pastelVariant.pink.bg} text-foreground hover:bg-pastel-pink-dark hover:text-background dark:text-pastel-pink dark:hover:bg-pastel-pink dark:hover:text-pastel-pink-dark ${pastelVariant.pink.borderDark}`,
        yellow: `${pastelVariant.yellow.bg} text-foreground hover:bg-pastel-yellow-dark hover:text-background dark:text-pastel-yellow dark:hover:bg-pastel-yellow dark:hover:text-pastel-yellow-dark ${pastelVariant.yellow.borderDark}`,
        teal: `${pastelVariant.teal.bg} text-foreground hover:bg-pastel-teal-dark hover:text-background dark:text-pastel-teal dark:hover:bg-pastel-teal dark:hover:text-pastel-teal-dark ${pastelVariant.teal.borderDark}`,
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-8',
        lg: 'h-12 px-12',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'black',
      size: 'md',
      fullWidth: false,
    },
  }
);

type ButtonBaseProps = {
  isLoading?: boolean;
  fullWidthUntil?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fullWidth?: boolean;
  disabled?: boolean;
  role?: 'button' | 'link';
} & VariantProps<typeof buttonVariants>;

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'role' | keyof ButtonBaseProps
  > & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const WIDTH_UNTIL: Record<
  NonNullable<ButtonBaseProps['fullWidthUntil']>,
  string
> = {
  sm: 'sm:w-auto',
  md: 'md:w-auto',
  lg: 'lg:w-auto',
  xl: 'xl:w-auto',
  '2xl': '2xl:w-auto',
};

/**
 * Modern button component with different variants and sizes.
 * Can be rendered as a button or a Next.js Link component when href is provided.
 * @param props - The button component props.
 * @returns A button or link element with appropriate styling and behavior.
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      fullWidthUntil,
      fullWidth = false,
      children,
      disabled,
      href,
      ...props
    },
    ref
  ) => {
    const buttonStyles = cn(
      buttonVariants({
        variant,
        size,
        fullWidth: fullWidth || !!fullWidthUntil,
      }),
      fullWidthUntil && WIDTH_UNTIL[fullWidthUntil],
      className
    );

    const loadingSpinner = isLoading && (
      <div
        role="status"
        aria-live="polite"
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-current opacity-80" />
      </div>
    );

    if (href) {
      const { href: _, role, ...linkProps } = props as ButtonAsLinkProps;
      const linkRole = role || 'link';
      return (
        <Link
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          href={href}
          role={linkRole}
          className={cn(
            buttonStyles,
            (disabled || isLoading) && 'pointer-events-none opacity-50'
          )}
          aria-disabled={disabled || isLoading}
          aria-busy={isLoading}
          tabIndex={disabled || isLoading ? -1 : undefined}
          onClick={(e) =>
            disabled || isLoading ? e.preventDefault() : undefined
          }
          {...linkProps}
        >
          <span className={isLoading ? 'invisible' : ''}>{children}</span>
          {loadingSpinner}
        </Link>
      );
    }

    const buttonProps = props as ButtonAsButtonProps;
    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        type={
          (buttonProps as ComponentPropsWithoutRef<'button'>).type ?? 'button'
        }
        className={buttonStyles}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...buttonProps}
      >
        <span className={isLoading ? 'invisible' : ''}>{children}</span>
        {loadingSpinner}
      </button>
    );
  }
);

Button.displayName = 'Button';

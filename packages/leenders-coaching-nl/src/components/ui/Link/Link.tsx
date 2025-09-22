'use client';

import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import NextLink from 'next/link';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { cn } from '@/utilities/cn';

type LinkVariant = 'default' | 'subtle' | 'animated';
type LinePosition = 'above' | 'below';
type LineStyle = 'slide' | 'move';

type LinkProps = {
  variant?: LinkVariant;
  linePosition?: LinePosition;
  lineStyle?: LineStyle;
  children: ReactNode;
  href: string; // Required
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'ref' | 'children'
>;

/**
 * Link component with various animation styles
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      variant = 'default',
      linePosition = 'below',
      lineStyle = 'slide',
      className,
      target,
      href,
      ...props
    },
    ref
  ) => {
    const isHttp = /^https?:\/\//i.test(href);
    const isMailOrTel = href.startsWith('mailto:') || href.startsWith('tel:');
    const isInternal =
      !isHttp &&
      !isMailOrTel &&
      (href.startsWith('/') || href.startsWith('#') || href.startsWith('?'));

    // Treat any absolute http(s) as external. Internal should be relative.
    const isExternal = isHttp;
    const rel =
      isExternal || target === '_blank' ? 'noopener noreferrer' : props.rel;

    if (variant === 'animated') {
      return (
        <div className="relative inline-block group">
          <div
            className={cn(
              'absolute h-[2px] bg-foreground/80 group-hover:bg-primary transition-theme',
              linePosition === 'above' ? '-top-1' : '-bottom-1',
              'left-0',
              lineStyle === 'slide'
                ? 'w-0 group-hover:w-12'
                : 'w-12 group-hover:translate-x-2'
            )}
          />
          {isInternal ? (
            <NextLink
              href={href}
              ref={ref}
              className={cn(
                'inline-flex items-center transition-theme text-foreground group-hover:text-primary',
                className
              )}
            >
              {children}
            </NextLink>
          ) : (
            <a
              ref={ref}
              className={cn(
                'inline-flex items-center transition-theme text-foreground group-hover:text-primary',
                className
              )}
              href={href}
              target={target}
              rel={rel}
              {...props}
            >
              {children}
              {isExternal && (
                <>
                  <span className="sr-only">(opent in nieuw tabblad)</span>
                  <HiOutlineExternalLink
                    className="ml-1 h-4 w-4"
                    aria-hidden="true"
                  />
                </>
              )}
            </a>
          )}
        </div>
      );
    }

    return isInternal ? (
      <NextLink
        href={href}
        ref={ref}
        className={cn(
          'inline-flex items-center transition-theme',
          variant === 'default'
            ? 'border-b border-primary text-primary hover:border-transparent hover:text-primary/80'
            : 'text-muted-foreground hover:text-foreground hover:border-b hover:border-foreground',
          className
        )}
      >
        {children}
      </NextLink>
    ) : (
      <a
        ref={ref}
        className={cn(
          'inline-flex items-center transition-theme',
          variant === 'default'
            ? 'border-b border-primary text-primary hover:border-transparent hover:text-primary/80'
            : 'text-muted-foreground hover:text-foreground hover:border-b hover:border-foreground',
          className
        )}
        href={href}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
        {isExternal && (
          <>
            <span className="sr-only">(opent in nieuw tabblad)</span>
            <HiOutlineExternalLink
              className="ml-1 h-4 w-4"
              aria-hidden="true"
            />
          </>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;

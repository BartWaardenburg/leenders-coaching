import type { ComponentPropsWithoutRef } from 'react';
import { memo } from 'react';
import { cn } from '@/utilities/cn';

type IconProps = {
  path: string;
  title?: string;
} & ComponentPropsWithoutRef<'svg'>;

/**
 * Generic icon component for SVG paths
 */
export const Icon = memo<IconProps>(({ path, title, className, ...props }) => {
  const hasTitle = Boolean(title);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn('w-6 h-6', className)}
      role={hasTitle ? 'img' : undefined}
      aria-label={hasTitle ? title : undefined}
      aria-hidden={!hasTitle}
      focusable={false}
      data-animation="complete"
      {...props}
    >
      {title && <title>{title}</title>}
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
});

Icon.displayName = 'Icon';

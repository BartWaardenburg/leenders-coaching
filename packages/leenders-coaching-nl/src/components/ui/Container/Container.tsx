import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utilities/cn';

type ContainerProps<T extends React.ElementType = 'div'> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Container component for consistent page layouts and spacing
 */
export const Container = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: ContainerProps<T>) => {
  const C = as || 'div';
  return (
    <C
      className={cn(
        'container mx-auto px-4 sm:px-8 md:px-12 lg:px-16',
        className
      )}
      {...props}
    />
  );
};

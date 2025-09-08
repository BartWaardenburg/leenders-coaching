import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Box } from '@/components/ui/Box';
import { Container } from '@/components/ui/Container';

export type PastelColor =
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'teal';

const backgroundStyles: Record<PastelColor, string> = {
  blue: 'bg-pastel-blue dark:bg-pastel-blue-dark',
  purple: 'bg-pastel-purple dark:bg-pastel-purple-dark',
  green: 'bg-pastel-green dark:bg-pastel-green-dark',
  pink: 'bg-pastel-pink dark:bg-pastel-pink-dark',
  yellow: 'bg-pastel-yellow dark:bg-pastel-yellow-dark',
  teal: 'bg-pastel-teal dark:bg-pastel-teal-dark',
};

const borderStyles: Record<PastelColor, string> = {
  blue: 'border-pastel-blue-dark dark:border-pastel-blue',
  purple: 'border-pastel-purple-dark dark:border-pastel-purple',
  green: 'border-pastel-green-dark dark:border-pastel-green',
  pink: 'border-pastel-pink-dark dark:border-pastel-pink',
  yellow: 'border-pastel-yellow-dark dark:border-pastel-yellow',
  teal: 'border-pastel-teal-dark dark:border-pastel-teal',
};

type MaxWidth =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

const maxWidthStyles: Record<MaxWidth, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

type SectionProps = {
  children: React.ReactNode;
  background?: PastelColor;
  border?: boolean;
  /** Whether to disable the default padding */
  noPadding?: boolean;
  /** Maximum width constraint of the section */
  maxWidth?: MaxWidth;
  testid?: string;
} & ComponentPropsWithoutRef<'section'>;

/**
 * Generic section component with consistent spacing and container
 */
export const Section = ({
  children,
  background,
  border = false,
  noPadding = false,
  maxWidth,
  className,
  testid,
  ...props
}: SectionProps) => {
  return (
    <Box
      as="section"
      className={twMerge(
        !noPadding && 'py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24',
        'transition-theme bg-background',
        background && backgroundStyles[background],
        border && background && ['border-y', borderStyles[background]],
        className
      )}
      data-testid={testid || 'section'}
      {...props}
    >
      {!noPadding ? (
        <Container className={maxWidth ? maxWidthStyles[maxWidth] : undefined}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Box>
  );
};

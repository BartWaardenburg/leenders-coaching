import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utilities/cn';
import { Box } from '../Box';
import { Container } from '../Container';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens';

/**
 * Background styles mapping for pastel colors with dark mode support
 */
const backgroundStyles: Record<PastelVariant, string> = {
  blue: pastelVariant.blue.bg,
  purple: pastelVariant.purple.bg,
  green: pastelVariant.green.bg,
  pink: pastelVariant.pink.bg,
  yellow: pastelVariant.yellow.bg,
  teal: pastelVariant.teal.bg,
};

/**
 * Border styles mapping for pastel colors with dark mode support
 */
const borderStyles: Record<PastelVariant, string> = {
  blue: pastelVariant.blue.borderDark,
  purple: pastelVariant.purple.borderDark,
  green: pastelVariant.green.borderDark,
  pink: pastelVariant.pink.borderDark,
  yellow: pastelVariant.yellow.borderDark,
  teal: pastelVariant.teal.borderDark,
};

/**
 * Available maximum width options for section content
 */
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

/**
 * Maximum width styles mapping for responsive content constraints
 */
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

/**
 * Props for the Section component
 */
type SectionProps = {
  /** Child elements to render within the section */
  children: React.ReactNode;
  /** Pastel color theme for background and borders */
  background?: PastelVariant;
  /** Whether to show colored borders on top and bottom */
  border?: boolean;
  /** Whether to disable the default padding */
  noPadding?: boolean;
  /** Maximum width constraint of the section content */
  maxWidth?: MaxWidth;
  /** Test identifier for testing purposes */
  testid?: string;
} & ComponentPropsWithoutRef<'section'>;

/**
 * Generic section component with consistent spacing and container
 *
 * Provides a flexible layout container with optional pastel theming,
 * responsive padding, and configurable content width constraints.
 *
 * @param props - The component props
 * @param props.children - Child elements to render within the section
 * @param props.background - Pastel variant theme for background and borders
 * @param props.border - Whether to show colored borders on top and bottom
 * @param props.noPadding - Whether to disable the default responsive padding
 * @param props.maxWidth - Maximum width constraint for the section content
 * @param props.testid - Test identifier for testing purposes
 * @returns A section element with consistent styling and layout
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
      className={cn(
        !noPadding && 'py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24',
        'transition-theme bg-background',
        background && backgroundStyles[background],
        border && background && ['border-y', borderStyles[background]],
        '@container',
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

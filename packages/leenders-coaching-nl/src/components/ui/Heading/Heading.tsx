import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { memo } from 'react';
import { Box } from '@/components/ui/Box';
import { cn } from '@/utilities/cn';
import { pastelVariant } from '@/utilities/tokens';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingColor = 'default' | 'muted';
type BorderColor =
  | 'default'
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'teal';

const borderColors: Record<BorderColor, string> = {
  default: 'bg-foreground dark:bg-foreground',
  blue: pastelVariant.blue.borderDark,
  purple: pastelVariant.purple.borderDark,
  green: pastelVariant.green.borderDark,
  pink: pastelVariant.pink.borderDark,
  yellow: pastelVariant.yellow.borderDark,
  teal: pastelVariant.teal.borderDark,
};

type HeadingProps = {
  level?: HeadingLevel;
  children: ReactNode;
  variant?: 'default' | 'large' | 'medium' | 'small';
  weight?: 'bold' | 'normal';
  spacing?: 'none' | 'normal';
  showBorder?: boolean;
  borderColor?: BorderColor;
  color?: HeadingColor;
  textAlign?: 'left' | 'center' | 'right';
} & ComponentPropsWithoutRef<'h1'>;

/**
 * Reusable heading component with consistent styling
 */
export const Heading = memo<HeadingProps>(
  ({
    level = 'h1',
    children,
    variant = 'default',
    weight = 'bold',
    spacing = 'normal',
    showBorder = false,
    borderColor = 'default',
    color = 'default',
    textAlign = 'left',
    className,
    ...props
  }) => {
    const Component = level;

    return (
      <Box className="relative inline-block w-full">
        <Component
          className={cn(
            /* Font family */
            'font-playfair w-full transition-theme',
            'tracking-tight !leading-tight md:!leading-tight',
            /* Word breaking */
            'break-words hyphens-auto [word-break:break-word]',
            /* Font weight */
            weight === 'bold' && 'font-bold',
            weight === 'normal' && 'font-normal',
            /* Spacing */
            spacing === 'normal' && 'mb-6',
            /* Colors */
            color === 'default' && 'text-foreground',
            color === 'muted' && 'text-foreground/80',
            /* Variants */
            variant === 'default' && 'text-3xl md:text-4xl',
            variant === 'large' && 'text-5xl md:text-7xl',
            variant === 'medium' &&
              'text-3xl sm:text-4xl md:text-[42px] leading-[1.1]',
            variant === 'small' && 'text-lg md:text-xl',
            /* Text alignment */
            textAlign === 'center' && 'text-center',
            textAlign === 'right' && 'text-right',
            className
          )}
          {...props}
        >
          {children}
        </Component>
        {showBorder && (
          <Box
            className={cn(
              'absolute bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] w-24 transition-theme',
              borderColor === 'default'
                ? borderColors[borderColor]
                : `border-t-2 ${borderColors[borderColor]}`
            )}
            aria-hidden="true"
          />
        )}
      </Box>
    );
  }
);

Heading.displayName = 'Heading';

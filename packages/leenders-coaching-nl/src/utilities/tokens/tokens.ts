/**
 * Centralized design tokens for consistent theming across all components
 *
 * This file consolidates all color variants, sizes, and other design tokens
 * to ensure consistency and make future theming changes easier.
 */

export const pastelVariant = {
  blue: {
    bg: 'bg-pastel-blue dark:bg-pastel-blue-dark',
    bgSoft: 'bg-pastel-blue-soft',
    borderLight: 'border-pastel-blue dark:border-pastel-blue-dark',
    borderDark: 'border-pastel-blue-dark dark:border-pastel-blue',
    textLight: 'text-pastel-blue-dark dark:text-pastel-blue',
    hoverBorderLight:
      'hover:border-pastel-blue hover:dark:border-pastel-blue-dark',
    hoverBorderDark:
      'hover:border-pastel-blue-dark hover:dark:border-pastel-blue',
  },
  purple: {
    bg: 'bg-pastel-purple dark:bg-pastel-purple-dark',
    bgSoft: 'bg-pastel-purple-soft',
    borderLight: 'border-pastel-purple dark:border-pastel-purple-dark',
    borderDark: 'border-pastel-purple-dark dark:border-pastel-purple',
    textLight: 'text-pastel-purple-dark dark:text-pastel-purple',
    hoverBorderLight:
      'hover:border-pastel-purple hover:dark:border-pastel-purple-dark',
    hoverBorderDark:
      'hover:border-pastel-purple-dark hover:dark:border-pastel-purple',
  },
  green: {
    bg: 'bg-pastel-green dark:bg-pastel-green-dark',
    bgSoft: 'bg-pastel-green-soft',
    borderLight: 'border-pastel-green dark:border-pastel-green-dark',
    borderDark: 'border-pastel-green-dark dark:border-pastel-green',
    textLight: 'text-pastel-green-dark dark:text-pastel-green',
    hoverBorderLight:
      'hover:border-pastel-green hover:dark:border-pastel-green-dark',
    hoverBorderDark:
      'hover:border-pastel-green-dark hover:dark:border-pastel-green',
  },
  pink: {
    bg: 'bg-pastel-pink dark:bg-pastel-pink-dark',
    bgSoft: 'bg-pastel-pink-soft',
    borderLight: 'border-pastel-pink dark:border-pastel-pink-dark',
    borderDark: 'border-pastel-pink-dark dark:border-pastel-pink',
    textLight: 'text-pastel-pink-dark dark:text-pastel-pink',
    hoverBorderLight:
      'hover:border-pastel-pink hover:dark:border-pastel-pink-dark',
    hoverBorderDark:
      'hover:border-pastel-pink-dark hover:dark:border-pastel-pink',
  },
  yellow: {
    bg: 'bg-pastel-yellow dark:bg-pastel-yellow-dark',
    bgSoft: 'bg-pastel-yellow-soft',
    borderLight: 'border-pastel-yellow dark:border-pastel-yellow-dark',
    borderDark: 'border-pastel-yellow-dark dark:border-pastel-yellow',
    textLight: 'text-pastel-yellow-dark dark:text-pastel-yellow',
    hoverBorderLight:
      'hover:border-pastel-yellow hover:dark:border-pastel-yellow-dark',
    hoverBorderDark:
      'hover:border-pastel-yellow-dark hover:dark:border-pastel-yellow',
  },
  teal: {
    bg: 'bg-pastel-teal dark:bg-pastel-teal-dark',
    bgSoft: 'bg-pastel-teal-soft',
    borderLight: 'border-pastel-teal dark:border-pastel-teal-dark',
    borderDark: 'border-pastel-teal-dark dark:border-pastel-teal',
    textLight: 'text-pastel-teal-dark dark:text-pastel-teal',
    hoverBorderLight:
      'hover:border-pastel-teal hover:dark:border-pastel-teal-dark',
    hoverBorderDark:
      'hover:border-pastel-teal-dark hover:dark:border-pastel-teal',
  },
} as const;

export type PastelVariant = keyof typeof pastelVariant;

/**
 * Size tokens for consistent sizing across components
 */
export const sizeTokens = {
  small: {
    padding: 'p-2',
    text: 'text-sm',
    icon: 'h-4 w-4',
    leading: 'leading-snug',
  },
  medium: {
    padding: 'p-3',
    text: 'text-base',
    icon: 'h-5 w-5',
    leading: 'leading-normal',
  },
  large: {
    padding: 'p-4',
    text: 'text-lg',
    icon: 'h-6 w-6',
    leading: 'leading-relaxed',
  },
} as const;

export type SizeVariant = keyof typeof sizeTokens;

/**
 * Helper function to get complete variant styles for components
 */
export const getVariantStyles = (variant: PastelVariant) => ({
  background: pastelVariant[variant].bg,
  border: pastelVariant[variant].borderDark,
  text: pastelVariant[variant].textLight,
  hover: pastelVariant[variant].hoverBorderDark,
});

/**
 * Helper function to get complete size styles for components
 */
export const getSizeStyles = (size: SizeVariant) => ({
  padding: sizeTokens[size].padding,
  text: sizeTokens[size].text,
  icon: sizeTokens[size].icon,
  leading: sizeTokens[size].leading,
});

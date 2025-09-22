'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/utilities/cn';
import { motion, useReducedMotion } from 'motion/react';
import { Text } from '@/components/ui/Text';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens';

export type BadgeVariant = PastelVariant;

interface BadgeProps {
  /** Content to display in the badge */
  children: ReactNode;
  /** Visual style variant of the badge */
  variant?: BadgeVariant;
  /** Optional className for styling */
  className?: string;
  /** Test ID for testing */
  testid?: string;
  /** Whether to show hover animations */
  interactive?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Optional URL to make the badge clickable */
  url?: string;
}

/**
 * Badge component for displaying labels, categories, or status indicators
 * Follows the same design patterns as Card, Toast, and Modal components
 */
export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'blue',
  className,
  testid,
  interactive,
  size = 'medium',
  url,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isInteractive = interactive || !!url;

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const badgeClasses = cn(
    'inline-flex items-center border transition-theme',
    pastelVariant[variant].bg,
    pastelVariant[variant].borderDark,
    pastelVariant[variant].textLight,
    sizeClasses[size],
    isInteractive && !shouldReduceMotion && 'cursor-pointer hover:opacity-80',
    className
  );

  const badgeVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, scale: 1 }
      : { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.3,
            ease: [0.2, 0.65, 0.3, 0.9] as const,
          },
    },
    ...(isInteractive &&
      !shouldReduceMotion && {
        hover: {
          scale: 1.05,
          transition: {
            duration: 0.2,
            ease: [0.2, 0.65, 0.3, 0.9] as const,
          },
        },
        tap: {
          scale: 0.95,
          transition: {
            duration: 0.1,
            ease: [0.2, 0.65, 0.3, 0.9] as const,
          },
        },
      }),
  } as const;

  const badgeContent = (
    <motion.span
      className={badgeClasses}
      data-testid={testid}
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      whileHover={isInteractive ? 'hover' : undefined}
      whileTap={isInteractive ? 'tap' : undefined}
      {...props}
    >
      <Text variant="small" className="text-inherit">
        {children}
      </Text>
    </motion.span>
  );

  if (url) {
    return (
      <Link href={url} className="inline-block">
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
};

export default Badge;

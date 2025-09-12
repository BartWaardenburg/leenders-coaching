import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoClose } from 'react-icons/io5';

import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Flex } from '@/components/ui/Flex';

type AlertVariant = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
type AlertSize = 'small' | 'medium' | 'large';

const alertStyles: Record<AlertVariant, string> = {
  blue: 'bg-pastel-blue dark:bg-pastel-blue-dark border-pastel-blue-dark dark:border-pastel-blue text-pastel-blue-dark dark:text-pastel-blue',
  purple:
    'bg-pastel-purple dark:bg-pastel-purple-dark border-pastel-purple-dark dark:border-pastel-purple text-pastel-purple-dark dark:text-pastel-purple',
  green:
    'bg-pastel-green dark:bg-pastel-green-dark border-pastel-green-dark dark:border-pastel-green text-pastel-green-dark dark:text-pastel-green',
  pink: 'bg-pastel-pink dark:bg-pastel-pink-dark border-pastel-pink-dark dark:border-pastel-pink text-pastel-pink-dark dark:text-pastel-pink',
  yellow:
    'bg-pastel-yellow dark:bg-pastel-yellow-dark border-pastel-yellow-dark dark:border-pastel-yellow text-pastel-yellow-dark dark:text-pastel-yellow',
  teal: 'bg-pastel-teal dark:bg-pastel-teal-dark border-pastel-teal-dark dark:border-pastel-teal text-pastel-teal-dark dark:text-pastel-teal',
};

const sizeStyles: Record<AlertSize, string> = {
  small: 'p-2 text-sm',
  medium: 'p-3 text-base',
  large: 'p-4 text-lg',
};

const closeButtonSizes: Record<AlertSize, string> = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-6 w-6',
};

type AlertProps = {
  children: ReactNode;
  variant?: AlertVariant;
  size?: AlertSize;
  showCloseButton?: boolean;
  onClose?: () => void;
} & ComponentPropsWithoutRef<'div'>;

/**
 * Alert component for displaying important messages with pastel colors
 */
export const Alert = ({
  children,
  variant = 'blue',
  size = 'medium',
  showCloseButton = true,
  onClose,
  className,
  ...props
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setIsMounted(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isMounted) return null;

  return (
    <Box
      className={twMerge(
        'border transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
        alertStyles[variant],
        sizeStyles[size],
        className
      )}
      role="alert"
      data-testid="alert-content"
      data-animation={isVisible ? 'complete' : 'in-progress'}
      {...props}
    >
      <Flex items="start" gap={3}>
        <Text
          variant="muted"
          className={twMerge(
            'text-inherit flex-1',
            size === 'small' && 'leading-snug',
            size === 'medium' && 'leading-normal',
            size === 'large' && 'leading-relaxed'
          )}
        >
          {children}
        </Text>
        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            className={twMerge(
              'text-inherit opacity-80 hover:opacity-100 transition-opacity',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'focus-visible:ring-current focus-visible:ring-offset-inherit'
            )}
            aria-label="Sluit waarschuwing"
          >
            <IoClose className={closeButtonSizes[size]} />
          </button>
        )}
      </Flex>
    </Box>
  );
};

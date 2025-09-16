import type { ReactNode } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/utilities/cn';
import { IoClose } from 'react-icons/io5';

import { Text } from '@/components/ui/Text';
import { Flex } from '@/components/ui/Flex';
import {
  pastelVariant,
  sizeTokens,
  type PastelVariant,
  type SizeVariant,
} from '@/utilities/tokens';

type AlertVariant = PastelVariant;
type AlertSize = SizeVariant;

type AlertProps = {
  children: ReactNode;
  variant?: AlertVariant;
  size?: AlertSize;
  showCloseButton?: boolean;
  onClose?: () => void;
  testid?: string;
} & HTMLMotionProps<'div'>;

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
  testid,
  ...props
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          role="alert"
          aria-live="polite"
          data-testid={testid || 'alert-content'}
          data-animation="complete"
          className={cn(
            'border',
            pastelVariant[variant].bg,
            pastelVariant[variant].borderDark,
            pastelVariant[variant].textLight,
            sizeTokens[size].padding,
            sizeTokens[size].text,
            className
          )}
          {...props}
        >
          <Flex items="start" gap={3}>
            <Text
              variant="muted"
              className={cn('text-inherit flex-1', sizeTokens[size].leading)}
            >
              {children}
            </Text>
            {showCloseButton && (
              <button
                type="button"
                onClick={handleClose}
                className={cn(
                  'text-inherit opacity-80 hover:opacity-100 transition-opacity cursor-pointer',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'focus-visible:ring-current focus-visible:ring-offset-background'
                )}
                aria-label="Sluit waarschuwing"
              >
                <IoClose className={sizeTokens[size].icon} />
              </button>
            )}
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

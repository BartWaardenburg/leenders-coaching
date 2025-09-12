'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoClose } from 'react-icons/io5';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
} from 'motion/react';
import { Flex } from '@/components/ui/Flex';
import { useConfig } from '@/components/providers/ClientConfigProvider';

export type ModalVariant =
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'teal';

export const modalStyles: Record<ModalVariant, string> = {
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

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  label: string;
  variant?: ModalVariant;
  showCloseButton?: boolean;
  onClose?: () => void;
} & Omit<
  HTMLMotionProps<'div'>,
  | 'onAnimationStart'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragExit'
>;

const MotionFlex = motion.create(Flex);

/**
 * Generic full-screen modal component with proper accessibility and pastel styling
 */
export const Modal = ({
  isOpen,
  children,
  label,
  variant = 'blue',
  showCloseButton = true,
  onClose,
  className,
  ...props
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const { accessibility } = useConfig();
  const systemReducedMotion = useReducedMotion();

  // In test environments (like Storybook), we want to treat reduced motion as active
  // This ensures immediate onClose callbacks for faster, more reliable tests
  const shouldReduceMotion =
    systemReducedMotion || process.env.NODE_ENV === 'test';

  const handleClose = useCallback(() => {
    /* If reduced motion is active (like in tests), call onClose immediately */
    if (shouldReduceMotion) {
      // Call onClose synchronously before any state changes
      onClose?.();
      // Then update state in the next tick
      requestAnimationFrame(() => setIsVisible(false));
    } else {
      setIsVisible(false);
      /* Otherwise, wait for the exit animation to complete */
      setTimeout(() => {
        onClose?.();
      }, 400);
    }
  }, [onClose, shouldReduceMotion]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, handleClose]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionFlex
          as="div"
          items="center"
          justify="center"
          className={twMerge(
            'fixed inset-0 z-50 p-4 bg-background/80 backdrop-blur-sm'
          )}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={handleClose}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
          }
          {...props}
        >
          <MotionFlex
            direction="column"
            className={twMerge(
              'relative max-w-lg w-full border p-6 shadow-lg',
              modalStyles[variant],
              className
            )}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 50, scale: 0.95 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                  },
            }}
            data-testid="modal-content"
            exit={
              shouldReduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                    transition: {
                      duration: 0.4,
                      ease: [0.32, 0.72, 0, 1],
                    },
                  }
            }
          >
            {showCloseButton && (
              <motion.button
                type="button"
                onClick={handleClose}
                className={twMerge(
                  'absolute right-2 top-2 p-2 z-10',
                  'text-inherit opacity-80 hover:opacity-100',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'focus-visible:ring-current focus-visible:ring-offset-inherit'
                )}
                aria-label={accessibility.closeButtons.modal}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        delay: 0.2,
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: 0,
                        scale: 0,
                        transition: {
                          duration: 0.2,
                          ease: [0.32, 0.72, 0, 1],
                        },
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <IoClose className="h-7 w-7" />
              </motion.button>
            )}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -20 }
              }
              animate={{
                opacity: 1,
                x: 0,
                transition: shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      delay: 0.1,
                      duration: 0.4,
                      ease: [0.32, 0.72, 0, 1],
                    },
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: 0,
                      x: -20,
                      transition: {
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }
              }
            >
              {children}
            </motion.div>
          </MotionFlex>
        </MotionFlex>
      )}
    </AnimatePresence>
  );
};

'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback, useId, useRef } from 'react';
import { cn } from '@/utilities/cn';
import { IoClose } from 'react-icons/io5';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
} from 'motion/react';
import { Flex } from '@/components/ui/Flex';
import { useConfig } from '@/components/providers/ClientConfigProvider';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { lockScroll, unlockScroll } from '@/utilities/scroll-lock';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens';

export type ModalVariant = PastelVariant;

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  label: string;
  variant?: ModalVariant;
  showCloseButton?: boolean;
  onClose?: () => void;
  ariaDescribedBy?: string;
  onOpenAutoFocus?: (element: HTMLElement) => void;
  onCloseAutoFocus?: (element: HTMLElement) => void;
  testid?: string;
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
 *
 * @param onClose - Callback function called when modal should close. Note: In normal mode,
 *   this callback is delayed by 400ms to sync with the exit animation. In test environments
 *   or when reduced motion is enabled, the callback is called immediately for faster testing.
 */
export const Modal = ({
  isOpen,
  children,
  label,
  variant = 'blue',
  showCloseButton = true,
  onClose,
  ariaDescribedBy,
  onOpenAutoFocus: _onOpenAutoFocus,
  onCloseAutoFocus: _onCloseAutoFocus,
  className,
  testid,
  ...props
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const { accessibility } = useConfig();
  const systemReducedMotion = useReducedMotion();
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // In test environments (like Storybook), we want to treat reduced motion as active
  // This ensures immediate onClose callbacks for faster, more reliable tests
  const shouldReduceMotion =
    systemReducedMotion || process.env.NODE_ENV === 'test';

  // Store the element that opened the modal for focus restoration
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = (document.activeElement as HTMLElement) || null;
    }
  }, [isOpen]);

  // Focus trap functionality
  useFocusTrap(isVisible, modalRef, triggerRef.current);

  const handleClose = useCallback(() => {
    /* Call onCloseAutoFocus before closing */
    const element = triggerRef.current ?? document.body;
    _onCloseAutoFocus?.(element);

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
  }, [onClose, shouldReduceMotion, _onCloseAutoFocus]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Handle onOpenAutoFocus when modal becomes visible
  useEffect(() => {
    if (!isVisible) return;

    const firstFocusable =
      modalRef.current?.querySelector<HTMLElement>('[data-autofocus]') ??
      modalRef.current!;
    _onOpenAutoFocus?.(firstFocusable);
  }, [isVisible, _onOpenAutoFocus]);

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

  useEffect(() => {
    if (!isVisible) return;

    lockScroll();

    // Make the main content inert for screen readers
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('inert', 'true');
    }

    return () => {
      unlockScroll();
      if (mainContent) {
        mainContent.removeAttribute('inert');
      }
    };
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionFlex
          as="div"
          items="center"
          justify="center"
          className={cn(
            'fixed inset-0 z-50 p-4 bg-background/80 backdrop-blur-sm'
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={ariaDescribedBy}
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
            ref={modalRef}
            direction="column"
            role="document"
            className={cn(
              'relative max-w-lg w-full border p-6 shadow-lg',
              pastelVariant[variant].bg,
              pastelVariant[variant].borderDark,
              pastelVariant[variant].textLight,
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
            data-testid={testid || 'modal-content'}
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
            {/* Hidden title for screen readers */}
            <h2 id={titleId} className="sr-only">
              {label}
            </h2>

            {showCloseButton && (
              <motion.button
                type="button"
                onClick={handleClose}
                className={cn(
                  'absolute right-2 top-2 p-2 z-10 cursor-pointer',
                  'text-inherit opacity-80 hover:opacity-100',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'focus-visible:ring-current focus-visible:ring-offset-background'
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

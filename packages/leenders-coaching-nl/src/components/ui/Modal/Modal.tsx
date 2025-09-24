'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
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

/**
 * Props for the Modal component.
 */
type ModalProps = {
  /** Controls whether the modal is open */
  isOpen: boolean;
  /** Modal content */
  children: ReactNode;
  /** Accessible label for the modal (used for screen readers) */
  label: string;
  /** Pastel color variant for modal styling */
  variant?: ModalVariant;
  /** Whether to show the close button (default: true) */
  showCloseButton?: boolean;
  /** Callback fired when the modal requests to close */
  onClose?: () => void;
  /** ID of the element that describes the modal */
  ariaDescribedBy?: string;
  /** Callback fired when modal opens and should autofocus an element */
  onOpenAutoFocus?: (element: HTMLElement) => void;
  /** Callback fired when modal closes and should autofocus an element */
  onCloseAutoFocus?: (element: HTMLElement) => void;
  /** Test id for the modal content */
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
 * Full-screen modal component with accessibility, focus management, and pastel styling.
 *
 * - Handles focus trap and scroll lock.
 * - Animates in/out with reduced motion support.
 * - Restores focus to the trigger element on close.
 * - Makes main content inert while open for screen readers.
 *
 * @param props - ModalProps
 * @returns React portal with modal content
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
  const [isMounted, setIsMounted] = useState(false);
  const { accessibility } = useConfig();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /** Store the element that opened the modal for focus restoration */
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = (document.activeElement as HTMLElement) || null;
    }
  }, [isOpen]);

  /** Trap focus within the modal when visible */
  useFocusTrap(isVisible, modalRef, triggerRef.current);

  /**
   * Handles closing the modal, including focus restoration and animation timing.
   */
  const handleClose = useCallback(() => {
    const element = triggerRef.current ?? document.body;
    _onCloseAutoFocus?.(element);

    if (shouldReduceMotion) {
      onClose?.();
      requestAnimationFrame(() => setIsVisible(false));
    } else {
      setIsVisible(false);
      /** Wait for the exit animation to complete before firing onClose */
      setTimeout(() => {
        onClose?.();
      }, 400);
    }
  }, [onClose, shouldReduceMotion, _onCloseAutoFocus]);

  /** Sync isVisible with isOpen prop */
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  /** Autofocus the first focusable element when modal becomes visible */
  useEffect(() => {
    if (!isVisible) return;

    const firstFocusable =
      modalRef.current?.querySelector<HTMLElement>('[data-autofocus]') ??
      modalRef.current!;
    _onOpenAutoFocus?.(firstFocusable);
  }, [isVisible, _onOpenAutoFocus]);

  /** Handle Escape key to close modal */
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

  /** Lock scroll and make main content inert while modal is visible */
  useEffect(() => {
    if (!isVisible) return;

    lockScroll();

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

  /** Avoid rendering during SSR */
  if (!isMounted) {
    return null;
  }

  const modalContent = (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionFlex
          as="div"
          items="center"
          justify="center"
          className={cn(
            'fixed inset-0 z-50 p-4 backdrop-blur-sm overflow-y-auto'
          )}
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
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={ariaDescribedBy}
            className={cn(
              'relative max-w-lg w-full border p-6 shadow-lg my-auto min-h-0',
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

  return createPortal(modalContent, document.body);
};

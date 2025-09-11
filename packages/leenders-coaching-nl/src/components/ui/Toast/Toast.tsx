'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoClose } from 'react-icons/io5';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
} from 'motion/react';
import { Flex } from '@/components/ui/Flex';
import { modalStyles, type ModalVariant } from '../Modal/Modal';
import { useConfig } from '@/components/providers/ClientConfigProvider';

/**
 * Props for the Toast component
 * @typedef {Object} ToastProps
 * @property {string} id - Unique identifier for the toast
 * @property {ReactNode} message - Content to display in the toast
 * @property {ModalVariant} [variant='blue'] - Visual style variant of the toast
 * @property {number} [duration] - Duration in ms before auto-dismissal. If not provided, toast won't auto-dismiss
 * @property {boolean} [showCloseButton=true] - Whether to show the close button
 * @property {(id: string) => void} [onClose] - Callback function when toast is closed
 */
type ToastProps = {
  id: string;
  message: ReactNode;
  variant?: ModalVariant;
  duration?: number;
  showCloseButton?: boolean;
  onClose?: (id: string) => void;
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
 * Toast notification component with smooth animations and auto-dismiss functionality
 *
 * @component
 * @param {ToastProps} props - Component props
 * @param {string} props.id - Unique identifier for the toast
 * @param {ReactNode} props.message - Content to display in the toast
 * @param {ModalVariant} [props.variant='blue'] - Visual style variant of the toast
 * @param {number} [props.duration] - Duration in ms before auto-dismissal
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button
 * @param {(id: string) => void} [props.onClose] - Callback function when toast is closed
 * @param {string} [props.className] - Additional CSS classes
 *
 * @returns {JSX.Element | null} Toast component or null if unmounted
 */
export const Toast = ({
  id,
  message,
  variant = 'blue',
  duration,
  showCloseButton = true,
  onClose,
  className,
  ...props
}: ToastProps) => {
  const { accessibility } = useConfig();
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const progressInterval = useRef<number | undefined>(undefined);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose?.(id);
      }, 500); // Match exit animation duration
      return () => clearTimeout(timer);
    }
  }, [isVisible, id, onClose]);

  useEffect(() => {
    if (duration) {
      const startTime = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining <= 0) {
          setIsVisible(false);
          if (progressInterval.current) {
            window.clearInterval(progressInterval.current);
          }
        }
      };

      progressInterval.current = window.setInterval(updateProgress, 10);

      return () => {
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
        }
      };
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <MotionFlex
          direction="column"
          className={twMerge(
            'relative border p-4 max-w-md w-full shadow-lg overflow-hidden',
            modalStyles[variant],
            className
          )}
          role="alert"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 50, scale: 0.95 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                  },
                }
          }
          data-testid="toast-content"
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                  transition: {
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1],
                  },
                }
          }
          {...props}
        >
          <Flex direction="row" items="center" className="w-full">
            <motion.div
              className="flex-1"
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.1,
                        duration: 0.4,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }
              }
            >
              {message}
            </motion.div>
            {showCloseButton && (
              <motion.button
                type="button"
                onClick={handleClose}
                className={twMerge(
                  'ml-2 p-2',
                  'text-inherit opacity-80 hover:opacity-100',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'focus-visible:ring-current focus-visible:ring-offset-inherit'
                )}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: 0.2,
                          duration: 0.3,
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
                aria-label={accessibility.closeButtons.toast}
              >
                <IoClose className="h-5 w-5" />
              </motion.button>
            )}
          </Flex>
          {duration && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-current"
              initial={{ width: '100%', opacity: 0.3 }}
              animate={{
                width: `${progress}%`,
                opacity: progress > 50 ? 0.3 : 0.5,
                transition: {
                  duration: 0.1,
                  ease: 'linear',
                },
              }}
            />
          )}
        </MotionFlex>
      )}
    </AnimatePresence>
  );
};

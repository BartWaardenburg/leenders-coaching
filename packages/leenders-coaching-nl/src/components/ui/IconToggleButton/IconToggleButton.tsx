'use client';

import { forwardRef } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';
import {
  motion,
  AnimatePresence,
  easeOut,
  useReducedMotion,
  type HTMLMotionProps,
} from 'motion/react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utilities/cn';

type TransitionSpeed = 'quick' | 'slow';

type IconToggleButtonProps = {
  isToggled?: boolean;
  defaultIcon: string;
  toggledIcon: string;
  label: string;
  className?: string;
  speed?: TransitionSpeed;
  onClick?: (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
} & Omit<HTMLMotionProps<'button'>, 'aria-label' | 'onClick'>;

const MotionIcon = motion.create(Icon);

const transitionDurations: Record<TransitionSpeed, number> = {
  quick: 0.2,
  slow: 0.5,
};

/**
 * A button that toggles between two icons with a smooth animation
 */
export const IconToggleButton = forwardRef<
  HTMLButtonElement,
  IconToggleButtonProps
>(
  (
    {
      isToggled = false,
      defaultIcon,
      toggledIcon,
      label,
      className,
      speed = 'slow',
      onClick,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const duration = shouldReduceMotion ? 0 : transitionDurations[speed];

    return (
      <motion.button
        ref={ref}
        type="button"
        className={cn(
          'w-10 h-10 p-0 rounded-full relative cursor-pointer',
          'hover:bg-foreground/6 active:bg-foreground/12',
          'transition-colors duration-200',
          className
        )}
        aria-label={label}
        aria-pressed={isToggled}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e);
          }
        }}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isToggled ? (
            <MotionIcon
              key="default"
              path={defaultIcon}
              className="absolute inset-0 m-auto text-foreground"
              initial={
                shouldReduceMotion
                  ? { rotate: 0, opacity: 1 }
                  : { rotate: -90, opacity: 0 }
              }
              animate={{ rotate: 0, opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? { rotate: 0, opacity: 1 }
                  : { rotate: 90, opacity: 0 }
              }
              transition={{ duration: duration, ease: easeOut }}
            />
          ) : (
            <MotionIcon
              key="toggled"
              path={toggledIcon}
              className="absolute inset-0 m-auto text-foreground"
              initial={
                shouldReduceMotion
                  ? { rotate: 0, opacity: 1 }
                  : { rotate: -90, opacity: 0 }
              }
              animate={{ rotate: 0, opacity: 1 }}
              exit={
                shouldReduceMotion
                  ? { rotate: 0, opacity: 1 }
                  : { rotate: 90, opacity: 0 }
              }
              transition={{ duration: duration, ease: easeOut }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    );
  }
);

IconToggleButton.displayName = 'IconToggleButton';

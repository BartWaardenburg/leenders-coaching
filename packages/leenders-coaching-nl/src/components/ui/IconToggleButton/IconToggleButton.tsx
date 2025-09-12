'use client';

import { twMerge } from 'tailwind-merge';
import {
  motion,
  AnimatePresence,
  easeOut,
  useReducedMotion,
  type HTMLMotionProps,
} from 'motion/react';
import { Icon } from '@/components/ui/Icon';

type TransitionSpeed = 'quick' | 'slow';

type IconToggleButtonProps = {
  isToggled?: boolean;
  defaultIcon: string;
  toggledIcon: string;
  label: string;
  className?: string;
  speed?: TransitionSpeed;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<HTMLMotionProps<'button'>, 'aria-label' | 'onClick'>;

const MotionIcon = motion.create(Icon);

const transitionDurations: Record<TransitionSpeed, number> = {
  quick: 0.2,
  slow: 0.5,
};

/**
 * A button that toggles between two icons with a smooth animation
 */
export const IconToggleButton = ({
  isToggled = false,
  defaultIcon,
  toggledIcon,
  label,
  className,
  speed = 'slow',
  onClick,
  ...props
}: IconToggleButtonProps) => {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : transitionDurations[speed];

  return (
    <motion.button
      type="button"
      className={twMerge(
        'w-10 h-10 p-0 rounded-full relative cursor-pointer',
        className
      )}
      whileHover={
        shouldReduceMotion ? {} : { backgroundColor: 'hsl(20 30% 96% / 0.1)' }
      }
      transition={{ duration: duration }}
      aria-label={label}
      onClick={onClick}
      {...props}
    >
      <AnimatePresence mode="wait">
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
};

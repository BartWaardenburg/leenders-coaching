'use client';

import { twMerge } from 'tailwind-merge';
import {
  motion,
  AnimatePresence,
  easeOut,
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
  const duration = transitionDurations[speed];

  return (
    <motion.button
      type="button"
      className={twMerge('w-10 h-10 p-0 rounded-full relative', className)}
      whileHover={{ backgroundColor: 'var(--secondary-10)' }}
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
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: duration, ease: easeOut }}
          />
        ) : (
          <MotionIcon
            key="toggled"
            path={toggledIcon}
            className="absolute inset-0 m-auto text-foreground"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: duration, ease: easeOut }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

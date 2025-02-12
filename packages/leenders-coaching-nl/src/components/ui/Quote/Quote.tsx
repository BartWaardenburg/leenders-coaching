'use client';

import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, type HTMLMotionProps } from 'framer-motion';

import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';

type QuoteProps = {
  children: ReactNode;
  cite?: ReactNode;
  className?: string;
} & Omit<
  HTMLMotionProps<'blockquote'>,
  | 'cite'
  | 'onAnimationStart'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragExit'
>;

const MotionBox = motion(Box);

/**
 * Quote component for displaying testimonials with smooth animations
 */
export const Quote = ({ children, cite, className, ...props }: QuoteProps) => {
  return (
    <motion.blockquote
      className={twMerge('relative', className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.32, 0.72, 0, 1],
      }}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <Text
          variant="quote"
          textAlign="center"
          italic
          className="font-playfair"
        >
          &ldquo;{children}&rdquo;
        </Text>
      </motion.div>
      {cite && (
        <MotionBox
          className="block mt-8 not-italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.4,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {cite}
        </MotionBox>
      )}
    </motion.blockquote>
  );
};

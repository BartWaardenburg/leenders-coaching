'use client';

import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { motion, type HTMLMotionProps } from 'motion/react';
import { Box } from '@/components/ui/Box';

type LinkVariant = 'default' | 'subtle' | 'animated';
type LinePosition = 'above' | 'below';
type LineStyle = 'slide' | 'move';

type LinkProps = {
  variant?: LinkVariant;
  linePosition?: LinePosition;
  lineStyle?: LineStyle;
  children: ReactNode;
} & Omit<HTMLMotionProps<'a'>, 'ref' | 'children'>;

const MotionBox = motion.create(Box);

/**
 * Link component with various animation styles
 */
export const Link = ({
  children,
  variant = 'default',
  linePosition = 'below',
  lineStyle = 'slide',
  className,
  target,
  ...props
}: LinkProps) => {
  const isExternal = target === '_blank';

  if (variant === 'animated') {
    const lineVariants = {
      initial:
        lineStyle === 'slide'
          ? { width: 0, backgroundColor: 'hsl(var(--foreground) / 0.8)' }
          : {
            width: '3rem',
            x: 0,
            backgroundColor: 'hsl(var(--foreground) / 0.8)',
          },
      hover:
        lineStyle === 'slide'
          ? { width: '3rem', backgroundColor: 'hsl(var(--primary))' }
          : {
            width: '3rem',
            x: '0.5rem',
            backgroundColor: 'hsl(var(--primary))',
          },
    };

    const textVariants = {
      initial: { color: 'hsl(var(--foreground))' },
      hover: { color: 'hsl(var(--primary))' },
    };

    return (
      <motion.div
        className="relative inline-block"
        initial="initial"
        whileHover="hover"
      >
        <MotionBox
          className={twMerge(
            'absolute h-[2px]',
            linePosition === 'above' ? '-top-1' : '-bottom-1',
            'left-0',
          )}
          variants={lineVariants}
          transition={{
            duration: 0.3,
            ease: [0.32, 0.72, 0, 1],
          }}
        />
        <motion.a
          className={twMerge('inline-flex items-center', className)}
          variants={textVariants}
          transition={{ duration: 0.2 }}
          target={target}
          {...props}
        >
          {children}
          {isExternal && (
            <HiOutlineExternalLink
              className="ml-1 h-4 w-4"
              aria-hidden="true"
            />
          )}
        </motion.a>
      </motion.div>
    );
  }

  const defaultVariants = {
    initial:
      variant === 'default'
        ? { borderColor: 'hsl(var(--primary))', color: 'hsl(var(--primary))' }
        : { color: 'hsl(var(--muted-foreground))', borderBottom: 'none' },
    hover:
      variant === 'default'
        ? { borderColor: 'transparent', color: 'hsl(var(--primary) / 0.8)' }
        : {
          color: 'hsl(var(--foreground))',
          borderBottom: '1px solid hsl(var(--foreground))',
        },
  };

  return (
    <motion.a
      className={twMerge(
        'inline-flex items-center',
        variant === 'default' && 'border-b',
        className,
      )}
      initial="initial"
      whileHover="hover"
      variants={defaultVariants}
      transition={{
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1],
      }}
      target={target}
      {...props}
    >
      {children}
      {isExternal && (
        <HiOutlineExternalLink className="ml-1 h-4 w-4" aria-hidden="true" />
      )}
    </motion.a>
  );
};

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { IoChevronDown } from 'react-icons/io5';

import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { PortableText } from '@/components/ui/PortableText';
import type { PortableTextBlock } from '@portabletext/react';

export type FAQItem = {
  /** The question text */
  question: string;
  /** The answer content as Portable Text */
  answer: PortableTextBlock[];
};

export type FAQVariant =
  | 'blue'
  | 'purple'
  | 'green'
  | 'pink'
  | 'yellow'
  | 'teal';

type FAQProps = {
  /** Array of FAQ items */
  items: FAQItem[];
  /** Optional color variant */
  variant?: FAQVariant;
  /** Optional className for styling */
  className?: string;
};

const MotionBox = motion.create(Box);

/**
 * FAQ component with smooth animations and pastel styling
 */
export const FAQ = ({ items, variant = 'blue', className }: FAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const variantStyles = {
    blue: 'bg-pastel-blue/50 dark:bg-pastel-blue-dark/50 border-pastel-blue-dark dark:border-pastel-blue',
    purple:
      'bg-pastel-purple/50 dark:bg-pastel-purple-dark/50 border-pastel-purple-dark dark:border-pastel-purple',
    green:
      'bg-pastel-green/50 dark:bg-pastel-green-dark/50 border-pastel-green-dark dark:border-pastel-green',
    pink: 'bg-pastel-pink/50 dark:bg-pastel-pink-dark/50 border-pastel-pink-dark dark:border-pastel-pink',
    yellow:
      'bg-pastel-yellow/50 dark:bg-pastel-yellow-dark/50 border-pastel-yellow-dark dark:border-pastel-yellow',
    teal: 'bg-pastel-teal/50 dark:bg-pastel-teal-dark/50 border-pastel-teal-dark dark:border-pastel-teal',
  };

  return (
    <Stack gap={4} className={className}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <MotionBox
            key={index}
            className={twMerge(
              'border overflow-hidden cursor-pointer',
              variantStyles[variant],
              'transition-colors duration-200',
              'hover:bg-opacity-70 dark:hover:bg-opacity-70',
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: [0.32, 0.72, 0, 1],
            }}
            onClick={() => setActiveIndex(isActive ? null : index)}
          >
            <Box className="flex items-center justify-between p-4 sm:p-6">
              <Text weight="medium" className="flex-1 pr-4">
                {item.question}
              </Text>
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              >
                <IoChevronDown className="h-5 w-5 flex-shrink-0" />
              </motion.div>
            </Box>
            <AnimatePresence>
              {isActive && (
                <MotionBox
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: {
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                      opacity: {
                        duration: 0.2,
                        delay: 0.1,
                      },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: {
                        duration: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                      opacity: {
                        duration: 0.2,
                      },
                    },
                  }}
                >
                  <Box className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PortableText content={item.answer} />
                    </motion.div>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>
          </MotionBox>
        );
      })}
    </Stack>
  );
};

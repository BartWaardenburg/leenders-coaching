'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '@/utilities/cn';
import { IoChevronDown } from 'react-icons/io5';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens';

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

type FAQProps = {
  /** Array of FAQ items */
  items?: FAQItem[];
  /** Optional color variant */
  variant?: PastelVariant;
  /** Optional className for styling */
  className?: string;
};

const MotionBox = motion.create(Box);

/**
 * FAQ component with smooth animations and pastel styling
 */
export const FAQ = ({ items = [], variant = 'blue', className }: FAQProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const variantStyles: Record<PastelVariant, string> = {
    blue: `${pastelVariant.blue.bgSoft} ${pastelVariant.blue.borderDark}`,
    purple: `${pastelVariant.purple.bgSoft} ${pastelVariant.purple.borderDark}`,
    green: `${pastelVariant.green.bgSoft} ${pastelVariant.green.borderDark}`,
    pink: `${pastelVariant.pink.bgSoft} ${pastelVariant.pink.borderDark}`,
    yellow: `${pastelVariant.yellow.bgSoft} ${pastelVariant.yellow.borderDark}`,
    teal: `${pastelVariant.teal.bgSoft} ${pastelVariant.teal.borderDark}`,
  };

  if (!items.length) {
    return (
      <Box className="text-center text-muted-foreground">
        <Text>Er zijn momenteel geen veelgestelde vragen beschikbaar.</Text>
      </Box>
    );
  }

  return (
    <Stack gap={4} className={className}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <MotionBox
            key={index}
            className={cn(
              'border overflow-hidden',
              variantStyles[variant],
              'transition-colors duration-200'
            )}
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: [0.32, 0.72, 0, 1],
                  }
            }
          >
            <button
              type="button"
              id={`faq-button-${index}`}
              aria-expanded={isActive}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer hover:bg-opacity-70 dark:hover:bg-opacity-70 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Text weight="medium" className="pr-4">
                {item.question}
              </Text>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.2,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <IoChevronDown className="h-5 w-5 shrink-0" />
              </motion.span>
            </button>
            <AnimatePresence>
              {isActive && (
                <MotionBox
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  initial={
                    shouldReduceMotion
                      ? { height: 'auto', opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: shouldReduceMotion
                      ? { duration: 0 }
                      : {
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
                  exit={
                    shouldReduceMotion
                      ? { height: 'auto', opacity: 1 }
                      : {
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
                        }
                  }
                >
                  <Box className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { y: 0, opacity: 1 }
                          : { y: 10, opacity: 0 }
                      }
                      animate={{ y: 0, opacity: 1 }}
                      exit={
                        shouldReduceMotion
                          ? { y: 0, opacity: 1 }
                          : { y: -10, opacity: 0 }
                      }
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
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

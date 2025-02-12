import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import { Box } from '@/components/ui/Box';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';

type Color = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';

export type TimelineStep = {
  /** The title of the step */
  title: string;
  /** The description of the step */
  description: string;
  /** Optional custom content to render */
  content?: ReactNode;
  /** Optional date or label */
  date?: string;
  /** Optional color override for this step */
  color?: Color;
};

type TimelineProps = {
  /** Array of timeline steps */
  steps: TimelineStep[];
  /** Optional className for styling */
  className?: string;
  /** Optional pastel color for the timeline */
  color?: Color;
} & ComponentPropsWithoutRef<'div'>;

const MotionBox = motion(Box);

/**
 * Timeline component for displaying a vertical process flow with alternating sides
 */
export const Timeline = ({
  steps,
  className,
  color = 'blue',
  ...props
}: TimelineProps) => {
  const colorClasses = {
    blue: {
      bg: 'bg-pastel-blue/50 dark:bg-pastel-blue-dark/50',
      border: 'border-pastel-blue-dark dark:border-pastel-blue',
      line: 'bg-pastel-blue-dark dark:bg-pastel-blue',
    },
    purple: {
      bg: 'bg-pastel-purple/50 dark:bg-pastel-purple-dark/50',
      border: 'border-pastel-purple-dark dark:border-pastel-purple',
      line: 'bg-pastel-purple-dark dark:bg-pastel-purple',
    },
    green: {
      bg: 'bg-pastel-green/50 dark:bg-pastel-green-dark/50',
      border: 'border-pastel-green-dark dark:border-pastel-green',
      line: 'bg-pastel-green-dark dark:bg-pastel-green',
    },
    pink: {
      bg: 'bg-pastel-pink/50 dark:bg-pastel-pink-dark/50',
      border: 'border-pastel-pink-dark dark:border-pastel-pink',
      line: 'bg-pastel-pink-dark dark:bg-pastel-pink',
    },
    yellow: {
      bg: 'bg-pastel-yellow/50 dark:bg-pastel-yellow-dark/50',
      border: 'border-pastel-yellow-dark dark:border-pastel-yellow',
      line: 'bg-pastel-yellow-dark dark:bg-pastel-yellow',
    },
    teal: {
      bg: 'bg-pastel-teal/50 dark:bg-pastel-teal-dark/50',
      border: 'border-pastel-teal-dark dark:border-pastel-teal',
      line: 'bg-pastel-teal-dark dark:bg-pastel-teal',
    },
  };

  return (
    <Box className={twMerge('relative', className)} {...props}>
      {/* Timeline steps */}
      <Stack gap={6} className="relative">
        {/* Timeline line with decorative elements */}
        <Box className="absolute inset-0">
          {/* Start dot */}
          <Box
            className={twMerge(
              'absolute left-4 md:left-1/2 -top-1 w-3 h-3 rounded-full -translate-x-[5px] md:-translate-x-[6px] z-10',
              colorClasses[color].line,
            )}
          />

          {/* Main line */}
          <MotionBox
            className={twMerge(
              'absolute left-4 md:left-1/2 top-0 h-full w-px -translate-x-[0.5px]',
              colorClasses[color].line,
            )}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          />

          {/* End dot */}
          <Box
            className={twMerge(
              'absolute left-4 md:left-1/2 -bottom-1 w-3 h-3 rounded-full -translate-x-[5px] md:-translate-x-[6px] z-10',
              colorClasses[color].line,
            )}
          />
        </Box>

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const stepColor = step.color || color;

          return (
            <Box
              key={index}
              className="relative grid grid-cols-[auto,1fr] md:grid-cols-[1fr,auto,1fr] items-center"
            >
              {/* Mobile view */}
              <Box className="flex md:hidden">
                {/* Center marker */}
                <MotionBox
                  className="flex justify-center w-8 relative"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.3,
                    delay: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  {/* Horizontal connector line */}
                  <MotionBox
                    className={twMerge(
                      'absolute top-1/2 h-px',
                      'left-4',
                      colorClasses[stepColor].line,
                    )}
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: '32px', opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.2,
                      delay: 0.9,
                      ease: 'easeOut',
                    }}
                  />
                  <Box
                    className={twMerge(
                      'w-4 h-4 rounded-full border z-10',
                      'bg-background dark:bg-background-dark',
                      colorClasses[stepColor].border,
                    )}
                  />
                </MotionBox>
              </Box>

              {/* Mobile content */}
              <Box className="flex flex-col md:hidden">
                <Box className="relative">
                  <Box className="overflow-hidden">
                    <MotionBox
                      initial={{ x: '-100%', opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <Box className="pl-4">
                        <Box className="mb-2">
                          <Text variant="small" color="muted">
                            {step.date}
                          </Text>
                        </Box>

                        <Stack
                          gap={2}
                          className={twMerge(
                            'p-6 border',
                            colorClasses[stepColor].bg,
                            colorClasses[stepColor].border,
                            'text-left',
                          )}
                        >
                          <Heading
                            level="h3"
                            variant="small"
                            className="font-medium"
                          >
                            {step.title}
                          </Heading>
                          <Text variant="default" color="muted">
                            {step.description}
                          </Text>
                          {step.content && (
                            <Box className="mt-2 flex justify-start">
                              {step.content}
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    </MotionBox>
                  </Box>
                  <MotionBox
                    className={twMerge(
                      'absolute left-0 top-[50%] h-px z-10',
                      colorClasses[stepColor].line,
                    )}
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: '16px', opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.2,
                      delay: 0.9,
                      ease: 'easeOut',
                    }}
                  />
                </Box>
              </Box>

              {/* Desktop view */}
              <>
                {/* Left side */}
                <Box className="hidden md:block">
                  {isEven ? (
                    <Box className="overflow-hidden">
                      <MotionBox
                        className="relative"
                        initial={{ x: '100%', opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                      >
                        <Box className="pr-8 relative">
                          <MotionBox
                            className={twMerge(
                              'absolute right-0 top-1/2 h-px',
                              colorClasses[stepColor].line,
                            )}
                            initial={{ width: 0 }}
                            whileInView={{ width: '32px' }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                              duration: 0.2,
                              delay: 0.1 + 0.9,
                              ease: 'easeOut',
                            }}
                          />
                          <Stack
                            gap={2}
                            className={twMerge(
                              'p-6 border',
                              colorClasses[stepColor].bg,
                              colorClasses[stepColor].border,
                              'text-right',
                            )}
                          >
                            <Heading
                              level="h3"
                              variant="small"
                              className="font-medium"
                            >
                              {step.title}
                            </Heading>
                            <Text variant="default" color="muted">
                              {step.description}
                            </Text>
                            {step.content && (
                              <Box className="mt-2 flex justify-end">
                                {step.content}
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      </MotionBox>
                    </Box>
                  ) : (
                    <Box className="pr-4">
                      <Text
                        variant="small"
                        color="muted"
                        className="text-right"
                      >
                        {step.date}
                      </Text>
                    </Box>
                  )}
                </Box>

                {/* Center dot */}
                <MotionBox
                  className="hidden md:flex justify-center w-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.3,
                    delay: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <Box
                    className={twMerge(
                      'w-4 h-4 rounded-full border z-10',
                      'bg-background dark:bg-background-dark',
                      colorClasses[stepColor].border,
                    )}
                  />
                </MotionBox>

                {/* Right side */}
                <Box className="hidden md:block">
                  {!isEven ? (
                    <Box className="overflow-hidden">
                      <MotionBox
                        className="relative"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1,
                          ease: [0.32, 0.72, 0, 1],
                        }}
                      >
                        <Box className="pl-8 relative">
                          <MotionBox
                            className={twMerge(
                              'absolute left-0 top-1/2 h-px',
                              colorClasses[stepColor].line,
                            )}
                            initial={{ width: 0 }}
                            whileInView={{ width: '32px' }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                              duration: 0.2,
                              delay: 0.9,
                              ease: 'easeOut',
                            }}
                          />
                          <Stack
                            gap={2}
                            className={twMerge(
                              'p-6 border',
                              colorClasses[stepColor].bg,
                              colorClasses[stepColor].border,
                              'text-left',
                            )}
                          >
                            <Heading
                              level="h3"
                              variant="small"
                              className="font-medium"
                            >
                              {step.title}
                            </Heading>
                            <Text variant="default" color="muted">
                              {step.description}
                            </Text>
                            {step.content && (
                              <Box className="mt-2 flex justify-start">
                                {step.content}
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      </MotionBox>
                    </Box>
                  ) : (
                    <Box className="pl-4">
                      <Text variant="small" color="muted" className="text-left">
                        {step.date}
                      </Text>
                    </Box>
                  )}
                </Box>
              </>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

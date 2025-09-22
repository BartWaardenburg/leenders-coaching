import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/utilities/cn';
import { motion, easeOut } from 'motion/react';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens';

import { Box } from '@/components/ui/Box';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';

type Color = PastelVariant;

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
  /** Test ID for the component */
  testid?: string;
} & ComponentPropsWithoutRef<'div'>;

const MotionBox = motion.create(Box);

/* Centralized animation configurations */
const transitions = {
  mainLine: {
    duration: 1.5,
    ease: [0.65, 0, 0.35, 1] as const,
  },
  content: {
    duration: 0.4,
    ease: [0.32, 0.72, 0, 1] as const,
  },
  dot: {
    duration: 0.3,
    ease: easeOut,
  },
  connector: {
    duration: 0.2,
    ease: easeOut,
  },
} as const;

/* Animation sequence timing */
const sequence = {
  mainLine: 0,
  content: 0.4,
  dot: 0.8,
  connector: 0.9,
} as const;

/**
 * Timeline component for displaying a vertical process flow with alternating sides
 */
export const Timeline = ({
  steps,
  className,
  color = 'blue',
  testid,
  ...props
}: TimelineProps) => {
  const colorClasses: Record<
    PastelVariant,
    { bg: string; border: string; line: string }
  > = {
    blue: {
      bg: pastelVariant.blue.bgSoft,
      border: pastelVariant.blue.borderDark,
      line: 'bg-pastel-blue-dark dark:bg-pastel-blue',
    },
    purple: {
      bg: pastelVariant.purple.bgSoft,
      border: pastelVariant.purple.borderDark,
      line: 'bg-pastel-purple-dark dark:bg-pastel-purple',
    },
    green: {
      bg: pastelVariant.green.bgSoft,
      border: pastelVariant.green.borderDark,
      line: 'bg-pastel-green-dark dark:bg-pastel-green',
    },
    pink: {
      bg: pastelVariant.pink.bgSoft,
      border: pastelVariant.pink.borderDark,
      line: 'bg-pastel-pink-dark dark:bg-pastel-pink',
    },
    yellow: {
      bg: pastelVariant.yellow.bgSoft,
      border: pastelVariant.yellow.borderDark,
      line: 'bg-pastel-yellow-dark dark:bg-pastel-yellow',
    },
    teal: {
      bg: pastelVariant.teal.bgSoft,
      border: pastelVariant.teal.borderDark,
      line: 'bg-pastel-teal-dark dark:bg-pastel-teal',
    },
  };

  return (
    <Box
      role="list"
      className={cn('relative', className)}
      data-testid={testid}
      {...props}
    >
      {/* Timeline steps */}
      <Stack gap={6} className="relative">
        {/* Timeline line with decorative elements */}
        <Box aria-hidden className="absolute inset-0">
          {/* Start dot */}
          <Box
            className={cn(
              'absolute left-4 md:left-1/2 -top-1 w-3 h-3 rounded-full -translate-x-[5px] md:-translate-x-[6px] z-10',
              colorClasses[color].line
            )}
          />

          {/* Main line */}
          <MotionBox
            className={cn(
              'absolute left-4 md:left-1/2 top-0 h-full w-px -translate-x-[0.5px] origin-top',
              colorClasses[color].line
            )}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={transitions.mainLine}
          />

          {/* End dot */}
          <Box
            className={cn(
              'absolute left-4 md:left-1/2 -bottom-1 w-3 h-3 rounded-full -translate-x-[5px] md:-translate-x-[6px] z-10',
              colorClasses[color].line
            )}
          />
        </Box>

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const stepColor = step.color || color;

          return (
            <Box
              key={index}
              role="listitem"
              className="relative flex flex-col md:flex-row md:items-center"
            >
              {/* Mobile view */}
              <Box className="flex md:hidden">
                {/* Center marker */}
                <Box className="flex justify-center items-center w-8 relative">
                  {/* Horizontal connector line */}
                  <MotionBox
                    className={cn(
                      'absolute top-1/2 left-4 h-px',
                      colorClasses[stepColor].line
                    )}
                    initial={{ width: 0 }}
                    whileInView={{ width: '32px' }}
                    viewport={{ once: true }}
                    transition={{
                      ...transitions.connector,
                      delay: sequence.connector,
                    }}
                  />
                  {/* Dot */}
                  <MotionBox
                    className={cn(
                      'w-4 h-4 rounded-full border z-10',
                      'bg-background dark:bg-background-dark',
                      colorClasses[stepColor].border
                    )}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      ...transitions.dot,
                      delay: sequence.dot,
                    }}
                  />
                </Box>

                {/* Mobile content */}
                <MotionBox
                  className="flex flex-col pl-4 flex-1"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    ...transitions.content,
                    delay: sequence.content,
                  }}
                >
                  {step.date && (
                    <Box className="mb-2">
                      <Text variant="small" color="muted">
                        {step.date}
                      </Text>
                    </Box>
                  )}

                  <Stack
                    gap={2}
                    className={cn(
                      'p-6 border',
                      colorClasses[stepColor].bg,
                      colorClasses[stepColor].border,
                      'text-left'
                    )}
                  >
                    <Heading level="h3" variant="small" className="font-medium">
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
                </MotionBox>
              </Box>

              {/* Desktop view */}
              <>
                {/* Left side */}
                <Box className="hidden md:block md:flex-1">
                  {isEven ? (
                    <Box className="overflow-hidden">
                      <MotionBox
                        className="relative"
                        initial={{ x: '100%', opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                          ...transitions.content,
                          delay: sequence.content,
                        }}
                      >
                        <Box className="pr-8 relative">
                          <MotionBox
                            className={cn(
                              'absolute right-0 top-1/2 h-px',
                              colorClasses[stepColor].line
                            )}
                            initial={{ width: 0 }}
                            whileInView={{ width: '32px' }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                              ...transitions.connector,
                              delay: sequence.connector,
                            }}
                          />
                          <Stack
                            gap={2}
                            className={cn(
                              'p-6 border',
                              colorClasses[stepColor].bg,
                              colorClasses[stepColor].border,
                              'text-right'
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
                  className="hidden md:flex justify-center w-4 relative"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    ...transitions.dot,
                    delay: sequence.dot,
                  }}
                >
                  <Box
                    className={cn(
                      'w-4 h-4 rounded-full border-2 z-10',
                      'bg-background dark:bg-background-dark',
                      colorClasses[stepColor].border
                    )}
                  />
                </MotionBox>

                {/* Right side */}
                <Box className="hidden md:block md:flex-1">
                  {!isEven ? (
                    <Box className="overflow-hidden">
                      <MotionBox
                        className="relative"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{
                          ...transitions.content,
                          delay: sequence.content,
                        }}
                      >
                        <Box className="pl-8 relative">
                          <MotionBox
                            className={cn(
                              'absolute left-0 top-1/2 h-px',
                              colorClasses[stepColor].line
                            )}
                            initial={{ width: 0 }}
                            whileInView={{ width: '32px' }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                              ...transitions.connector,
                              delay: sequence.connector,
                            }}
                          />
                          <Stack
                            gap={2}
                            className={cn(
                              'p-6 border',
                              colorClasses[stepColor].bg,
                              colorClasses[stepColor].border,
                              'text-left'
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

"use client";

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Timeline, type TimelineStep } from '@/components/ui/Timeline';
import { Text } from '@/components/ui/Text';

type SectionTimelineProps = {
  /** The title of the section */
  title?: ReactNode;
  /** Optional description text */
  description?: ReactNode;
  /** Array of timeline steps */
  steps: TimelineStep[];
  /** Optional background color */
  background?: PastelColor;
  /** Whether to show a border */
  border?: boolean;
  /** Whether to show a border under the title */
  showBorder?: boolean;
  /** Maximum width of the content */
  maxWidth?:
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';
} & ComponentPropsWithoutRef<'section'>;

/**
 * Section component for displaying a timeline with optional title and description
 */
export const SectionTimeline = ({
  title,
  description,
  steps,
  background,
  border = false,
  showBorder = false,
  maxWidth = '3xl',
  className,
  ...props
}: SectionTimelineProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={twMerge('py-12', className)}
      {...props}
    >
      <Box className={twMerge('mx-auto', `max-w-${maxWidth}`)}>
        <Stack gap={8}>
          {(title || description) && (
            <Stack space={4} className="text-center">
              {title && (
                <Heading
                  level="h2"
                  variant="large"
                  showBorder={showBorder}
                  borderColor={background}
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text variant="large" className="max-w-2xl mx-auto">
                  {description}
                </Text>
              )}
            </Stack>
          )}
          <Timeline steps={steps} />
        </Stack>
      </Box>
    </Section>
  );
};

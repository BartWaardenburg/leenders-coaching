'use client';

import { Section, type SectionBaseProps } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { Timeline, type TimelineStep } from '@/components/ui/Timeline';

interface SectionTimelineProps extends SectionBaseProps {
  /** Array of timeline steps */
  steps: TimelineStep[];
}

/**
 * Section component for displaying a timeline with optional title and description
 */
export const SectionTimeline = ({
  steps,
  background,
  maxWidth = '7xl',
  ...props
}: SectionTimelineProps) => {
  return (
    <Section maxWidth={maxWidth} background={background} {...props}>
      <Box className="mx-auto max-w-4xl" data-testid="box">
        <Timeline steps={steps} testid="timeline" color={background} />
      </Box>
    </Section>
  );
};

import type { ComponentProps } from 'react';
import type { SectionTimeline } from '@/components/sections/SectionTimeline';
import type { PastelColor } from '@/components/ui/Section';

/* Sanity data type */
export interface SanityTimelineSection extends Record<string, unknown> {
  _type: 'sectionTimeline';
  title?: string;
  displayTitle?: string;
  description?: string;
  steps?: Array<{
    _key: string;
    title: string;
    description: string;
    variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  }>;
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for timeline section */
const isSanityTimelineSection = (
  data: Record<string, unknown>,
): data is SanityTimelineSection => {
  return data._type === 'sectionTimeline';
};

/**
 * Transform timeline section data to component props
 */
export const transformTimelineSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionTimeline> => {
  if (!isSanityTimelineSection(data)) {
    throw new Error('Invalid timeline section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    steps:
      data.steps?.map((step) => ({
        title: step.title,
        description: step.description,
        variant: step.variant,
      })) || [],
    background: data.background,
    border: data.border,
  };
};

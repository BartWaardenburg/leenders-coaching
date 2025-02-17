import type { ComponentProps } from 'react';
import type { SectionTimeline } from '@/components/sections/SectionTimeline';
import type { PastelColor } from '@/components/ui/Section';
import type { TimelineStep } from '@/components/ui/Timeline';

/* Sanity data type */
export interface SanityTimelineSection extends Record<string, unknown> {
  _type: 'sectionTimeline';
  title?: string;
  description?: string;
  steps: TimelineStep[];
  background?: PastelColor;
  border?: boolean;
  showBorder?: boolean;
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
}

/**
 * Type guard for timeline section
 */
export const isTimelineSection = (
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
  if (!isTimelineSection(data)) {
    throw new Error('Invalid timeline section data');
  }

  return {
    title: data.title,
    description: data.description,
    steps: data.steps,
    background: data.background,
    border: data.border,
    showBorder: data.showBorder,
    maxWidth: data.maxWidth,
  };
};

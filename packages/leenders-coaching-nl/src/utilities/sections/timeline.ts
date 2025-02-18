import type { ComponentProps } from 'react';
import type { SectionTimeline } from '@/components/sections/SectionTimeline';
import type { PastelColor } from '@/components/ui/Section';
import type { TimelineStep } from '@/components/ui/Timeline';

/* Sanity data type */
export interface SanityTimelineSection extends Record<string, unknown> {
  _type: 'sectionTimeline';
  title?: string;
  displayTitle?: string;
  description?: string;
  steps: TimelineStep[];
  background?: PastelColor;
  border?: boolean;
  showBorder?: boolean;
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
    title: data.displayTitle || undefined,
    description: data.description,
    steps: data.steps,
    background: data.background,
    border: data.border,
    showBorder: data.showBorder,
  };
};

type TimelineSectionData = {
  title?: string;
  description?: string;
  steps: TimelineStep[];
  background?: PastelColor;
  border?: boolean;
  showBorder?: boolean;
};

export const mapTimelineSection = (data: TimelineSectionData) => {
  return {
    title: data.title,
    description: data.description,
    steps: data.steps,
    background: data.background,
    border: data.border,
    showBorder: data.showBorder,
  };
};

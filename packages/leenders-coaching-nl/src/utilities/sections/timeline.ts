import type { ComponentProps } from 'react';
import type { SectionTimeline } from '@/components/sections/SectionTimeline';
import type { SectionTimeline as SanitySectionTimeline } from '@/types/sanity/schema';

/* Type guard for timeline section */
const isSanitySectionTimeline = (
  data: Record<string, unknown>,
): data is SanitySectionTimeline => {
  return data._type === 'sectionTimeline';
};

/**
 * Transform timeline section data to component props
 */
export const transformTimelineSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionTimeline> => {
  if (!isSanitySectionTimeline(data)) {
    throw new Error('Invalid timeline section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    steps:
      data.steps?.map((step) => ({
        _key: step._key,
        title: step.title || '',
        description: step.description || '',
        variant: step.variant,
      })) || [],
    background: data.background,
    border: data.border,
  };
};

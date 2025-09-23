import type { ComponentProps } from 'react';
import type { SectionTimeline } from '@/components/sections/SectionTimeline';
import type { SectionTimeline as SanitySectionTimeline } from '@/types/sanity/schema';

/**
 * Type guard to check if data is a valid Sanity timeline section.
 * @param data - The data to check.
 * @returns True if data is a valid SanitySectionTimeline.
 */
const isSanitySectionTimeline = (
  data: Record<string, unknown>
): data is SanitySectionTimeline => {
  return data._type === 'sectionTimeline';
};

/**
 * Transform timeline section data to component props.
 * @param data - The raw section data from Sanity.
 * @returns Transformed props for the SectionTimeline component.
 * @throws Error if data is not a valid timeline section.
 */
export const transformTimelineSection = (
  data: Record<string, unknown>
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
        date: step.date,
        color: step.variant,
      })) || [],
    background: data.background,
    border: data.border,
  };
};

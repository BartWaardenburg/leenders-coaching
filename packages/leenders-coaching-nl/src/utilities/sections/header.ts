import type { ComponentProps } from 'react';
import type { SectionHeader } from '@/components/sections/SectionHeader';
import type { SectionHeader as SanitySectionHeader } from '@/types/sanity/schema';

/**
 * Type guard to check if data is a valid Sanity header section.
 * @param data - The data to check.
 * @returns True if data is a valid SanitySectionHeader.
 */
const isSanitySectionHeader = (
  data: Record<string, unknown>
): data is SanitySectionHeader => {
  return data._type === 'sectionHeader';
};

/**
 * Transform header section data to component props.
 * @param data - The raw section data from Sanity.
 * @returns Transformed props for the SectionHeader component.
 * @throws Error if data is not a valid header section.
 */
export const transformHeaderSection = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionHeader> => {
  if (!isSanitySectionHeader(data)) {
    throw new Error('Invalid header section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    background: data.background,
    border: data.border,
    ctas:
      data.ctas?.map((cta) => ({
        href: cta.href || '',
        label: cta.label || '',
        isExternal: cta.isExternal,
        variant: cta.variant,
      })) || [],
  };
};

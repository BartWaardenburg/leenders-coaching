import type { ComponentProps } from 'react';
import type { SectionHeader } from '@/components/sections/SectionHeader';
import type { SectionHeader as SanitySectionHeader } from '@/types/sanity/schema';

/* Type guard for SanityHeaderSection */
const isSanitySectionHeader = (
  data: Record<string, unknown>,
): data is SanitySectionHeader => {
  return data._type === 'sectionHeader';
};

/**
 * Transform header section data to component props
 */
export const transformHeaderSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionHeader> => {
  if (!isSanitySectionHeader(data)) {
    throw new Error('Invalid header section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    background: data.background,
    border: data.border,
    primaryCta: data.primaryCta
      ? {
          href: data.primaryCta.href || '',
          label: data.primaryCta.label || '',
          isExternal: data.primaryCta.isExternal,
          variant: data.primaryCta.variant,
        }
      : undefined,
    secondaryCta: data.secondaryCta
      ? {
          href: data.secondaryCta.href || '',
          label: data.secondaryCta.label || '',
          isExternal: data.secondaryCta.isExternal,
          variant: data.secondaryCta.variant,
        }
      : undefined,
  };
};

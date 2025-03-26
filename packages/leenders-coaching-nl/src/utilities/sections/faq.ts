import type { ComponentProps } from 'react';
import type { SectionFAQ } from '@/components/sections/SectionFAQ';
import type { SectionFAQ as SanitySectionFAQ } from '@/types/sanity/schema';
import type { PortableTextBlock } from '@portabletext/types';

/* Type guard for FAQ section */
const isSanitySectionFAQ = (
  data: Record<string, unknown>,
): data is SanitySectionFAQ => {
  return data._type === 'sectionFAQ';
};

/**
 * Transform FAQ section data to component props
 */
export const transformFAQSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionFAQ> => {
  if (!isSanitySectionFAQ(data)) {
    throw new Error('Invalid FAQ section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    items:
      data.items
        ?.filter((item): item is NonNullable<typeof item> =>
          Boolean(item?._key && item?.question && item?.answer),
        )
        .map((item) => ({
          _key: item._key,
          question: item.question || '',
          answer: (item.answer as PortableTextBlock[]) || [],
        })) || [],
    background: data.background,
    border: data.border,
  };
};

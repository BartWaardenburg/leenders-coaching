import type { ComponentProps } from 'react';
import type { SectionForm } from '@/components/sections/SectionForm';
import type { SectionForm as SanitySectionForm } from '@/types/sanity/schema';

/* Type guard for form section */
const isSanitySectionForm = (
  data: Record<string, unknown>,
): data is SanitySectionForm => {
  return data._type === 'sectionForm';
};

/**
 * Transform form section data to component props
 */
export const transformFormSection = (
  data: Record<string, unknown>,
): Omit<ComponentProps<typeof SectionForm>, 'onSubmit'> => {
  if (!isSanitySectionForm(data)) {
    throw new Error('Invalid form section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    submitLabel: data.form?.submitLabel || undefined,
    background: data.background,
    border: data.border,
  };
};

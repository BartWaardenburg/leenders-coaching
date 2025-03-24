import type { ComponentProps } from 'react';
import type { SectionForm } from '@/components/sections/SectionForm';
import type { PastelColor } from '@/components/ui/Section';

/* Sanity data type */
export interface SanityFormSection extends Record<string, unknown> {
  _type: 'sectionForm';
  title?: string;
  displayTitle?: string;
  description?: string;
  submitLabel?: string;
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for form section */
const isSanityFormSection = (
  data: Record<string, unknown>,
): data is SanityFormSection => {
  return data._type === 'sectionForm';
};

/**
 * Transform form section data to component props
 */
export const transformFormSection = (
  data: Record<string, unknown>,
): Omit<ComponentProps<typeof SectionForm>, 'onSubmit'> => {
  if (!isSanityFormSection(data)) {
    throw new Error('Invalid form section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    submitLabel: data.submitLabel,
    background: data.background,
    border: data.border,
  };
};

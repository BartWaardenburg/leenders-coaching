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

/**
 * Type guard for form section
 */
export const isFormSection = (
  data: Record<string, unknown>,
): data is SanityFormSection => {
  return data._type === 'sectionForm';
};

/**
 * Transform form section data to component props
 */
export const transformFormSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionForm> => {
  if (!isFormSection(data)) {
    throw new Error('Invalid form section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    submitLabel: data.submitLabel,
    background: data.background,
    border: data.border,
    onSubmit: async (formData) => {
      // Handle form submission here
      console.log('Form submitted:', formData);
    },
  };
};

type FormSectionData = {
  title?: string;
  description?: string;
  background?: PastelColor;
  border?: boolean;
};

export const mapFormSection = (data: FormSectionData) => {
  return {
    title: data.title,
    description: data.description,
    background: data.background,
    border: data.border,
  };
};

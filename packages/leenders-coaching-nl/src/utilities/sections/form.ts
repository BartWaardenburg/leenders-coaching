import type { ComponentProps } from 'react';
import type { SectionForm } from '@/components/sections/SectionForm';
import type { PastelColor } from '@/components/ui/Section';

/* Sanity data type */
export interface SanityFormSection extends Record<string, unknown> {
  _type: 'sectionForm';
  title?: string;
  description?: string;
  submitLabel?: string;
  showBorder?: boolean;
  background?: PastelColor;
  border?: boolean;
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
    title: data.title,
    description: data.description,
    submitLabel: data.submitLabel,
    showBorder: data.showBorder,
    background: data.background,
    border: data.border,
    maxWidth: data.maxWidth,
    onSubmit: async (formData) => {
      // Handle form submission here
      console.log('Form submitted:', formData);
    },
  };
};

import type { ContactFormData } from '@/components/sections/SectionForm/SectionForm';
import type { FormConfiguration } from '@/types/sanity/schema';

type ContactFormRequest = ContactFormData & {
  formConfig?: FormConfiguration;
  turnstileToken?: string;
  startedAt?: number;
  company?: string;
};

/**
 * Submit contact form data to the API
 * @param data - The contact form data to submit including optional form configuration
 * @returns Promise that resolves when the form is successfully submitted
 * @throws Error if the API request fails
 */
export const submitContactForm = async (
  data: ContactFormRequest
): Promise<void> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
};

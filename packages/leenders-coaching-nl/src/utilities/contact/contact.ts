import type { ContactFormData } from '@/components/sections/SectionForm/SectionForm';

/**
 * Submit contact form data to the API
 * @param data - The contact form data to submit
 * @returns Promise that resolves when the form is successfully submitted
 * @throws Error if the API request fails
 */
export const submitContactForm = async (
  data: ContactFormData
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

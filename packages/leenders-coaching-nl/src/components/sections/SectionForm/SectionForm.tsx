'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useState } from 'react';
import * as reactHookForm from 'react-hook-form';

import { Section } from '@/components/ui/Section';
import type { PastelVariant } from '@/utilities/tokens';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { submitContactForm } from '@/utilities/contact';
import { useToast } from '@/components/providers/ToastProvider';
import TurnstileWidget from '@/components/ui/TurnstileWidget';

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ToastOptions = {
  variant?: PastelVariant;
  duration?: number;
};

type SectionFormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  background?: PastelVariant;
  border?: boolean;
  form?: {
    _type: 'formConfiguration';
    emailTo?: string;
    emailSubject?: string;
    submitLabel?: string;
  };
} & Omit<ComponentPropsWithoutRef<'section'>, 'onSubmit'>;

/**
 * Section component for displaying a contact form with optional title and description
 */
export const SectionForm = ({
  title,
  description,
  submitLabel,
  background,
  border = false,
  form,
  className,
  ...props
}: SectionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = reactHookForm.useForm<ContactFormData>();

  /* Turnstile token state */
  const [tsToken, setTsToken] = useState('');
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const [company, setCompany] = useState(''); // honeypot

  useEffect(() => setStartedAt(Date.now()), []);

  /* Safely use toast - handle case where ToastProvider is not available during SSG */
  let showToast: ((message: string, options?: ToastOptions) => void) | null =
    null;
  try {
    const toast = useToast();
    showToast = toast.showToast;
  } catch (error) {
    /* Toast provider not available (e.g., during static generation) */
    console.warn('Toast provider not available:', error);
  }

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (!tsToken) throw new Error('turnstile_missing');
      await submitContactForm({
        ...data,
        formConfig: form,
        turnstileToken: tsToken,
        startedAt,
        company,
      });
      setTsToken('');
      reset();
      if (showToast) {
        showToast(
          'Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.',
          {
            variant: 'green',
            duration: 5000,
          }
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (showToast) {
        showToast(
          'Er is iets misgegaan bij het versturen van je bericht. Probeer het later opnieuw.',
          {
            variant: 'pink',
            duration: 5000,
          }
        );
      }
    }
  };

  return (
    <Section
      background={background}
      border={border}
      className={className}
      {...props}
    >
      <Box className="mx-auto @container max-w-2xl">
        <Stack gap={8}>
          {(title || description) && (
            <Stack space={4} className="text-center">
              {title && (
                <Heading
                  level="h2"
                  variant="large"
                  showBorder
                  borderColor={background}
                  textAlign="center"
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text variant="large" className="max-w-2xl mx-auto">
                  {description}
                </Text>
              )}
            </Stack>
          )}
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack gap={6}>
              <Input
                label="Naam"
                error={errors.name?.message}
                {...register('name', { required: 'Naam is verplicht' })}
              />
              <Input
                type="email"
                label="Email"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is verplicht',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ongeldig email adres',
                  },
                })}
              />
              <Input
                label="Onderwerp"
                error={errors.subject?.message}
                {...register('subject', { required: 'Onderwerp is verplicht' })}
              />
              <Input
                as="textarea"
                label="Bericht"
                error={errors.message?.message}
                {...register('message', { required: 'Bericht is verplicht' })}
              />
              <input
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  height: 0,
                  width: 0,
                }}
                aria-hidden="true"
              />
              <input type="hidden" name="startedAt" value={startedAt} />
              <TurnstileWidget cdata="contact" onToken={setTsToken} />
              <Box className="flex w-full @md:justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  fullWidthUntil="md"
                >
                  {submitLabel || form?.submitLabel || 'Verstuur bericht'}
                </Button>
              </Box>
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Section>
  );
};

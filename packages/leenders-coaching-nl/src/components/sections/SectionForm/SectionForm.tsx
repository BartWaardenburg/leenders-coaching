"use client";

import type { ComponentPropsWithoutRef } from 'react';
import { useForm } from 'react-hook-form';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { submitContactForm } from '@/lib/api/contact';
import { useToast } from '@/components/providers/ToastProvider';

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SectionFormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  background?: PastelColor;
  border?: boolean;
} & Omit<ComponentPropsWithoutRef<'section'>, 'onSubmit'>;

/**
 * Section component for displaying a contact form with optional title and description
 */
export const SectionForm = ({
  title,
  description,
  submitLabel = 'Verstuur bericht',
  background,
  border = false,
  className,
  ...props
}: SectionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();
  const { showToast } = useToast();

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      reset();
      showToast('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.', {
        variant: 'green',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast('Er is iets misgegaan bij het versturen van je bericht. Probeer het later opnieuw.', {
        variant: 'pink',
        duration: 5000,
      });
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
                <Box className="max-w-2xl mx-auto">{description}</Box>
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
              <Box className="flex w-full @md:justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  fullWidthOnContainer="form"
                >
                  {submitLabel}
                </Button>
              </Box>
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Section>
  );
};

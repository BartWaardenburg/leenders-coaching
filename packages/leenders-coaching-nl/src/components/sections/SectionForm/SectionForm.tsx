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

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SectionFormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
  showBorder?: boolean;
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
  onSubmit,
  showBorder = false,
  background,
  border = false,
  className,
  ...props
}: SectionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const handleFormSubmit = async (data: ContactFormData) => {
    if (onSubmit) {
      await onSubmit(data);
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
                  showBorder={showBorder}
                  borderColor={background}
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

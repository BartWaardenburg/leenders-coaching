'use client';

import type { ReactNode } from 'react';
import { Box } from '@/components/ui/Box';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Stack } from '@/components/ui/Stack';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

export type AppointmentFormData = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

type AppointmentFormProps = {
  /** Form submission handler */
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  /** React Hook Form register function */
  register: UseFormRegister<AppointmentFormData>;
  /** Form validation errors */
  errors: FieldErrors<AppointmentFormData>;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
  /** Submit button text */
  submitLabel?: string;
};

/**
 * Form component for appointment booking
 */
export const AppointmentForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting = false,
  submitLabel = 'Afspraak aanvragen',
}: AppointmentFormProps): ReactNode => {
  return (
    <Box as="form" onSubmit={onSubmit} className="space-y-4">
      <Stack gap={4}>
        <Box>
          <Input
            {...register('name', { required: 'Naam is verplicht' })}
            label="Naam *"
            placeholder="Je volledige naam"
            error={errors.name?.message}
            disabled={isSubmitting}
          />
        </Box>

        <Box>
          <Input
            type="email"
            {...register('email', {
              required: 'E-mailadres is verplicht',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ongeldig e-mailadres',
              },
            })}
            label="E-mailadres *"
            placeholder="je@email.nl"
            error={errors.email?.message}
            disabled={isSubmitting}
          />
        </Box>

        <Box>
          <Input
            type="tel"
            {...register('phone')}
            label="Telefoonnummer"
            placeholder="06-12345678"
            disabled={isSubmitting}
          />
        </Box>

        <Box>
          <Input
            as="textarea"
            {...register('message')}
            label="Bericht"
            placeholder="Vertel me iets over je vraag of wat je wilt bespreken..."
            rows={4}
            disabled={isSubmitting}
          />
        </Box>

        <Button
          type="submit"
          variant="black"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full"
        >
          {submitLabel}
        </Button>
      </Stack>
    </Box>
  );
};

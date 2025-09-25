'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import type { TimeSlot } from '@/types/sanity/schema';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { TimeSlotSelector } from '@/components/ui/TimeSlotSelector';
import { AppointmentForm } from '@/components/ui/AppointmentForm';
import { useToast } from '@/components/providers/ToastProvider';
import TurnstileWidget from '@/components/ui/TurnstileWidget';

type AppointmentFormData = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  turnstileToken?: string;
  startedAt?: number;
  company?: string;
};

type AppointmentBookingModalProps = {
  /** Whether the modal is open */
  isOpen: boolean;
  /** The selected date for the appointment */
  selectedDate: Date | null;
  /** Available time slots for the selected date */
  availableTimeSlots: TimeSlot[];
  /** Callback when the modal should close */
  onClose: () => void;
  /** Callback when appointment is submitted */
  onSubmit: (
    data: AppointmentFormData & { selectedTimeSlot: TimeSlot }
  ) => Promise<void>;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal variant */
  variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
};

/**
 * Utility function to format date for display
 */
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Modal component for booking appointments
 */
export const AppointmentBookingModal = ({
  isOpen,
  selectedDate,
  availableTimeSlots,
  onClose,
  onSubmit,
  title = 'Afspraak boeken',
  description,
  variant = 'blue',
}: AppointmentBookingModalProps): ReactNode => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [
    hasAttemptedSubmitWithoutTimeSlot,
    setHasAttemptedSubmitWithoutTimeSlot,
  ] = useState(false);
  const [tsToken, setTsToken] = useState('');
  const [company, setCompany] = useState(''); // honeypot

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>();

  const { showToast } = useToast();

  const handleClose = () => {
    setSelectedTimeSlot(null);
    setHasAttemptedSubmitWithoutTimeSlot(false);
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: AppointmentFormData) => {
    if (!selectedTimeSlot) {
      setHasAttemptedSubmitWithoutTimeSlot(true);
      return;
    }

    if (!tsToken) {
      showToast(
        'Er is iets misgegaan met de verificatie. Probeer het opnieuw.',
        { variant: 'pink' }
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        selectedTimeSlot,
        turnstileToken: tsToken,
        startedAt: Date.now(),
        company,
      });
      setTsToken('');
      handleClose();
    } catch (error) {
      console.error('Error submitting appointment:', error);
      showToast(
        'Er is iets misgegaan bij het versturen van je aanvraag. Probeer het later opnieuw.',
        { variant: 'pink' }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      label={title}
      variant={variant}
      className="max-w-2xl"
    >
      <Stack gap={6}>
        <Box>
          <Heading level="h2" variant="large">
            {title}
          </Heading>
          {description && (
            <Text variant="medium" className="mt-2">
              {description}
            </Text>
          )}
        </Box>

        {selectedDate && (
          <Box>
            {selectedDate && (
              <>
                <Text as="span" variant="default" weight="bold">
                  Geselecteerde datum:{' '}
                </Text>
                <Text as="span" weight="medium">
                  {formatDate(selectedDate)}
                </Text>
              </>
            )}
          </Box>
        )}

        <TimeSlotSelector
          timeSlots={availableTimeSlots}
          selectedSlot={selectedTimeSlot}
          onSelectSlot={(slot) => {
            setSelectedTimeSlot(slot);
            if (slot && hasAttemptedSubmitWithoutTimeSlot) {
              setHasAttemptedSubmitWithoutTimeSlot(false);
            }
          }}
          disabled={isSubmitting}
        />

        {!selectedTimeSlot && hasAttemptedSubmitWithoutTimeSlot && (
          <Text variant="small" className="text-foreground/60 text-center">
            Selecteer eerst een tijd om door te gaan
          </Text>
        )}

        <AppointmentForm
          onSubmit={handleSubmit(handleFormSubmit)}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />

        <input
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', height: 0, width: 0 }}
          aria-hidden="true"
        />

        <TurnstileWidget cdata="booking" onToken={setTsToken} />
      </Stack>
    </Modal>
  );
};

'use client';

import type { ReactNode } from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';

import { Section, type SectionBaseProps } from '@/components/ui/Section';
import { Box } from '@/components/ui/Box';
import { Calendar } from '@/components/ui/Calendar';
import { TimeSlotIndicator } from '@/components/ui/TimeSlotIndicator';
import { AppointmentBookingModal } from '@/components/ui/AppointmentBookingModal';
import { useToast } from '@/components/providers/ToastProvider';
import type { DisabledDates } from '@/components/ui/Calendar/calendarUtilities';
import type { TimeSlot, CalendarSettings } from '@/types/sanity/schema';

/**
 * Data structure for appointment form submission.
 */
type AppointmentFormData = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

/**
 * Props for the SectionCalendar component.
 */
interface SectionCalendarProps extends SectionBaseProps {
  /** The initial date to display the calendar for */
  initialDate?: Date;
  /** Optional render prop for day content */
  renderDay?: (date: Date) => ReactNode;
  /** Callback when a day is clicked */
  onSelectDate?: (date: Date) => void;
  /** Configuration for disabled dates */
  disabledDates?: DisabledDates;
  /** Calendar settings including booking configuration */
  settings?: CalendarSettings;
}

/**
 * Returns available time slots for a specific date.
 * @param date - The date to check for available time slots.
 * @param timeSlots - The list of all possible time slots.
 * @returns Array of available time slots for the given date.
 */
const getAvailableTimeSlotsForDate = (
  date: Date,
  timeSlots: TimeSlot[] = []
): TimeSlot[] =>
  timeSlots.filter((slot) => {
    if (!slot.startTime || !slot.isAvailable || slot.dayOfWeek === undefined) {
      return false;
    }

    return date.getDay() === slot.dayOfWeek;
  });

/**
 * Checks if a date has available time slots for booking.
 * @param date - The date to check.
 * @param timeSlots - The list of all possible time slots.
 * @param maxMonthsInFuture - Maximum months in the future to allow booking.
 * @returns True if the date has available time slots, false otherwise.
 */
const hasAvailableTimeSlots = (
  date: Date,
  timeSlots: TimeSlot[] = [],
  maxMonthsInFuture?: number
): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  // Past dates should not be available for booking
  if (checkDate < today) {
    return false;
  }

  // Check maximum months in future limit if set
  if (maxMonthsInFuture !== undefined) {
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + maxMonthsInFuture);
    if (checkDate > maxDate) {
      return false;
    }
  }

  return getAvailableTimeSlotsForDate(date, timeSlots).length > 0;
};

/**
 * Section component for displaying a calendar with optional title and description.
 * Supports appointment booking when enabled in settings.
 *
 * @param props - SectionCalendarProps
 * @returns ReactNode
 */
export const SectionCalendar = ({
  initialDate,
  renderDay,
  onSelectDate,
  disabledDates,
  background,
  settings,
  maxWidth = '5xl',
  ...props
}: SectionCalendarProps): ReactNode => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { showToast } = useToast();
  const showToastRef = useRef(showToast);

  const initialDateRef = useRef<Date>(initialDate ?? new Date());
  const initialDateStable = initialDate ?? initialDateRef.current;

  useEffect(() => {
    showToastRef.current = showToast;
  }, [showToast]);

  /**
   * Creates enhanced disabled dates configuration that includes days without available time slots.
   * @param baseDisabledDates - The original disabled dates configuration.
   * @param timeSlots - Available time slots for booking.
   * @param maxMonthsInFuture - Maximum months in the future to allow booking.
   * @returns Enhanced disabled dates configuration.
   */
  const createEnhancedDisabledDates = useCallback(
    (
      baseDisabledDates?: DisabledDates,
      timeSlots?: TimeSlot[],
      maxMonthsInFuture?: number
    ): DisabledDates => {
      if (!settings?.bookingEnabled || !timeSlots?.length) {
        return baseDisabledDates || {};
      }

      // Get all dates that should be disabled (base disabled dates + days without time slots)
      const disabledDates: Date[] = [];

      // Add base disabled dates if they exist
      if (baseDisabledDates?.dates) {
        disabledDates.push(...baseDisabledDates.dates);
      }

      // For booking-enabled calendars, we need to disable days without available time slots
      // We'll generate dates for the past 1 month and next 6 months and check each one
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset to start of day for consistent comparison

      // Start from 1 month ago to catch any past dates that might still be showing
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() - 1);

      // End 6 months in the future (same as maxMonthsInFuture)
      const endDate = new Date(today);
      endDate.setMonth(endDate.getMonth() + (maxMonthsInFuture ?? 6));

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        // Skip if this date doesn't have available time slots
        if (!hasAvailableTimeSlots(currentDate, timeSlots, maxMonthsInFuture)) {
          disabledDates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Add all dates beyond maxMonthsInFuture to disabled dates
      if (maxMonthsInFuture !== undefined) {
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + maxMonthsInFuture);
        maxDate.setDate(maxDate.getDate() + 1); // Start from the day after maxMonthsInFuture

        // Add dates for the next 2 years to ensure we cover all possible calendar views
        const farFutureDate = new Date(today);
        farFutureDate.setFullYear(farFutureDate.getFullYear() + 2);

        const futureDate = new Date(maxDate);
        while (futureDate <= farFutureDate) {
          disabledDates.push(new Date(futureDate));
          futureDate.setDate(futureDate.getDate() + 1);
        }
      }

      return {
        ...baseDisabledDates,
        dates: disabledDates,
      };
    },
    [settings?.bookingEnabled]
  );

  /**
   * Renders a day cell in the calendar, showing time slot indicators if booking is enabled.
   * Falls back to custom renderDay if provided.
   */
  const renderDayWithTimeSlots = useCallback(
    (date: Date): ReactNode => {
      if (settings?.bookingEnabled && settings?.availableTimeSlots) {
        const maxMonthsInFuture = 6; // Same as Calendar component
        // Use the enhanced disabled dates that include the 6-month limit
        const enhancedDisabledDates = createEnhancedDisabledDates(
          disabledDates,
          settings.availableTimeSlots,
          maxMonthsInFuture
        );

        return (
          <TimeSlotIndicator
            date={date}
            timeSlots={settings.availableTimeSlots}
            showIndicators={true}
            disabledDates={enhancedDisabledDates}
          />
        );
      }

      return renderDay?.(date);
    },
    [
      settings?.bookingEnabled,
      settings?.availableTimeSlots,
      renderDay,
      disabledDates,
      createEnhancedDisabledDates,
    ]
  );

  /**
   * Handles date selection in the calendar.
   * If booking is enabled, opens the booking modal (only clickable dates have available slots).
   * Otherwise, calls the onSelectDate callback.
   */
  const handleDateSelect = useCallback(
    (date: Date): void => {
      if (settings?.bookingEnabled) {
        setSelectedDate(date);
        setIsBookingModalOpen(true);
      } else {
        onSelectDate?.(date);
      }
    },
    [settings?.bookingEnabled, onSelectDate]
  );

  /**
   * Handles appointment form submission.
   * Sends the appointment data to the API and shows a toast on success or error.
   */
  const handleAppointmentSubmit = useCallback(
    async (
      data: AppointmentFormData & { selectedTimeSlot: TimeSlot }
    ): Promise<void> => {
      try {
        const response = await fetch('/api/appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            selectedDate: selectedDate?.toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit appointment');
        }

        const successMessage =
          settings?.bookingFormConfig?.successMessage ||
          'Bedankt voor je afspraak aanvraag! Ik nemen zo snel mogelijk contact met je op.';

        showToastRef.current(successMessage, {
          variant: 'green',
          duration: 5000,
        });
      } catch (error) {
        console.error('Error submitting appointment:', error);

        showToastRef.current(
          'Er is iets misgegaan bij het versturen van je aanvraag. Probeer het later opnieuw.',
          { variant: 'pink' }
        );
      }
    },
    [selectedDate, settings?.bookingFormConfig?.successMessage]
  );

  return (
    <>
      <Section maxWidth={maxWidth} background={background} {...props}>
        <Box className="mx-auto">
          <Calendar
            initialDate={initialDateStable}
            renderDay={renderDayWithTimeSlots}
            onSelectDate={handleDateSelect}
            disabledDates={createEnhancedDisabledDates(
              disabledDates,
              settings?.availableTimeSlots,
              settings?.bookingEnabled ? 6 : undefined
            )}
            maxMonthsInFuture={settings?.bookingEnabled ? 6 : undefined}
          />
        </Box>
      </Section>

      {/* Booking modal */}
      {settings?.bookingEnabled && (
        <AppointmentBookingModal
          isOpen={isBookingModalOpen}
          selectedDate={selectedDate}
          availableTimeSlots={
            selectedDate
              ? getAvailableTimeSlotsForDate(
                  selectedDate,
                  settings.availableTimeSlots
                )
              : []
          }
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedDate(null);
          }}
          onSubmit={handleAppointmentSubmit}
          title={settings.bookingFormConfig?.title}
          description={settings.bookingFormConfig?.description}
          variant={background}
        />
      )}
    </>
  );
};

'use client';

import type { ReactNode } from 'react';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import type { TimeSlot } from '@/types/sanity/schema';
import type { DisabledDates } from '@/components/ui/Calendar/calendarUtilities';
import {
  isPastDay,
  isDateDisabled,
} from '@/components/ui/Calendar/calendarUtilities';

type TimeSlotIndicatorProps = {
  /** The date to check for time slots */
  date: Date;
  /** Array of time slots (both available and unavailable) */
  timeSlots?: TimeSlot[];
  /** Maximum number of slots to display */
  maxSlots?: number;
  /** Whether to show slot indicators */
  showIndicators?: boolean;
  /** Configuration for disabled dates */
  disabledDates?: DisabledDates;
};

/**
 * Utility function to check if a time slot matches a specific date (by day of week)
 */
const isTimeSlotForDate = (date: Date, timeSlot: TimeSlot): boolean => {
  if (!timeSlot.startTime || timeSlot.dayOfWeek === undefined) {
    // console.log(
    //   'isTimeSlotForDate: returning false due to missing startTime or dayOfWeek',
    //   {
    //     startTime: timeSlot.startTime,
    //     dayOfWeek: timeSlot.dayOfWeek,
    //   }
    // );
    return false;
  }

  const result = date.getDay() === timeSlot.dayOfWeek;
  // console.log('isTimeSlotForDate:', {
  //   date: date.toISOString(),
  //   dateDay: date.getDay(),
  //   timeSlotDay: timeSlot.dayOfWeek,
  //   startTime: timeSlot.startTime,
  //   result,
  // });

  return result;
};

/**
 * Utility function to check if a date is interactive (clickable) in the calendar
 */
const isDateInteractive = (
  date: Date,
  disabledDates?: DisabledDates
): boolean => {
  const isPast = isPastDay(date);
  const isDisabled = isDateDisabled(date, disabledDates);
  const result = !isPast && !isDisabled;

  // console.log('isDateInteractive:', {
  //   date: date.toISOString(),
  //   dateDay: date.getDay(),
  //   isPast,
  //   isDisabled,
  //   result,
  //   disabledDates,
  // });

  return result;
};

/**
 * Utility function to format time from HH:MM string
 */
const formatTime = (timeString?: string): string => {
  if (!timeString) return '';

  // Time is already in HH:MM format, just return it
  return timeString;
};

/**
 * Utility function to calculate end time based on start time and duration
 */
const calculateEndTime = (startTime?: string, duration?: number): string => {
  if (!startTime || duration === undefined || duration <= 0) return '';

  const timeParts = startTime.split(':');
  if (timeParts.length !== 2) return '';

  const hours = parseInt(timeParts[0]!, 10);
  const minutes = parseInt(timeParts[1]!, 10);

  // Validate that the time parsing was successful
  if (isNaN(hours) || isNaN(minutes)) return '';

  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);

  // At this point, duration is guaranteed to be a number due to the type guard above
  const endDate = new Date(startDate.getTime() + (duration as number) * 60000); // duration in minutes

  return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
};

/**
 * Component to display time slots for a specific date in the calendar.
 * Available slots are shown normally, while unavailable slots are displayed with strikethrough styling.
 */
export const TimeSlotIndicator = ({
  date,
  timeSlots = [],
  maxSlots = 3,
  showIndicators = true,
  disabledDates,
}: TimeSlotIndicatorProps): ReactNode => {
  // Debug: log the props to see what's being passed
  // console.log('TimeSlotIndicator props:', {
  //   date: date.toISOString(),
  //   timeSlotsLength: timeSlots.length,
  //   maxSlots,
  //   showIndicators,
  //   disabledDates,
  //   dateDay: date.getDay(),
  // });

  if (!showIndicators || timeSlots.length === 0) {
    // console.log(
    //   'TimeSlotIndicator: returning null due to showIndicators or empty timeSlots'
    // );
    return null;
  }

  // Only show time slots on interactive (clickable) dates
  if (!isDateInteractive(date, disabledDates)) {
    // console.log(
    //   'TimeSlotIndicator: returning null due to non-interactive date'
    // );
    return null;
  }

  // Filter time slots that match the day of week for this specific date
  const matchingSlots = timeSlots.filter((slot) =>
    isTimeSlotForDate(date, slot)
  );

  // console.log('TimeSlotIndicator: matchingSlots length:', matchingSlots.length);

  if (matchingSlots.length === 0) {
    // console.log('TimeSlotIndicator: returning null due to no matching slots');
    return null;
  }

  // Separate available and unavailable slots
  const availableSlots = matchingSlots.filter((slot) => slot.isAvailable);
  const unavailableSlots = matchingSlots.filter((slot) => !slot.isAvailable);

  // Combine slots with available ones first, then unavailable ones
  const allSlots = [...availableSlots, ...unavailableSlots];

  // Limit the number of displayed slots
  const displaySlots = allSlots.slice(0, maxSlots);
  const remainingCount = allSlots.length - maxSlots;

  return (
    <Box className="space-y-1">
      {displaySlots.map((slot, index) => {
        const startTime = formatTime(slot.startTime);
        const endTime = calculateEndTime(slot.startTime, slot.duration);
        const isUnavailable = !slot.isAvailable;

        return (
          <Text
            key={`${slot.startTime}-${slot.duration}-${index}`}
            variant="small"
            className={`text-xs leading-tight ${
              isUnavailable
                ? 'text-foreground/50 line-through'
                : 'text-foreground/80'
            }`}
          >
            <span className="hidden sm:inline">
              {startTime && endTime ? `${startTime} - ${endTime}` : startTime}
            </span>
            <span className="sm:hidden">{startTime}</span>
          </Text>
        );
      })}
      {remainingCount > 0 && (
        <Text
          variant="small"
          className="text-xs text-foreground/60 leading-tight"
        >
          +{remainingCount} meer
        </Text>
      )}
    </Box>
  );
};

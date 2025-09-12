import type { ComponentProps } from 'react';
import type { SectionCalendar } from '@/components/sections/SectionCalendar';
import type {
  DisabledDates,
  DayOfWeek,
} from '@/components/ui/Calendar/calendarUtilities';
import type { SectionCalendar as SanitySectionCalendar } from '@/types/sanity/schema';

/**
 * Type guard to check if data is a valid Sanity calendar section.
 * @param data - The data to check.
 * @returns True if data is a valid SanitySectionCalendar.
 */
const isSanitySectionCalendar = (
  data: Record<string, unknown>
): data is SanitySectionCalendar => {
  return data._type === 'sectionCalendar' && !!data.settings;
};

/**
 * Transform calendar section data to component props.
 * @param data - The raw section data from Sanity.
 * @returns Transformed props for the SectionCalendar component.
 * @throws Error if data is not a valid calendar section or settings are missing.
 */
export const transformCalendarSection = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionCalendar> => {
  if (!isSanitySectionCalendar(data)) {
    throw new Error('Invalid calendar section data');
  }

  const { settings } = data;

  if (!settings) {
    throw new Error('Calendar settings are required');
  }

  /* Transform disabled dates. */
  const disabledDates: DisabledDates = {
    daysOfWeek: settings.disabledDates?.daysOfWeek as DayOfWeek[] | undefined,
    dates: settings.disabledDates?.dates?.map((date) => new Date(date)),
    ranges: settings.disabledDates?.ranges?.map((range) => ({
      start: new Date(range.start || ''),
      end: new Date(range.end || ''),
    })),
  };

  /* Handle before/after date restrictions by adding them as ranges. */
  if (settings.disabledDates?.before) {
    const beforeDate = new Date(settings.disabledDates.before);
    const startOfTime = new Date('1900-01-01');
    disabledDates.ranges = [
      ...(disabledDates.ranges || []),
      { start: startOfTime, end: beforeDate },
    ];
  }

  if (settings.disabledDates?.after) {
    const afterDate = new Date(settings.disabledDates.after);
    const endOfTime = new Date('2100-12-31');
    disabledDates.ranges = [
      ...(disabledDates.ranges || []),
      { start: afterDate, end: endOfTime },
    ];
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    initialDate: settings.initialDate
      ? new Date(settings.initialDate)
      : undefined,
    disabledDates,
    background: data.background,
    border: data.border,
  };
};

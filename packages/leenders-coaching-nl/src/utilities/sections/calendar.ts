import type { ComponentProps } from 'react';
import type { SectionCalendar } from '@/components/sections/SectionCalendar';
import type {
  DisabledDates,
  DayOfWeek,
} from '@/components/ui/Calendar/calendarUtilities';
import type { SectionCalendar as SanitySectionCalendar } from '@/types/sanity/schema';

/* Type guard for calendar section */
const isSanitySectionCalendar = (
  data: Record<string, unknown>,
): data is SanitySectionCalendar => {
  return data._type === 'sectionCalendar' && !!data.settings;
};

/**
 * Transform calendar section data to component props
 */
export const transformCalendarSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionCalendar> => {
  if (!isSanitySectionCalendar(data)) {
    throw new Error('Invalid calendar section data');
  }

  const { settings } = data;

  if (!settings) {
    throw new Error('Calendar settings are required');
  }

  // Transform disabled dates
  const disabledDates: DisabledDates = {
    daysOfWeek: settings.disabledDates?.daysOfWeek as DayOfWeek[] | undefined,
    dates: settings.disabledDates?.dates?.map((date) => new Date(date)),
    ranges: settings.disabledDates?.ranges?.map((range) => ({
      start: new Date(range.start || ''),
      end: new Date(range.end || ''),
    })),
  };

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

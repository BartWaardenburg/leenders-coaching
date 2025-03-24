import type { ComponentProps } from 'react';
import type { SectionCalendar } from '@/components/sections/SectionCalendar';
import type { PastelColor } from '@/components/ui/Section';
import type { DisabledDates } from '@/components/ui/Calendar/calendarUtilities';

/* Sanity data type */
export interface SanityCalendarSection extends Record<string, unknown> {
  _type: 'sectionCalendar';
  title?: string;
  displayTitle?: string;
  description?: string;
  initialDate?: string;
  disabledDates?: DisabledDates;
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for calendar section */
const isSanityCalendarSection = (
  data: Record<string, unknown>,
): data is SanityCalendarSection => {
  return data._type === 'sectionCalendar';
};

/**
 * Transform calendar section data to component props
 */
export const transformCalendarSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionCalendar> => {
  if (!isSanityCalendarSection(data)) {
    throw new Error('Invalid calendar section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    initialDate: data.initialDate ? new Date(data.initialDate) : undefined,
    disabledDates: data.disabledDates,
    background: data.background,
    border: data.border,
  };
};

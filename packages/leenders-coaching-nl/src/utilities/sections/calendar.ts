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
  initialDate?: string; // ISO date string
  disabledDates?: DisabledDates;
  background?: PastelColor;
  border?: boolean;
  showBorder?: boolean;
}

/**
 * Type guard for calendar section
 */
export const isCalendarSection = (
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
  if (!isCalendarSection(data)) {
    throw new Error('Invalid calendar section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    initialDate: data.initialDate ? new Date(data.initialDate) : undefined,
    disabledDates: data.disabledDates,
    background: data.background,
    border: data.border,
    showBorder: data.showBorder,
  };
};

type CalendarSectionData = {
  title?: string;
  description?: string;
  showBorder?: boolean;
  background?: PastelColor;
  border?: boolean;
  initialDate?: string;
  disabledDates?: DisabledDates;
};

export const mapCalendarSection = (data: CalendarSectionData) => {
  return {
    title: data.title,
    description: data.description,
    showBorder: data.showBorder,
    background: data.background,
    border: data.border,
    initialDate: data.initialDate ? new Date(data.initialDate) : undefined,
    disabledDates: data.disabledDates,
  };
};

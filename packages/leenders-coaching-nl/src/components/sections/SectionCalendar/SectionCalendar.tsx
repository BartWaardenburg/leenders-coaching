import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Section, type PastelColor } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Box } from '@/components/ui/Box';
import { Calendar } from '@/components/ui/Calendar';
import { Text } from '@/components/ui/Text';
import type { DisabledDates } from '@/components/ui/Calendar/calendarUtilities';

type SectionCalendarProps = {
  /** The title of the section */
  title?: ReactNode;
  /** Optional description text */
  description?: ReactNode;
  /** The initial date to display the calendar for */
  initialDate?: Date;
  /** Optional render prop for day content */
  renderDay?: (date: Date) => ReactNode;
  /** Callback when a day is clicked */
  onSelectDate?: (date: Date) => void;
  /** Configuration for disabled dates */
  disabledDates?: DisabledDates;
  /** Optional background color */
  background?: PastelColor;
  /** Whether to show a border */
  border?: boolean;
  /** Whether to show a border under the title */
  showBorder?: boolean;
} & ComponentPropsWithoutRef<'section'>;

/**
 * Section component for displaying a calendar with optional title and description
 */
export const SectionCalendar = ({
  title,
  description,
  initialDate = new Date(),
  renderDay,
  onSelectDate,
  disabledDates,
  background,
  border = false,
  showBorder = false,
  className,
  ...props
}: SectionCalendarProps) => {
  return (
    <Section
      background={background}
      border={border}
      className={className}
      maxWidth="5xl"
      {...props}
    >
      <Box className="mx-auto">
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
                <Text variant="large" className="max-w-2xl mx-auto">
                  {description}
                </Text>
              )}
            </Stack>
          )}
          <Calendar
            initialDate={initialDate}
            renderDay={renderDay}
            onSelectDate={onSelectDate}
            disabledDates={disabledDates}
          />
        </Stack>
      </Box>
    </Section>
  );
};

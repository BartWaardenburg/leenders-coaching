import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimeSlotIndicator } from './TimeSlotIndicator';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Heading';
import { Grid } from '@/components/ui/Grid';
import type { TimeSlot } from '@/types/sanity/schema';
import type { DisabledDates } from '@/components/ui/Calendar/calendarUtilities';

// Create future dates for different scenarios
const today = new Date();
const getNextMonday = () => {
  const monday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  while (monday.getDay() !== 1) {
    monday.setDate(monday.getDate() + 1);
  }
  return monday;
};

const getNextTuesday = () => {
  const tuesday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  while (tuesday.getDay() !== 2) {
    tuesday.setDate(tuesday.getDate() + 1);
  }
  return tuesday;
};

const getNextWednesday = () => {
  const wednesday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  while (wednesday.getDay() !== 3) {
    wednesday.setDate(wednesday.getDate() + 1);
  }
  return wednesday;
};

// Mock time slots for different days
const mondayTimeSlots: TimeSlot[] = [
  {
    _type: 'timeSlot',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '10:30',
    duration: 90,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '14:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '15:30',
    duration: 60,
    isAvailable: false,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '17:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '18:30',
    duration: 90,
    isAvailable: true,
  },
];

const tuesdayTimeSlots: TimeSlot[] = [
  {
    _type: 'timeSlot',
    dayOfWeek: 2, // Tuesday
    startTime: '08:30',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 2,
    startTime: '11:00',
    duration: 90,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 2,
    startTime: '13:30',
    duration: 60,
    isAvailable: false,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 2,
    startTime: '16:00',
    duration: 60,
    isAvailable: true,
  },
];

const mixedTimeSlots: TimeSlot[] = [
  ...mondayTimeSlots,
  ...tuesdayTimeSlots,
  {
    _type: 'timeSlot',
    dayOfWeek: 3, // Wednesday
    startTime: '10:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 3,
    startTime: '14:00',
    duration: 90,
    isAvailable: false,
  },
];

const mockDisabledDates: DisabledDates = {
  daysOfWeek: [0, 6], // Disable weekends
  dates: [new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)], // Disable a specific date
  ranges: [
    {
      start: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000),
      end: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000),
    },
  ],
};

const meta = {
  title: 'UI/TimeSlotIndicator',
  component: TimeSlotIndicator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Component to display time slots for a specific date in calendar with availability indicators. Shows available slots normally and unavailable slots with strikethrough styling.',
      },
    },
  },
  argTypes: {
    date: {
      control: 'date',
      description: 'The date to check for time slots',
    },
    timeSlots: {
      control: false,
      description: 'Array of time slots (both available and unavailable)',
    },
    maxSlots: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of slots to display',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Whether to show slot indicators',
    },
    disabledDates: {
      control: false,
      description: 'Configuration for disabled dates',
    },
  },
} satisfies Meta<typeof TimeSlotIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: getNextMonday(),
    timeSlots: mondayTimeSlots,
    maxSlots: 3,
    showIndicators: true,
    disabledDates: undefined,
  },
};

export const WithUnavailableSlots: Story = {
  args: {
    date: getNextMonday(),
    timeSlots: mondayTimeSlots,
    maxSlots: 5,
    showIndicators: true,
    disabledDates: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows both available and unavailable time slots. Unavailable slots are displayed with strikethrough styling.',
      },
    },
  },
};

export const LimitedDisplay: Story = {
  args: {
    date: getNextMonday(),
    timeSlots: mondayTimeSlots,
    maxSlots: 2,
    showIndicators: true,
    disabledDates: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Limits the number of displayed slots and shows a count of remaining slots.',
      },
    },
  },
};

export const HiddenIndicators: Story = {
  args: {
    date: getNextMonday(),
    timeSlots: mondayTimeSlots,
    maxSlots: 3,
    showIndicators: false,
    disabledDates: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'When showIndicators is false, no time slots are displayed.',
      },
    },
  },
};

export const EmptyTimeSlots: Story = {
  args: {
    date: getNextMonday(),
    timeSlots: [],
    maxSlots: 3,
    showIndicators: true,
    disabledDates: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'When no time slots are provided, nothing is displayed.',
      },
    },
  },
};

export const DifferentDays: Story = {
  args: {
    date: getNextTuesday(),
    timeSlots: mixedTimeSlots,
    maxSlots: 4,
    showIndicators: true,
    disabledDates: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows time slots for Tuesday when provided with mixed day slots.',
      },
    },
  },
};

export const DisabledDate: Story = {
  args: {
    date: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // Disabled date
    timeSlots: mondayTimeSlots,
    maxSlots: 3,
    showIndicators: true,
    disabledDates: mockDisabledDates,
  },
  parameters: {
    docs: {
      description: {
        story:
          'For disabled dates, no time slots are shown even if they exist.',
      },
    },
  },
};

export const WeekendDate: Story = {
  args: {
    date: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000), // Sunday
    timeSlots: mondayTimeSlots,
    maxSlots: 3,
    showIndicators: true,
    disabledDates: mockDisabledDates,
  },
  parameters: {
    docs: {
      description: {
        story: 'Weekend dates are disabled and show no time slots.',
      },
    },
  },
};

export const ResponsiveDisplay: Story = {
  args: {
    date: getNextMonday(),
    timeSlots: mondayTimeSlots,
    maxSlots: 4,
    showIndicators: true,
    disabledDates: undefined,
  },
  render: (args) => (
    <Box className="space-y-4">
      <Heading level="h3">Responsive Time Display</Heading>
      <Text className="text-sm text-gray-600 mb-4">
        On mobile devices, only start times are shown. On larger screens, full
        time ranges are displayed.
      </Text>
      <Box className="border border-gray-200 p-4 rounded">
        <TimeSlotIndicator {...args} />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates responsive behavior - shows only start times on mobile, full ranges on desktop.',
      },
    },
  },
};

export const CalendarGrid: Story = {
  args: {
    date: getNextMonday(),
    timeSlots: mixedTimeSlots,
    maxSlots: 3,
    showIndicators: true,
    disabledDates: mockDisabledDates,
  },
  render: (args) => {
    const dates = [
      { label: 'Monday', date: getNextMonday(), day: 1 },
      { label: 'Tuesday', date: getNextTuesday(), day: 2 },
      { label: 'Wednesday', date: getNextWednesday(), day: 3 },
    ];

    return (
      <Box className="space-y-4">
        <Heading level="h3">Calendar Grid View</Heading>
        <Text className="text-sm text-gray-600 mb-4">
          TimeSlotIndicator in a calendar grid context showing different days.
        </Text>
        <Grid cols={{ base: 1, md: 3 }} gap={4}>
          {dates.map(({ label, date, day }) => (
            <Box key={label} className="border border-gray-200 p-3 rounded">
              <Text weight="medium" className="mb-2">
                {label}
              </Text>
              <Text className="text-xs text-gray-500 mb-2">
                {date.toLocaleDateString('nl-NL')}
              </Text>
              <TimeSlotIndicator
                {...args}
                date={date}
                timeSlots={mixedTimeSlots.filter(
                  (slot) => slot.dayOfWeek === day
                )}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how TimeSlotIndicator appears in a calendar grid with different days.',
      },
    },
  },
};

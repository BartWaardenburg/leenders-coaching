import type { Meta, StoryObj } from '@storybook/nextjs';
import { Calendar } from './Calendar';
import { Box } from '../Box';
import { Text } from '../Text';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    initialDate: new Date('2024-03-15'), // Fixed date for consistent Storybook/Chromatic testing
    onSelectDate: (date) => {
      console.log('Selected date:', date.toLocaleDateString());
    },
  },
};

export const WithCustomDayContent: Story = {
  args: {
    initialDate: new Date('2024-03-15'), // Fixed date for consistent Storybook/Chromatic testing
    onSelectDate: (date) => {
      console.log('Selected date:', date.toLocaleDateString());
    },
    renderDay: (date) =>
      date.getDate() === 15 && (
        <Box className="border border-foreground/80 p-2 mt-1 hover:bg-foreground/5 transition-colors">
          <Text variant="small">Event at 2 PM</Text>
        </Box>
      ),
  },
};

/* Fixed dates for consistent Storybook/Chromatic testing */
const nextWeek = new Date('2024-03-22');
const nextMonth = new Date('2024-04-15');

export const WithDisabledDates: Story = {
  args: {
    initialDate: new Date('2024-03-15'), // Fixed date for consistent Storybook/Chromatic testing
    onSelectDate: (date) => {
      console.log('Selected date:', date.toLocaleDateString());
    },
    disabledDates: {
      // Disable weekends
      daysOfWeek: [0, 6],
      // Disable specific dates
      dates: [new Date('2024-03-15')], // Fixed date for consistent Storybook/Chromatic testing
      // Disable a date range
      ranges: [
        {
          start: nextWeek,
          end: nextMonth,
        },
      ],
    },
  },
};

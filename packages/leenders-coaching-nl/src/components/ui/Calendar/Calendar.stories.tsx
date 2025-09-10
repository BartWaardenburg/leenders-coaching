import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Calendar } from './Calendar';
import { Box } from '../Box';
import { Text } from '../Text';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    initialDate: {
      control: 'date',
      description: 'The initial date to display in the calendar',
    },
    onSelectDate: {
      action: 'dateSelected',
      description: 'Callback function when a date is selected',
    },
    renderDay: {
      control: false,
      description: 'Custom render function for day content',
    },
    disabledDates: {
      control: false,
      description: 'Configuration for disabled dates',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: (date) => {
      console.log('Selected date:', date.toLocaleDateString());
    },
  },
  render: (args) => {
    // Convert timestamp to Date object if needed (for Storybook date control)
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas }) => {
    // Wait for calendar to be visible
    const monthElements = canvas.getAllByText('Maart 2024');
    expect(monthElements.length).toBeGreaterThan(0);
    expect(canvas.getByText('Ma')).toBeInTheDocument(); // Day header
    await waitForMotionAnimations({ canvas });
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
  render: (args) => {
    // Convert timestamp to Date object if needed (for Storybook date control)
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas }) => {
    // Wait for calendar to be visible
    const monthElements = canvas.getAllByText('Maart 2024');
    expect(monthElements.length).toBeGreaterThan(0);
    expect(canvas.getByText('Ma')).toBeInTheDocument(); // Day header
    expect(canvas.getByText('Event at 2 PM')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
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
  render: (args) => {
    // Convert timestamp to Date object if needed (for Storybook date control)
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas }) => {
    // Wait for calendar to be visible
    const monthElements = canvas.getAllByText('Maart 2024');
    expect(monthElements.length).toBeGreaterThan(0);
    expect(canvas.getByText('Ma')).toBeInTheDocument(); // Day header
    await waitForMotionAnimations({ canvas });
  },
};

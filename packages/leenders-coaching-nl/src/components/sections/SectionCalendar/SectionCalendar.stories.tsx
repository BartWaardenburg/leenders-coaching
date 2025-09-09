import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionCalendar } from './SectionCalendar';

const meta = {
  title: 'Sections/SectionCalendar',
  component: SectionCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Show top and bottom borders',
    },
    initialDate: {
      control: 'date',
      description: 'The initial date to display in the calendar',
    },
    renderDay: {
      control: false,
      description: 'Custom render function for day content',
    },
  },
} satisfies Meta<typeof SectionCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Calendar',
    description: 'Select a date to schedule your appointment.',
    initialDate: new Date('2024-03-15'), // Fixed date for consistent Storybook/Chromatic testing
  },
  render: (args) => {
    // Convert timestamp to Date object if needed (for Storybook date control)
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <SectionCalendar {...args} initialDate={initialDate} />;
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
  },
  render: (args) => {
    // Convert timestamp to Date object if needed (for Storybook date control)
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <SectionCalendar {...args} initialDate={initialDate} />;
  },
};

export const WithBackgroundAndBorder: Story = {
  args: {
    ...Default.args,
    background: 'blue',
    border: true,
  },
  render: (args) => {
    // Convert timestamp to Date object if needed (for Storybook date control)
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <SectionCalendar {...args} initialDate={initialDate} />;
  },
};

export const WithCustomDayContent: Story = {
  args: {
    ...Default.args,
    background: 'blue',
    border: true,
    renderDay: (date: Date) => {
      /* Example of rendering available time slots */
      const day = date.getDay();
      if (day === 0 || day === 6) return null; // Weekend
      return (
        <div className="text-xs text-foreground/70">
          {day % 2 === 0 ? '2 slots available' : '1 slot available'}
        </div>
      );
    },
  },
  render: (args) => {
    // Convert timestamp to Date object if needed (for Storybook date control)
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <SectionCalendar {...args} initialDate={initialDate} />;
  },
};

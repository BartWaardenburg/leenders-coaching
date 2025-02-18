import type { Meta, StoryObj } from '@storybook/react';
import { SectionCalendar } from './SectionCalendar';

const meta = {
  title: 'Sections/SectionCalendar',
  component: SectionCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
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
    showBorder: {
      control: 'boolean',
      description: 'Show border under heading',
    },
  },
} satisfies Meta<typeof SectionCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Calendar',
    description: 'Select a date to schedule your appointment.',
    initialDate: new Date(),
  },
};

export const WithBorder: Story = {
  args: {
    ...Default.args,
    showBorder: true,
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
  },
};

export const WithBackgroundAndBorder: Story = {
  args: {
    ...Default.args,
    background: 'blue',
    border: true,
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
};

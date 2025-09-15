import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionCalendar } from './SectionCalendar';
import { Text } from '../../ui/Text/Text';
import { mockCalendarSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionCalendar',
  component: SectionCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'De titel van de sectie',
      required: true,
    },
    description: {
      control: 'text',
      description: 'De beschrijving tekst',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
    },
    border: {
      control: 'boolean',
      description: 'Toon boven- en onderranden',
    },
    initialDate: {
      control: 'date',
      description: 'De initiële datum om weer te geven in de kalender',
    },
    renderDay: {
      control: false,
      description: 'Aangepaste render functie voor dag inhoud',
    },
  },
} satisfies Meta<typeof SectionCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: mockCalendarSection.displayTitle,
    description: mockCalendarSection.description,
    initialDate: mockCalendarSection.initialDate,
  },
  render: (args) => {
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
      if (day === 0 || day === 6) return null;
      return (
        <Text variant="small" className="text-foreground/70">
          {day % 2 === 0 ? '2 slots available' : '1 slot available'}
        </Text>
      );
    },
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <SectionCalendar {...args} initialDate={initialDate} />;
  },
};

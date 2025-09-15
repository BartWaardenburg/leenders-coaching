import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionFAQ } from './SectionFAQ';
import { mockFAQSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionFAQ',
  component: SectionFAQ,
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
    items: {
      control: 'object',
      description: 'Array van FAQ items',
    },
  },
} satisfies Meta<typeof SectionFAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Use centralized mocks for different FAQ item counts */
const getFAQItems = (count: number) => {
  return mockFAQSection.faqs.slice(0, count);
};

// Using centralized mock data

export const Default: Story = {
  args: {
    title: mockFAQSection.displayTitle,
    description: mockFAQSection.description,
    items: getFAQItems(3), // Show first 3 items
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
  },
};

export const WithBorder: Story = {
  args: {
    ...Default.args,
    border: true,
  },
};

export const WithPurpleBackground: Story = {
  args: {
    ...Default.args,
    background: 'purple',
    border: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Veelgestelde Vragen',
    items: Default.args.items,
    background: 'pink',
    border: true,
  },
};

export const SingleFAQ: Story = {
  args: {
    title: 'Enkele FAQ Item',
    description: 'Soms heb je maar één FAQ item nodig.',
    items: [Default.args.items[0]!],
    background: 'teal',
    border: true,
  },
};

export const ManyFAQItems: Story = {
  args: {
    title: mockFAQSection.displayTitle,
    description: mockFAQSection.description,
    items: getFAQItems(6),
    background: 'blue',
    border: true,
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionContent } from './SectionContent';
import { mockContentSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionContent',
  component: SectionContent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'De titel van de sectie',
    },
    description: {
      control: 'text',
      description: 'Optionele beschrijving van de sectie',
    },
    content: {
      control: 'object',
      description: 'Portable Text content blokken',
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
  },
} satisfies Meta<typeof SectionContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mock data
const defaultContent = mockContentSection.content;

export const Default: Story = {
  args: {
    title: mockContentSection.displayTitle,
    description: mockContentSection.description,
    content: defaultContent,
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

export const WithDescriptionOnly: Story = {
  args: {
    description: mockContentSection.description,
    content: defaultContent,
  },
};

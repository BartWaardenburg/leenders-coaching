import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionPricing } from './SectionPricing';
import { mockPricingSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionPricing',
  component: SectionPricing,
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
    packages: {
      control: 'object',
      description: 'Array van prijs pakket objecten',
    },
  },
} satisfies Meta<typeof SectionPricing>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mock data
const defaultPackages = mockPricingSection.packages;

export const Default: Story = {
  args: {
    title: mockPricingSection.displayTitle,
    description: mockPricingSection.description,
    packages: defaultPackages,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Sections/SectionHeader',
  component: SectionHeader,
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
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Title',
    description:
      'This is a description text that provides more context about this section.',
  },
};

export const WithBackground: Story = {
  args: {
    title: 'Section With Background',
    description:
      'This section uses a pastel background color that also affects the heading border.',
    background: 'purple',
  },
};

export const WithBackgroundAndBorders: Story = {
  args: {
    title: 'Section With Background and Borders',
    description:
      'This section has a background color with matching top and bottom borders.',
    background: 'blue',
    border: true,
  },
};

export const WithButtons: Story = {
  args: {
    title: 'Section With CTAs',
    description:
      'This section includes call-to-action buttons that are right-aligned on desktop.',
    background: 'blue',
    border: true,
    primaryCta: {
      href: '/contact',
      label: 'Get Started',
    },
    secondaryCta: {
      href: '/about',
      label: 'Learn More',
    },
  },
};

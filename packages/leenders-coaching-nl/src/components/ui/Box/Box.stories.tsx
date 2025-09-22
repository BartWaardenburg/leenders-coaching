import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Box } from './Box';

const meta = {
  title: 'UI/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML element om als te renderen',
    },
    children: {
      control: 'text',
      description: 'Inhoud van de box',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Standaard Box',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Standaard Box')).toBeVisible();
  },
};

export const WithCustomStyling: Story = {
  args: {
    className: 'p-4 bg-blue-100 rounded-lg border',
    children: 'Box met aangepaste styling',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Box met aangepaste styling')).toBeVisible();
  },
};

export const AsSection: Story = {
  args: {
    as: 'section',
    className: 'p-6 bg-gray-100 rounded',
    children: 'Box gerenderd als section element',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Box gerenderd als section element')
    ).toBeVisible();
  },
};

export const AsButton: Story = {
  args: {
    as: 'button',
    className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
    children: 'Box als knop',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Box als knop')).toBeVisible();
  },
};

export const WithTailwindClasses: Story = {
  args: {
    className:
      'flex items-center justify-center p-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl shadow-lg',
    children: 'Box met Tailwind klassen',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Box met Tailwind klassen')).toBeVisible();
  },
};

export const PolymorphicExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Box as="h1" className="text-2xl font-bold text-gray-800">
        Kop Box
      </Box>
      <Box as="p" className="text-gray-600">
        Paragraaf Box
      </Box>
      <Box as="div" className="p-4 bg-yellow-100 rounded">
        Div Box
      </Box>
      <Box
        as="span"
        className="inline-block px-2 py-1 bg-green-100 rounded text-sm"
      >
        Span Box
      </Box>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Kop Box')).toBeVisible();
    await expect(canvas.getByText('Paragraaf Box')).toBeVisible();
    await expect(canvas.getByText('Div Box')).toBeVisible();
    await expect(canvas.getByText('Span Box')).toBeVisible();
  },
};

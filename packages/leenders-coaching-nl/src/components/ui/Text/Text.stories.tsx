import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Text } from './Text';
import { Box } from '../Box/Box';
import { mockCardData } from '@/mocks';

const meta = {
  title: 'UI/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'muted',
        'large',
        'small',
        'label',
        'error',
        'playfair',
        'navigation',
        'card-meta',
        'card-excerpt',
        'quote',
      ],
      description: 'De visuele stijl variant van de tekst',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'bold'],
      description: 'Het lettertype gewicht van de tekst',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'strong', 'em'],
      description: 'Het HTML element om als te renderen',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'De tekst uitlijning',
    },
    italic: {
      control: 'boolean',
      description: 'Of cursieve stijl moet worden toegepast',
    },
    children: {
      control: 'text',
      description: 'De inhoud van de tekst',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Tekst grootte (overschrijft variant grootte)',
    },
    color: {
      control: 'select',
      options: [
        'default',
        'muted',
        'foreground',
        'primary',
        'secondary',
        'destructive',
      ],
      description: 'Tekst kleur (overschrijft variant kleur)',
    },
    maxWidth: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        'full',
      ],
      description: 'Maximum breedte van de tekst',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Tekst transparantie (0-100)',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: mockCardData.service.description,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(mockCardData.service.description)
    ).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box className="flex flex-col gap-4 max-w-2xl">
      <Text variant="default">Default text variant</Text>
      <Text variant="muted">Muted text variant</Text>
      <Text variant="large">Large text variant</Text>
      <Text variant="small">Small text variant</Text>
      <Text variant="label">Label text variant</Text>
      <Text variant="error">Error text variant</Text>
      <Text variant="playfair">Playfair text variant</Text>
      <Text variant="navigation">Navigation text variant</Text>
      <Text variant="card-meta">Card meta text variant</Text>
      <Text variant="card-excerpt">Card excerpt text variant</Text>
      <Text variant="quote">Quote text variant</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Default text variant')).toBeVisible();
    await expect(canvas.getByText('Muted text variant')).toBeVisible();
    await expect(canvas.getByText('Large text variant')).toBeVisible();
    await expect(canvas.getByText('Small text variant')).toBeVisible();
    await expect(canvas.getByText('Label text variant')).toBeVisible();
    await expect(canvas.getByText('Error text variant')).toBeVisible();
    await expect(canvas.getByText('Playfair text variant')).toBeVisible();
    await expect(canvas.getByText('Navigation text variant')).toBeVisible();
    await expect(canvas.getByText('Card meta text variant')).toBeVisible();
    await expect(canvas.getByText('Card excerpt text variant')).toBeVisible();
    await expect(canvas.getByText('Quote text variant')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const AllWeights: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box className="flex flex-col gap-4">
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Normal weight text')).toBeVisible();
    await expect(canvas.getByText('Medium weight text')).toBeVisible();
    await expect(canvas.getByText('Bold weight text')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const TextAlignment: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box className="flex flex-col gap-4 w-full">
      <Text textAlign="left">Left aligned text</Text>
      <Text textAlign="center">Center aligned text</Text>
      <Text textAlign="right">Right aligned text</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Left aligned text')).toBeVisible();
    await expect(canvas.getByText('Center aligned text')).toBeVisible();
    await expect(canvas.getByText('Right aligned text')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const AsElement: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box className="flex flex-col gap-4">
      <Text as="p">Text as paragraph</Text>
      <Text as="span">Text as span</Text>
      <Text as="div">Text as div</Text>
      <Text as="strong">Text as strong</Text>
      <Text as="em">Text as emphasis</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Text as paragraph')).toBeVisible();
    await expect(canvas.getByText('Text as span')).toBeVisible();
    await expect(canvas.getByText('Text as div')).toBeVisible();
    await expect(canvas.getByText('Text as strong')).toBeVisible();
    await expect(canvas.getByText('Text as emphasis')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const ItalicText: Story = {
  args: {
    children: mockCardData.testimonial.quote,
    italic: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(mockCardData.testimonial.quote)
    ).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const CombinedProps: Story = {
  args: {
    children: 'Combined properties example',
    variant: 'large',
    weight: 'bold',
    textAlign: 'center',
    italic: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Combined properties example')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const WithSemanticProps: Story = {
  args: {
    children: 'Text with semantic props',
    size: 'xl',
    color: 'primary',
    maxWidth: '2xl',
    opacity: 90,
    weight: 'bold',
    textAlign: 'center',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Text with semantic props')).toBeVisible();
  },
};

export const SizeOverride: Story = {
  args: {
    children: 'Size override example',
    variant: 'small',
    size: '2xl',
    color: 'secondary',
    weight: 'bold',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Size override example')).toBeVisible();
  },
};

export const ColorOverride: Story = {
  args: {
    children: 'Color override example',
    variant: 'default',
    color: 'destructive',
    size: 'lg',
    weight: 'medium',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Color override example')).toBeVisible();
  },
};

export const ConstrainedWidth: Story = {
  args: {
    children:
      'This is a longer text that demonstrates how the maxWidth prop constrains the text width, making it more readable and preventing it from stretching too wide on larger screens.',
    maxWidth: 'md',
    textAlign: 'justify',
    size: 'base',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/This is a longer text/)).toBeVisible();
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Text } from './Text';
import { waitForMotionAnimations as _waitForMotionAnimations } from '../../../test/chromatic-utils';

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
      description: 'The visual style variant of the text',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'bold'],
      description: 'The font weight of the text',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'strong', 'em'],
      description: 'The HTML element to render as',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'The text alignment',
    },
    italic: {
      control: 'boolean',
      description: 'Whether to apply italic styling',
    },
    children: {
      control: 'text',
      description: 'The content of the text',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Text Example')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl">
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
    </div>
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
    <div className="flex flex-col gap-4">
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
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
    <div className="flex flex-col gap-4 w-full">
      <Text textAlign="left">Left aligned text</Text>
      <Text textAlign="center">Center aligned text</Text>
      <Text textAlign="right">Right aligned text</Text>
    </div>
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
    <div className="flex flex-col gap-4">
      <Text as="p">Text as paragraph</Text>
      <Text as="span">Text as span</Text>
      <Text as="div">Text as div</Text>
      <Text as="strong">Text as strong</Text>
      <Text as="em">Text as emphasis</Text>
    </div>
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
    children: 'This text is italic',
    italic: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This text is italic')).toBeVisible();
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

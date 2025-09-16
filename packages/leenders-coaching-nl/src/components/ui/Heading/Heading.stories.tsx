import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Heading } from './Heading';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { Box } from '../Box/Box';
import { mockCardData } from '@/mocks';

const meta = {
  title: 'UI/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Het kopniveau om te gebruiken',
    },
    variant: {
      control: 'select',
      options: ['default', 'large', 'medium', 'small'],
      description: 'De visuele stijl variant van de kop',
    },
    weight: {
      control: 'select',
      options: ['bold', 'normal'],
      description: 'Het lettertype gewicht van de kop',
    },
    spacing: {
      control: 'select',
      options: ['none', 'normal'],
      description: 'De onderste marge afstand van de kop',
    },
    color: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'De tekstkleur van de kop',
    },
    showBorder: {
      control: 'boolean',
      description: 'Toon een subtiele rand onder de kop',
    },
    borderColor: {
      control: 'select',
      options: ['default', 'blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'De kleur van de rand wanneer showBorder waar is',
    },
    children: {
      control: 'text',
      description: 'De inhoud van de kop',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LargeHeading: Story = {
  args: {
    level: 'h1',
    variant: 'large',
    children: mockCardData.service.title,
    showBorder: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: mockCardData.service.title })
    ).toBeVisible();
  },
};

export const MediumHeading: Story = {
  args: {
    level: 'h2',
    variant: 'medium',
    children: mockCardData.blog.title,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: mockCardData.blog.title })
    ).toBeVisible();
  },
};

export const SmallHeading: Story = {
  args: {
    level: 'h2',
    variant: 'small',
    children: 'Kleine Kop',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Kleine Kop' })
    ).toBeVisible();
  },
};

export const WithBorder: Story = {
  args: {
    level: 'h2',
    children: 'Kop Met Rand',
    showBorder: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Kop Met Rand' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithColoredBorder: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Gekleurde Rand Voorbeeld',
    level: 'h2',
  },
  render: (args) => (
    <Box className="flex flex-col gap-8">
      <Heading {...args} showBorder borderColor="blue">
        Blauwe Rand
      </Heading>
      <Heading {...args} showBorder borderColor="purple">
        Paarse Rand
      </Heading>
      <Heading {...args} showBorder borderColor="green">
        Groene Rand
      </Heading>
      <Heading {...args} showBorder borderColor="pink">
        Roze Rand
      </Heading>
      <Heading {...args} showBorder borderColor="yellow">
        Gele Rand
      </Heading>
      <Heading {...args} showBorder borderColor="teal">
        Teal Rand
      </Heading>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Blauwe Rand' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Paarse Rand' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Groene Rand' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Roze Rand' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Gele Rand' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Teal Rand' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const MutedHeading: Story = {
  args: {
    level: 'h2',
    children: 'Gedempte Kop',
    color: 'muted',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Gedempte Kop' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoSpacing: Story = {
  args: {
    level: 'h2',
    spacing: 'none',
    children: 'Kop Zonder Onderste Marge',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Kop Zonder Onderste Marge' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllHeadingLevels: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Heading levels demo',
  },
  render: () => (
    <Box className="flex flex-col gap-4">
      <Heading level="h1" variant="large">
        Heading Level 1
      </Heading>
      <Heading level="h2" variant="medium">
        Heading Level 2
      </Heading>
      <Heading level="h3" variant="default">
        Heading Level 3
      </Heading>
      <Heading level="h4" variant="small">
        Heading Level 4
      </Heading>
      <Heading level="h5" variant="small">
        Heading Level 5
      </Heading>
      <Heading level="h6" variant="small">
        Heading Level 6
      </Heading>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Heading Level 1' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Heading Level 2' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Heading Level 3' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Heading Level 4' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Heading Level 5' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Heading Level 6' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Heading variants demo',
  },
  render: () => (
    <Box className="flex flex-col gap-4">
      <Heading level="h2" variant="default">
        Default Variant
      </Heading>
      <Heading level="h2" variant="large">
        Large Variant
      </Heading>
      <Heading level="h2" variant="medium">
        Medium Variant
      </Heading>
      <Heading level="h2" variant="small">
        Small Variant
      </Heading>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Default Variant' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Large Variant' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Medium Variant' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Small Variant' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllWeights: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Heading weights demo',
  },
  render: () => (
    <Box className="flex flex-col gap-4">
      <Heading level="h2" weight="normal">
        Normal Weight Heading
      </Heading>
      <Heading level="h2" weight="bold">
        Bold Weight Heading
      </Heading>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Normal Weight Heading' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Bold Weight Heading' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const TextAlignment: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    children: 'Text alignment demo',
  },
  render: () => (
    <Box className="flex flex-col gap-4 w-full">
      <Heading level="h2" textAlign="left">
        Left Aligned Heading
      </Heading>
      <Heading level="h2" textAlign="center">
        Center Aligned Heading
      </Heading>
      <Heading level="h2" textAlign="right">
        Right Aligned Heading
      </Heading>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Left Aligned Heading' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Center Aligned Heading' })
    ).toBeVisible();
    await expect(
      canvas.getByRole('heading', { name: 'Right Aligned Heading' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const CombinedProps: Story = {
  args: {
    level: 'h2',
    variant: 'medium',
    weight: 'bold',
    textAlign: 'center',
    showBorder: true,
    borderColor: 'blue',
    color: 'muted',
    children: 'Combined Properties Example',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: 'Combined Properties Example' })
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

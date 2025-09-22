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
      <Text variant="default">Standaard tekst variant</Text>
      <Text variant="muted">Gedempte tekst variant</Text>
      <Text variant="large">Grote tekst variant</Text>
      <Text variant="small">Kleine tekst variant</Text>
      <Text variant="label">Label tekst variant</Text>
      <Text variant="error">Fout tekst variant</Text>
      <Text variant="playfair">Playfair tekst variant</Text>
      <Text variant="navigation">Navigatie tekst variant</Text>
      <Text variant="card-meta">Kaart meta tekst variant</Text>
      <Text variant="card-excerpt">Kaart excerpt tekst variant</Text>
      <Text variant="quote">Citaat tekst variant</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Standaard tekst variant')).toBeVisible();
    await expect(canvas.getByText('Gedempte tekst variant')).toBeVisible();
    await expect(canvas.getByText('Grote tekst variant')).toBeVisible();
    await expect(canvas.getByText('Kleine tekst variant')).toBeVisible();
    await expect(canvas.getByText('Label tekst variant')).toBeVisible();
    await expect(canvas.getByText('Fout tekst variant')).toBeVisible();
    await expect(canvas.getByText('Playfair tekst variant')).toBeVisible();
    await expect(canvas.getByText('Navigatie tekst variant')).toBeVisible();
    await expect(canvas.getByText('Kaart meta tekst variant')).toBeVisible();
    await expect(canvas.getByText('Kaart excerpt tekst variant')).toBeVisible();
    await expect(canvas.getByText('Citaat tekst variant')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const AllWeights: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box className="flex flex-col gap-4">
      <Text weight="normal">Normale gewicht tekst</Text>
      <Text weight="medium">Medium gewicht tekst</Text>
      <Text weight="bold">Vetgedrukte gewicht tekst</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Normale gewicht tekst')).toBeVisible();
    await expect(canvas.getByText('Medium gewicht tekst')).toBeVisible();
    await expect(canvas.getByText('Vetgedrukte gewicht tekst')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const TextAlignment: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box className="flex flex-col gap-4 w-full">
      <Text textAlign="left">Links uitgelijnde tekst</Text>
      <Text textAlign="center">Gecentreerde tekst</Text>
      <Text textAlign="right">Rechts uitgelijnde tekst</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Links uitgelijnde tekst')).toBeVisible();
    await expect(canvas.getByText('Gecentreerde tekst')).toBeVisible();
    await expect(canvas.getByText('Rechts uitgelijnde tekst')).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const AsElement: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => (
    <Box className="flex flex-col gap-4">
      <Text as="p">Tekst als paragraaf</Text>
      <Text as="span">Tekst als span</Text>
      <Text as="div">Tekst als div</Text>
      <Text as="strong">Tekst als strong</Text>
      <Text as="em">Tekst als nadruk</Text>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Tekst als paragraaf')).toBeVisible();
    await expect(canvas.getByText('Tekst als span')).toBeVisible();
    await expect(canvas.getByText('Tekst als div')).toBeVisible();
    await expect(canvas.getByText('Tekst als strong')).toBeVisible();
    await expect(canvas.getByText('Tekst als nadruk')).toBeVisible();
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
    children: 'Gecombineerde eigenschappen voorbeeld',
    variant: 'large',
    weight: 'bold',
    textAlign: 'center',
    italic: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Gecombineerde eigenschappen voorbeeld')
    ).toBeVisible();
    // Simple static test - no animation wait needed
  },
};

export const WithSemanticProps: Story = {
  args: {
    children: 'Tekst met semantische eigenschappen',
    size: 'xl',
    color: 'primary',
    maxWidth: '2xl',
    opacity: 90,
    weight: 'bold',
    textAlign: 'center',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Tekst met semantische eigenschappen')
    ).toBeVisible();
  },
};

export const SizeOverride: Story = {
  args: {
    children: 'Grootte overschrijving voorbeeld',
    variant: 'small',
    size: '2xl',
    color: 'secondary',
    weight: 'bold',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Grootte overschrijving voorbeeld')
    ).toBeVisible();
  },
};

export const ColorOverride: Story = {
  args: {
    children: 'Kleur overschrijving voorbeeld',
    variant: 'default',
    color: 'destructive',
    size: 'lg',
    weight: 'medium',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Kleur overschrijving voorbeeld')
    ).toBeVisible();
  },
};

export const ConstrainedWidth: Story = {
  args: {
    children:
      'Dit is een langere tekst die demonstreert hoe de maxWidth eigenschap de tekst breedte beperkt, waardoor het beter leesbaar wordt en voorkomt dat het te breed wordt op grotere schermen.',
    maxWidth: 'md',
    textAlign: 'justify',
    size: 'base',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Dit is een langere tekst/)).toBeVisible();
  },
};

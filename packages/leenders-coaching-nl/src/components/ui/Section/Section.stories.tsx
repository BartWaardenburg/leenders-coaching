import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Section } from './Section';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { Text } from '../Text/Text';
import { Heading } from '../Heading/Heading';
import { Box } from '../Box/Box';
import { Grid } from '../Grid/Grid';

const meta = {
  title: 'UI/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de sectie',
      type: { name: 'string', required: true },
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
      type: { name: 'string', required: false },
    },
    border: {
      control: 'boolean',
      description: 'Of er een rand rond de sectie moet worden getoond',
      type: { name: 'boolean', required: false },
    },
    noPadding: {
      control: 'boolean',
      description: 'Of de standaard padding moet worden uitgeschakeld',
      type: { name: 'boolean', required: false },
    },
    maxWidth: {
      control: 'select',
      options: [
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
      ],
      description: 'Maximale breedte van de sectie',
      type: { name: 'string', required: false },
    },
    testid: {
      control: 'text',
      description: 'Test ID voor testing',
      type: { name: 'string', required: false },
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
      type: { name: 'string', required: false },
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Sectie Voorbeeld',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Sectie Voorbeeld')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithBackground: Story = {
  args: {
    children: 'Sectie met blauwe achtergrond',
    background: 'blue',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Sectie met blauwe achtergrond')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithBorder: Story = {
  args: {
    children: 'Sectie met paarse achtergrond en rand',
    background: 'purple',
    border: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Sectie met paarse achtergrond en rand')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoPadding: Story = {
  args: {
    children: 'Sectie zonder padding',
    noPadding: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Sectie zonder padding')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithMaxWidth: Story = {
  args: {
    children: 'Sectie met beperkte maximale breedte (2xl)',
    maxWidth: '2xl',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Sectie met beperkte maximale breedte (2xl)')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllBackgroundColors: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box className="space-y-4">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (color) => (
          <Section key={color} background={color} testid={`section-${color}`}>
            <Heading level="h3" variant="small" className="capitalize">
              {color} Achtergrond
            </Heading>
            <Text variant="small" className="text-muted-foreground">
              Deze sectie demonstreert de {color} pastel achtergrondkleur.
            </Text>
          </Section>
        )
      )}
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-blue')).toBeVisible();
    await expect(canvas.getByTestId('section-purple')).toBeVisible();
    await expect(canvas.getByTestId('section-green')).toBeVisible();
    await expect(canvas.getByTestId('section-pink')).toBeVisible();
    await expect(canvas.getByTestId('section-yellow')).toBeVisible();
    await expect(canvas.getByTestId('section-teal')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllMaxWidths: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box className="space-y-4">
      {(
        [
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
        ] as const
      ).map((width) => (
        <Section
          key={width}
          maxWidth={width}
          background="green"
          testid={`section-width-${width}`}
        >
          <Box className="bg-white/20 p-4">
            <Heading level="h3" variant="small">
              Maximale Breedte: {width}
            </Heading>
            <Text variant="small">
              Deze sectie heeft een maximale breedte van {width}. De inhoud is
              beperkt tot deze breedte terwijl responsief gedrag behouden
              blijft.
            </Text>
          </Box>
        </Section>
      ))}
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-width-sm')).toBeVisible();
    await expect(canvas.getByTestId('section-width-md')).toBeVisible();
    await expect(canvas.getByTestId('section-width-lg')).toBeVisible();
    await expect(canvas.getByTestId('section-width-xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-2xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-3xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-4xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-5xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-6xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-7xl')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithBorders: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box className="space-y-4">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (color) => (
          <Section
            key={color}
            background={color}
            border
            testid={`section-border-${color}`}
          >
            <Heading level="h3" variant="small" className="capitalize">
              {color} met Rand
            </Heading>
            <Text variant="small" className="text-muted-foreground">
              Deze sectie heeft een {color} achtergrond met gekleurde randen
              boven en onder.
            </Text>
          </Section>
        )
      )}
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-border-blue')).toBeVisible();
    await expect(canvas.getByTestId('section-border-purple')).toBeVisible();
    await expect(canvas.getByTestId('section-border-green')).toBeVisible();
    await expect(canvas.getByTestId('section-border-pink')).toBeVisible();
    await expect(canvas.getByTestId('section-border-yellow')).toBeVisible();
    await expect(canvas.getByTestId('section-border-teal')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ComplexContent: Story = {
  args: {
    children: null,
    background: 'teal',
    border: true,
    maxWidth: '4xl',
    testid: 'section-complex',
  },
  render: (args) => (
    <Section {...args}>
      <Grid cols={{ base: 1, md: 2 }} gap={8}>
        <Box>
          <Heading level="h2" variant="medium" className="mb-4">
            Complexe Sectie Inhoud
          </Heading>
          <Text variant="muted" className="mb-6">
            Deze sectie demonstreert hoe de Section component complexe lay-outs
            kan bevatten met meerdere elementen, responsieve grids, en rijke
            inhoud.
          </Text>
          <Box className="space-y-4">
            <Box className="bg-white/20 p-4">
              <Heading level="h3" variant="small" className="mb-2">
                Functie 1
              </Heading>
              <Text variant="small">Beschrijving van de eerste functie.</Text>
            </Box>
            <Box className="bg-white/20 p-4">
              <Heading level="h3" variant="small" className="mb-2">
                Functie 2
              </Heading>
              <Text variant="small">Beschrijving van de tweede functie.</Text>
            </Box>
          </Box>
        </Box>
        <Box className="bg-white/20 p-6">
          <Heading level="h3" variant="small" className="mb-4">
            Aanvullende Informatie
          </Heading>
          <ul className="space-y-2 text-sm">
            <li>• Responsief ontwerp</li>
            <li>• Donkere modus ondersteuning</li>
            <li>• Container queries</li>
            <li>• Flexibele lay-outs</li>
          </ul>
        </Box>
      </Grid>
    </Section>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-complex')).toBeVisible();
    await expect(canvas.getByText('Complexe Sectie Inhoud')).toBeVisible();
    await expect(canvas.getByText('Functie 1')).toBeVisible();
    await expect(canvas.getByText('Functie 2')).toBeVisible();
    await expect(canvas.getByText('Aanvullende Informatie')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoPaddingWithBackground: Story = {
  args: {
    children: (
      <Box className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <Heading level="h2" variant="medium" className="mb-4">
          Volledige Breedte Achtergrond
        </Heading>
        <Text className="text-blue-100">
          Deze sectie heeft geen padding, waardoor de achtergrond zich kan
          uitstrekken tot de volledige breedte van de viewport terwijl de inhoud
          zijn eigen padding behoudt.
        </Text>
      </Box>
    ),
    noPadding: true,
    testid: 'section-no-padding-bg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-no-padding-bg')).toBeVisible();
    await expect(
      canvas.getByText('Volledige Breedte Achtergrond')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

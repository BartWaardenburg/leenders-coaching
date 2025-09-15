import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SanityImage } from './SanityImage';
import { Box } from '../Box/Box';
import { Heading } from '../Heading/Heading';
import { Grid } from '../Grid/Grid';
import { mockSanityImage } from '@/mocks';

const meta = {
  title: 'UI/SanityImage',
  component: SanityImage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    image: {
      control: 'object',
      description: 'Sanity afbeelding object met asset metadata',
    },
    alt: {
      control: 'text',
      description: 'Alternatieve tekst voor de afbeelding',
    },
    sizes: {
      control: 'text',
      description: 'Responsieve afbeelding groottes',
    },
    priority: {
      control: 'boolean',
      description: 'Of het laden van deze afbeelding prioriteit moet krijgen',
    },
    followHotspot: {
      control: 'boolean',
      description:
        'Of Sanity hotspot moet worden gevolgd voor object positionering',
    },
    qualityHint: {
      control: { type: 'range', min: 1, max: 100, step: 1 },
      description: 'Afbeelding kwaliteit hint voor CDN optimalisatie',
    },
  },
} satisfies Meta<typeof SanityImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Mock Sanity image data is now imported from @/mocks */

export const Default: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Standaard Sanity afbeelding',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Standaard Sanity afbeelding')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const WithHotspot: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Afbeelding met hotspot positionering',
    sizes: '100vw',
    priority: false,
    followHotspot: true,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Afbeelding met hotspot positionering')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const HighPriority: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Hoge prioriteit afbeelding',
    sizes: '100vw',
    priority: true,
    followHotspot: false,
    qualityHint: 90,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Hoge prioriteit afbeelding')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const WithoutMetadata: Story = {
  args: {
    image: mockSanityImage.withoutMetadata,
    alt: 'Afbeelding zonder metadata',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Afbeelding zonder metadata')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const WithPartialMetadata: Story = {
  args: {
    image: mockSanityImage.withPartialMetadata,
    alt: 'Afbeelding met gedeeltelijke metadata',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Afbeelding met gedeeltelijke metadata')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const FillMode: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Afbeelding in vul modus',
    sizes: '100vw',
    priority: false,
    followHotspot: true,
    qualityHint: 75,
    fill: true,
  },
  render: (args) => (
    <Box className="relative w-96 h-32">
      <SanityImage {...args} />
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Afbeelding in vul modus')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const CustomSizes: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Afbeelding met aangepaste groottes',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority: false,
    followHotspot: false,
    qualityHint: 80,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Afbeelding met aangepaste groottes')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const LowQuality: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Lage kwaliteit afbeelding',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 30,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Lage kwaliteit afbeelding')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const HighQuality: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Hoge kwaliteit afbeelding',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 95,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Hoge kwaliteit afbeelding')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const NoAsset: Story = {
  args: {
    image: {
      _type: 'image',
      alt: 'Afbeelding zonder asset',
    },
    alt: 'Afbeelding zonder asset',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    // Should render placeholder div when no asset
    await expect(canvas.getAllByRole('generic', { hidden: true })).toHaveLength(
      4
    );
    // Image rendering complete - no animation wait needed
  },
};

export const WithCustomClassName: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Afbeelding met aangepaste stijl',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
    className: 'shadow-lg border-2 border-blue-500',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Afbeelding met aangepaste stijl')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const WithCustomStyle: Story = {
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Afbeelding met aangepaste stijl',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
    style: {
      filter: 'grayscale(50%)',
      transform: 'rotate(5deg)',
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Afbeelding met aangepaste stijl')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    image: mockSanityImage.withMetadata,
    alt: 'Alle varianten afbeelding',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  render: () => (
    <Grid cols={{ base: 1, md: 2 }} gap={6} className="max-w-4xl">
      <Box className="space-y-4">
        <Heading level="h3" variant="small">
          With Full Metadata
        </Heading>
        <SanityImage
          image={mockSanityImage.withMetadata}
          alt="Volledige metadata afbeelding"
          sizes="100vw"
          className="w-full h-48 object-cover"
        />
      </Box>

      <Box className="space-y-4">
        <Heading level="h3" variant="small">
          Without Metadata
        </Heading>
        <SanityImage
          image={mockSanityImage.withoutMetadata}
          alt="Geen metadata afbeelding"
          sizes="100vw"
          className="w-full h-48 object-cover"
        />
      </Box>

      <Box className="space-y-4">
        <Heading level="h3" variant="small">
          With Hotspot
        </Heading>
        <SanityImage
          image={mockSanityImage.withMetadata}
          alt="Hotspot afbeelding"
          sizes="100vw"
          followHotspot={true}
          className="w-full h-48 object-cover"
        />
      </Box>

      <Box className="space-y-4">
        <Heading level="h3" variant="small">
          Fill Mode
        </Heading>
        <Box className="relative w-full h-48 overflow-hidden">
          <SanityImage
            image={mockSanityImage.withMetadata}
            alt="Vul modus afbeelding"
            sizes="100vw"
            fill={true}
            className="object-cover"
          />
        </Box>
      </Box>
    </Grid>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Volledige metadata afbeelding')
    ).toBeInTheDocument();
    await expect(
      canvas.getByAltText('Geen metadata afbeelding')
    ).toBeInTheDocument();
    await expect(canvas.getByAltText('Hotspot afbeelding')).toBeInTheDocument();
    await expect(
      canvas.getByAltText('Vul modus afbeelding')
    ).toBeInTheDocument();
    // Image rendering complete - no animation wait needed
  },
};

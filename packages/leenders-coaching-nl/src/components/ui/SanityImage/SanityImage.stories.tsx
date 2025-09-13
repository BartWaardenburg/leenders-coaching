import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SanityImage } from './SanityImage';

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

/* Mock Sanity image data with full metadata */
const mockImageWithMetadata = {
  _type: 'image',
  asset: {
    _ref: 'image-abc123-1920x1080-jpg',
    _type: 'reference',
    metadata: {
      lqip: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      dimensions: {
        width: 1920,
        height: 1080,
        aspectRatio: 1.7777777777777777,
      },
      palette: {
        dominant: {
          background: '#3b82f6',
        },
      },
    },
  },
  hotspot: {
    x: 0.5,
    y: 0.3,
  },
  alt: 'Prachtig landschap met bergen en meer',
};

const mockImageWithoutMetadata = {
  _type: 'image',
  asset: {
    _ref: 'image-def456-800x600-jpg',
    _type: 'reference',
  },
  alt: 'Eenvoudige afbeelding zonder metadata',
};

const mockImageWithPartialMetadata = {
  _type: 'image',
  asset: {
    _ref: 'image-ghi789-1200x800-jpg',
    _type: 'reference',
    metadata: {
      dimensions: {
        width: 1200,
        height: 800,
        aspectRatio: 1.5,
      },
    },
  },
  alt: 'Afbeelding met gedeeltelijke metadata',
};

export const Default: Story = {
  args: {
    image: mockImageWithMetadata,
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
    image: mockImageWithMetadata,
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
    image: mockImageWithMetadata,
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
    image: mockImageWithoutMetadata,
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
    image: mockImageWithPartialMetadata,
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
    image: mockImageWithMetadata,
    alt: 'Afbeelding in vul modus',
    sizes: '100vw',
    priority: false,
    followHotspot: true,
    qualityHint: 75,
    fill: true,
  },
  render: (args) => (
    <div className="relative w-96 h-64">
      <SanityImage {...args} />
    </div>
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
    image: mockImageWithMetadata,
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
    image: mockImageWithMetadata,
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
    image: mockImageWithMetadata,
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
    image: mockImageWithMetadata,
    alt: 'Afbeelding met aangepaste stijl',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
    className: 'rounded-lg shadow-lg border-2 border-blue-500',
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
    image: mockImageWithMetadata,
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
    image: mockImageWithMetadata,
    alt: 'Alle varianten afbeelding',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Full Metadata</h3>
        <SanityImage
          image={mockImageWithMetadata}
          alt="Volledige metadata afbeelding"
          sizes="100vw"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Without Metadata</h3>
        <SanityImage
          image={mockImageWithoutMetadata}
          alt="Geen metadata afbeelding"
          sizes="100vw"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Hotspot</h3>
        <SanityImage
          image={mockImageWithMetadata}
          alt="Hotspot afbeelding"
          sizes="100vw"
          followHotspot={true}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fill Mode</h3>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <SanityImage
            image={mockImageWithMetadata}
            alt="Vul modus afbeelding"
            sizes="100vw"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
    </div>
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

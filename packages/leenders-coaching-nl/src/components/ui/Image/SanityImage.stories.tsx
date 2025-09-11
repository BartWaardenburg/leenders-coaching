import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SanityImage } from './SanityImage';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Image/SanityImage',
  component: SanityImage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    image: {
      control: 'object',
      description: 'Sanity image object with asset metadata',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    sizes: {
      control: 'text',
      description: 'Responsive image sizes',
    },
    priority: {
      control: 'boolean',
      description: 'Whether to prioritize loading this image',
    },
    followHotspot: {
      control: 'boolean',
      description: 'Whether to follow Sanity hotspot for object positioning',
    },
    qualityHint: {
      control: { type: 'range', min: 1, max: 100, step: 1 },
      description: 'Image quality hint for CDN optimization',
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
  alt: 'Beautiful landscape with mountains and lake',
};

const mockImageWithoutMetadata = {
  _type: 'image',
  asset: {
    _ref: 'image-def456-800x600-jpg',
    _type: 'reference',
  },
  alt: 'Simple image without metadata',
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
  alt: 'Image with partial metadata',
};

export const Default: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'Default Sanity image',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Default Sanity image')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithHotspot: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'Image with hotspot positioning',
    sizes: '100vw',
    priority: false,
    followHotspot: true,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Image with hotspot positioning')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const HighPriority: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'High priority image',
    sizes: '100vw',
    priority: true,
    followHotspot: false,
    qualityHint: 90,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('High priority image')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithoutMetadata: Story = {
  args: {
    image: mockImageWithoutMetadata,
    alt: 'Image without metadata',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Image without metadata')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithPartialMetadata: Story = {
  args: {
    image: mockImageWithPartialMetadata,
    alt: 'Image with partial metadata',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Image with partial metadata')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const FillMode: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'Image in fill mode',
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
    await expect(canvas.getByAltText('Image in fill mode')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const CustomSizes: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'Image with custom sizes',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    priority: false,
    followHotspot: false,
    qualityHint: 80,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Image with custom sizes')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const LowQuality: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'Low quality image',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 30,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('Low quality image')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const HighQuality: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'High quality image',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 95,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByAltText('High quality image')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoAsset: Story = {
  args: {
    image: {
      _type: 'image',
      alt: 'Image without asset',
    },
    alt: 'Image without asset',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
  },
  play: async ({ canvas }) => {
    // Should render placeholder div when no asset
    await expect(canvas.getAllByRole('generic', { hidden: true })).toHaveLength(
      3
    );
    await waitForMotionAnimations({ canvas });
  },
};

export const WithCustomClassName: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'Image with custom styling',
    sizes: '100vw',
    priority: false,
    followHotspot: false,
    qualityHint: 75,
    className: 'rounded-lg shadow-lg border-2 border-blue-500',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByAltText('Image with custom styling')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithCustomStyle: Story = {
  args: {
    image: mockImageWithMetadata,
    alt: 'Image with custom style',
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
      canvas.getByAltText('Image with custom style')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    image: mockImageWithMetadata,
    alt: 'All variants image',
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
          alt="Full metadata image"
          sizes="100vw"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Without Metadata</h3>
        <SanityImage
          image={mockImageWithoutMetadata}
          alt="No metadata image"
          sizes="100vw"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Hotspot</h3>
        <SanityImage
          image={mockImageWithMetadata}
          alt="Hotspot image"
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
            alt="Fill mode image"
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
      canvas.getByAltText('Full metadata image')
    ).toBeInTheDocument();
    await expect(canvas.getByAltText('No metadata image')).toBeInTheDocument();
    await expect(canvas.getByAltText('Hotspot image')).toBeInTheDocument();
    await expect(canvas.getByAltText('Fill mode image')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

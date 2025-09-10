import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import {
  createSanityLoader,
  getLQIP,
  getImageDimensions,
  getDominantColor,
} from './image';
import { waitForMotionAnimations } from '../test/chromatic-utils';

const meta = {
  title: 'Utilities/Image',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* Mock Sanity image data */
const mockImageWithFullMetadata = {
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

export const CreateSanityLoader: Story = {
  render: () => {
    const loader = createSanityLoader(mockImageWithFullMetadata, 75);
    const url = loader({ src: '', width: 800 });

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sanity Loader Function</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Generated URL for width 800px:
          </p>
          <code className="text-xs break-all bg-white dark:bg-gray-900 p-2 rounded border">
            {url}
          </code>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Different Widths:</h4>
            <ul className="text-sm space-y-1">
              <li>
                400px:{' '}
                {loader({ src: '', width: 400 }).length > 50
                  ? 'Generated'
                  : 'Error'}
              </li>
              <li>
                800px:{' '}
                {loader({ src: '', width: 800 }).length > 50
                  ? 'Generated'
                  : 'Error'}
              </li>
              <li>
                1200px:{' '}
                {loader({ src: '', width: 1200 }).length > 50
                  ? 'Generated'
                  : 'Error'}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Different Qualities:</h4>
            <ul className="text-sm space-y-1">
              <li>
                Quality 30:{' '}
                {createSanityLoader(
                  mockImageWithFullMetadata,
                  30
                )({ src: '', width: 800 }).length > 50
                  ? 'Generated'
                  : 'Error'}
              </li>
              <li>
                Quality 75:{' '}
                {createSanityLoader(
                  mockImageWithFullMetadata,
                  75
                )({ src: '', width: 800 }).length > 50
                  ? 'Generated'
                  : 'Error'}
              </li>
              <li>
                Quality 95:{' '}
                {createSanityLoader(
                  mockImageWithFullMetadata,
                  95
                )({ src: '', width: 800 }).length > 50
                  ? 'Generated'
                  : 'Error'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(
      canvas.getByText('Sanity Loader Function')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const GetLQIP: Story = {
  render: () => {
    const lqipWithMetadata = getLQIP(mockImageWithFullMetadata);
    const lqipWithoutMetadata = getLQIP(mockImageWithoutMetadata);
    const lqipWithPartialMetadata = getLQIP(mockImageWithPartialMetadata);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          LQIP (Low Quality Image Placeholder) Extraction
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">With Full Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              LQIP Available:
            </p>
            <code className="text-xs break-all bg-white dark:bg-gray-900 p-2 rounded border">
              {lqipWithMetadata ? 'data:image/jpeg;base64,...' : 'null'}
            </code>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Without Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              LQIP Available:
            </p>
            <code className="text-xs break-all bg-white dark:bg-gray-900 p-2 rounded border">
              {lqipWithoutMetadata ? 'data:image/jpeg;base64,...' : 'null'}
            </code>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">With Partial Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              LQIP Available:
            </p>
            <code className="text-xs break-all bg-white dark:bg-gray-900 p-2 rounded border">
              {lqipWithPartialMetadata ? 'data:image/jpeg;base64,...' : 'null'}
            </code>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(
      canvas.getByText('LQIP (Low Quality Image Placeholder) Extraction')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const GetImageDimensions: Story = {
  render: () => {
    const dimensionsWithMetadata = getImageDimensions(
      mockImageWithFullMetadata
    );
    const dimensionsWithoutMetadata = getImageDimensions(
      mockImageWithoutMetadata
    );
    const dimensionsWithPartialMetadata = getImageDimensions(
      mockImageWithPartialMetadata
    );

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Image Dimensions Extraction</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">With Full Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dimensions:
            </p>
            <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
              {dimensionsWithMetadata
                ? `${dimensionsWithMetadata.width}x${dimensionsWithMetadata.height} (${dimensionsWithMetadata.aspectRatio.toFixed(2)})`
                : 'null'}
            </code>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Without Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dimensions:
            </p>
            <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
              {dimensionsWithoutMetadata
                ? `${dimensionsWithoutMetadata.width}x${dimensionsWithoutMetadata.height} (${dimensionsWithoutMetadata.aspectRatio.toFixed(2)})`
                : 'null'}
            </code>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">With Partial Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dimensions:
            </p>
            <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
              {dimensionsWithPartialMetadata
                ? `${dimensionsWithPartialMetadata.width}x${dimensionsWithPartialMetadata.height} (${dimensionsWithPartialMetadata.aspectRatio.toFixed(2)})`
                : 'null'}
            </code>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(
      canvas.getByText('Image Dimensions Extraction')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const GetDominantColor: Story = {
  render: () => {
    const colorWithMetadata = getDominantColor(mockImageWithFullMetadata);
    const colorWithoutMetadata = getDominantColor(mockImageWithoutMetadata);
    const colorWithPartialMetadata = getDominantColor(
      mockImageWithPartialMetadata
    );

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dominant Color Extraction</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">With Full Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dominant Color:
            </p>
            <div className="flex items-center gap-2">
              {colorWithMetadata && (
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorWithMetadata }}
                />
              )}
              <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
                {colorWithMetadata || 'null'}
              </code>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Without Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dominant Color:
            </p>
            <div className="flex items-center gap-2">
              {colorWithoutMetadata && (
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorWithoutMetadata }}
                />
              )}
              <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
                {colorWithoutMetadata || 'null'}
              </code>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">With Partial Metadata</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Dominant Color:
            </p>
            <div className="flex items-center gap-2">
              {colorWithPartialMetadata && (
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: colorWithPartialMetadata }}
                />
              )}
              <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
                {colorWithPartialMetadata || 'null'}
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(
      canvas.getByText('Dominant Color Extraction')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllUtilities: Story = {
  render: () => {
    const loader = createSanityLoader(mockImageWithFullMetadata, 75);
    const url = loader({ src: '', width: 800 });
    const lqip = getLQIP(mockImageWithFullMetadata);
    const dimensions = getImageDimensions(mockImageWithFullMetadata);
    const dominantColor = getDominantColor(mockImageWithFullMetadata);

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">All Image Utilities</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Sanity Loader</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Generated URL:
            </p>
            <code className="text-xs break-all bg-white dark:bg-gray-900 p-2 rounded border">
              {url}
            </code>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">LQIP</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Base64 Placeholder:
            </p>
            <code className="text-xs break-all bg-white dark:bg-gray-900 p-2 rounded border">
              {lqip ? 'data:image/jpeg;base64,...' : 'null'}
            </code>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Dimensions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Image Size:
            </p>
            <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
              {dimensions
                ? `${dimensions.width}x${dimensions.height} (${dimensions.aspectRatio.toFixed(2)})`
                : 'null'}
            </code>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Dominant Color</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Background Color:
            </p>
            <div className="flex items-center gap-2">
              {dominantColor && (
                <div
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: dominantColor }}
                />
              )}
              <code className="text-xs bg-white dark:bg-gray-900 p-2 rounded border">
                {dominantColor || 'null'}
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(canvas.getByText('All Image Utilities')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

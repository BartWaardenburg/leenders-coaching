import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { transformCardsSection } from './cards';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'Utilities/Sections/Cards',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* Mock cards section data */
const mockValidCardsData = {
  _type: 'sectionCards',
  displayTitle: 'Our Services',
  description: 'Explore our range of professional services.',
  cards: [
    {
      _key: 'card-1',
      title: 'Web Development',
      description:
        'Custom web applications and websites built with modern technologies.',
      featured: true,
      date: '2024-01-15',
      categories: ['Development', 'Web'],
      slug: { current: 'web-development' },
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-abc123-800x600-jpg',
          _type: 'reference',
        },
        alt: 'Web development illustration',
      },
      variant: 'default',
      border: true,
      reverse: false,
    },
    {
      _key: 'card-2',
      title: 'Mobile Apps',
      description:
        'Native and cross-platform mobile applications for iOS and Android.',
      featured: false,
      date: '2024-01-20',
      categories: ['Development', 'Mobile'],
      slug: { current: 'mobile-apps' },
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-def456-800x600-jpg',
          _type: 'reference',
        },
        alt: 'Mobile app development illustration',
      },
      variant: 'default',
      border: true,
      reverse: true,
    },
    {
      _key: 'card-3',
      title: 'Consulting',
      description: 'Strategic consulting services to help your business grow.',
      featured: false,
      date: '2024-01-25',
      categories: ['Consulting', 'Strategy'],
      slug: { current: 'consulting' },
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-ghi789-800x600-jpg',
          _type: 'reference',
        },
        alt: 'Business consulting illustration',
      },
      variant: 'default',
      border: true,
      reverse: false,
    },
  ],
  background: 'white',
  border: true,
};

const mockCardsDataWithoutCards = {
  _type: 'sectionCards',
  displayTitle: 'Empty Cards Section',
  description: 'This section has no cards.',
  background: 'gray',
  border: false,
};

const mockCardsDataWithPartialCards = {
  _type: 'sectionCards',
  displayTitle: 'Partial Cards Section',
  description: 'This section has some cards with missing data.',
  cards: [
    {
      _key: 'card-1',
      title: 'Complete Card',
      description: 'This card has all required fields.',
      featured: true,
      date: '2024-01-15',
      categories: ['Development'],
      slug: { current: 'complete-card' },
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-abc123-800x600-jpg',
          _type: 'reference',
        },
        alt: 'Complete card image',
      },
      variant: 'default',
      border: true,
      reverse: false,
    },
    {
      _key: 'card-2',
      title: 'Minimal Card',
      // Missing description, date, categories, image
      featured: false,
      slug: { current: 'minimal-card' },
      variant: 'default',
      border: true,
      reverse: false,
    },
  ],
  background: 'white',
  border: true,
};

const mockInvalidCardsData = {
  _type: 'invalidSection',
  displayTitle: 'Invalid Section',
  description: 'This should throw an error.',
};

export const TransformValidCards: Story = {
  render: () => {
    try {
      const transformed = transformCardsSection(mockValidCardsData);

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Valid Cards Section Transformation
          </h3>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Transformed Data:</h4>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {transformed.title || 'undefined'}
              </p>
              <p>
                <strong>Description:</strong> {transformed.description}
              </p>
              <p>
                <strong>Background:</strong> {transformed.background}
              </p>
              <p>
                <strong>Border:</strong> {transformed.border ? 'true' : 'false'}
              </p>
              <p>
                <strong>Cards Count:</strong>{' '}
                {transformed.children?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Card Details:</h4>
            <div className="space-y-3">
              {transformed.children?.map((card, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">Card {index + 1}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {card?.type?.name || 'Unknown'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Error
          </h3>
          <p className="text-red-700 dark:text-red-300">
            {(error as Error).message}
          </p>
        </div>
      );
    }
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(
      canvas.getByText('Valid Cards Section Transformation')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const TransformCardsWithoutCards: Story = {
  render: () => {
    try {
      const transformed = transformCardsSection(mockCardsDataWithoutCards);

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cards Section Without Cards</h3>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Transformed Data:</h4>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {transformed.title || 'undefined'}
              </p>
              <p>
                <strong>Description:</strong> {transformed.description}
              </p>
              <p>
                <strong>Background:</strong> {transformed.background}
              </p>
              <p>
                <strong>Border:</strong> {transformed.border ? 'true' : 'false'}
              </p>
              <p>
                <strong>Cards Count:</strong>{' '}
                {transformed.children?.length || 0}
              </p>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Error
          </h3>
          <p className="text-red-700 dark:text-red-300">
            {(error as Error).message}
          </p>
        </div>
      );
    }
  },
  play: async ({ canvas }) => {
    // Wait for the component to render - should show error since no cards array
    await expect(canvas.getByText('Error')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const TransformCardsWithPartialCards: Story = {
  render: () => {
    try {
      const transformed = transformCardsSection(mockCardsDataWithPartialCards);

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Cards Section With Partial Cards
          </h3>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Transformed Data:</h4>
            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {transformed.title || 'undefined'}
              </p>
              <p>
                <strong>Description:</strong> {transformed.description}
              </p>
              <p>
                <strong>Background:</strong> {transformed.background}
              </p>
              <p>
                <strong>Border:</strong> {transformed.border ? 'true' : 'false'}
              </p>
              <p>
                <strong>Cards Count:</strong>{' '}
                {transformed.children?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Card Details:</h4>
            <div className="space-y-3">
              {transformed.children?.map((card, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium">Card {index + 1}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Type: {card?.type?.name || 'Unknown'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } catch (error) {
      return (
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Error
          </h3>
          <p className="text-red-700 dark:text-red-300">
            {(error as Error).message}
          </p>
        </div>
      );
    }
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(
      canvas.getByText('Cards Section With Partial Cards')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const TransformInvalidCards: Story = {
  render: () => {
    try {
      const transformed = transformCardsSection(mockInvalidCardsData);

      return (
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
            Unexpected Success
          </h3>
          <p className="text-green-700 dark:text-green-300">
            This should have thrown an error but didn't.
          </p>
        </div>
      );
    } catch (error) {
      return (
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Expected Error
          </h3>
          <p className="text-red-700 dark:text-red-300">
            {(error as Error).message}
          </p>
        </div>
      );
    }
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(canvas.getByText('Expected Error')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllTransformations: Story = {
  render: () => {
    const transformations = [
      { name: 'Valid Cards', data: mockValidCardsData },
      { name: 'Without Cards', data: mockCardsDataWithoutCards },
      { name: 'With Partial Cards', data: mockCardsDataWithPartialCards },
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">All Cards Transformations</h3>

        <div className="space-y-4">
          {transformations.map(({ name, data }) => {
            try {
              const transformed = transformCardsSection(data);

              return (
                <div
                  key={name}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                >
                  <h4 className="font-medium mb-2">{name}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <strong>Title:</strong> {transformed.title || 'undefined'}
                    </div>
                    <div>
                      <strong>Cards:</strong>{' '}
                      {transformed.children?.length || 0}
                    </div>
                    <div>
                      <strong>Background:</strong> {transformed.background}
                    </div>
                    <div>
                      <strong>Border:</strong>{' '}
                      {transformed.border ? 'true' : 'false'}
                    </div>
                  </div>
                </div>
              );
            } catch (error) {
              return (
                <div
                  key={name}
                  className="bg-red-100 dark:bg-red-900 p-4 rounded-lg"
                >
                  <h4 className="font-medium mb-2 text-red-800 dark:text-red-200">
                    {name} - Error
                  </h4>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    {(error as Error).message}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  },
  play: async ({ canvas }) => {
    // Wait for the component to render
    await expect(
      canvas.getByText('All Cards Transformations')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

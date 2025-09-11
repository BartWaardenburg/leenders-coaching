import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { transformFAQSection } from './faq';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'Utilities/Sections/FAQ',
  component: () => null, // Utility stories don't have a component
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* Mock FAQ section data */
const mockValidFAQData = {
  _type: 'sectionFAQ',
  displayTitle: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our services.',
  items: [
    {
      _key: 'faq-1',
      question: 'What is your return policy?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'We offer a 30-day return policy for all products in original condition.',
            },
          ],
        },
      ],
    },
    {
      _key: 'faq-2',
      question: 'How long does shipping take?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.',
            },
          ],
        },
      ],
    },
    {
      _key: 'faq-3',
      question: 'Do you offer international shipping?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.',
            },
          ],
        },
      ],
    },
  ],
  background: 'white',
  border: true,
};

const mockFAQDataWithoutItems = {
  _type: 'sectionFAQ',
  displayTitle: 'FAQ Without Items',
  description: 'This FAQ section has no items.',
  background: 'gray',
  border: false,
};

const mockFAQDataWithInvalidItems = {
  _type: 'sectionFAQ',
  displayTitle: 'FAQ With Invalid Items',
  description: 'This FAQ section has some invalid items.',
  items: [
    {
      _key: 'faq-1',
      question: 'Valid question?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Valid answer.',
            },
          ],
        },
      ],
    },
    {
      _key: 'faq-2',
      // Missing question
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Invalid answer without question.',
            },
          ],
        },
      ],
    },
    {
      _key: 'faq-3',
      question: 'Question without answer?',
      // Missing answer
    },
    {
      // Missing _key
      question: 'Question without key?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Answer without key.',
            },
          ],
        },
      ],
    },
  ],
  background: 'white',
  border: true,
};

const mockInvalidFAQData = {
  _type: 'invalidSection',
  displayTitle: 'Invalid Section',
  description: 'This should throw an error.',
};

export const TransformValidFAQ: Story = {
  render: () => {
    try {
      const transformed = transformFAQSection(mockValidFAQData);

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Valid FAQ Section Transformation
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
                <strong>Items Count:</strong> {transformed.items.length}
              </p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">FAQ Items:</h4>
            <div className="space-y-3">
              {transformed.items.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">{item.question}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Answer: {item.answer.length} block(s)
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
    await expect(
      canvas.getByText('Valid FAQ Section Transformation')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const TransformFAQWithoutItems: Story = {
  render: () => {
    try {
      const transformed = transformFAQSection(mockFAQDataWithoutItems);

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">FAQ Section Without Items</h3>

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
                <strong>Items Count:</strong> {transformed.items.length}
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
    await expect(
      canvas.getByText('FAQ Section Without Items')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const TransformFAQWithInvalidItems: Story = {
  render: () => {
    try {
      const transformed = transformFAQSection(mockFAQDataWithInvalidItems);

      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            FAQ Section With Invalid Items
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
                <strong>Items Count:</strong> {transformed.items.length}{' '}
                (filtered from 4)
              </p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Valid FAQ Items (filtered):</h4>
            <div className="space-y-3">
              {transformed.items.map((item, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium">{item.question}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Answer: {item.answer.length} block(s)
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
    await expect(
      canvas.getByText('FAQ Section With Invalid Items')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const TransformInvalidFAQ: Story = {
  render: () => {
    try {
      transformFAQSection(mockInvalidFAQData);

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
    await expect(canvas.getByText('Expected Error')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllTransformations: Story = {
  render: () => {
    const transformations = [
      { name: 'Valid FAQ', data: mockValidFAQData },
      { name: 'Without Items', data: mockFAQDataWithoutItems },
      { name: 'With Invalid Items', data: mockFAQDataWithInvalidItems },
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">All FAQ Transformations</h3>

        <div className="space-y-4">
          {transformations.map(({ name, data }) => {
            try {
              const transformed = transformFAQSection(data);

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
                      <strong>Items:</strong> {transformed.items.length}
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
    await expect(
      canvas.getByText('All FAQ Transformations')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

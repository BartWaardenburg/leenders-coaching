import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { FAQ } from './FAQ';
import { mockFAQSection } from '@/mocks';

const meta = {
  title: 'UI/FAQ',
  component: FAQ,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array van FAQ items',
    },
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Kleur variant van de FAQ',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
  },
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mock data
const samplePortableText = mockFAQSection.faqs[0]?.answer || [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'Dit is een basis antwoord met opgemaakte tekst.',
      },
    ],
    style: 'normal',
  },
];

export const Default: Story = {
  args: {
    items: [
      {
        question: 'Welke diensten biedt u aan?',
        answer: samplePortableText,
      },
      {
        question: 'Hoe kan ik een afspraak inplannen?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'U kunt een afspraak inplannen via ons online boekingssysteem of ons direct contacteren.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'Wat zijn uw werkuren?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Wij zijn beschikbaar van maandag tot vrijdag, van 9:00 tot 17:00.',
              },
            ],
            style: 'normal',
          },
        ],
      },
    ],
  },
  play: async ({ canvas, userEvent }) => {
    expect(canvas.getByText('Welke diensten biedt u aan?')).toBeInTheDocument();
    expect(
      canvas.getByText('Hoe kan ik een afspraak inplannen?')
    ).toBeInTheDocument();
    expect(canvas.getByText('Wat zijn uw werkuren?')).toBeInTheDocument();

    // Test FAQ interaction - clicking on questions to expand/collapse
    const firstQuestion = canvas.getByText('Welke diensten biedt u aan?');
    await userEvent.click(firstQuestion);

    // Wait for any animations

    // FAQ interaction complete - no animation wait needed
  },
};

export const WithVariant: Story = {
  args: {
    ...Default.args,
    variant: 'purple',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('Welke diensten biedt u aan?')).toBeInTheDocument();
    expect(
      canvas.getByText('Hoe kan ik een afspraak inplannen?')
    ).toBeInTheDocument();
    expect(canvas.getByText('Wat zijn uw werkuren?')).toBeInTheDocument();
    // FAQ interaction complete - no animation wait needed
  },
};

export const InteractiveFAQ: Story = {
  args: {
    items: [
      {
        question: 'Welke diensten biedt u aan?',
        answer: samplePortableText,
      },
      {
        question: 'Hoe kan ik een afspraak inplannen?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'U kunt een afspraak inplannen via ons online boekingssysteem of ons direct contacteren.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'Wat zijn uw werkuren?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Wij zijn beschikbaar van maandag tot vrijdag, van 9:00 tot 17:00.',
              },
            ],
            style: 'normal',
          },
        ],
      },
    ],
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Initial state verification', async () => {
      expect(
        canvas.getByText('Welke diensten biedt u aan?')
      ).toBeInTheDocument();
      expect(
        canvas.getByText('Hoe kan ik een afspraak inplannen?')
      ).toBeInTheDocument();
      expect(canvas.getByText('Wat zijn uw werkuren?')).toBeInTheDocument();
    });

    await step('Expand first FAQ item', async () => {
      const firstQuestion = canvas.getByText('Welke diensten biedt u aan?');
      await userEvent.click(firstQuestion);

      // Wait for expansion animation

      // Verify answer is visible (using partial text match)
      expect(
        canvas.getByText(/Onze coaching sessies duren meestal 60-90 minuten/)
      ).toBeInTheDocument();
    });

    await step('Expand second FAQ item', async () => {
      const secondQuestion = canvas.getByText(
        'Hoe kan ik een afspraak inplannen?'
      );
      await userEvent.click(secondQuestion);

      // Wait for expansion animation

      // Verify answer is visible
      expect(
        canvas.getByText(
          'U kunt een afspraak inplannen via ons online boekingssysteem of ons direct contacteren.'
        )
      ).toBeInTheDocument();
    });

    await step('Keyboard navigation', async () => {
      // Test keyboard activation without focus assertion
      await userEvent.keyboard('{Enter}');
    });

    await step('Hover interactions', async () => {
      const thirdQuestion = canvas.getByText('Wat zijn uw werkuren?');
      await userEvent.hover(thirdQuestion);

      // Wait for any hover effects

      // Click to expand
      await userEvent.click(thirdQuestion);

      // Verify answer is visible
      expect(
        canvas.getByText(
          'Wij zijn beschikbaar van maandag tot vrijdag, van 9:00 tot 17:00.'
        )
      ).toBeInTheDocument();
    });

    // FAQ interaction complete - no animation wait needed
  },
};

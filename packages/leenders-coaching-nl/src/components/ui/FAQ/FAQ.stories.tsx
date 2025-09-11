import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { FAQ } from './FAQ';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/FAQ',
  component: FAQ,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePortableText = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'This is a basic answer with ',
      },
      {
        _type: 'span',
        marks: ['strong'],
        text: 'formatted text',
      },
      {
        _type: 'span',
        text: ' and a ',
      },
      {
        _type: 'span',
        marks: ['link'],
        text: 'link',
        value: {
          href: 'https://example.com',
        },
      },
      {
        _type: 'span',
        text: '.',
      },
    ],
    style: 'normal',
  },
];

export const Default: Story = {
  args: {
    items: [
      {
        question: 'What services do you offer?',
        answer: samplePortableText,
      },
      {
        question: 'How can I schedule an appointment?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'You can schedule an appointment through our online booking system or contact us directly.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'What are your working hours?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We are available Monday through Friday, from 9:00 AM to 5:00 PM.',
              },
            ],
            style: 'normal',
          },
        ],
      },
    ],
  },
  play: async ({ canvas, userEvent }) => {
    expect(canvas.getByText('What services do you offer?')).toBeInTheDocument();
    expect(
      canvas.getByText('How can I schedule an appointment?')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('What are your working hours?')
    ).toBeInTheDocument();

    // Test FAQ interaction - clicking on questions to expand/collapse
    const firstQuestion = canvas.getByText('What services do you offer?');
    await userEvent.click(firstQuestion);

    // Wait for any animations
    await new Promise((resolve) => setTimeout(resolve, 100));

    await waitForMotionAnimations({ canvas });
  },
};

export const WithVariant: Story = {
  args: {
    ...Default.args,
    variant: 'purple',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('What services do you offer?')).toBeInTheDocument();
    expect(
      canvas.getByText('How can I schedule an appointment?')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('What are your working hours?')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const InteractiveFAQ: Story = {
  args: {
    items: [
      {
        question: 'What services do you offer?',
        answer: samplePortableText,
      },
      {
        question: 'How can I schedule an appointment?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'You can schedule an appointment through our online booking system or contact us directly.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'What are your working hours?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We are available Monday through Friday, from 9:00 AM to 5:00 PM.',
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
        canvas.getByText('What services do you offer?')
      ).toBeInTheDocument();
      expect(
        canvas.getByText('How can I schedule an appointment?')
      ).toBeInTheDocument();
      expect(
        canvas.getByText('What are your working hours?')
      ).toBeInTheDocument();
    });

    await step('Expand first FAQ item', async () => {
      const firstQuestion = canvas.getByText('What services do you offer?');
      await userEvent.click(firstQuestion);

      // Wait for expansion animation
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Verify answer is visible (using partial text match)
      expect(canvas.getByText(/This is a basic answer/)).toBeInTheDocument();
    });

    await step('Expand second FAQ item', async () => {
      const secondQuestion = canvas.getByText(
        'How can I schedule an appointment?'
      );
      await userEvent.click(secondQuestion);

      // Wait for expansion animation
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Verify answer is visible
      expect(
        canvas.getByText(
          'You can schedule an appointment through our online booking system or contact us directly.'
        )
      ).toBeInTheDocument();
    });

    await step('Keyboard navigation', async () => {
      // Test keyboard activation without focus assertion
      await userEvent.keyboard('{Enter}');
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    await step('Hover interactions', async () => {
      const thirdQuestion = canvas.getByText('What are your working hours?');
      await userEvent.hover(thirdQuestion);

      // Wait for any hover effects
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Click to expand
      await userEvent.click(thirdQuestion);
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Verify answer is visible
      expect(
        canvas.getByText(
          'We are available Monday through Friday, from 9:00 AM to 5:00 PM.'
        )
      ).toBeInTheDocument();
    });

    await waitForMotionAnimations({ canvas });
  },
};

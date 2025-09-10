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
  play: async ({ canvas }) => {
    // Wait for FAQ questions to be visible
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

export const WithVariant: Story = {
  args: {
    ...Default.args,
    variant: 'purple',
  },
  play: async ({ canvas }) => {
    // Wait for FAQ questions to be visible
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

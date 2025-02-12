import type { Meta, StoryObj } from '@storybook/react';
import { SectionFAQ } from './SectionFAQ';

const meta = {
  title: 'Sections/SectionFAQ',
  component: SectionFAQ,
  parameters: {
    layout: 'full',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Show top and bottom borders',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show border under heading',
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
      description: 'Maximum width of the content',
    },
  },
} satisfies Meta<typeof SectionFAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePortableText = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'This is a detailed answer that includes ',
      },
      {
        _type: 'span',
        marks: ['strong'],
        text: 'formatted content',
      },
      {
        _type: 'span',
        text: ' and ',
      },
      {
        _type: 'span',
        marks: ['link'],
        text: 'links',
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
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'You can even have multiple paragraphs.',
      },
    ],
    style: 'normal',
  },
];

export const Default: Story = {
  args: {
    title: 'Frequently Asked Questions',
    description:
      'Find answers to the most common questions about our services.',
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
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
  },
};

export const WithBorder: Story = {
  args: {
    ...Default.args,
    border: true,
    showBorder: true,
  },
};

export const WithPurpleBackground: Story = {
  args: {
    ...Default.args,
    background: 'purple',
    border: true,
    showBorder: true,
  },
};

export const Narrow: Story = {
  args: {
    ...Default.args,
    maxWidth: 'xl',
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionFAQ } from './SectionFAQ';

const meta = {
  title: 'Sections/SectionFAQ',
  component: SectionFAQ,
  parameters: {
    layout: 'full',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the section',
    },
    description: {
      control: 'text',
      description: 'The description text',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Show top and bottom borders',
    },
    items: {
      control: 'object',
      description: 'Array of FAQ items',
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
  },
};

export const WithPurpleBackground: Story = {
  args: {
    ...Default.args,
    background: 'purple',
    border: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    description:
      'Find answers to the most common questions about our services.',
    items: Default.args.items,
    background: 'green',
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Frequently Asked Questions',
    items: Default.args.items,
    background: 'pink',
    border: true,
  },
};

export const MinimalContent: Story = {
  args: {
    items: Default.args.items,
    background: 'yellow',
  },
};

export const SingleFAQ: Story = {
  args: {
    title: 'Single FAQ Item',
    description: 'Sometimes you only need one FAQ item.',
    items: [Default.args.items[0]!],
    background: 'teal',
    border: true,
  },
};

export const ManyFAQs: Story = {
  args: {
    title: 'Comprehensive FAQ',
    description:
      'This section demonstrates how the FAQ handles multiple items.',
    items: [
      ...Default.args.items,
      {
        question: 'Do you offer group coaching sessions?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Yes, we offer both individual and group coaching sessions. Group sessions can be a great way to learn from others and share experiences.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'What is your cancellation policy?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We require 24 hours notice for cancellations. Cancellations made with less than 24 hours notice may be subject to a cancellation fee.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'How do I prepare for my first session?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Before your first session, think about your goals and what you hope to achieve. You may also want to prepare any questions you have about the coaching process.',
              },
            ],
            style: 'normal',
          },
        ],
      },
    ],
    background: 'blue',
    border: true,
  },
};

export const AllBackgroundVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    items: [],
  },
  render: () => (
    <div className="space-y-0">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (background) => (
          <SectionFAQ
            key={background}
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Background FAQ`}
            description={`This FAQ section demonstrates the ${background} background variant.`}
            items={Default.args.items}
            background={background}
            border={true}
          />
        )
      )}
    </div>
  ),
};

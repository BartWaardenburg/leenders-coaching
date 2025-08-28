import type { Meta, StoryObj } from '@storybook/nextjs';
import { SectionContent } from './SectionContent';
import type { PortableTextBlock } from '@portabletext/react';

const meta = {
  title: 'Sections/SectionContent',
  component: SectionContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the section',
    },
    content: {
      control: 'object',
      description: 'Portable Text content blocks',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the section',
    },
  },
} satisfies Meta<typeof SectionContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent: PortableTextBlock[] = [
  {
    _type: 'block',
    style: 'h3',
    children: [
      {
        _type: 'span',
        text: 'Rich Text Content Example',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'This is a paragraph with ',
      },
      {
        _type: 'span',
        marks: ['strong'],
        text: 'bold text',
      },
      {
        _type: 'span',
        text: ' and ',
      },
      {
        _type: 'span',
        marks: ['em'],
        text: 'italic text',
      },
      {
        _type: 'span',
        text: '. You can also add ',
      },
      {
        _type: 'span',
        marks: ['strong', 'em'],
        text: 'bold and italic',
      },
      {
        _type: 'span',
        text: ' text together.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: 'Here is a link to ',
      },
      {
        _type: 'span',
        marks: ['link'],
        text: 'our website',
        markDefs: [
          {
            _type: 'link',
            _key: '123',
            href: 'https://example.com',
          },
        ],
      },
      {
        _type: 'span',
        text: '.',
      },
    ],
  },
  {
    _type: 'block',
    style: 'h4',
    children: [
      {
        _type: 'span',
        text: 'Lists Example',
      },
    ],
  },
  {
    _type: 'block',
    style: 'bullet',
    level: 1,
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'First bullet point',
      },
    ],
  },
  {
    _type: 'block',
    style: 'bullet',
    level: 1,
    listItem: 'bullet',
    children: [
      {
        _type: 'span',
        text: 'Second bullet point with ',
      },
      {
        _type: 'span',
        marks: ['strong'],
        text: 'bold text',
      },
    ],
  },
  {
    _type: 'block',
    style: 'number',
    level: 1,
    listItem: 'number',
    children: [
      {
        _type: 'span',
        text: 'First numbered item',
      },
    ],
  },
  {
    _type: 'block',
    style: 'number',
    level: 1,
    listItem: 'number',
    children: [
      {
        _type: 'span',
        text: 'Second numbered item with ',
      },
      {
        _type: 'span',
        marks: ['em'],
        text: 'italic text',
      },
    ],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [
      {
        _type: 'span',
        text: 'This is a blockquote that can be used to highlight important text or quotes.',
      },
    ],
  },
];

export const Default: Story = {
  args: {
    title: 'Section Title',
    content: defaultContent,
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
  },
};

export const WithBackgroundAndBorder: Story = {
  args: {
    ...Default.args,
    background: 'blue',
    border: true,
  },
};

export const NoTitle: Story = {
  args: {
    content: defaultContent,
  },
};

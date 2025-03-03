import type { Meta, StoryObj } from '@storybook/react';
import { PortableText } from './PortableText';

const meta = {
  title: 'UI/PortableText',
  component: PortableText,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'object',
      description: 'Portable Text content blocks',
    },
    className: {
      control: 'text',
      description: 'Optional className for the wrapper',
    },
  },
} satisfies Meta<typeof PortableText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFeatures: Story = {
  args: {
    content: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'All PortableText Features' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'This story showcases all available features of the PortableText component. ' },
          { _type: 'span', marks: ['strong'], text: 'Bold text, ' },
          { _type: 'span', marks: ['em'], text: 'italic text, ' },
          { _type: 'span', marks: ['underline'], text: 'underlined text, ' },
          { _type: 'span', marks: ['strike'], text: 'strikethrough text, ' },
          { _type: 'span', marks: ['highlight'], text: 'highlighted text, ' },
          { _type: 'span', marks: ['code'], text: 'inline code' },
          { _type: 'span', text: '.' },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Links' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'We support ' },
          {
            _type: 'span',
            marks: ['link-1'],
            text: 'internal links',
          },
          { _type: 'span', text: ' and ' },
          {
            _type: 'span',
            marks: ['link-2'],
            text: 'external links',
          },
          { _type: 'span', text: '.' },
        ],
        markDefs: [
          {
            _key: 'link-1',
            _type: 'link',
            href: '#',
          },
          {
            _key: 'link-2',
            _type: 'link',
            href: 'https://example.com',
            blank: true,
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Lists' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Unordered list item 1' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Unordered list item 2' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Ordered list item 1' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Ordered list item 2' }],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Blockquote' }],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          { _type: 'span', text: 'This is a blockquote with styled content. ' },
          { _type: 'span', marks: ['em'], text: 'It can also contain formatted text.' },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Image' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'image',
            asset: {
              _ref: 'image-example',
              _type: 'reference',
              url: 'https://picsum.photos/800/400',
            },
            hotspot: {
              x: 0.5,
              y: 0.5,
              height: 1,
              width: 1,
            },
            alt: 'A sample image',
            caption: 'This is a sample image caption',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Code Block' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'code',
            code: `function hello() {
  console.log('Hello, world!');
}`,
            language: 'javascript',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Call to Action' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'callToAction',
            text: 'Click me!',
            url: '#',
            isExternal: false,
          },
        ],
      },
    ],
  },
};

export const SimpleText: Story = {
  args: {
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'This is a simple paragraph with plain text.',
          },
        ],
      },
    ],
  },
};

export const Headings: Story = {
  args: {
    content: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Heading 1' }],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Heading 2' }],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Heading 3' }],
      },
      {
        _type: 'block',
        style: 'h4',
        children: [{ _type: 'span', text: 'Heading 4' }],
      },
      {
        _type: 'block',
        style: 'h5',
        children: [{ _type: 'span', text: 'Heading 5' }],
      },
      {
        _type: 'block',
        style: 'h6',
        children: [{ _type: 'span', text: 'Heading 6' }],
      },
    ],
  },
};

export const RichText: Story = {
  args: {
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'This text contains ' },
          { _type: 'span', marks: ['strong'], text: 'bold' },
          { _type: 'span', text: ', ' },
          { _type: 'span', marks: ['em'], text: 'italic' },
          { _type: 'span', text: ', ' },
          { _type: 'span', marks: ['underline'], text: 'underline' },
          { _type: 'span', text: ', ' },
          { _type: 'span', marks: ['strike'], text: 'strikethrough' },
          { _type: 'span', text: ', and ' },
          { _type: 'span', marks: ['highlight'], text: 'highlighted' },
          { _type: 'span', text: ' text.' },
        ],
      },
    ],
  },
};

export const Lists: Story = {
  args: {
    content: [
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Unordered List' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'First item' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Second item' }],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Ordered List' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'First item' }],
      },
      {
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: 'Second item' }],
      },
    ],
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { PortableText } from './PortableText';

const meta = {
  title: 'UI/PortableText',
  component: PortableText,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Portable Text inhoud blokken',
    },
    className: {
      control: 'text',
      description: 'Optionele className voor de wrapper',
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
          {
            _type: 'span',
            text: 'This story showcases all available features of the PortableText component. ',
          },
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
          {
            _type: 'span',
            marks: ['em'],
            text: 'It can also contain formatted text.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Images' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Images in PortableText are handled by the SanityImage component and require real Sanity assets. In Storybook, we demonstrate other features instead.',
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
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('All PortableText Features')).toBeVisible();
    await expect(_canvas.getByText('Links')).toBeVisible();
    await expect(_canvas.getByText('Lists')).toBeVisible();
    await expect(_canvas.getByText('Blockquote')).toBeVisible();
    await expect(_canvas.getByText('Images')).toBeVisible();
    await expect(_canvas.getByText('Code Block')).toBeVisible();
    await expect(_canvas.getByText('Call to Action')).toBeVisible();
    // PortableText rendering complete - no animation wait needed
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
  play: async ({ canvas: _canvas }) => {
    await expect(
      _canvas.getByText('This is a simple paragraph with plain text.')
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
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
  play: async ({ canvas: _canvas }) => {
    await expect(
      _canvas.getByRole('heading', { name: 'Heading 1' })
    ).toBeVisible();
    await expect(
      _canvas.getByRole('heading', { name: 'Heading 2' })
    ).toBeVisible();
    await expect(
      _canvas.getByRole('heading', { name: 'Heading 3' })
    ).toBeVisible();
    await expect(
      _canvas.getByRole('heading', { name: 'Heading 4' })
    ).toBeVisible();
    await expect(
      _canvas.getByRole('heading', { name: 'Heading 5' })
    ).toBeVisible();
    await expect(
      _canvas.getByRole('heading', { name: 'Heading 6' })
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
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
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('Unordered List')).toBeVisible();
    await expect(_canvas.getByText('Ordered List')).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const EmptyContent: Story = {
  args: {
    content: [],
  },
  play: async ({ canvas: _canvas }) => {
    // Empty content should render without errors
    // PortableText rendering complete - no animation wait needed
  },
};

export const InvalidContent: Story = {
  args: {
    content: [
      {
        _type: 'invalidBlock',
        children: [{ _type: 'span', text: 'This should be ignored' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Valid content after invalid block' },
        ],
      },
    ],
  },
  play: async ({ canvas: _canvas }) => {
    // Should render valid content and ignore invalid blocks
    await expect(
      _canvas.getByText('Valid content after invalid block')
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const ComplexNestedContent: Story = {
  args: {
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Complex Nested Content' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'This paragraph has ' },
          {
            _type: 'span',
            marks: ['strong', 'em'],
            text: 'bold and italic text',
          },
          { _type: 'span', text: ' and ' },
          {
            _type: 'span',
            marks: ['underline', 'highlight'],
            text: 'underlined and highlighted text',
          },
          { _type: 'span', text: '.' },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          { _type: 'span', text: 'A blockquote with ' },
          { _type: 'span', marks: ['strong'], text: 'bold text' },
          { _type: 'span', text: ' and ' },
          { _type: 'span', marks: ['em'], text: 'italic text' },
          { _type: 'span', text: '.' },
        ],
      },
    ],
  },
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('Complex Nested Content')).toBeVisible();
    await expect(_canvas.getByText('bold and italic text')).toBeVisible();
    await expect(
      _canvas.getByText('underlined and highlighted text')
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const WithCustomClassName: Story = {
  args: {
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Custom Styled Content' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'This content has custom styling applied.' },
        ],
      },
    ],
    className:
      'border-2 border-blue-500 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20',
  },
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('Custom Styled Content')).toBeVisible();
    await expect(
      _canvas.getByText('This content has custom styling applied.')
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'This is simple text content.' }],
      },
    ],
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Simple Text</h3>
        <PortableText
          content={[
            {
              _type: 'block',
              style: 'normal',
              children: [
                { _type: 'span', text: 'This is simple text content.' },
              ],
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Rich Text</h3>
        <PortableText
          content={[
            {
              _type: 'block',
              style: 'normal',
              children: [
                { _type: 'span', text: 'This has ' },
                { _type: 'span', marks: ['strong'], text: 'bold' },
                { _type: 'span', text: ' and ' },
                { _type: 'span', marks: ['em'], text: 'italic' },
                { _type: 'span', text: ' text.' },
              ],
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Lists</h3>
        <PortableText
          content={[
            {
              _type: 'block',
              style: 'normal',
              listItem: 'bullet',
              children: [{ _type: 'span', text: 'List item 1' }],
            },
            {
              _type: 'block',
              style: 'normal',
              listItem: 'bullet',
              children: [{ _type: 'span', text: 'List item 2' }],
            },
          ]}
        />
      </div>
    </div>
  ),
  play: async ({ canvas: _canvas }) => {
    await expect(
      _canvas.getByText('This is simple text content.')
    ).toBeVisible();
    await expect(_canvas.getByText('bold')).toBeVisible();
    await expect(_canvas.getByText('italic')).toBeVisible();
    await expect(_canvas.getByText('List item 1')).toBeVisible();
    await expect(_canvas.getByText('List item 2')).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { PortableText } from './PortableText';
import { Heading } from '../Heading/Heading';
import { Box } from '../Box/Box';
import { mockSanityBlock } from '../../../mocks/sanity-mocks';

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
    content: mockSanityBlock.allFeatures,
  },
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('Alle PortableText Functies')).toBeVisible();
    await expect(_canvas.getByText('Links')).toBeVisible();
    await expect(_canvas.getByText('Lijsten')).toBeVisible();
    await expect(_canvas.getByText('Citaat')).toBeVisible();
    await expect(_canvas.getByText('Code Blok')).toBeVisible();
    await expect(_canvas.getByText('Call to Action')).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const SimpleText: Story = {
  args: {
    content: mockSanityBlock.simple,
  },
  play: async ({ canvas: _canvas }) => {
    await expect(
      _canvas.getByText(
        'Dit is een eenvoudige tekstblok voor testing doeleinden.'
      )
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const Headings: Story = {
  args: {
    content: mockSanityBlock.headings,
  },
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByRole('heading', { name: 'Kop 1' })).toBeVisible();
    await expect(_canvas.getByRole('heading', { name: 'Kop 2' })).toBeVisible();
    await expect(_canvas.getByRole('heading', { name: 'Kop 3' })).toBeVisible();
    await expect(_canvas.getByRole('heading', { name: 'Kop 4' })).toBeVisible();
    await expect(_canvas.getByRole('heading', { name: 'Kop 5' })).toBeVisible();
    await expect(_canvas.getByRole('heading', { name: 'Kop 6' })).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const RichText: Story = {
  args: {
    content: mockSanityBlock.richText,
  },
};

export const Lists: Story = {
  args: {
    content: mockSanityBlock.lists,
  },
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('Ongeordende Lijst')).toBeVisible();
    await expect(_canvas.getByText('Geordende Lijst')).toBeVisible();
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
        children: [{ _type: 'span', text: 'Dit zou genegeerd moeten worden' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Geldige inhoud na ongeldig blok' }],
      },
    ],
  },
  play: async ({ canvas: _canvas }) => {
    // Should render valid content and ignore invalid blocks
    await expect(
      _canvas.getByText('Geldige inhoud na ongeldig blok')
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const ComplexNestedContent: Story = {
  args: {
    content: mockSanityBlock.complexNested,
  },
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('Complexe Geneste Inhoud')).toBeVisible();
    await expect(
      _canvas.getByText('vetgedrukte en cursieve tekst')
    ).toBeVisible();
    await expect(
      _canvas.getByText('onderstreepte en gemarkeerde tekst')
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
        children: [{ _type: 'span', text: 'Aangepaste Stijling Inhoud' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Deze inhoud heeft aangepaste stijling toegepast.',
          },
        ],
      },
    ],
    className: 'border-2 border-blue-500 p-4 bg-blue-50 dark:bg-blue-900/20',
  },
  play: async ({ canvas: _canvas }) => {
    await expect(_canvas.getByText('Aangepaste Stijling Inhoud')).toBeVisible();
    await expect(
      _canvas.getByText('Deze inhoud heeft aangepaste stijling toegepast.')
    ).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const LongFormContent: Story = {
  args: {
    content: mockSanityBlock.longForm,
  },
  play: async ({ canvas: _canvas }) => {
    await expect(
      _canvas.getByText('Uitgebreid Inhoud Voorbeeld')
    ).toBeVisible();
    await expect(
      _canvas.getByText('Geavanceerde Opmaak en Links')
    ).toBeVisible();
    await expect(
      _canvas.getByText('Lijsten en Gestructureerde Inhoud')
    ).toBeVisible();
    await expect(
      _canvas.getByText('Citaten en Speciale Elementen')
    ).toBeVisible();
    await expect(
      _canvas.getByText('Code Blokken en Technische Inhoud')
    ).toBeVisible();
    await expect(_canvas.getByText('vetgedrukte tekst')).toBeVisible();
    await expect(_canvas.getByText('cursieve tekst')).toBeVisible();
    await expect(_canvas.getByText('onderstreepte tekst')).toBeVisible();
    await expect(_canvas.getByText('gemarkeerde inhoud')).toBeVisible();
    await expect(_canvas.getByText('inline code fragmenten')).toBeVisible();
    await expect(_canvas.getByText('interne links')).toBeVisible();
    await expect(_canvas.getByText('externe links')).toBeVisible();
    await expect(_canvas.getByText('doorgestreepte tekst')).toBeVisible();
    await expect(
      _canvas.getByText('vetgedrukt en cursief samen')
    ).toBeVisible();
    await expect(
      _canvas.getByText('onderstreepte en gemarkeerde tekst')
    ).toBeVisible();
    await expect(
      _canvas.getByText(
        'Eerste ongeordende lijst item met gedetailleerde informatie'
      )
    ).toBeVisible();
    await expect(
      _canvas.getByText((_content, element) => {
        return (
          element?.textContent ===
          'Tweede item met opgemaakte tekst binnen de lijst'
        );
      })
    ).toBeVisible();
    await expect(
      _canvas.getByText(
        'Eerste geordende lijst item voor stap-voor-stap inhoud'
      )
    ).toBeVisible();
    await expect(
      _canvas.getByText((_content, element) => {
        return (
          element?.textContent === 'Tweede geordende item met nadruk en code'
        );
      })
    ).toBeVisible();
    await expect(_canvas.getByText('Verken Meer Functies')).toBeVisible();
    // PortableText rendering complete - no animation wait needed
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    content: mockSanityBlock.simple,
  },
  render: () => (
    <Box className="space-y-6">
      <Box>
        <Heading level="h3" variant="small" className="mb-4">
          Eenvoudige Tekst
        </Heading>
        <PortableText content={mockSanityBlock.simple} />
      </Box>

      <Box>
        <Heading level="h3" variant="small" className="mb-4">
          Rijke Tekst
        </Heading>
        <PortableText content={mockSanityBlock.richText} />
      </Box>

      <Box>
        <Heading level="h3" variant="small" className="mb-4">
          Lijsten
        </Heading>
        <PortableText content={mockSanityBlock.lists} />
      </Box>
    </Box>
  ),
  play: async ({ canvas: _canvas }) => {
    await expect(
      _canvas.getByText(
        'Dit is een eenvoudige tekstblok voor testing doeleinden.'
      )
    ).toBeVisible();
    await expect(_canvas.getByText('vetgedrukte tekst')).toBeVisible();
    await expect(_canvas.getByText('cursieve tekst')).toBeVisible();
    await expect(_canvas.getAllByText('Eerste item')).toHaveLength(2);
    await expect(_canvas.getAllByText('Tweede item')).toHaveLength(2);
    // PortableText rendering complete - no animation wait needed
  },
};

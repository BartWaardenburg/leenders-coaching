import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SectionRenderer } from './SectionRenderer';
import { waitForMotionAnimations } from '../../test/chromatic-utils';
import { Box } from '@/components/ui/Box';

const meta = {
  title: 'Sections/SectionRenderer',
  component: SectionRenderer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: 'text',
      description: 'Het type sectie om te renderen',
    },
    data: {
      control: 'object',
      description: 'De data voor de sectie',
    },
  },
} satisfies Meta<typeof SectionRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Mock section data */
const mockHeaderSection = {
  _type: 'sectionHeader',
  title: 'Internal Header Title',
  displayTitle: 'Welcome to Our Website',
  description: 'Dit is een voorbeeld header sectie met titel en beschrijving.',
  background: 'white',
  border: false,
};

const mockContentSection = {
  _type: 'sectionContent',
  title: 'Internal Content Title',
  displayTitle: 'About Us',
  description: 'Meer informatie over ons bedrijf en missie.',
  content: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'We are a leading company in our industry, dedicated to providing excellent service and innovative solutions.',
        },
      ],
    },
  ],
  background: 'gray',
  border: true,
};

const mockCardsSection = {
  _type: 'sectionCards',
  title: 'Internal Cards Title',
  displayTitle: 'Our Services',
  description: 'Verken ons assortiment diensten',
  cards: [
    {
      _key: 'card-1',
      title: 'Service 1',
      description: 'Beschrijving voor dienst 1',
      featured: true,
      variant: 'default',
      border: true,
      reverse: false,
    },
    {
      _key: 'card-2',
      title: 'Service 2',
      description: 'Beschrijving voor dienst 2',
      featured: false,
      variant: 'default',
      border: true,
      reverse: true,
    },
  ],
  background: 'white',
  border: false,
};

const mockFAQSection = {
  _type: 'sectionFAQ',
  title: 'Internal FAQ Title',
  displayTitle: 'Frequently Asked Questions',
  description: 'Vind antwoorden op veelgestelde vragen',
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
              text: 'We offer a 30-day return policy for all products.',
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
              text: 'Standard shipping takes 3-5 business days.',
            },
          ],
        },
      ],
    },
  ],
  background: 'gray',
  border: true,
};

const mockFormSection = {
  _type: 'sectionForm',
  title: 'Internal Form Title',
  displayTitle: 'Contact Us',
  description: 'Neem contact op met ons team',
  form: {
    submitLabel: 'Send Message',
    fields: [
      {
        _key: 'field-1',
        type: 'text',
        label: 'Naam',
        required: true,
      },
      {
        _key: 'field-2',
        type: 'email',
        label: 'Email',
        required: true,
      },
    ],
  },
  background: 'white',
  border: false,
};

export const HeaderSection: Story = {
  args: {
    type: 'sectionHeader',
    data: mockHeaderSection,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const ContentSection: Story = {
  args: {
    type: 'sectionContent',
    data: mockContentSection,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const CardsSection: Story = {
  args: {
    type: 'sectionCards',
    data: mockCardsSection,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Our Services')).toBeInTheDocument();
    await expect(
      canvas.getByText('Verken ons assortiment diensten')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Service 1')).toBeInTheDocument();
    await expect(canvas.getByText('Service 2')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const FAQSection: Story = {
  args: {
    type: 'sectionFAQ',
    data: mockFAQSection,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const FormSection: Story = {
  args: {
    type: 'sectionForm',
    data: mockFormSection,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const InvalidSectionType: Story = {
  args: {
    type: 'invalidSection',
    data: { _type: 'invalidSection', title: 'This should not render' },
  },
  play: async ({ canvas }) => {
    // Invalid section type should not render anything
    await expect(
      canvas.queryByText('This should not render')
    ).not.toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const MissingData: Story = {
  args: {
    type: 'sectionHeader',
    data: {},
  },
  play: async ({ canvas }) => {
    // Missing data should not render anything or render with defaults
    await waitForMotionAnimations({ canvas });
  },
};

export const MalformedData: Story = {
  args: {
    type: 'sectionCards',
    data: {
      _type: 'sectionCards',
      // Missing required cards array
      displayTitle: 'Malformed Section',
    },
  },
  play: async ({ canvas }) => {
    // Malformed data should handle gracefully
    await waitForMotionAnimations({ canvas });
  },
};

export const AllSectionTypes: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    type: 'sectionHeader',
    data: mockHeaderSection,
  },
  render: () => (
    <Box className="space-y-8">
      <SectionRenderer type="sectionHeader" data={mockHeaderSection} />
      <SectionRenderer type="sectionContent" data={mockContentSection} />
      <SectionRenderer type="sectionCards" data={mockCardsSection} />
      <SectionRenderer type="sectionFAQ" data={mockFAQSection} />
      <SectionRenderer type="sectionForm" data={mockFormSection} />
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByTestId('section')).toHaveLength(5);
    await waitForMotionAnimations({ canvas });
  },
};

export const ErrorHandling: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    type: 'sectionHeader',
    data: mockHeaderSection,
  },
  render: () => (
    <Box className="space-y-8">
      <Box>
        <h3 className="text-lg font-semibold mb-4">Invalid Section Type</h3>
        <SectionRenderer
          type="invalidSection"
          data={{ title: 'Should not render' }}
        />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Empty Data</h3>
        <SectionRenderer type="sectionHeader" data={{}} />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Valid Section</h3>
        <SectionRenderer type="sectionHeader" data={mockHeaderSection} />
      </Box>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

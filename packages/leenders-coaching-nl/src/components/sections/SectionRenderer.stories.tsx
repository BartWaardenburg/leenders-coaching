import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SectionRenderer } from './SectionRenderer';
import { waitForMotionAnimations } from '../../test/chromatic-utils';

const meta = {
  title: 'Sections/SectionRenderer',
  component: SectionRenderer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'text',
      description: 'The type of section to render',
    },
    data: {
      control: 'object',
      description: 'The data for the section',
    },
  },
} satisfies Meta<typeof SectionRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Mock section data */
const mockHeaderSection = {
  _type: 'sectionHeader',
  title: 'Welcome to Our Website',
  description: 'This is a sample header section with title and description.',
  background: 'white',
  border: false,
};

const mockContentSection = {
  _type: 'sectionContent',
  title: 'About Us',
  description: 'Learn more about our company and mission.',
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
  displayTitle: 'Our Services',
  description: 'Explore our range of services',
  cards: [
    {
      _key: 'card-1',
      title: 'Service 1',
      description: 'Description for service 1',
      featured: true,
      variant: 'default',
      border: true,
      reverse: false,
    },
    {
      _key: 'card-2',
      title: 'Service 2',
      description: 'Description for service 2',
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
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions',
  faqs: [
    {
      _key: 'faq-1',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all products.',
    },
    {
      _key: 'faq-2',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days.',
    },
  ],
  background: 'gray',
  border: true,
};

const mockFormSection = {
  _type: 'sectionForm',
  title: 'Contact Us',
  description: 'Get in touch with our team',
  formFields: [
    {
      _key: 'field-1',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      _key: 'field-2',
      type: 'email',
      label: 'Email',
      required: true,
    },
  ],
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
      canvas.getByText('Explore our range of services')
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
    <div className="space-y-8">
      <SectionRenderer type="sectionHeader" data={mockHeaderSection} />
      <SectionRenderer type="sectionContent" data={mockContentSection} />
      <SectionRenderer type="sectionCards" data={mockCardsSection} />
      <SectionRenderer type="sectionFAQ" data={mockFAQSection} />
      <SectionRenderer type="sectionForm" data={mockFormSection} />
    </div>
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
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Invalid Section Type</h3>
        <SectionRenderer
          type="invalidSection"
          data={{ title: 'Should not render' }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Empty Data</h3>
        <SectionRenderer type="sectionHeader" data={{}} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Valid Section</h3>
        <SectionRenderer type="sectionHeader" data={mockHeaderSection} />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

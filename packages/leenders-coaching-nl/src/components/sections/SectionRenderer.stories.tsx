import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SectionRenderer } from './SectionRenderer';
import { waitForMotionAnimations } from '../../test/chromatic-utils';
import { Box } from '@/components/ui/Box';
import {
  mockHeaderSection,
  mockContentSection,
  mockCardsSection,
  mockFAQSection,
  mockFormSection,
} from '@/mocks';

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

/* Mock section data is now imported from @/mocks */

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
    await expect(canvas.getByText('Onze Diensten')).toBeInTheDocument();
    await expect(
      canvas.getByText('Verken ons uitgebreide aanbod van coaching diensten')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Loopbaancoaching')).toBeInTheDocument();
    await expect(canvas.getByText('Persoonlijke Coaching')).toBeInTheDocument();
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
    data: {
      _type: 'sectionForm',
      title: 'Interne Formulier Titel',
      displayTitle: 'Neem Contact Op',
      description: 'Neem contact op met ons team',
      form: {
        submitLabel: 'Verstuur Bericht',
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
            label: 'E-mail',
            required: true,
          },
        ],
      },
      background: 'white',
      border: false,
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const InvalidSectionType: Story = {
  args: {
    type: 'invalidSection',
    data: { _type: 'invalidSection', title: 'Dit zou niet moeten renderen' },
  },
  play: async ({ canvas }) => {
    // Invalid section type should not render anything
    await expect(
      canvas.queryByText('Dit zou niet moeten renderen')
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
      displayTitle: 'Ongeldige Sectie',
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
        <h3 className="text-lg font-semibold mb-4">Ongeldig Sectie Type</h3>
        <SectionRenderer
          type="invalidSection"
          data={{ title: 'Zou niet moeten renderen' }}
        />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Lege Data</h3>
        <SectionRenderer type="sectionHeader" data={{}} />
      </Box>

      <Box>
        <h3 className="text-lg font-semibold mb-4">Geldige Sectie</h3>
        <SectionRenderer type="sectionHeader" data={mockHeaderSection} />
      </Box>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

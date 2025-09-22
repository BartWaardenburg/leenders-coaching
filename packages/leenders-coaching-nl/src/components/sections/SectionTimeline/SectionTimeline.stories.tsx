import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionTimeline } from './SectionTimeline';
import { Button } from '@/components/ui/Button';
import { mockTimelineSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionTimeline',
  component: SectionTimeline,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'De titel van de sectie',
      required: true,
    },
    description: {
      control: 'text',
      description: 'De beschrijving tekst',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
    },
    border: {
      control: 'boolean',
      description: 'Toon boven- en onderranden',
    },
    steps: {
      control: 'object',
      description: 'Array van timeline stap objecten',
    },
  },
} satisfies Meta<typeof SectionTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mock data
const defaultSteps = mockTimelineSection.steps;

export const Default: Story = {
  args: {
    title: mockTimelineSection.displayTitle,
    description: mockTimelineSection.description,
    steps: defaultSteps,
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
    border: true,
  },
};

export const WithCustomContent: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/coaching',
      },
    },
  },
  args: {
    title: 'Begin Vandaag Uw Reis',
    description:
      'Zet de eerste stap naar het bereiken van uw doelen met ons gepersonaliseerde coaching programma.',
    steps: [
      ...defaultSteps.slice(0, 3),
      {
        title: 'Boek Uw Sessie',
        description:
          'Klaar om uw coaching reis te beginnen? Plan nu uw eerste sessie in.',
        date: 'Vandaag',
        content: (
          <Button variant="blue" size="sm" href="/contact" className="mt-2">
            Plan Nu In
          </Button>
        ),
      },
    ],
  },
};

export const WithIndividualColors: Story = {
  args: {
    ...Default.args,
    steps: defaultSteps.map((step, index) => {
      const colors = ['blue', 'purple', 'green', 'pink', 'teal'] as const;
      return { ...step, color: colors[index] };
    }),
  },
};

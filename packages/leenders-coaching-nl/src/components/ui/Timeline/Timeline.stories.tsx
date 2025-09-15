import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Timeline } from './Timeline';
import { Button } from '@/components/ui/Button';
import type { ComponentProps } from 'react';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { mockTimelineSection } from '@/mocks';

type TimelineProps = ComponentProps<typeof Timeline>;
type TimelineStep = TimelineProps['steps'][number];

const meta = {
  title: 'UI/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Standaard kleur thema van de tijdlijn',
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// Using centralized mock data
const defaultSteps: TimelineStep[] = mockTimelineSection.steps.map(
  (step, index) => ({
    title: step.title,
    description: step.description,
    date: `Week ${index + 1}`,
  })
);

export const Default: Story = {
  args: {
    steps: defaultSteps,
  },
  play: async ({ canvas }) => {
    const initialConsultation = canvas.getAllByText('Kennismakingsgesprek');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Doelstellingen Bepalen');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Actieplan Opstellen');
    expect(regularSessions.length).toBeGreaterThan(0);

    const progressReview = canvas.getAllByText('Implementatie');
    expect(progressReview.length).toBeGreaterThan(0);

    const finalEvaluation = canvas.getAllByText('Voortgangsbeoordeling');
    expect(finalEvaluation.length).toBeGreaterThan(0);

    await waitForMotionAnimations({ canvas });
  },
};

export const WithColor: Story = {
  args: {
    steps: defaultSteps,
    color: 'purple',
  },
  play: async ({ canvas }) => {
    const initialConsultation = canvas.getAllByText('Kennismakingsgesprek');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Doelstellingen Bepalen');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Actieplan Opstellen');
    expect(regularSessions.length).toBeGreaterThan(0);

    const progressReview = canvas.getAllByText('Implementatie');
    expect(progressReview.length).toBeGreaterThan(0);

    const finalEvaluation = canvas.getAllByText('Voortgangsbeoordeling');
    expect(finalEvaluation.length).toBeGreaterThan(0);

    await waitForMotionAnimations({ canvas });
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
    steps: [
      ...defaultSteps.slice(0, 3),
      {
        title: 'Book Your Session',
        description:
          'Ready to start your coaching journey? Schedule your first session now.',
        date: 'Today',
        content: (
          <Button variant="blue" size="sm" href="/contact" className="mt-2">
            Schedule Now
          </Button>
        ),
      },
    ],
    color: 'blue',
  },
  play: async ({ canvas }) => {
    const initialConsultation = canvas.getAllByText('Kennismakingsgesprek');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Doelstellingen Bepalen');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Actieplan Opstellen');
    expect(regularSessions.length).toBeGreaterThan(0);

    // Check for custom content (use getAllByText to handle multiple instances)
    const bookYourSession = canvas.getAllByText('Book Your Session');
    expect(bookYourSession.length).toBeGreaterThan(0);
    expect(
      canvas.getByRole('link', { name: 'Schedule Now' })
    ).toBeInTheDocument();

    await waitForMotionAnimations({ canvas });
  },
};

export const WithIndividualColors: Story = {
  args: {
    steps: defaultSteps.map((step, index): TimelineStep => {
      const colors: TimelineStep['color'][] = [
        'blue',
        'purple',
        'green',
        'pink',
        'teal',
      ];
      return { ...step, color: colors[index] };
    }),
  },
  play: async ({ canvas }) => {
    const initialConsultation = canvas.getAllByText('Kennismakingsgesprek');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Doelstellingen Bepalen');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Actieplan Opstellen');
    expect(regularSessions.length).toBeGreaterThan(0);

    const progressReview = canvas.getAllByText('Implementatie');
    expect(progressReview.length).toBeGreaterThan(0);

    const finalEvaluation = canvas.getAllByText('Voortgangsbeoordeling');
    expect(finalEvaluation.length).toBeGreaterThan(0);

    await waitForMotionAnimations({ canvas });
  },
};

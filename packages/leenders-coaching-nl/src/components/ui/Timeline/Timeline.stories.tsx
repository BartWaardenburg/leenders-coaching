import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Timeline } from './Timeline';
import { Button } from '@/components/ui/Button';
import type { ComponentProps } from 'react';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

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
      description: 'Default color theme of the timeline',
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps: TimelineStep[] = [
  {
    title: 'Initial Consultation',
    description:
      'A free introductory meeting to discuss your goals and how coaching can help you achieve them.',
    date: 'Week 1',
  },
  {
    title: 'Goal Setting',
    description:
      "Together we'll define clear, achievable goals and create a personalized coaching plan.",
    date: 'Week 2',
  },
  {
    title: 'Regular Sessions',
    description:
      'Weekly or bi-weekly coaching sessions to work on your goals and overcome challenges.',
    date: 'Weeks 3-8',
  },
  {
    title: 'Progress Review',
    description:
      'Regular check-ins to measure progress and adjust the coaching plan as needed.',
    date: 'Week 9',
  },
  {
    title: 'Final Evaluation',
    description:
      'Review achievements, celebrate success, and plan for continued growth.',
    date: 'Week 12',
  },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
  },
  play: async ({ canvas }) => {
    const initialConsultation = canvas.getAllByText('Initial Consultation');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Goal Setting');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Regular Sessions');
    expect(regularSessions.length).toBeGreaterThan(0);

    const progressReview = canvas.getAllByText('Progress Review');
    expect(progressReview.length).toBeGreaterThan(0);

    const finalEvaluation = canvas.getAllByText('Final Evaluation');
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
    const initialConsultation = canvas.getAllByText('Initial Consultation');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Goal Setting');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Regular Sessions');
    expect(regularSessions.length).toBeGreaterThan(0);

    const progressReview = canvas.getAllByText('Progress Review');
    expect(progressReview.length).toBeGreaterThan(0);

    const finalEvaluation = canvas.getAllByText('Final Evaluation');
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
    const initialConsultation = canvas.getAllByText('Initial Consultation');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Goal Setting');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Regular Sessions');
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
    const initialConsultation = canvas.getAllByText('Initial Consultation');
    expect(initialConsultation.length).toBeGreaterThan(0);

    const goalSetting = canvas.getAllByText('Goal Setting');
    expect(goalSetting.length).toBeGreaterThan(0);

    const regularSessions = canvas.getAllByText('Regular Sessions');
    expect(regularSessions.length).toBeGreaterThan(0);

    const progressReview = canvas.getAllByText('Progress Review');
    expect(progressReview.length).toBeGreaterThan(0);

    const finalEvaluation = canvas.getAllByText('Final Evaluation');
    expect(finalEvaluation.length).toBeGreaterThan(0);

    await waitForMotionAnimations({ canvas });
  },
};

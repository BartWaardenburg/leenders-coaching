import type { Meta, StoryObj } from '@storybook/react';
import { SectionTimeline } from './SectionTimeline';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Sections/SectionTimeline',
  component: SectionTimeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
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
    title: 'Your Coaching Journey',
    description:
      'A step-by-step guide to your personal development and growth with our coaching program.',
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
  args: {
    title: 'Start Your Journey Today',
    description:
      'Take the first step towards achieving your goals with our personalized coaching program.',
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

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Timeline } from './Timeline';
import { Button } from '@/components/ui/Button';
import type { ComponentProps } from 'react';

type TimelineProps = ComponentProps<typeof Timeline>;
type TimelineStep = TimelineProps['steps'][number];

const meta = {
  title: 'UI/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
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
};

export const WithColor: Story = {
  args: {
    steps: defaultSteps,
    color: 'purple',
  },
};

export const WithCustomContent: Story = {
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
};

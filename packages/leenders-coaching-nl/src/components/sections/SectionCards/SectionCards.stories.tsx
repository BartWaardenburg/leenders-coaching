import type { Meta, StoryObj } from '@storybook/react';
import { SectionCards } from './SectionCards';
import { Card } from '@/components/ui/Card';
import { ComponentProps } from 'react';

/* Story args type with numberOfCards */
type StoryArgs = {
  numberOfCards: number;
} & ComponentProps<typeof SectionCards>;

const meta = {
  title: 'Sections/SectionCards',
  component: SectionCards,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    numberOfCards: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Number of cards to display',
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

/* Helper function to generate multiple cards */
const generateCards = (count: number) => {
  const cards = [
    {
      title: 'Personal Development',
      excerpt:
        'Work on your personal growth with targeted coaching sessions tailored to your needs.',
      slug: 'personal-development',
    },
    {
      title: 'Career Coaching',
      excerpt:
        'Get guidance on career transitions, leadership development, and professional growth.',
      slug: 'career-coaching',
    },
    {
      title: 'Life Balance',
      excerpt:
        'Find harmony between work, personal life, and well-being with expert coaching.',
      slug: 'life-balance',
    },
    {
      title: 'Team Building',
      excerpt:
        'Strengthen team dynamics and collaboration through focused coaching sessions.',
      slug: 'team-building',
    },
    {
      title: 'Stress Management',
      excerpt:
        'Learn effective techniques to handle stress and improve your mental wellbeing.',
      slug: 'stress-management',
    },
    {
      title: 'Communication Skills',
      excerpt:
        'Enhance your communication abilities for better personal and professional relationships.',
      slug: 'communication-skills',
    },
  ];

  /* Generate array of required length by repeating and shuffling cards */
  const shuffledCards = Array(Math.ceil(count / cards.length))
    .fill(cards)
    .flat()
    .slice(0, count)
    .map((card, index) => ({
      ...card,
      slug: `${card.slug}-${index}`,
    }))
    .sort(() => Math.random() - 0.5);

  return shuffledCards.map((card) => (
    <Card key={card.slug} title={card.title} slug={card.slug}>
      {card.excerpt}
    </Card>
  ));
};

const defaultArgs = {
  title: 'Our Services',
  description:
    'Discover how we can help you achieve your goals with our comprehensive coaching services.',
  numberOfCards: 3,
  children: generateCards(3),
};

export const Default: Story = {
  args: defaultArgs,
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{generateCards(numberOfCards)}</SectionCards>
  ),
};

export const WithBackground: Story = {
  args: {
    ...defaultArgs,
    background: 'blue',
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{generateCards(numberOfCards)}</SectionCards>
  ),
};

export const WithBorder: Story = {
  args: {
    ...defaultArgs,
    background: 'blue',
    border: true,
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{generateCards(numberOfCards)}</SectionCards>
  ),
};

export const NoTitle: Story = {
  args: {
    ...defaultArgs,
    title: undefined,
    description: undefined,
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{generateCards(numberOfCards)}</SectionCards>
  ),
};

export const TwoCards: Story = {
  args: {
    ...defaultArgs,
    numberOfCards: 2,
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{generateCards(numberOfCards)}</SectionCards>
  ),
};

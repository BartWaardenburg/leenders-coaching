import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionCards } from './SectionCards';
import { Card } from '@/components/ui/Card';
import { ComponentProps } from 'react';
import { mockCardsSection } from '@/mocks';

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
    numberOfCards: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Aantal kaarten om weer te geven',
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

/* Use centralized mocks for different card counts */
const getCards = (count: number) => {
  return mockCardsSection.cards.slice(0, count).map((card) => (
    <Card
      key={card._key}
      title={card.title}
      variant={card.variant}
      border={card.border}
    >
      {card.description}
    </Card>
  ));
};

const defaultArgs = {
  title: mockCardsSection.displayTitle,
  description: mockCardsSection.description,
  numberOfCards: 3,
  children: getCards(3),
};

export const Default: Story = {
  args: defaultArgs,
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{getCards(numberOfCards)}</SectionCards>
  ),
};

export const WithBackground: Story = {
  args: {
    ...defaultArgs,
    background: 'blue',
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{getCards(numberOfCards)}</SectionCards>
  ),
};

export const WithBorder: Story = {
  args: {
    ...defaultArgs,
    background: 'blue',
    border: true,
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{getCards(numberOfCards)}</SectionCards>
  ),
};

export const TwoCards: Story = {
  args: {
    ...defaultArgs,
    numberOfCards: 2,
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{getCards(numberOfCards)}</SectionCards>
  ),
};

export const SixCards: Story = {
  args: {
    ...defaultArgs,
    numberOfCards: 6,
  },
  render: ({ numberOfCards, ...args }) => (
    <SectionCards {...args}>{getCards(numberOfCards)}</SectionCards>
  ),
};

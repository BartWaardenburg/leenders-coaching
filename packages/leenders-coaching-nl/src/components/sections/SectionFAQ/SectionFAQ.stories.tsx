import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionFAQ } from './SectionFAQ';

const meta = {
  title: 'Sections/SectionFAQ',
  component: SectionFAQ,
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
    items: {
      control: 'object',
      description: 'Array van FAQ items',
    },
  },
} satisfies Meta<typeof SectionFAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePortableText = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'Dit is een gedetailleerd antwoord dat ',
      },
      {
        _type: 'span',
        marks: ['strong'],
        text: 'geformatteerde inhoud',
      },
      {
        _type: 'span',
        text: ' en ',
      },
      {
        _type: 'span',
        marks: ['link'],
        text: 'links',
        value: {
          href: 'https://example.com',
        },
      },
      {
        _type: 'span',
        text: ' bevat.',
      },
    ],
    style: 'normal',
  },
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: "Je kunt zelfs meerdere alinea's hebben.",
      },
    ],
    style: 'normal',
  },
];

export const Default: Story = {
  args: {
    title: 'Veelgestelde Vragen',
    description:
      'Vind antwoorden op de meest gestelde vragen over onze diensten.',
    items: [
      {
        question: 'Welke diensten bieden jullie aan?',
        answer: samplePortableText,
      },
      {
        question: 'Hoe kan ik een afspraak inplannen?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Je kunt een afspraak inplannen via ons online boekingssysteem of ons direct contacteren.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'Wat zijn jullie openingstijden?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We zijn beschikbaar van maandag tot en met vrijdag, van 9:00 tot 17:00.',
              },
            ],
            style: 'normal',
          },
        ],
      },
    ],
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
  },
};

export const WithBorder: Story = {
  args: {
    ...Default.args,
    border: true,
  },
};

export const WithPurpleBackground: Story = {
  args: {
    ...Default.args,
    background: 'purple',
    border: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Veelgestelde Vragen',
    items: Default.args.items,
    background: 'pink',
    border: true,
  },
};

export const SingleFAQ: Story = {
  args: {
    title: 'Enkele FAQ Item',
    description: 'Soms heb je maar één FAQ item nodig.',
    items: [Default.args.items[0]!],
    background: 'teal',
    border: true,
  },
};

export const ManyFAQItems: Story = {
  args: {
    title: 'Uitgebreide FAQ',
    description: 'Deze sectie toont hoe de FAQ meerdere items afhandelt.',
    items: [
      ...Default.args.items,
      {
        question: 'Bieden jullie groepscoaching sessies aan?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Ja, we bieden zowel individuele als groepscoaching sessies aan. Groepssessies kunnen een geweldige manier zijn om van anderen te leren en ervaringen te delen.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'Wat is jullie annuleringsbeleid?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We vragen 24 uur van tevoren om annuleringen. Annuleringen met minder dan 24 uur van tevoren kunnen onderworpen zijn aan een annuleringskosten.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'Hoe bereid ik me voor op mijn eerste sessie?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Voor je eerste sessie, denk na over je doelen en wat je hoopt te bereiken. Je kunt ook eventuele vragen voorbereiden die je hebt over het coachingsproces.',
              },
            ],
            style: 'normal',
          },
        ],
      },
    ],
    background: 'blue',
    border: true,
  },
};

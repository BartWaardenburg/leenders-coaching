import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';

import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';

/* Voorbeeld afbeelding import - je moet een echte afbeelding toevoegen */
import exampleImage from '../../../assets/images/99-Simone-louise-boonstoppel-fotografie.jpg';
import { Grid } from '../Grid';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Section>
        <Story />
      </Section>
    ),
  ],
  argTypes: {
    border: {
      control: 'boolean',
      description: 'Of er een rand rond de kaart moet worden weergegeven',
    },
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur variant van de kaart',
    },
    featured: {
      control: 'boolean',
      description: 'Of de kaart uitgelicht is',
    },
    title: {
      control: 'text',
      description: 'Titel van de kaart',
    },
    date: {
      control: 'text',
      description: 'Datum om weer te geven',
    },
    categories: {
      control: 'object',
      description: 'Array van categorienamen',
    },
    image: {
      control: 'object',
      description: 'Afbeeldingsbron voor de kaart',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  title: 'Communicatievaardigheden',
  excerpt:
    'Verbeter je communicatievaardigheden voor betere persoonlijke en professionele relaties.',
  slug: 'communicatievaardigheden',
  children: <Text>Voorbeeldinhoud voor blauwe variant</Text>,
};

export const Default: Story = {
  args: defaultArgs,
};

export const WithImage: Story = {
  args: {
    ...defaultArgs,
    image: exampleImage,
  },
};

export const Featured: Story = {
  args: {
    ...defaultArgs,
    featured: true,
  },
};

export const WithMetadata: Story = {
  args: {
    ...defaultArgs,
    date: '15 maart 2024',
    categories: ['Persoonlijke Ontwikkeling', 'Carrière'],
  },
};

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title:
      'De complexiteit begrijpen van interpersoonlijke communicatie in professionele omgevingen',
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <Grid>
      <Card
        {...args}
        image={exampleImage}
        variant="blue"
        title="Blauwe Variant"
      >
        <Text>Voorbeeldinhoud voor blauwe variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="purple"
        title="Paarse Variant"
      >
        <Text>Voorbeeldinhoud voor paarse variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="green"
        title="Groene Variant"
      >
        <Text>Voorbeeldinhoud voor groene variant</Text>
      </Card>
      <Card {...args} image={exampleImage} variant="pink" title="Roze Variant">
        <Text>Voorbeeldinhoud voor roze variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="yellow"
        title="Gele Variant"
      >
        <Text>Voorbeeldinhoud voor gele variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="teal"
        title="Turquoise Variant"
      >
        <Text>Voorbeeldinhoud voor turquoise variant</Text>
      </Card>
    </Grid>
  ),
  args: {
    slug: defaultArgs.slug,
    title: 'Kleur Variant',
    border: true,
  },
};

export const AllVariantsNonClickable: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <Grid>
      <Card image={exampleImage} variant="blue" title="Blauwe Variant">
        <Text>Voorbeeldinhoud voor blauwe variant</Text>
      </Card>
      <Card image={exampleImage} variant="purple" title="Paarse Variant">
        <Text>Voorbeeldinhoud voor paarse variant</Text>
      </Card>
      <Card image={exampleImage} variant="green" title="Groene Variant">
        <Text>Voorbeeldinhoud voor groene variant</Text>
      </Card>
      <Card image={exampleImage} variant="pink" title="Roze Variant">
        <Text>Voorbeeldinhoud voor roze variant</Text>
      </Card>
      <Card image={exampleImage} variant="yellow" title="Gele Variant">
        <Text>Voorbeeldinhoud voor gele variant</Text>
      </Card>
      <Card image={exampleImage} variant="teal" title="Turquoise Variant">
        <Text>Voorbeeldinhoud voor turquoise variant</Text>
      </Card>
    </Grid>
  ),
  args: {
    title: 'Kleur Variant',
    border: true,
  },
};

export const FullExample: Story = {
  args: {
    ...defaultArgs,
    featured: true,
    date: '15 maart 2024',
    categories: ['Communicatie', 'Leiderschap'],
    image: exampleImage,
    variant: 'blue',
  },
};

export const WithoutExcerpt: Story = {
  args: {
    title: defaultArgs.title,
    slug: defaultArgs.slug,
  },
};

export const WithBorder: Story = {
  args: {
    ...defaultArgs,
    border: true,
  },
};

export const OnlyTitle: Story = {
  args: {
    title: 'Minimaal Kaart Voorbeeld',
    slug: 'minimaal',
  },
};

export const NonClickable: Story = {
  args: {
    title: 'Non-Clickable Card',
    image: exampleImage,
    date: '15 maart 2024',
    categories: ['Informatie'],
    variant: 'blue',
    border: true,
    children: (
      <Text>
        Dit is een informatieve kaart zonder link. De kaart heeft geen hover
        effecten omdat deze niet klikbaar is.
      </Text>
    ),
  },
};

export const NonClickableWithBorder: Story = {
  args: {
    ...NonClickable.args,
    border: true,
  },
};

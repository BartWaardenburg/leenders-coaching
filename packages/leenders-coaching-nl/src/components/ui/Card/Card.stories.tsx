import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Card } from './Card';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';

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
  testid: 'card-default',
  children: <Text>Voorbeeldinhoud voor blauwe variant</Text>,
};

export const Default: Story = {
  args: defaultArgs,
  play: async ({ canvas }) => {
    const cardTitle = canvas.getByText('Communicatievaardigheden');
    const cardContent = canvas.getByText('Voorbeeldinhoud voor blauwe variant');

    expect(cardTitle).toBeInTheDocument();
    expect(cardContent).toBeInTheDocument();

    await waitForMotionAnimations({
      canvas,
      element: canvas.getByTestId('card-default'),
    });
  },
};

export const WithImage: Story = {
  args: {
    ...defaultArgs,
    image: exampleImage,
    testid: 'card-with-image',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('Communicatievaardigheden')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    await waitForMotionAnimations({
      canvas,
      element: canvas.getByTestId('card-with-image'),
    });
  },
};

export const Featured: Story = {
  args: {
    ...defaultArgs,
    featured: true,
    testid: 'card-featured',
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText('Communicatievaardigheden')).toBeInTheDocument();
    await waitForMotionAnimations({
      canvas,
      element: canvas.getByTestId('card-featured'),
    });
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
        testid="card-blue-variant"
      >
        <Text>Voorbeeldinhoud voor blauwe variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="purple"
        title="Paarse Variant"
        testid="card-purple-variant"
      >
        <Text>Voorbeeldinhoud voor paarse variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="green"
        title="Groene Variant"
        testid="card-green-variant"
      >
        <Text>Voorbeeldinhoud voor groene variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="pink"
        title="Roze Variant"
        testid="card-pink-variant"
      >
        <Text>Voorbeeldinhoud voor roze variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="yellow"
        title="Gele Variant"
        testid="card-yellow-variant"
      >
        <Text>Voorbeeldinhoud voor gele variant</Text>
      </Card>
      <Card
        {...args}
        image={exampleImage}
        variant="teal"
        title="Turquoise Variant"
        testid="card-teal-variant"
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
  play: async ({ canvas }) => {
    expect(canvas.getByText('Blauwe Variant')).toBeInTheDocument();
    expect(canvas.getByText('Paarse Variant')).toBeInTheDocument();
    expect(canvas.getByText('Groene Variant')).toBeInTheDocument();
    expect(canvas.getByText('Roze Variant')).toBeInTheDocument();
    expect(canvas.getByText('Gele Variant')).toBeInTheDocument();
    expect(canvas.getByText('Turquoise Variant')).toBeInTheDocument();

    // Wait for animations on all cards
    await waitForMotionAnimations({
      canvas,
      element: canvas.getByTestId('card-blue-variant'),
    });
  },
};

export const AllVariantsNonClickable: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <Grid>
      <Card
        image={exampleImage}
        variant="blue"
        title="Blauwe Variant"
        testid="card-nonclickable-blue"
      >
        <Text>Voorbeeldinhoud voor blauwe variant</Text>
      </Card>
      <Card
        image={exampleImage}
        variant="purple"
        title="Paarse Variant"
        testid="card-nonclickable-purple"
      >
        <Text>Voorbeeldinhoud voor paarse variant</Text>
      </Card>
      <Card
        image={exampleImage}
        variant="green"
        title="Groene Variant"
        testid="card-nonclickable-green"
      >
        <Text>Voorbeeldinhoud voor groene variant</Text>
      </Card>
      <Card
        image={exampleImage}
        variant="pink"
        title="Roze Variant"
        testid="card-nonclickable-pink"
      >
        <Text>Voorbeeldinhoud voor roze variant</Text>
      </Card>
      <Card
        image={exampleImage}
        variant="yellow"
        title="Gele Variant"
        testid="card-nonclickable-yellow"
      >
        <Text>Voorbeeldinhoud voor gele variant</Text>
      </Card>
      <Card
        image={exampleImage}
        variant="teal"
        title="Turquoise Variant"
        testid="card-nonclickable-teal"
      >
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
    testid: 'card-full-example',
  },
};

export const WithoutExcerpt: Story = {
  args: {
    title: defaultArgs.title,
    slug: defaultArgs.slug,
    testid: 'card-without-excerpt',
  },
};

export const WithBorder: Story = {
  args: {
    ...defaultArgs,
    border: true,
    testid: 'card-with-border',
  },
};

export const OnlyTitle: Story = {
  args: {
    title: 'Minimaal Kaart Voorbeeld',
    slug: 'minimaal',
    testid: 'card-only-title',
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
    testid: 'card-non-clickable',
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

export const InteractiveCard: Story = {
  args: {
    ...defaultArgs,
    image: exampleImage,
    variant: 'blue',
    border: true,
    featured: true,
    date: '15 maart 2024',
    categories: ['Interactief', 'Test'],
    testid: 'card-interactive',
  },
  play: async ({ canvas }) => {
    // Simple verification without complex user interactions
    expect(canvas.getByText('Communicatievaardigheden')).toBeInTheDocument();
    expect(canvas.getByRole('img')).toBeInTheDocument();
    expect(canvas.getByText('15 maart 2024')).toBeInTheDocument();
    expect(canvas.getByText('Interactief, Test')).toBeInTheDocument();

    // Verify link exists and has correct href
    const cardLink = canvas.queryByRole('link');
    if (cardLink) {
      expect(cardLink).toHaveAttribute(
        'href',
        '/blog/communicatievaardigheden'
      );
    }

    await waitForMotionAnimations({
      canvas,
      element: canvas.getByTestId('card-interactive'),
    });
  },
};

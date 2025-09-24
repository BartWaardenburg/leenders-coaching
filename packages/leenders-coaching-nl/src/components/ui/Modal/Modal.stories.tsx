import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Modal } from './Modal';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { Grid } from '@/components/ui/Grid';
import { mockModalData } from '@/mocks';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Of de modal open is',
    },
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'De visuele stijl variant van de modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Of de sluitknop moet worden getoond',
    },
    label: {
      control: 'text',
      description: 'Toegankelijkheid label voor de modal',
    },
    onClose: {
      action: 'closed',
      description: 'Callback functie wanneer de modal wordt gesloten',
    },
    children: {
      control: 'text',
      description: 'Inhoud van de modal',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    label: 'Voorbeeld modal',
    children: mockModalData.contact.content,
    onClose: fn(),
  },
};

export const WithoutCloseButton: Story = {
  args: {
    isOpen: true,
    label: 'Modal zonder sluitknop',
    showCloseButton: false,
    children: mockModalData.confirmation.content,
  },
};

export const WithLongContent: Story = {
  args: {
    isOpen: true,
    label: 'Modal met lange inhoud',
    children: (
      <Stack gap={4}>
        <Text>
          Deze modal bevat langere inhoud om scrollgedrag te demonstreren.
        </Text>
        <Text>U kunt meerdere paragrafen en andere inhoud hier toevoegen.</Text>
        <Text>De modal zal automatisch overflow en scrollen afhandelen.</Text>
        <Text>Klik buiten de modal of druk op ESC om deze te sluiten.</Text>
      </Stack>
    ),
  },
};

export const WithBackgroundContent: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    label: 'Modal met achtergrondinhoud',
    variant: 'purple',
    children: (
      <Stack gap={4}>
        <Heading level="h2" variant="medium">
          Welkom Terug!
        </Heading>
        <Text>
          Deze modal verschijnt bovenop de hoofdinhoud met een mooi blur effect.
        </Text>
        <Button variant="purple" onClick={() => console.log('Button clicked')}>
          Klik op mij
        </Button>
      </Stack>
    ),
  },
  render: (args) => (
    <Section className="min-h-screen">
      <Stack gap={6} className="max-w-4xl mx-auto">
        <Heading level="h1" variant="large">
          Hoofdpagina Inhoud
        </Heading>
        <Grid cols={{ base: 3 }} gap={4}>
          {[1, 2, 3].map((i) => (
            <Box key={i}>
              <Heading level="h3" variant="small">
                Kaart {i}
              </Heading>
              <Text>
                Dit is wat voorbeeldinhoud die achter de modal staat. De modal
                zal bovenaan verschijnen met een mooi achtergrond blur effect.
              </Text>
            </Box>
          ))}
        </Grid>
        <Modal {...args} />
      </Stack>
    </Section>
  ),
};

export const InteractiveModal: Story = {
  args: {
    isOpen: true,
    label: 'Interactieve modal',
    variant: 'blue',
    onClose: fn(),
    children: (
      <Stack gap={4}>
        <Heading level="h2" variant="medium">
          Interactieve Modal
        </Heading>
        <Text>
          Deze modal demonstreert verschillende interactiepatronen inclusief
          sluitknop, escape toets, en achtergrond klikken.
        </Text>
        <Button
          variant="blue"
          onClick={() => console.log('Action button clicked')}
        >
          Actie Knop
        </Button>
      </Stack>
    ),
  },
};

export const ModalVariants: Story = {
  args: {
    isOpen: true,
    label: 'Modal varianten',
    variant: 'purple',
    onClose: fn(),
    children: (
      <Stack gap={4}>
        <Heading level="h2" variant="medium">
          Purple Modal
        </Heading>
        <Text>This modal demonstrates the purple variant styling.</Text>
      </Stack>
    ),
  },
};

export const ModalWithoutCloseButton: Story = {
  args: {
    isOpen: true,
    label: 'Modal zonder sluitknop',
    variant: 'green',
    showCloseButton: false,
    onClose: fn(),
    children: (
      <Stack gap={4}>
        <Heading level="h2" variant="medium">
          No Close Button
        </Heading>
        <Text>
          This modal has no close button - only escape key or backdrop click.
        </Text>
      </Stack>
    ),
  },
};

export const ModalAnimations: Story = {
  args: {
    isOpen: true,
    label: 'Modal animaties',
    variant: 'pink',
    onClose: fn(),
    children: (
      <Stack gap={4}>
        <Heading level="h2" variant="medium">
          Animation Test
        </Heading>
        <Text>This modal tests various animation states and transitions.</Text>
      </Stack>
    ),
  },
};

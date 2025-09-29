import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionForm } from './SectionForm';
import { Box } from '@/components/ui/Box';
import { mockFormSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionForm',
  component: SectionForm,
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
  },
} satisfies Meta<typeof SectionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: mockFormSection.displayTitle,
    description: mockFormSection.description,
    form: mockFormSection.form,
  },
};

export const WithBackground: Story = {
  args: {
    ...Default.args,
    background: 'blue',
  },
};

export const WithBackgroundAndBorder: Story = {
  args: {
    ...Default.args,
    background: 'blue',
    border: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Neem Contact Op',
    background: 'pink',
    border: true,
  },
};

export const CustomSubmitLabel: Story = {
  args: {
    title: 'Aangepaste Verzendknop',
    description: 'Dit formulier heeft een aangepast verzendknop label.',
    form: {
      _type: 'formConfiguration',
      submitLabel: 'Verstuur Bericht Nu',
    },
    background: 'yellow',
    border: true,
  },
};

export const AllBackgroundVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {},
  render: () => (
    <Box className="space-y-0">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (background) => {
          const capitalized =
            background.charAt(0).toUpperCase() + background.slice(1);

          return (
            <SectionForm
              key={background}
              title={`${capitalized} Achtergrond`}
              description={`Dit formulier demonstreert de ${background} achtergrond variant.`}
              background={background}
              border={true}
              form={{
                _type: 'formConfiguration',
                submitLabel: `Verstuur ${capitalized} Formulier`,
              }}
            />
          );
        }
      )}
    </Box>
  ),
};

export const LongContent: Story = {
  args: {
    title: 'Contactformulier Met Lange Inhoud',
    description:
      'Dit is een langere beschrijving die demonstreert hoe de formulier sectie uitgebreidere tekstinhoud afhandelt. Het toont hoe de lay-out zich aanpast aan verschillende hoeveelheden inhoud terwijl het goede leesbaarheid en visuele hiërarchie behoudt. De tekst kan over meerdere regels lopen en de sectie zal het elegant afhandelen.',
    form: {
      _type: 'formConfiguration',
      submitLabel: 'Verstuur Uw Bericht',
    },
    background: 'teal',
    border: true,
  },
};

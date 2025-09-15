import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionForm } from './SectionForm';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';

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
    submitLabel: {
      control: 'text',
      description: 'Label voor de verzendknop',
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

const FormContent = () => (
  <Stack gap={6}>
    <Input label="Naam" type="text" name="name" placeholder="Je naam" />
    <Input
      label="Email"
      type="email"
      name="email"
      placeholder="your@email.com"
    />
    <Input
      label="Bericht"
      as="textarea"
      name="message"
      placeholder="Je bericht"
    />
    <Button type="submit" variant="blue" className="w-full">
      Submit
    </Button>
  </Stack>
);

export const Default: Story = {
  args: {
    title: 'Contact Us',
    description:
      "Fill out the form below and we'll get back to you as soon as possible.",
    children: <FormContent />,
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
    title: 'Contact Us',
    background: 'pink',
    border: true,
  },
};

export const CustomSubmitLabel: Story = {
  args: {
    title: 'Custom Submit Button',
    description: 'Dit formulier heeft een aangepast verzendknop label.',
    submitLabel: 'Send Message Now',
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
        (background) => (
          <SectionForm
            key={background}
            title={`${background.charAt(0).toUpperCase() + background.slice(1)} Background`}
            description={`This form demonstrates the ${background} background variant.`}
            submitLabel={`Submit ${background.charAt(0).toUpperCase() + background.slice(1)} Form`}
            background={background}
            border={true}
          />
        )
      )}
    </Box>
  ),
};

export const LongContent: Story = {
  args: {
    title: 'Contact Form with Long Content',
    description:
      'This is a longer description that demonstrates how the form section handles more extensive text content. It shows how the layout adapts to different amounts of content while maintaining good readability and visual hierarchy. The text can span multiple lines and the section will handle it gracefully.',
    submitLabel: 'Send Your Message',
    background: 'teal',
    border: true,
  },
};

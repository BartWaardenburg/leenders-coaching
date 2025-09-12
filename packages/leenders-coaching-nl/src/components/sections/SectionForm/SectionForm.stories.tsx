import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionForm } from './SectionForm';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Stack } from '@/components/ui/Stack';

const meta = {
  title: 'Sections/SectionForm',
  component: SectionForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the section',
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
    },
    submitLabel: {
      control: 'text',
      description: 'Label for the submit button',
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Background color of the section',
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border around the section',
    },
  },
} satisfies Meta<typeof SectionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormContent = () => (
  <Stack gap={6}>
    <Input label="Name" type="text" name="name" placeholder="Your name" />
    <Input
      label="Email"
      type="email"
      name="email"
      placeholder="your@email.com"
    />
    <Input
      label="Message"
      as="textarea"
      name="message"
      placeholder="Your message"
    />
    <Button type="submit" variant="blue" fullWidthOnContainer>
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

export const NoTitle: Story = {
  args: {
    children: <FormContent />,
  },
};

export const WithoutTitle: Story = {
  args: {
    description:
      "Fill out the form below and we'll get back to you as soon as possible.",
    background: 'green',
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
    description: 'This form has a custom submit button label.',
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
    <div className="space-y-0">
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
    </div>
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

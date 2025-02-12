import type { Meta, StoryObj } from '@storybook/react';
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
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the section',
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
    },
    showBorder: {
      control: 'boolean',
      description: 'Whether to show a border under the title',
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
    maxWidth: {
      control: 'select',
      options: [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
      ],
      description: 'Maximum width of the content',
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
    <Button type="submit" variant="blue" fullWidthOnMobile>
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

export const WithBorder: Story = {
  args: {
    ...Default.args,
    showBorder: true,
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

export const CustomMaxWidth: Story = {
  args: {
    ...Default.args,
    maxWidth: 'xl',
  },
};

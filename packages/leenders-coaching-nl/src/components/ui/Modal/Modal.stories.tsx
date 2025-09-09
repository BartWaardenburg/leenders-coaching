import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Modal } from './Modal';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import { waitForAnimations } from '../../../test/simple-chromatic-utils';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'The visual style variant of the modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    label: {
      control: 'text',
      description: 'Accessibility label for the modal',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function when the modal is closed',
    },
    children: {
      control: 'text',
      description: 'Content of the modal',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    label: 'Example Modal',
    children: 'This is the content of the modal dialog.',
  },
  play: async ({ canvas }) => {
    // Wait for the modal to be visible and animations to complete
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();
    await waitForAnimations();
    await expect(
      canvas.getByText('This is the content of the modal dialog.')
    ).toBeVisible();
  },
};

export const WithoutCloseButton: Story = {
  args: {
    isOpen: true,
    label: 'Modal Without Close Button',
    showCloseButton: false,
    children: "This modal doesn't have a close button.",
  },
};

export const WithLongContent: Story = {
  args: {
    isOpen: true,
    label: 'Long Content Modal',
    children: (
      <Stack gap={4}>
        <Text>
          This modal contains longer content to demonstrate scrolling behavior.
        </Text>
        <Text>You can add multiple paragraphs and other content here.</Text>
        <Text>The modal will automatically handle overflow and scrolling.</Text>
        <Text>Click outside the modal or press ESC to close it.</Text>
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
    label: 'Modal with Background Content',
    variant: 'purple',
    children: (
      <Stack gap={4}>
        <Heading level="h2" variant="medium">
          Welcome Back!
        </Heading>
        <Text>
          This modal appears on top of the main content with a nice blur effect.
        </Text>
        <Button variant="purple" onClick={() => console.log('Button clicked')}>
          Click me
        </Button>
      </Stack>
    ),
  },
  render: (args) => (
    <Section className="min-h-screen">
      <Stack gap={6} className="max-w-4xl mx-auto">
        <Heading level="h1" variant="large">
          Main Page Content
        </Heading>
        <Box className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Box key={i}>
              <Heading level="h3" variant="small">
                Card {i}
              </Heading>
              <Text>
                This is some example content that sits behind the modal. The
                modal will appear on top with a nice backdrop blur effect.
              </Text>
            </Box>
          ))}
        </Box>
        <Modal {...args} />
      </Stack>
    </Section>
  ),
};

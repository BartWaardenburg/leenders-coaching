import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Main } from './Main';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { Text } from '../Text/Text';
import { Heading } from '../Heading/Heading';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Stack } from '../Stack/Stack';
import { Grid } from '../Grid/Grid';
import { Flex } from '../Flex/Flex';

const meta = {
  title: 'UI/Main',
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de main sectie',
      type: { name: 'string', required: true },
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
      type: { name: 'string', required: false },
    },
    testid: {
      control: 'text',
      description: 'Test identifier voor testing doeleinden',
      type: { name: 'string', required: false },
    },
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Main Example',
    testid: 'main-default',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <Box className="p-8">
        <Heading level="h1" variant="large" className="mb-4">
          Main Content Area
        </Heading>
        <Text variant="muted" className="mb-6">
          This is the main content area of the page. It has a top margin of
          125px to account for the header and uses flexbox for layout.
        </Text>
        <Box className="bg-blue-100 p-4">
          <Heading level="h2" variant="small" className="mb-2">
            Content Section
          </Heading>
          <Text variant="small">
            The Main component wraps content in a flex container with column
            direction and grows to fill available space.
          </Text>
        </Box>
      </Box>
    ),
    testid: 'main-with-content',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Content Area')).toBeVisible();
    await expect(canvas.getByText('Content Section')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithCustomStyling: Story = {
  args: {
    children: (
      <Box className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
        <Heading level="h1" variant="large" className="text-purple-800 mb-6">
          Custom Styled Main
        </Heading>
        <Grid cols={{ base: 1, md: 2 }} gap={6}>
          <Box className="bg-white p-6 shadow-lg">
            <Heading level="h2" variant="medium" className="mb-3">
              Feature 1
            </Heading>
            <Text variant="muted">
              This main component has custom styling applied through the
              className prop.
            </Text>
          </Box>
          <Box className="bg-white p-6 shadow-lg">
            <Heading level="h2" variant="medium" className="mb-3">
              Feature 2
            </Heading>
            <Text variant="muted">
              The Main component accepts all standard HTML main element props.
            </Text>
          </Box>
        </Grid>
      </Box>
    ),
    className: 'bg-gradient-to-br from-purple-50 to-blue-50',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Custom Styled Main')).toBeVisible();
    await expect(canvas.getByText('Feature 1')).toBeVisible();
    await expect(canvas.getByText('Feature 2')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ComplexLayout: Story = {
  args: {
    children: (
      <Box className="p-8 space-y-8">
        <header className="text-center">
          <Heading level="h1" variant="large" className="mb-4">
            Complex Layout Example
          </Heading>
          <Text variant="muted">
            This demonstrates how the Main component can contain complex layouts
          </Text>
        </header>

        <Grid cols={{ base: 1, lg: 3 }} gap={8}>
          <Box className="lg:col-span-2 space-y-6">
            <Box className="bg-white p-6 shadow-md">
              <Heading level="h2" variant="medium" className="mb-4">
                Main Content
              </Heading>
              <Text variant="muted" className="mb-4">
                The Main component provides a semantic container for the primary
                content of the page. It automatically handles the top margin for
                fixed headers and uses flexbox for consistent layout.
              </Text>
              <Flex wrap="wrap" gap={2}>
                <Text
                  as="span"
                  variant="small"
                  className="bg-blue-100 text-blue-800 px-3 py-1"
                >
                  Semantic HTML
                </Text>
                <Text
                  as="span"
                  variant="small"
                  className="bg-green-100 text-green-800 px-3 py-1"
                >
                  Flexbox Layout
                </Text>
                <Text
                  as="span"
                  variant="small"
                  className="bg-purple-100 text-purple-800 px-3 py-1"
                >
                  Header Spacing
                </Text>
              </Flex>
            </Box>

            <Box className="bg-gray-50 p-6">
              <Heading level="h3" variant="small" className="mb-3">
                Usage Notes
              </Heading>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Uses Flex component internally with column direction</li>
                <li>• Has a top margin of 125px for header clearance</li>
                <li>• Grows to fill available vertical space</li>
                <li>• Accepts all standard main element props</li>
              </ul>
            </Box>
          </Box>

          <aside className="space-y-6">
            <Box className="bg-white p-6 shadow-md">
              <Heading level="h3" variant="small" className="mb-4">
                Sidebar
              </Heading>
              <Stack space={3}>
                <Box className="bg-blue-50 p-3">
                  <Text weight="medium">Related Content</Text>
                  <Text variant="muted">Additional information</Text>
                </Box>
                <Box className="bg-green-50 p-3">
                  <Text weight="medium">Quick Links</Text>
                  <Text variant="muted">Navigation shortcuts</Text>
                </Box>
              </Stack>
            </Box>

            <Box className="bg-yellow-50 p-6">
              <Heading level="h3" variant="small" className="mb-2">
                Info Box
              </Heading>
              <Text variant="default">
                The Main component is built on top of the Flex component and
                provides semantic meaning for screen readers and SEO.
              </Text>
            </Box>
          </aside>
        </Grid>

        <footer className="bg-gray-100 p-6 text-center">
          <Text variant="muted">
            This footer demonstrates how content flows within the Main component
          </Text>
        </footer>
      </Box>
    ),
    testid: 'main-complex',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('main-complex')).toBeVisible();
    await expect(canvas.getByText('Complex Layout Example')).toBeVisible();
    await expect(canvas.getByText('Main Content')).toBeVisible();
    await expect(canvas.getByText('Sidebar')).toBeVisible();
    await expect(canvas.getByText('Info Box')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithForm: Story = {
  args: {
    children: (
      <Box className="p-8 max-w-2xl mx-auto">
        <Heading level="h1" variant="large" className="mb-6">
          Contact Form
        </Heading>
        <form className="space-y-6">
          <Input label="Name" placeholder="Enter your name" type="text" />
          <Input label="Email" placeholder="Enter your email" type="email" />
          <Input
            as="textarea"
            label="Message"
            placeholder="Enter your message"
            rows={4}
          />
          <Button type="submit" variant="blue" size="lg" className="w-full">
            Send Message
          </Button>
        </form>
      </Box>
    ),
    testid: 'main-with-form',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Contact Form')).toBeVisible();
    await expect(canvas.getByText('Name')).toBeVisible();
    await expect(canvas.getByText('Email')).toBeVisible();
    await expect(canvas.getByText('Message')).toBeVisible();
    await expect(canvas.getByText('Send Message')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const MinimalContent: Story = {
  args: {
    children: (
      <Box className="p-8 text-center">
        <Heading level="h1" variant="medium" className="text-gray-800 mb-4">
          Minimal Content
        </Heading>
        <Text variant="muted">
          Sometimes the main content area only needs simple text content.
        </Text>
      </Box>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Minimal Content')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

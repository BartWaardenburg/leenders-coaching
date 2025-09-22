import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Stack } from './Stack';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { Heading } from '../Heading/Heading';

const meta = {
  title: 'UI/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de stack',
    },
    space: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 'px', 'x-reverse', 'y-reverse'],
      description: 'Ruimte tussen elementen (margin)',
    },
    gap: {
      control: 'number',
      description: 'Gap tussen elementen (grid-like spacing)',
    },
    direction: {
      control: 'select',
      options: ['col', 'row'],
      description: 'Richting van de stack',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Uitlijning van elementen',
    },
    as: {
      control: 'text',
      description: 'HTML element om als te renderen',
    },
    testid: {
      control: 'text',
      description: 'Test ID voor testing',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Stack Voorbeeld',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Stack Voorbeeld')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithSpace: Story = {
  args: {
    children: (
      <>
        <Box className="bg-blue-100 p-4">
          <Text>Item 1</Text>
        </Box>
        <Box className="bg-green-100 p-4">
          <Text>Item 2</Text>
        </Box>
        <Box className="bg-purple-100 p-4">
          <Text>Item 3</Text>
        </Box>
      </>
    ),
    space: 4,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Item 1')).toBeVisible();
    await expect(canvas.getByText('Item 2')).toBeVisible();
    await expect(canvas.getByText('Item 3')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithGap: Story = {
  args: {
    children: (
      <>
        <Box className="bg-red-100 p-4">
          <Text>Gap Item 1</Text>
        </Box>
        <Box className="bg-yellow-100 p-4">
          <Text>Gap Item 2</Text>
        </Box>
        <Box className="bg-pink-100 p-4">
          <Text>Gap Item 3</Text>
        </Box>
      </>
    ),
    gap: 6,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Gap Item 1')).toBeVisible();
    await expect(canvas.getByText('Gap Item 2')).toBeVisible();
    await expect(canvas.getByText('Gap Item 3')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const RowDirection: Story = {
  args: {
    children: (
      <>
        <Box className="bg-teal-100 p-4">
          <Text>Row 1</Text>
        </Box>
        <Box className="bg-orange-100 p-4">
          <Text>Row 2</Text>
        </Box>
        <Box className="bg-indigo-100 p-4">
          <Text>Row 3</Text>
        </Box>
      </>
    ),
    direction: 'row',
    space: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Row 1')).toBeVisible();
    await expect(canvas.getByText('Row 2')).toBeVisible();
    await expect(canvas.getByText('Row 3')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllSpaceValues: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box className="space-y-8">
      {([0, 1, 2, 3, 4, 'px'] as const).map((space) => (
        <Box key={space} className="border p-4">
          <Heading level="h3" variant="small" className="mb-4">
            Space: {space}
          </Heading>
          <Stack space={space} testid={`stack-space-${space}`}>
            <Box className="bg-blue-100 p-2">
              <Text variant="small">Item A</Text>
            </Box>
            <Box className="bg-green-100 p-2">
              <Text variant="small">Item B</Text>
            </Box>
            <Box className="bg-purple-100 p-2">
              <Text variant="small">Item C</Text>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('stack-space-0')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-1')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-2')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-3')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-4')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-px')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllJustifyOptions: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box className="space-y-8">
      {(['start', 'end', 'center', 'between', 'around', 'evenly'] as const).map(
        (justify) => (
          <Box key={justify} className="border p-4">
            <Heading level="h3" variant="small" className="mb-4">
              Justify: {justify}
            </Heading>
            <Stack
              direction="row"
              justify={justify}
              gap={2}
              testid={`stack-justify-${justify}`}
            >
              <Box className="bg-red-100 p-2">
                <Text variant="small">A</Text>
              </Box>
              <Box className="bg-yellow-100 p-2">
                <Text variant="small">B</Text>
              </Box>
              <Box className="bg-green-100 p-2">
                <Text variant="small">C</Text>
              </Box>
            </Stack>
          </Box>
        )
      )}
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('stack-justify-start')).toBeVisible();
    await expect(canvas.getByTestId('stack-justify-end')).toBeVisible();
    await expect(canvas.getByTestId('stack-justify-center')).toBeVisible();
    await expect(canvas.getByTestId('stack-justify-between')).toBeVisible();
    await expect(canvas.getByTestId('stack-justify-around')).toBeVisible();
    await expect(canvas.getByTestId('stack-justify-evenly')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ComplexLayout: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box className="max-w-4xl mx-auto p-4">
      <Stack space={4} testid="stack-complex">
        <Box className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6-lg">
          <Heading level="h2" variant="medium" className="mb-2">
            Header Sectie
          </Heading>
          <Text className="text-blue-100">
            Dit is een complexe lay-out met Stack componenten.
          </Text>
        </Box>

        <Stack direction="row" gap={4} justify="between">
          <Box className="bg-white border p-4-lg flex-1">
            <Heading level="h3" variant="small" className="mb-2">
              Linker Kolom
            </Heading>
            <Stack space={2}>
              <Box className="bg-gray-100 p-2">
                <Text variant="small">Feature 1</Text>
              </Box>
              <Box className="bg-gray-100 p-2">
                <Text variant="small">Feature 2</Text>
              </Box>
              <Box className="bg-gray-100 p-2">
                <Text variant="small">Feature 3</Text>
              </Box>
            </Stack>
          </Box>

          <Box className="bg-white border p-4-lg flex-1">
            <Heading level="h3" variant="small" className="mb-2">
              Rechter Kolom
            </Heading>
            <Stack space={2}>
              <Box className="bg-gray-100 p-2">
                <Text variant="small">Item A</Text>
              </Box>
              <Box className="bg-gray-100 p-2">
                <Text variant="small">Item B</Text>
              </Box>
              <Box className="bg-gray-100 p-2">
                <Text variant="small">Item C</Text>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Box className="bg-green-100 p-4-lg">
          <Heading level="h3" variant="small" className="mb-2">
            Footer Sectie
          </Heading>
          <Text variant="small" className="text-green-800">
            Dit demonstreert hoe Stack kan worden gebruikt om complexe, geneste
            lay-outs te maken met consistente spatiëring en uitlijning.
          </Text>
        </Box>
      </Stack>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('stack-complex')).toBeVisible();
    await expect(canvas.getByText('Header Sectie')).toBeVisible();
    await expect(canvas.getByText('Linker Kolom')).toBeVisible();
    await expect(canvas.getByText('Rechter Kolom')).toBeVisible();
    await expect(canvas.getByText('Footer Sectie')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NestedStacks: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Box className="max-w-2xl mx-auto p-4">
      <Stack space={4} testid="stack-nested">
        <Box className="bg-blue-100 p-4">
          <Heading level="h3" variant="small" className="mb-2">
            Hoofd Container
          </Heading>
          <Stack direction="row" gap={3} justify="center">
            <Box className="bg-white p-3">
              <Text variant="small">Nested 1</Text>
            </Box>
            <Box className="bg-white p-3">
              <Text variant="small">Nested 2</Text>
            </Box>
            <Box className="bg-white p-3">
              <Text variant="small">Nested 3</Text>
            </Box>
          </Stack>
        </Box>

        <Box className="bg-green-100 p-4">
          <Heading level="h3" variant="small" className="mb-2">
            Nog Een Container
          </Heading>
          <Stack space={1}>
            <Box className="bg-white p-2">
              <Text variant="small">Sub-item A</Text>
            </Box>
            <Box className="bg-white p-2">
              <Text variant="small">Sub-item B</Text>
            </Box>
            <Stack direction="row" gap={2} justify="between">
              <Box className="bg-gray-100 p-1">
                <Text variant="small">Deep 1</Text>
              </Box>
              <Box className="bg-gray-100 p-1">
                <Text variant="small">Deep 2</Text>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('stack-nested')).toBeVisible();
    await expect(canvas.getByText('Hoofd Container')).toBeVisible();
    await expect(canvas.getByText('Nog Een Container')).toBeVisible();
    await expect(canvas.getByText('Nested 1')).toBeVisible();
    await expect(canvas.getByText('Sub-item A')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

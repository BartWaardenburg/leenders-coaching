import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Stack } from './Stack';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

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
    children: 'Stack Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Stack Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithSpace: Story = {
  args: {
    children: (
      <>
        <div className="bg-blue-100 p-4">Item 1</div>
        <div className="bg-green-100 p-4">Item 2</div>
        <div className="bg-purple-100 p-4">Item 3</div>
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
        <div className="bg-red-100 p-4">Gap Item 1</div>
        <div className="bg-yellow-100 p-4">Gap Item 2</div>
        <div className="bg-pink-100 p-4">Gap Item 3</div>
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
        <div className="bg-teal-100 p-4">Row 1</div>
        <div className="bg-orange-100 p-4">Row 2</div>
        <div className="bg-indigo-100 p-4">Row 3</div>
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
    <div className="space-y-8">
      {([0, 1, 2, 3, 4, 'px', 'x-reverse', 'y-reverse'] as const).map(
        (space) => (
          <div key={space} className="border p-4">
            <h3 className="text-lg font-semibold mb-4">Space: {space}</h3>
            <Stack space={space} testid={`stack-space-${space}`}>
              <div className="bg-blue-100 p-2 text-sm">Item A</div>
              <div className="bg-green-100 p-2 text-sm">Item B</div>
              <div className="bg-purple-100 p-2 text-sm">Item C</div>
            </Stack>
          </div>
        )
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('stack-space-0')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-1')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-2')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-3')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-4')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-px')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-x-reverse')).toBeVisible();
    await expect(canvas.getByTestId('stack-space-y-reverse')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllJustifyOptions: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-8">
      {(['start', 'end', 'center', 'between', 'around', 'evenly'] as const).map(
        (justify) => (
          <div key={justify} className="border p-4">
            <h3 className="text-lg font-semibold mb-4">Justify: {justify}</h3>
            <Stack
              direction="row"
              justify={justify}
              gap={2}
              testid={`stack-justify-${justify}`}
            >
              <div className="bg-red-100 p-2 text-sm">A</div>
              <div className="bg-yellow-100 p-2 text-sm">B</div>
              <div className="bg-green-100 p-2 text-sm">C</div>
            </Stack>
          </div>
        )
      )}
    </div>
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
    <div className="max-w-4xl mx-auto p-4">
      <Stack space={4} testid="stack-complex">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6-lg">
          <h2 className="text-2xl font-bold mb-2">Header Section</h2>
          <p className="text-blue-100">
            This is a complex layout using Stack components.
          </p>
        </div>

        <Stack direction="row" gap={4} justify="between">
          <div className="bg-white border p-4-lg flex-1">
            <h3 className="font-semibold mb-2">Left Column</h3>
            <Stack space={2}>
              <div className="bg-gray-100 p-2 text-sm">Feature 1</div>
              <div className="bg-gray-100 p-2 text-sm">Feature 2</div>
              <div className="bg-gray-100 p-2 text-sm">Feature 3</div>
            </Stack>
          </div>

          <div className="bg-white border p-4-lg flex-1">
            <h3 className="font-semibold mb-2">Right Column</h3>
            <Stack space={2}>
              <div className="bg-gray-100 p-2 text-sm">Item A</div>
              <div className="bg-gray-100 p-2 text-sm">Item B</div>
              <div className="bg-gray-100 p-2 text-sm">Item C</div>
            </Stack>
          </div>
        </Stack>

        <div className="bg-green-100 p-4-lg">
          <h3 className="font-semibold mb-2">Footer Section</h3>
          <p className="text-sm text-green-800">
            This demonstrates how Stack can be used to create complex, nested
            layouts with consistent spacing and alignment.
          </p>
        </div>
      </Stack>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('stack-complex')).toBeVisible();
    await expect(canvas.getByText('Header Section')).toBeVisible();
    await expect(canvas.getByText('Left Column')).toBeVisible();
    await expect(canvas.getByText('Right Column')).toBeVisible();
    await expect(canvas.getByText('Footer Section')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NestedStacks: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="max-w-2xl mx-auto p-4">
      <Stack space={4} testid="stack-nested">
        <div className="bg-blue-100 p-4">
          <h3 className="font-semibold mb-2">Main Container</h3>
          <Stack direction="row" gap={3} justify="center">
            <div className="bg-white p-3 text-sm">Nested 1</div>
            <div className="bg-white p-3 text-sm">Nested 2</div>
            <div className="bg-white p-3 text-sm">Nested 3</div>
          </Stack>
        </div>

        <div className="bg-green-100 p-4">
          <h3 className="font-semibold mb-2">Another Container</h3>
          <Stack space={1}>
            <div className="bg-white p-2 text-sm">Sub-item A</div>
            <div className="bg-white p-2 text-sm">Sub-item B</div>
            <Stack direction="row" gap={2} justify="between">
              <div className="bg-gray-100 p-1 text-xs">Deep 1</div>
              <div className="bg-gray-100 p-1 text-xs">Deep 2</div>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('stack-nested')).toBeVisible();
    await expect(canvas.getByText('Main Container')).toBeVisible();
    await expect(canvas.getByText('Another Container')).toBeVisible();
    await expect(canvas.getByText('Nested 1')).toBeVisible();
    await expect(canvas.getByText('Sub-item A')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

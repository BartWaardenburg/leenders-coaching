import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Section } from './Section';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de sectie',
      type: { name: 'string', required: true },
    },
    background: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Achtergrondkleur van de sectie',
      type: { name: 'string', required: false },
    },
    border: {
      control: 'boolean',
      description: 'Of er een rand rond de sectie moet worden getoond',
      type: { name: 'boolean', required: false },
    },
    noPadding: {
      control: 'boolean',
      description: 'Of de standaard padding moet worden uitgeschakeld',
      type: { name: 'boolean', required: false },
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
      description: 'Maximale breedte van de sectie',
      type: { name: 'string', required: false },
    },
    testid: {
      control: 'text',
      description: 'Test ID voor testing',
      type: { name: 'string', required: false },
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
      type: { name: 'string', required: false },
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Section Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Section Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithBackground: Story = {
  args: {
    children: 'Section with blue background',
    background: 'blue',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Section with blue background')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithBorder: Story = {
  args: {
    children: 'Section with purple background and border',
    background: 'purple',
    border: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Section with purple background and border')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoPadding: Story = {
  args: {
    children: 'Section without padding',
    noPadding: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Section without padding')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithMaxWidth: Story = {
  args: {
    children: 'Section with limited max width (2xl)',
    maxWidth: '2xl',
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('Section with limited max width (2xl)')
    ).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllBackgroundColors: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-4">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (color) => (
          <Section key={color} background={color} testid={`section-${color}`}>
            <h3 className="text-lg font-semibold capitalize">
              {color} Background
            </h3>
            <p className="text-sm text-muted-foreground">
              This section demonstrates the {color} pastel background color.
            </p>
          </Section>
        )
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-blue')).toBeVisible();
    await expect(canvas.getByTestId('section-purple')).toBeVisible();
    await expect(canvas.getByTestId('section-green')).toBeVisible();
    await expect(canvas.getByTestId('section-pink')).toBeVisible();
    await expect(canvas.getByTestId('section-yellow')).toBeVisible();
    await expect(canvas.getByTestId('section-teal')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const AllMaxWidths: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-4">
      {(
        [
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
        ] as const
      ).map((width) => (
        <Section
          key={width}
          maxWidth={width}
          background="green"
          testid={`section-width-${width}`}
        >
          <div className="bg-white/20 p-4 rounded">
            <h3 className="text-lg font-semibold">Max Width: {width}</h3>
            <p className="text-sm">
              This section has a maximum width of {width}. The content is
              constrained to this width while maintaining responsive behavior.
            </p>
          </div>
        </Section>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-width-sm')).toBeVisible();
    await expect(canvas.getByTestId('section-width-md')).toBeVisible();
    await expect(canvas.getByTestId('section-width-lg')).toBeVisible();
    await expect(canvas.getByTestId('section-width-xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-2xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-3xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-4xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-5xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-6xl')).toBeVisible();
    await expect(canvas.getByTestId('section-width-7xl')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithBorders: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div className="space-y-4">
      {(['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const).map(
        (color) => (
          <Section
            key={color}
            background={color}
            border
            testid={`section-border-${color}`}
          >
            <h3 className="text-lg font-semibold capitalize">
              {color} with Border
            </h3>
            <p className="text-sm text-muted-foreground">
              This section has a {color} background with colored borders on top
              and bottom.
            </p>
          </Section>
        )
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-border-blue')).toBeVisible();
    await expect(canvas.getByTestId('section-border-purple')).toBeVisible();
    await expect(canvas.getByTestId('section-border-green')).toBeVisible();
    await expect(canvas.getByTestId('section-border-pink')).toBeVisible();
    await expect(canvas.getByTestId('section-border-yellow')).toBeVisible();
    await expect(canvas.getByTestId('section-border-teal')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ComplexContent: Story = {
  args: {
    children: null,
    background: 'teal',
    border: true,
    maxWidth: '4xl',
    testid: 'section-complex',
  },
  render: (args) => (
    <Section {...args}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Complex Section Content</h2>
          <p className="text-muted-foreground mb-6">
            This section demonstrates how the Section component can contain
            complex layouts with multiple elements, responsive grids, and rich
            content.
          </p>
          <div className="space-y-4">
            <div className="bg-white/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Feature 1</h3>
              <p className="text-sm">Description of the first feature.</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Feature 2</h3>
              <p className="text-sm">Description of the second feature.</p>
            </div>
          </div>
        </div>
        <div className="bg-white/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
          <ul className="space-y-2 text-sm">
            <li>• Responsive design</li>
            <li>• Dark mode support</li>
            <li>• Container queries</li>
            <li>• Flexible layouts</li>
          </ul>
        </div>
      </div>
    </Section>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-complex')).toBeVisible();
    await expect(canvas.getByText('Complex Section Content')).toBeVisible();
    await expect(canvas.getByText('Feature 1')).toBeVisible();
    await expect(canvas.getByText('Feature 2')).toBeVisible();
    await expect(canvas.getByText('Additional Information')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoPaddingWithBackground: Story = {
  args: {
    children: (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <h2 className="text-2xl font-bold mb-4">Full Width Background</h2>
        <p className="text-blue-100">
          This section has no padding, allowing the background to extend to the
          full width of the viewport while the content maintains its own
          padding.
        </p>
      </div>
    ),
    noPadding: true,
    testid: 'section-no-padding-bg',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('section-no-padding-bg')).toBeVisible();
    await expect(canvas.getByText('Full Width Background')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

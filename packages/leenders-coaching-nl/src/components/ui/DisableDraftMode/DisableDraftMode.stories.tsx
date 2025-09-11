import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { DisableDraftMode } from './DisableDraftMode';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/DisableDraftMode',
  component: DisableDraftMode,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'The visual style variant of the modal',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof DisableDraftMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'blue',
  },
  decorators: [
    (Story) => {
      // Mock non-iframe environment for Storybook
      // @ts-ignore - Mock non-iframe environment
      window.parent = window;
      // @ts-ignore - Mock non-iframe environment
      window.opener = null;

      return <Story />;
    },
  ],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

const mockNonIframeDecorator = (Story: React.ComponentType) => {
  // Mock non-iframe environment for Storybook
  // @ts-ignore - Mock non-iframe environment
  window.parent = window;
  // @ts-ignore - Mock non-iframe environment
  window.opener = null;

  return <Story />;
};

export const Purple: Story = {
  args: {
    variant: 'purple',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const Green: Story = {
  args: {
    variant: 'green',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const Pink: Story = {
  args: {
    variant: 'pink',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const Yellow: Story = {
  args: {
    variant: 'yellow',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const Teal: Story = {
  args: {
    variant: 'teal',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithCustomClassName: Story = {
  args: {
    variant: 'blue',
    className: 'bottom-8 right-8',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const Interactive: Story = {
  args: {
    variant: 'blue',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    const button = canvas.getByLabelText('Disable draft mode');
    await expect(button).toBeInTheDocument();

    // Click the button to test interaction
    await userEvent.click(button);

    await waitForMotionAnimations({ canvas });
  },
};

export const AllVariants: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [mockNonIframeDecorator],
  render: () => (
    <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900">
      <div className="absolute top-4 left-4 space-y-4">
        <DisableDraftMode
          variant="blue"
          className="relative bottom-auto right-auto"
        />
        <DisableDraftMode
          variant="purple"
          className="relative bottom-auto right-auto"
        />
        <DisableDraftMode
          variant="green"
          className="relative bottom-auto right-auto"
        />
        <DisableDraftMode
          variant="pink"
          className="relative bottom-auto right-auto"
        />
        <DisableDraftMode
          variant="yellow"
          className="relative bottom-auto right-auto"
        />
        <DisableDraftMode
          variant="teal"
          className="relative bottom-auto right-auto"
        />
      </div>
    </div>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByLabelText('Disable draft mode');
    await expect(buttons).toHaveLength(6);
    await waitForMotionAnimations({ canvas });
  },
};

export const InIframe: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This story simulates the component behavior when rendered in an iframe (like Sanity Studio). The component should not render in this case.',
      },
    },
  },
  args: {
    variant: 'blue',
  },
  decorators: [
    (Story) => {
      // Mock iframe environment by setting window.parent to a different object
      // @ts-ignore - Mock iframe environment
      window.parent = {};

      return <Story />;
    },
  ],
  play: async ({ canvas }) => {
    // In iframe mode, the component should not render
    await expect(
      canvas.queryByLabelText('Disable draft mode')
    ).not.toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const LoadingState: Story = {
  args: {
    variant: 'blue',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();

    await waitForMotionAnimations({ canvas });
  },
};

export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    variant: 'blue',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const DarkMode: Story = {
  parameters: {
    themes: {
      defaultTheme: 'dark',
    },
  },
  args: {
    variant: 'blue',
  },
  decorators: [mockNonIframeDecorator],
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText('Disable draft mode')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

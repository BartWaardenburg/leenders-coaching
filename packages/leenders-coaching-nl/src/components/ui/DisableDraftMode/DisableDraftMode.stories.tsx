import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { DisableDraftMode } from './DisableDraftMode';

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
      description: 'De visuele stijl variant van de modal',
    },
    className: {
      control: 'text',
      description: 'Extra CSS klassen',
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
      canvas.getByLabelText('Schakel conceptmodus uit')
    ).toBeInTheDocument();
  },
};

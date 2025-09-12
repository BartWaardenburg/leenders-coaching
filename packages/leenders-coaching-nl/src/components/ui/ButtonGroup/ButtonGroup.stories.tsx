import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { ButtonGroup } from './ButtonGroup';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de button group',
    },
    stackOnMobile: {
      control: 'boolean',
      description: 'Of knoppen verticaal gestapeld moeten worden op mobiel',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center'],
      description: 'Uitlijning van de knoppen',
    },
    width: {
      control: 'select',
      options: ['full', 'auto'],
      description: 'Breedte van de button group',
    },
    flex: {
      control: 'boolean',
      description:
        'Of de knoppen in een flex container moeten worden gewrapped',
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ButtonGroup Example',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('ButtonGroup Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

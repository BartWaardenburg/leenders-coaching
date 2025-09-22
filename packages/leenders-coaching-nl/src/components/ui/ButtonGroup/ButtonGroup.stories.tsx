import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
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
    align: {
      control: 'select',
      options: ['start', 'end', 'center'],
      description: 'Verticale uitlijning van de knoppen',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Button variant="black">Primair</Button>
        <Button variant="transparent">Secundair</Button>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Primair')).toBeVisible();
    await expect(canvas.getByText('Secundair')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const HeaderStyle: Story = {
  args: {
    width: 'full',
    justify: 'end',
    align: 'center',
    children: (
      <>
        <Button size="lg" variant="black" fullWidthUntil="sm">
          Aan de slag
        </Button>
        <Button size="lg" variant="transparent" fullWidthUntil="sm">
          Meer informatie
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'ButtonGroup geconfigureerd voor header gebruik - volledige breedte met rechts uitgelijnde knoppen die automatische breedte krijgen op desktop.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Aan de slag')).toBeVisible();
    await expect(canvas.getByText('Meer informatie')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const Centered: Story = {
  args: {
    justify: 'center',
    width: 'auto',
    children: (
      <>
        <Button variant="blue">Opslaan</Button>
        <Button variant="transparent">Annuleren</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Gecentreerde button group met automatische breedte - perfect voor modal acties.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Opslaan')).toBeVisible();
    await expect(canvas.getByText('Annuleren')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const LeftAligned: Story = {
  args: {
    justify: 'start',
    width: 'full',
    children: (
      <>
        <Button variant="green">Goedkeuren</Button>
        <Button variant="transparent">Beoordelen</Button>
        <Button variant="transparent">Afwijzen</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Links uitgelijnde button group met meerdere acties.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Goedkeuren')).toBeVisible();
    await expect(canvas.getByText('Beoordelen')).toBeVisible();
    await expect(canvas.getByText('Afwijzen')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const NoStackOnMobile: Story = {
  args: {
    stackOnMobile: false,
    justify: 'center',
    width: 'auto',
    children: (
      <>
        <Button variant="purple">Optie 1</Button>
        <Button variant="transparent">Optie 2</Button>
        <Button variant="transparent">Optie 3</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button group die horizontaal blijft, zelfs op mobiele apparaten.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Optie 1')).toBeVisible();
    await expect(canvas.getByText('Optie 2')).toBeVisible();
    await expect(canvas.getByText('Optie 3')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ResponsiveWidth: Story = {
  args: {
    width: { base: 'full', md: 'auto' },
    justify: 'end',
    children: (
      <>
        <Button variant="teal" fullWidthUntil="sm">
          Actie 1
        </Button>
        <Button variant="transparent" fullWidthUntil="sm">
          Actie 2
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button group met responsieve breedte - volledige breedte op mobiel, automatische breedte op desktop.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Actie 1')).toBeVisible();
    await expect(canvas.getByText('Actie 2')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ResponsiveJustify: Story = {
  args: {
    justify: { base: 'center', md: 'end' },
    width: 'full',
    children: (
      <>
        <Button variant="pink" fullWidthUntil="sm">
          Mobiel Centrum
        </Button>
        <Button variant="transparent" fullWidthUntil="sm">
          Desktop Rechts
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button group met responsieve uitlijning - gecentreerd op mobiel, rechts uitgelijnd op desktop.',
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Mobiel Centrum')).toBeVisible();
    await expect(canvas.getByText('Desktop Rechts')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

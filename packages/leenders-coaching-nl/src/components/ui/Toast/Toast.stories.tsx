import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect, useState } from 'react';
import { expect } from 'storybook/test';
import { ToastProvider, useToast } from './ToastManager';
import type { ModalVariant } from '../Modal/Modal';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const ToastDemo = () => {
  const toast = useToast();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown) {
      setHasShown(true);
      toast.show('Default toast message', {
        variant: 'blue',
        duration: 3000,
      });
    }
  }, [toast, hasShown]);

  return (
    <Box className="p-4">
      <Button
        onClick={() => {
          toast.show('Clicked toast message', {
            variant: 'purple',
            duration: 3000,
          });
        }}
      >
        Show another toast
      </Button>
    </Box>
  );
};

const meta = {
  title: 'UI/Toast',
  component: ToastDemo, // Add component property
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToastDemo />,
  play: async ({ canvas }) => {
    // Wait for toast to be present in the DOM (it may be animated)
    expect(canvas.getByText('Default toast message')).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

export const Interactive: Story = {
  render: () => {
    const toast = useToast();

    return (
      <Box className="p-4">
        <Stack gap={4}>
          <Heading level="h1" variant="large">
            Toast Demo
          </Heading>
          <Box className="flex flex-wrap gap-4">
            {(
              [
                'blue',
                'purple',
                'green',
                'pink',
                'yellow',
                'teal',
              ] as ModalVariant[]
            ).map((variant) => (
              <Button
                key={variant}
                onClick={() =>
                  toast.show(`This is a ${variant} toast message`, {
                    variant,
                    duration: 3000,
                  })
                }
              >
                Show {variant} toast
              </Button>
            ))}
            <Button
              onClick={() =>
                toast.show("This toast won't auto-dismiss", {
                  variant: 'purple',
                  showCloseButton: true,
                })
              }
            >
              Show persistent toast
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  },
  play: async ({ canvas, userEvent }) => {
    // Wait for the demo interface to be visible
    await expect(canvas.getByText('Toast Demo')).toBeVisible();

    // Test clicking a toast button
    await userEvent.click(
      canvas.getByRole('button', { name: 'Show blue toast' })
    );

    // Wait for the toast to appear (it may be animated)
    expect(
      canvas.getByText('This is a blue toast message')
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });

    // Test clicking another toast button
    await userEvent.click(
      canvas.getByRole('button', { name: 'Show persistent toast' })
    );

    // Wait for the persistent toast to appear (it may be animated)
    expect(
      canvas.getByText("This toast won't auto-dismiss")
    ).toBeInTheDocument();
    await waitForMotionAnimations({ canvas });
  },
};

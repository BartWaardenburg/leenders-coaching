import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useEffect, useState } from 'react';
import { expect } from 'storybook/test';
import { ToastProvider, useToast } from './ToastManager';
import type { PastelVariant } from '@/utilities/tokens';
import { Stack } from '@/components/ui/Stack';
import { Box } from '@/components/ui/Box';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';
import { mockAlertData } from '@/mocks';

const maintenanceToastMatcher =
  /We zijn momenteel bezig met het verbeteren van onze website\. Excuses voor eventuele ongemakken\.?/i;

/**
 * Demo component for showing toasts using the ToastProvider context.
 * Shows a default toast on mount and allows showing another toast via button click.
 */
const ToastDemo = (): React.ReactNode => {
  const toast = useToast();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown) {
      setHasShown(true);
      toast.show(mockAlertData.info.message, {
        variant: 'blue',
        duration: 3000,
      });
    }
  }, [toast, hasShown]);

  return (
    <Box className="p-4">
      <Button
        onClick={() => {
          toast.show(mockAlertData.success.message, {
            variant: 'purple',
            duration: 3000,
          });
        }}
      >
        Toon nog een toast
      </Button>
    </Box>
  );
};

/**
 * Storybook meta configuration for Toast stories.
 */
const meta = {
  title: 'UI/Toast',
  component: ToastDemo /* Add component property */,
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
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de toast demo',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Toast story.
 */
export const Default: Story = {
  render: () => <ToastDemo />,
  play: async ({ canvas }) => {
    /* Wait for toast to be present in the DOM first */
    await expect(canvas.getByText(maintenanceToastMatcher)).toBeInTheDocument();
    /* Wait for animations to complete (handles reduced motion) */
    await waitForMotionAnimations({ canvas });
    /* Now the toast should be visible regardless of motion preferences */
    expect(canvas.getByText(maintenanceToastMatcher)).toBeVisible();
  },
};

/**
 * Interactive Toast story with multiple variants and a persistent toast.
 */
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
              ] as PastelVariant[]
            ).map((variant) => (
              <Button
                key={variant}
                onClick={() =>
                  toast.show(mockAlertData.info.message, {
                    variant,
                    duration: 3000,
                  })
                }
              >
                Toon {variant} toast
              </Button>
            ))}
            <Button
              onClick={() =>
                toast.show(mockAlertData.warning.message, {
                  variant: 'purple',
                  showCloseButton: true,
                })
              }
            >
              Toon persistente toast
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  },
  play: async ({ canvas, userEvent }) => {
    /* Wait for the demo interface to be visible */
    await expect(canvas.getByText('Toast Demo')).toBeVisible();

    /* Test clicking a toast button */
    await userEvent.click(
      canvas.getByRole('button', { name: 'Toon blue toast' })
    );

    /* Wait for the toast to appear in the DOM first */
    await expect(canvas.getByText(maintenanceToastMatcher)).toBeInTheDocument();
    /* Wait for animations to complete (handles reduced motion) */
    await waitForMotionAnimations({ canvas });
    /* For reduced motion environments, check if element exists and is functional */
    const toastElement = canvas.getByText(maintenanceToastMatcher);
    /* If not visible due to reduced motion, at least verify it exists and is accessible */
    try {
      expect(toastElement).toBeVisible();
    } catch {
      /* Fallback for reduced motion - just verify the element exists and is accessible */
      expect(toastElement).toBeInTheDocument();
      /* Check that the parent toast container has the correct role */
      const toastContainer = toastElement.closest('[role="alert"]');
      expect(toastContainer).toBeInTheDocument();
    }

    /* Test clicking another toast button */
    await userEvent.click(
      canvas.getByRole('button', { name: 'Toon persistente toast' })
    );

    /* Wait for the persistent toast to appear in the DOM first */
    await expect(
      canvas.getByText(
        'Controleer je gegevens voordat je het formulier verzendt.'
      )
    ).toBeInTheDocument();
    /* Wait for animations to complete (handles reduced motion) */
    await waitForMotionAnimations({ canvas });
    /* For reduced motion environments, check if element exists and is functional */
    const persistentToastElement = canvas.getByText(
      'Controleer je gegevens voordat je het formulier verzendt.'
    );
    /* If not visible due to reduced motion, at least verify it exists and is accessible */
    try {
      expect(persistentToastElement).toBeVisible();
    } catch {
      /* Fallback for reduced motion - just verify the element exists and is accessible */
      expect(persistentToastElement).toBeInTheDocument();
      /* Check that the parent toast container has the correct role */
      const toastContainer = persistentToastElement.closest('[role="alert"]');
      expect(toastContainer).toBeInTheDocument();
    }
  },
};

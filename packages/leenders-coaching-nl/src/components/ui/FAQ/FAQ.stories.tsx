import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { FAQ } from './FAQ';
import { waitForAnimations } from '../../../test/simple-chromatic-utils';

const meta = {
  title: 'UI/FAQ',
  component: FAQ,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePortableText = [
  {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: 'This is a basic answer with ',
      },
      {
        _type: 'span',
        marks: ['strong'],
        text: 'formatted text',
      },
      {
        _type: 'span',
        text: ' and a ',
      },
      {
        _type: 'span',
        marks: ['link'],
        text: 'link',
        value: {
          href: 'https://example.com',
        },
      },
      {
        _type: 'span',
        text: '.',
      },
    ],
    style: 'normal',
  },
];

export const Default: Story = {
  args: {
    items: [
      {
        question: 'What services do you offer?',
        answer: samplePortableText,
      },
      {
        question: 'How can I schedule an appointment?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'You can schedule an appointment through our online booking system or contact us directly.',
              },
            ],
            style: 'normal',
          },
        ],
      },
      {
        question: 'What are your working hours?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We are available Monday through Friday, from 9:00 AM to 5:00 PM.',
              },
            ],
            style: 'normal',
          },
        ],
      },
    ],
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Verify FAQ items are visible', async () => {
      // Wait for animations to complete first
      await waitForAnimations();

      // Wait for FAQ items to be visible
      await expect(
        canvas.getByText('What services do you offer?')
      ).toBeVisible();
      await expect(
        canvas.getByText('How can I schedule an appointment?')
      ).toBeVisible();
      await expect(
        canvas.getByText('What are your working hours?')
      ).toBeVisible();
    });

    await step('Test FAQ accordion interactions', async () => {
      // Click on first FAQ item
      await userEvent.click(canvas.getByText('What services do you offer?'));

      // Wait for answer to appear
      await expect(
        canvas.getAllByText((_, element) => {
          return (
            element?.textContent?.includes('This is a basic answer with') ??
            false
          );
        })[0]
      ).toBeVisible();
      await waitForAnimations();
    });

    await step('Test multiple FAQ items', async () => {
      // Click on second FAQ item
      await userEvent.click(
        canvas.getByText('How can I schedule an appointment?')
      );

      // Wait for answer to appear
      await expect(
        canvas.getAllByText((_, element) => {
          return (
            element?.textContent?.includes(
              'You can schedule an appointment through our online booking system'
            ) ?? false
          );
        })[0]
      ).toBeVisible();
      await waitForAnimations();

      // Click on third FAQ item
      await userEvent.click(canvas.getByText('What are your working hours?'));

      // Wait for answer to appear
      await expect(
        canvas.getAllByText((_, element) => {
          return (
            element?.textContent?.includes(
              'We are available Monday through Friday'
            ) ?? false
          );
        })[0]
      ).toBeVisible();
      await waitForAnimations();
    });

    await step('Test closing FAQ items', async () => {
      // Click on first FAQ item again to close it
      await userEvent.click(canvas.getByText('What services do you offer?'));

      // Wait for animations to complete
      await waitForAnimations();
    });
  },
};

export const WithVariant: Story = {
  args: {
    ...Default.args,
    variant: 'purple',
  },
};

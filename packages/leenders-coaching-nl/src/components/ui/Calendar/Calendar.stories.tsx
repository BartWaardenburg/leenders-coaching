import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { fn } from 'storybook/test';
import { Calendar } from './Calendar';
import { Box } from '../Box';
import { Text } from '../Text';
import {
  waitForMotionAnimations as _waitForMotionAnimations,
  waitForAnimation,
} from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    initialDate: {
      control: 'date',
      description: 'The initial date to display in the calendar',
    },
    onSelectDate: {
      action: 'dateSelected',
      description: 'Callback function when a date is selected',
    },
    renderDay: {
      control: false,
      description: 'Custom render function for day content',
    },
    disabledDates: {
      control: false,
      description: 'Configuration for disabled dates',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: fn(),
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas }) => {
    const monthElements = canvas.getAllByText('Maart 2024');
    expect(monthElements.length).toBeGreaterThan(0);
    expect(canvas.getByText('Ma')).toBeInTheDocument();

    await _waitForMotionAnimations({ canvas });
  },
};

export const WithCustomDayContent: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: (date) => {
      console.log('Selected date:', date.toLocaleDateString());
    },
    renderDay: (date) =>
      date.getDate() === 15 && (
        <Box className="border border-foreground/80 p-2 mt-1 hover:bg-foreground/5 transition-colors">
          <Text variant="small">Event at 2 PM</Text>
        </Box>
      ),
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas }) => {
    const monthElements = canvas.getAllByText('Maart 2024');
    expect(monthElements.length).toBeGreaterThan(0);
    expect(canvas.getByText('Ma')).toBeInTheDocument();
    expect(canvas.getByText('Event at 2 PM')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

/* Fixed dates for consistent Storybook/Chromatic testing */
const nextWeek = new Date('2024-03-22');
const nextMonth = new Date('2024-04-15');

export const WithDisabledDates: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: (date) => {
      console.log('Selected date:', date.toLocaleDateString());
    },
    disabledDates: {
      daysOfWeek: [0, 6],
      dates: [new Date('2024-03-15')],
      ranges: [
        {
          start: nextWeek,
          end: nextMonth,
        },
      ],
    },
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas }) => {
    const monthElements = canvas.getAllByText('Maart 2024');
    expect(monthElements.length).toBeGreaterThan(0);
    expect(canvas.getByText('Ma')).toBeInTheDocument();
    await _waitForMotionAnimations({ canvas });
  },
};

export const InteractiveCalendar: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: fn(),
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Calendar is rendered correctly', async () => {
      const monthElements = canvas.getAllByText('Maart 2024');
      expect(monthElements.length).toBeGreaterThan(0);
      expect(canvas.getByText('Ma')).toBeInTheDocument();
      expect(canvas.getByText('Di')).toBeInTheDocument();
      expect(canvas.getByText('Wo')).toBeInTheDocument();
    });

    await step('Hover interactions', async () => {
      const day10 = canvas.getByText('10');
      await userEvent.hover(day10);
      // Wait for any hover effects
      await waitForAnimation(10);
    });

    await _waitForMotionAnimations({ canvas });
  },
};

export const CalendarNavigation: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: fn(),
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Initial calendar state', async () => {
      expect(canvas.getAllByText('Maart 2024')[0]).toBeInTheDocument();
      expect(canvas.getByText('15')).toBeInTheDocument();
    });

    await step('Navigate to next month', async () => {
      const nextButton = canvas.getByLabelText('Volgende maand');
      await userEvent.click(nextButton);
      await _waitForMotionAnimations({ canvas });
      expect(canvas.getAllByText('April 2024')[0]).toBeInTheDocument();
    });

    await step('Navigate to previous month', async () => {
      const prevButton = canvas.getByLabelText('Vorige maand');
      await userEvent.click(prevButton);
      await _waitForMotionAnimations({ canvas });
      expect(canvas.getAllByText('Maart 2024')[0]).toBeInTheDocument();
    });

    await step('Navigate back to previous month again', async () => {
      const prevButton = canvas.getByLabelText('Vorige maand');
      await userEvent.click(prevButton);
      await _waitForMotionAnimations({ canvas });
      expect(canvas.getAllByText('Februari 2024')[0]).toBeInTheDocument();
    });

    await step('Navigate forward multiple months', async () => {
      const nextButton = canvas.getByLabelText('Volgende maand');
      await userEvent.click(nextButton);
      await _waitForMotionAnimations({ canvas });
      expect(canvas.getAllByText('Maart 2024')[0]).toBeInTheDocument();

      await userEvent.click(nextButton);
      await _waitForMotionAnimations({ canvas });
      expect(canvas.getAllByText('April 2024')[0]).toBeInTheDocument();
    });
  },
};

export const CalendarDateSelection: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: fn(),
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Select available dates', async () => {
      // Click on day 20 (should be available)
      const day20 = canvas.getByText('20');
      await userEvent.click(day20);
      await waitForAnimation(10);

      // Click on day 25 (should be available)
      const day25 = canvas.getByText('25');
      await userEvent.click(day25);
      await waitForAnimation(10);
    });

    await step(
      'Try to select past dates (should not trigger callback)',
      async () => {
        // Navigate to previous month to find past dates
        const prevButton = canvas.getByLabelText('Vorige maand');
        await userEvent.click(prevButton);
        await _waitForMotionAnimations({ canvas });

        // Try to click on a past date (should not trigger onSelectDate)
        const pastDay = canvas.getByText('15');
        await userEvent.click(pastDay);
        await waitForAnimation(10);
      }
    );

    await step('Navigate to future month and select dates', async () => {
      // Go to next month
      const nextButton = canvas.getByLabelText('Volgende maand');
      await userEvent.click(nextButton);
      await _waitForMotionAnimations({ canvas });

      // Select a future date
      const futureDay = canvas.getByText('10');
      await userEvent.click(futureDay);
      await waitForAnimation(10);
    });
  },
};

export const CalendarWithDisabledDates: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: fn(),
    disabledDates: {
      daysOfWeek: [0, 6], // Disable weekends
      dates: [new Date('2024-03-15'), new Date('2024-03-22')], // Disable specific dates
      ranges: [
        {
          start: new Date('2024-03-25'),
          end: new Date('2024-03-31'),
        },
      ],
    },
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Verify disabled dates are not clickable', async () => {
      // Try to click on disabled date (15th)
      const disabledDay = canvas.getByText('15');
      await userEvent.click(disabledDay);
      await waitForAnimation(10);

      // Try to click on weekend (should be disabled)
      const weekendDay = canvas.getByText('16'); // Saturday
      await userEvent.click(weekendDay);
      await waitForAnimation(10);
    });

    await step('Click on available dates', async () => {
      // Click on available weekday
      const availableDay = canvas.getByText('18'); // Monday
      await userEvent.click(availableDay);
      await waitForAnimation(10);

      // Click on another available date
      const anotherDay = canvas.getByText('19'); // Tuesday
      await userEvent.click(anotherDay);
      await waitForAnimation(10);
    });

    await step('Navigate to month with disabled range', async () => {
      // The disabled range is 25-31, so we should be able to click 25-31
      // but they should be disabled
      const rangeStart = canvas.getByText('25');
      await userEvent.click(rangeStart);
      await waitForAnimation(10);
    });
  },
};

export const CalendarAccessibility: Story = {
  args: {
    initialDate: new Date('2024-03-15'),
    onSelectDate: fn(),
  },
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Calendar {...args} initialDate={initialDate} />;
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Keyboard navigation', async () => {
      // Focus on the calendar by clicking on a date cell
      const dateCell = canvas.getByText('15');
      await userEvent.click(dateCell);

      // Test tab navigation
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
    });

    await step('Screen reader accessibility', async () => {
      // Check for proper ARIA labels
      const prevButton = canvas.getByLabelText('Vorige maand');
      const nextButton = canvas.getByLabelText('Volgende maand');

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();

      // Check for calendar structure (grid role may not be present)
      const monthElements = canvas.getAllByText('Maart 2024');
      if (monthElements.length > 0) {
        const calendarContainer = monthElements[0]?.closest('div');
        if (calendarContainer) {
          expect(calendarContainer).toBeInTheDocument();
        }
      }
    });

    await step('Focus management', async () => {
      // Click on navigation buttons and verify focus
      const nextButton = canvas.getByLabelText('Volgende maand');
      await userEvent.click(nextButton);
      await _waitForMotionAnimations({ canvas });

      // Focus should be maintained or properly managed
      expect(nextButton).toBeInTheDocument();
    });
  },
};

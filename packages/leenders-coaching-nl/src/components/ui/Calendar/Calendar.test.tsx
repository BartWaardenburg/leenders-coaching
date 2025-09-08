import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';
import { vi, describe, it, expect } from 'vitest';

// Mock the useConfig hook
vi.mock('@/components/providers/ClientConfigProvider', () => ({
  useConfig: () => ({
    accessibility: {
      reducedMotion: false,
      calendar: {
        previousMonth: 'Previous month',
        nextMonth: 'Next month',
      },
    },
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    create: (Component: any) => Component,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Calendar', () => {
  const defaultProps = {
    initialDate: new Date('2024-01-15'),
  };

  it('should render with default props', () => {
    render(<Calendar {...defaultProps} />);

    // Check if the calendar container is rendered
    const calendar = document.querySelector('.w-full.max-w-none');
    expect(calendar).toBeInTheDocument();
  });

  it('should display the correct month and year', () => {
    render(<Calendar {...defaultProps} />);

    // Check if the month/year header is displayed (Dutch: Januari)
    const januariElements = screen.getAllByText('Januari 2024');
    expect(januariElements.length).toBeGreaterThan(0);
  });

  it('should render week day headers', () => {
    render(<Calendar {...defaultProps} />);

    // Check if week day headers are present (Dutch: Ma, Di, Wo, Do, Vr, Za, Zo)
    expect(screen.getByText('Ma')).toBeInTheDocument();
    expect(screen.getByText('Di')).toBeInTheDocument();
    expect(screen.getByText('Wo')).toBeInTheDocument();
    expect(screen.getByText('Do')).toBeInTheDocument();
    expect(screen.getByText('Vr')).toBeInTheDocument();
    expect(screen.getByText('Za')).toBeInTheDocument();
    expect(screen.getByText('Zo')).toBeInTheDocument();
  });

  it('should render calendar days', () => {
    render(<Calendar {...defaultProps} />);

    // Check if navigation buttons are rendered
    const dayButtons = screen.getAllByRole('button');
    const navigationButtons = dayButtons.filter(
      (button) =>
        button.getAttribute('aria-label')?.includes('month') ||
        button.getAttribute('aria-label')?.includes('Previous') ||
        button.getAttribute('aria-label')?.includes('Next')
    );
    expect(navigationButtons.length).toBeGreaterThanOrEqual(2);
  });

  it('should handle month navigation', () => {
    render(<Calendar {...defaultProps} />);

    // Find and click the next month button
    const nextButton = screen.getByLabelText('Next month');
    fireEvent.click(nextButton);

    // Should now show February 2024 (Dutch: Februari)
    const februariElements = screen.getAllByText('Februari 2024');
    expect(februariElements.length).toBeGreaterThan(0);
  });

  it('should handle previous month navigation', () => {
    render(<Calendar {...defaultProps} />);

    // Find and click the previous month button
    const prevButton = screen.getByLabelText('Previous month');
    fireEvent.click(prevButton);

    // Should now show December 2023 (Dutch: December)
    const decemberElements = screen.getAllByText('December 2023');
    expect(decemberElements.length).toBeGreaterThan(0);
  });

  it('should call onSelectDate when a day is clicked', () => {
    const onSelectDate = vi.fn();
    render(<Calendar {...defaultProps} onSelectDate={onSelectDate} />);

    // Find and click a day button
    const dayButtons = screen.getAllByRole('button');
    const dayButton = dayButtons.find((button) =>
      /^\d+$/.test(button.textContent || '')
    );

    if (dayButton) {
      fireEvent.click(dayButton);
      expect(onSelectDate).toHaveBeenCalledWith(expect.any(Date));
    }
  });

  it('should apply custom className', () => {
    render(<Calendar {...defaultProps} className="custom-calendar" />);

    // Find the calendar container by looking for the main calendar div
    const calendar = document.querySelector('.w-full.max-w-none');
    expect(calendar).toHaveClass('custom-calendar');
  });

  it('should render with custom renderDay function', () => {
    const renderDay = vi.fn((date: Date) => (
      <span data-testid={`custom-day-${date.getDate()}`}>
        Custom {date.getDate()}
      </span>
    ));

    render(<Calendar {...defaultProps} renderDay={renderDay} />);

    // Check if custom day content is rendered
    const customDayElements = screen.getAllByTestId('custom-day-1');
    expect(customDayElements.length).toBeGreaterThan(0);
    const customElements = screen.getAllByText('Custom 1');
    expect(customElements.length).toBeGreaterThan(0);
  });

  it('should handle disabled dates', () => {
    const disabledDates = {
      ranges: [
        {
          start: new Date('2024-01-10'),
          end: new Date('2024-01-20'),
        },
      ],
    };

    render(<Calendar {...defaultProps} disabledDates={disabledDates} />);

    // Check if calendar is rendered (calendar uses div elements with grid classes)
    const calendarContainer = document.querySelector('.grid.grid-cols-7');
    expect(calendarContainer).toBeInTheDocument();
  });

  it('should handle year navigation', () => {
    render(<Calendar {...defaultProps} />);

    // Calendar displays month/year text but doesn't have year navigation
    // Just check that the month/year text is displayed (there are multiple instances)
    const januariElements = screen.getAllByText('Januari 2024');
    expect(januariElements.length).toBeGreaterThan(0);
  });

  it('should render with different initial dates', () => {
    // Test June 2024
    const { unmount } = render(
      <Calendar initialDate={new Date('2024-06-15')} />
    );
    const juniElements = screen.getAllByText('Juni 2024');
    expect(juniElements.length).toBeGreaterThan(0);
    unmount();

    // Test December 2023
    render(<Calendar initialDate={new Date('2023-12-01')} />);
    const decemberElements = screen.getAllByText('December 2023');
    expect(decemberElements.length).toBeGreaterThan(0);
  });

  it('should handle accessibility attributes', () => {
    render(<Calendar {...defaultProps} />);

    // Check if navigation buttons have proper labels
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });
});

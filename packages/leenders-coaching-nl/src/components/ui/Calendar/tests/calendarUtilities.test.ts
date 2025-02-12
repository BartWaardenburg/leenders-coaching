import { describe, it, expect } from 'vitest';
import {
  monthNames,
  weekDays,
  formatMonthYear,
  isPastDay,
  isDateInRanges,
  isDateDisabled,
  isCurrentMonth,
  isToday,
  isCurrentMonthToday,
  generateCalendarWeeks,
  type DateRange,
  type DisabledDates,
} from '../calendarUtilities';

describe('Calendar Utilities', () => {
  describe('monthNames', () => {
    it('should contain all Dutch month names', () => {
      expect(monthNames).toHaveLength(12);
      expect(monthNames[0]).toBe('Januari');
      expect(monthNames[11]).toBe('December');
    });
  });

  describe('weekDays', () => {
    it('should contain all Dutch weekday abbreviations starting with Monday', () => {
      expect(weekDays).toHaveLength(7);
      expect(weekDays[0]).toBe('Ma');
      expect(weekDays[6]).toBe('Zo');
    });
  });

  describe('formatMonthYear', () => {
    it('should format date to Dutch month and year', () => {
      const date = new Date(2024, 1, 15); // February 15, 2024
      expect(formatMonthYear(date)).toBe('Februari 2024');
    });
  });

  describe('isPastDay', () => {
    it('should identify past days correctly', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      expect(isPastDay(yesterday)).toBe(true);
      expect(isPastDay(tomorrow)).toBe(false);
    });
  });

  describe('isDateInRanges', () => {
    it('should identify if date is within ranges', () => {
      const date = new Date(2024, 1, 15);
      const ranges: DateRange[] = [
        {
          start: new Date(2024, 1, 10),
          end: new Date(2024, 1, 20),
        },
      ];

      expect(isDateInRanges(date, ranges)).toBe(true);
      expect(isDateInRanges(new Date(2024, 1, 5), ranges)).toBe(false);
    });

    it('should handle empty ranges', () => {
      expect(isDateInRanges(new Date(), [])).toBe(false);
      expect(isDateInRanges(new Date(), undefined)).toBe(false);
    });
  });

  describe('isDateDisabled', () => {
    const date = new Date(2024, 1, 15); // Thursday, February 15, 2024
    const disabledDates: DisabledDates = {
      dates: [new Date(2024, 1, 16)],
      daysOfWeek: [0, 6], // Sunday and Saturday
      ranges: [
        {
          start: new Date(2024, 1, 20),
          end: new Date(2024, 1, 25),
        },
      ],
    };

    it('should identify specific disabled dates', () => {
      expect(isDateDisabled(new Date(2024, 1, 16), disabledDates)).toBe(true);
      expect(isDateDisabled(date, disabledDates)).toBe(false);
    });

    it('should identify disabled days of week', () => {
      const sunday = new Date(2024, 1, 18);
      expect(isDateDisabled(sunday, disabledDates)).toBe(true);
    });

    it('should identify dates in disabled ranges', () => {
      const dateInRange = new Date(2024, 1, 22);
      expect(isDateDisabled(dateInRange, disabledDates)).toBe(true);
    });

    it('should handle undefined disabled dates', () => {
      expect(isDateDisabled(date, undefined)).toBe(false);
    });
  });

  describe('isCurrentMonth', () => {
    it('should identify dates in current month', () => {
      const currentDate = new Date(2024, 1, 15);
      const sameMonth = new Date(2024, 1, 1);
      const differentMonth = new Date(2024, 2, 1);

      expect(isCurrentMonth(sameMonth, currentDate)).toBe(true);
      expect(isCurrentMonth(differentMonth, currentDate)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('should identify today correctly', () => {
      const today = new Date();
      const notToday = new Date(today);
      notToday.setDate(today.getDate() + 1);

      expect(isToday(today)).toBe(true);
      expect(isToday(notToday)).toBe(false);
    });
  });

  describe('isCurrentMonthToday', () => {
    it("should identify if current month is today's month", () => {
      const today = new Date();
      const sameMonth = new Date(today.getFullYear(), today.getMonth(), 15);
      const differentMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1,
      );

      expect(isCurrentMonthToday(sameMonth)).toBe(true);
      expect(isCurrentMonthToday(differentMonth)).toBe(false);
    });
  });

  describe('generateCalendarWeeks', () => {
    it('should generate correct number of weeks', () => {
      const date = new Date(2024, 1, 1); // February 2024
      const weeks = generateCalendarWeeks(date);

      expect(weeks).toHaveLength(5); // February 2024 spans 5 weeks
      expect(weeks[0]).toHaveLength(7); // Each week should have 7 days
    });

    it('should include days from previous and next months', () => {
      const date = new Date(2024, 1, 1); // February 2024
      const weeks = generateCalendarWeeks(date);

      // First week should include some days from January
      const firstDay = weeks[0]?.[0];
      expect(firstDay?.getMonth()).toBe(0); // January is 0

      // Last week should include some days from March
      const lastWeek = weeks[weeks.length - 1];
      const lastDay = lastWeek?.[lastWeek.length - 1];
      expect(lastDay?.getMonth()).toBe(2); // March is 2
    });

    it('should start weeks with Monday', () => {
      const date = new Date(2024, 1, 1); // February 2024
      const weeks = generateCalendarWeeks(date);

      // Check if each week starts with Monday (1)
      weeks.forEach((week) => {
        const firstDayOfWeek = week[0];
        expect(firstDayOfWeek?.getDay()).not.toBe(0); // Should not start with Sunday
      });
    });
  });
});

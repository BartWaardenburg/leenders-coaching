import { describe, it, expect } from 'vitest';
import { transformCalendarSection } from './calendar';
import type { SectionCalendar as SanitySectionCalendar } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionCalendar> = {}
): SanitySectionCalendar => ({
  _id: 'test-id',
  _type: 'sectionCalendar',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

/**
 * Test suite for calendar section utility
 */
describe('transformCalendarSection', () => {
  it('should transform valid calendar section data with all fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Calendar Section',
      description: 'Calendar section description',
      background: 'blue',
      border: false,
      settings: {
        _type: 'calendarSettings',
        initialDate: '2024-01-15',
        disabledDates: {
          daysOfWeek: [0, 6], // Sunday and Saturday
          dates: ['2024-01-20', '2024-01-25'],
          ranges: [
            {
              start: '2024-01-30',
              end: '2024-02-05',
              _key: 'range-1',
            },
          ],
        },
      },
    });

    const result = transformCalendarSection(mockData);

    expect(result).toEqual({
      title: 'Calendar Section',
      description: 'Calendar section description',
      initialDate: new Date('2024-01-15'),
      disabledDates: {
        daysOfWeek: [0, 6],
        dates: [new Date('2024-01-20'), new Date('2024-01-25')],
        ranges: [
          {
            start: new Date('2024-01-30'),
            end: new Date('2024-02-05'),
          },
        ],
      },
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc({
      settings: {
        _type: 'calendarSettings',
      },
    });

    const result = transformCalendarSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      initialDate: undefined,
      disabledDates: {
        daysOfWeek: undefined,
        dates: undefined,
        ranges: undefined,
      },
      background: undefined,
      border: undefined,
    });
  });

  it('should handle missing disabled dates', () => {
    const mockData = createSanityDoc({
      settings: {
        _type: 'calendarSettings',
        initialDate: '2024-01-15',
      },
    });

    const result = transformCalendarSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      initialDate: new Date('2024-01-15'),
      disabledDates: {
        daysOfWeek: undefined,
        dates: undefined,
        ranges: undefined,
      },
      background: undefined,
      border: undefined,
    });
  });

  it('should handle partial disabled dates', () => {
    const mockData = createSanityDoc({
      settings: {
        _type: 'calendarSettings',
        disabledDates: {
          daysOfWeek: [0],
          dates: ['2024-01-20'],
        },
      },
    });

    const result = transformCalendarSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      initialDate: undefined,
      disabledDates: {
        daysOfWeek: [0],
        dates: [new Date('2024-01-20')],
        ranges: undefined,
      },
      background: undefined,
      border: undefined,
    });
  });

  it('should handle empty disabled dates arrays', () => {
    const mockData = createSanityDoc({
      settings: {
        _type: 'calendarSettings',
        disabledDates: {
          daysOfWeek: [],
          dates: [],
          ranges: [],
        },
      },
    });

    const result = transformCalendarSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      initialDate: undefined,
      disabledDates: {
        daysOfWeek: [],
        dates: [],
        ranges: [],
      },
      background: undefined,
      border: undefined,
    });
  });

  it('should handle invalid date strings gracefully', () => {
    const mockData = createSanityDoc({
      settings: {
        _type: 'calendarSettings',
        initialDate: 'invalid-date',
        disabledDates: {
          dates: ['invalid-date'],
          ranges: [
            {
              start: 'invalid-start',
              end: 'invalid-end',
              _key: 'range-1',
            },
          ],
        },
      },
    });

    const result = transformCalendarSection(mockData);

    expect(result.initialDate).toBeInstanceOf(Date);
    expect(result.disabledDates?.dates?.[0]).toBeInstanceOf(Date);
    expect(result.disabledDates?.ranges?.[0]?.start).toBeInstanceOf(Date);
    expect(result.disabledDates?.ranges?.[0]?.end).toBeInstanceOf(Date);
  });

  it('should throw error for invalid section data', () => {
    const invalidData = {
      _type: 'invalidType',
    };

    expect(() => transformCalendarSection(invalidData)).toThrow(
      'Invalid calendar section data'
    );
  });

  it('should throw error for missing settings', () => {
    const invalidData = {
      _type: 'sectionCalendar',
    };

    expect(() => transformCalendarSection(invalidData)).toThrow(
      'Invalid calendar section data'
    );
  });

  it('should throw error for null settings', () => {
    const invalidData = {
      _type: 'sectionCalendar',
      settings: null,
    };

    expect(() => transformCalendarSection(invalidData)).toThrow(
      'Invalid calendar section data'
    );
  });
});

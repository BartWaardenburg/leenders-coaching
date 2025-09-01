import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

/**
 * Test suite for formatDate utility function
 */
describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    const dateString = '2024-02-15';
    const result = formatDate(dateString);

    // The exact format depends on the locale, but it should contain the year
    expect(result).toContain('2024');
    expect(result).toContain('February');
    expect(result).toContain('15');
  });

  it('should handle ISO date strings', () => {
    const dateString = '2024-12-25T10:30:00.000Z';
    const result = formatDate(dateString);

    expect(result).toContain('2024');
    expect(result).toContain('December');
    expect(result).toContain('25');
  });

  it('should handle different date formats', () => {
    const dateString = '2024-06-01';
    const result = formatDate(dateString);

    expect(result).toContain('2024');
    expect(result).toContain('June');
    expect(result).toContain('1');
  });

  it('should handle edge case dates', () => {
    const dateString = '2024-01-01';
    const result = formatDate(dateString);

    expect(result).toContain('2024');
    expect(result).toContain('January');
    expect(result).toContain('1');
  });
});

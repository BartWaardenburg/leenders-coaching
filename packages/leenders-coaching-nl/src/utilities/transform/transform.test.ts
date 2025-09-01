import { describe, it, expect } from 'vitest';
import { transformNullable, transformNullableArray } from './transform';

/**
 * Test suite for transform utility functions
 */
describe('transformNullable', () => {
  it('should return the value when it is not null or undefined', () => {
    expect(transformNullable('test', 'default')).toBe('test');
    expect(transformNullable(42, 0)).toBe(42);
    expect(transformNullable(true, false)).toBe(true);
    expect(transformNullable({ key: 'value' }, {})).toEqual({ key: 'value' });
  });

  it('should return default value when value is null', () => {
    expect(transformNullable(null, 'default')).toBe('default');
    expect(transformNullable(null, 0)).toBe(0);
    expect(transformNullable(null, false)).toBe(false);
    expect(transformNullable(null, {})).toEqual({});
  });

  it('should return default value when value is undefined', () => {
    expect(transformNullable(undefined, 'default')).toBe('default');
    expect(transformNullable(undefined, 0)).toBe(0);
    expect(transformNullable(undefined, false)).toBe(false);
    expect(transformNullable(undefined, {})).toEqual({});
  });

  it('should handle zero values correctly', () => {
    expect(transformNullable(0, 42)).toBe(0);
    expect(transformNullable('', 'default')).toBe('');
    expect(transformNullable(false, true)).toBe(false);
  });
});

describe('transformNullableArray', () => {
  it('should transform array items when array exists', () => {
    const array = [1, 2, 3, null, 5];
    const transform = (item: number | null | undefined) => item || 0;

    const result = transformNullableArray(array, transform);
    expect(result).toEqual([1, 2, 3, 0, 5]);
  });

  it('should return empty array when array is null', () => {
    const transform = (item: number | null | undefined) => item || 0;

    const result = transformNullableArray(null, transform);
    expect(result).toEqual([]);
  });

  it('should return empty array when array is undefined', () => {
    const transform = (item: number | null | undefined) => item || 0;

    const result = transformNullableArray(undefined, transform);
    expect(result).toEqual([]);
  });

  it('should handle empty array', () => {
    const transform = (item: number | null | undefined) => item || 0;

    const result = transformNullableArray([], transform);
    expect(result).toEqual([]);
  });

  it('should handle complex transformations', () => {
    const array = ['hello', null, 'world', null, 'test'] as (string | null)[];
    const transform = (item: string | null | undefined) =>
      item?.toUpperCase() || 'DEFAULT';

    const result = transformNullableArray(array, transform);
    expect(result).toEqual(['HELLO', 'DEFAULT', 'WORLD', 'DEFAULT', 'TEST']);
  });

  it('should handle object transformations', () => {
    const array = [{ name: 'John' }, null, { name: 'Jane' }];
    const transform = (item: { name: string } | null | undefined) =>
      item?.name || 'Unknown';

    const result = transformNullableArray(array, transform);
    expect(result).toEqual(['John', 'Unknown', 'Jane']);
  });
});

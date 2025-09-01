import { describe, it, expect } from 'vitest';
import { transformContentSection } from './content';
import type { SectionContent as SanitySectionContent } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionContent> = {}
): SanitySectionContent => ({
  _id: 'test-id',
  _type: 'sectionContent',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

/**
 * Test suite for content section utility
 */
describe('transformContentSection', () => {
  it('should transform valid content section data with all fields', () => {
    const mockContent = [
      {
        _type: 'block' as const,
        _key: '1',
        children: [
          { _type: 'span' as const, _key: '1-1', text: 'Test content' },
        ],
      },
    ];

    const mockData = createSanityDoc({
      displayTitle: 'Content Section',
      content: mockContent,
      background: 'blue',
      border: false,
    });

    const result = transformContentSection(mockData);

    expect(result).toEqual({
      title: 'Content Section',
      content: mockContent,
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc({
      content: [],
    });

    const result = transformContentSection(mockData);

    expect(result).toEqual({
      title: undefined,
      content: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle missing content array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Content Section',
      content: [],
    });

    const result = transformContentSection(mockData);

    expect(result).toEqual({
      title: 'Content Section',
      content: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle empty content array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Content Section',
      content: [],
    });

    const result = transformContentSection(mockData);

    expect(result).toEqual({
      title: 'Content Section',
      content: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should throw error for invalid section data', () => {
    const mockData = {
      _type: 'invalidSection',
    };

    expect(() => transformContentSection(mockData)).toThrow(
      'Invalid content section data'
    );
  });

  it('should throw error for missing content array', () => {
    const mockData = {
      _type: 'sectionContent',
      // Missing content array
    };

    expect(() => transformContentSection(mockData)).toThrow(
      'Invalid content section data'
    );
  });
});

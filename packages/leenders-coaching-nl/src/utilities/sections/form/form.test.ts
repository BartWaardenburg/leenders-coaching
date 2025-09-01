import { describe, it, expect } from 'vitest';
import { transformFormSection } from './form';
import type { SectionForm as SanitySectionForm } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionForm> = {}
): SanitySectionForm => ({
  _id: 'test-id',
  _type: 'sectionForm',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

/**
 * Test suite for form section utility
 */
describe('transformFormSection', () => {
  it('should transform valid form section data with all fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Contact Form',
      description: 'Get in touch with us',
      background: 'blue',
      border: false,
      form: {
        _type: 'formConfiguration',
        submitLabel: 'Send Message',
      },
    });

    const result = transformFormSection(mockData);

    expect(result).toEqual({
      title: 'Contact Form',
      description: 'Get in touch with us',
      submitLabel: 'Send Message',
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc();

    const result = transformFormSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      submitLabel: undefined,
      background: undefined,
      border: undefined,
    });
  });

  it('should handle missing form object', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Contact Form',
    });

    const result = transformFormSection(mockData);

    expect(result).toEqual({
      title: 'Contact Form',
      description: '',
      submitLabel: undefined,
      background: undefined,
      border: undefined,
    });
  });

  it('should handle empty strings for optional fields', () => {
    const mockData = createSanityDoc({
      displayTitle: '',
      description: '',
      form: {
        _type: 'formConfiguration',
        submitLabel: '',
      },
    });

    const result = transformFormSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      submitLabel: undefined,
      background: undefined,
      border: undefined,
    });
  });

  it('should throw error for invalid section data', () => {
    const invalidData = {
      _type: 'invalidType',
    };

    expect(() => transformFormSection(invalidData)).toThrow(
      'Invalid form section data'
    );
  });
});

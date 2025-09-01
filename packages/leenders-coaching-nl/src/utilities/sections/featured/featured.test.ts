import { describe, it, expect, vi } from 'vitest';
import { transformFeaturedSection } from './featured';
import type { SectionFeatured as SanitySectionFeatured } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionFeatured> = {}
): SanitySectionFeatured => ({
  _id: 'test-id',
  _type: 'sectionFeatured',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

// Mock the urlForImage function
vi.mock('@/utilities/sanity', () => ({
  urlForImage: () => ({
    url: () => 'https://example.com/image.jpg',
  }),
}));

/**
 * Test suite for featured section utility
 */
describe('transformFeaturedSection', () => {
  it('should transform valid featured section data with all fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Featured Section',
      description: 'Featured section description',
      image: { _type: 'image', asset: { _ref: 'image-1', _type: 'reference' } },
      imageAlt: 'Featured image alt text',
      background: 'blue',
      border: false,
      reverse: true,
      cta: {
        _type: 'callToAction',
        href: '/featured',
        label: 'Learn More',
        variant: 'blue',
      },
    });

    const result = transformFeaturedSection(mockData);

    expect(result).toEqual({
      title: 'Featured Section',
      description: 'Featured section description',
      image: 'https://example.com/image.jpg',
      imageAlt: 'Featured image alt text',
      cta: {
        _type: 'callToAction',
        href: '/featured',
        label: 'Learn More',
        variant: 'blue',
      },
      background: 'blue',
      border: false,
      reverse: true,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc();

    const result = transformFeaturedSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      image: '',
      imageAlt: '',
      cta: undefined,
      background: undefined,
      border: undefined,
      reverse: undefined,
    });
  });

  it('should handle missing image', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Featured Section',
    });

    const result = transformFeaturedSection(mockData);

    expect(result).toEqual({
      title: 'Featured Section',
      description: '',
      image: '',
      imageAlt: '',
      cta: undefined,
      background: undefined,
      border: undefined,
      reverse: undefined,
    });
  });

  it('should handle missing CTA', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Featured Section',
      image: { _type: 'image', asset: { _ref: 'image-1', _type: 'reference' } },
    });

    const result = transformFeaturedSection(mockData);

    expect(result).toEqual({
      title: 'Featured Section',
      description: '',
      image: 'https://example.com/image.jpg',
      imageAlt: '',
      cta: undefined,
      background: undefined,
      border: undefined,
      reverse: undefined,
    });
  });

  it('should handle CTA with missing optional fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Featured Section',
      cta: {
        _type: 'callToAction',
        href: '/featured',
        label: 'Learn More',
      },
    });

    const result = transformFeaturedSection(mockData);

    expect(result).toEqual({
      title: 'Featured Section',
      description: '',
      image: '',
      imageAlt: '',
      cta: {
        href: '/featured',
        label: 'Learn More',
        variant: undefined,
      },
      background: undefined,
      border: undefined,
      reverse: undefined,
    });
  });

  it('should handle empty strings for optional fields', () => {
    const mockData = createSanityDoc({
      displayTitle: '',
      description: '',
      imageAlt: '',
      cta: {
        _type: 'callToAction',
        href: '',
        label: '',
      },
    });

    const result = transformFeaturedSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      image: '',
      imageAlt: '',
      cta: {
        href: '',
        label: '',
        variant: undefined,
      },
      background: undefined,
      border: undefined,
      reverse: undefined,
    });
  });

  it('should throw error for invalid section data', () => {
    const mockData = {
      _type: 'invalidSection',
    };

    expect(() => transformFeaturedSection(mockData)).toThrow(
      'Invalid featured section data'
    );
  });
});

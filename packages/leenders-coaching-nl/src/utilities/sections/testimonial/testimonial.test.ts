import { describe, it, expect, vi } from 'vitest';
import { transformTestimonialSection } from './';
import type { SectionTestimonial as SanitySectionTestimonial } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionTestimonial> = {}
): SanitySectionTestimonial => ({
  _id: 'test-id',
  _type: 'sectionTestimonial',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

// Mock the sanity utilities
vi.mock('@/utilities/sanity', () => ({
  groq: vi.fn(),
  client: {},
  sanityConfig: {},
  defineQuery: vi.fn(),
}));

/**
 * Test suite for testimonial section utility
 */
describe('transformTestimonialSection', () => {
  it('should transform valid testimonial section data with all fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Testimonials',
      description: 'What our clients say',
      background: 'blue',
      border: false,
      testimonials: [
        {
          _type: 'testimonial',
          _key: 'testimonial-1',
          quote: 'Great service!',
          name: 'John Doe',
          role: 'CEO',
          image: {
            _type: 'image',
            asset: { _ref: 'image-1', _type: 'reference' },
          },
        },
        {
          _type: 'testimonial',
          _key: 'testimonial-2',
          quote: 'Amazing results!',
          name: 'Jane Smith',
          role: 'Manager',
          image: {
            _type: 'image',
            asset: { _ref: 'image-2', _type: 'reference' },
          },
        },
      ],
    });

    const result = transformTestimonialSection(mockData);

    expect(result).toEqual({
      title: 'Testimonials',
      description: 'What our clients say',
      testimonials: [
        {
          _key: 'testimonial-1',
          quote: 'Great service!',
          name: 'John Doe',
          role: 'CEO',
          image: {
            _type: 'image',
            asset: { _ref: 'image-1', _type: 'reference' },
          },
        },
        {
          _key: 'testimonial-2',
          quote: 'Amazing results!',
          name: 'Jane Smith',
          role: 'Manager',
          image: {
            _type: 'image',
            asset: { _ref: 'image-2', _type: 'reference' },
          },
        },
      ],
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc({
      testimonials: [],
    });

    const result = transformTestimonialSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      testimonials: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle missing testimonials array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Testimonials',
    });

    const result = transformTestimonialSection(mockData);

    expect(result).toEqual({
      title: 'Testimonials',
      description: '',
      testimonials: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle testimonials with missing optional fields', () => {
    const mockData = createSanityDoc({
      testimonials: [
        {
          _type: 'testimonial',
          _key: 'testimonial-1',
          quote: 'Great service!',
          name: 'John Doe',
          // Missing role and image
        },
      ],
    });

    const result = transformTestimonialSection(mockData);

    expect(result.testimonials).toHaveLength(1);
    expect(result.testimonials?.[0]).toEqual({
      _key: 'testimonial-1',
      quote: 'Great service!',
      name: 'John Doe',
      role: undefined,
      image: undefined,
    });
  });

  it('should handle testimonials with missing image', () => {
    const mockData = createSanityDoc({
      testimonials: [
        {
          _type: 'testimonial',
          _key: 'testimonial-1',
          quote: 'Great service!',
          name: 'John Doe',
          role: 'CEO',
          // Missing image
        },
      ],
    });

    const result = transformTestimonialSection(mockData);

    expect(result.testimonials?.[0]?.image).toBeUndefined();
  });

  it('should handle empty testimonials array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Testimonials',
      testimonials: [],
    });

    const result = transformTestimonialSection(mockData);

    expect(result).toEqual({
      title: 'Testimonials',
      description: '',
      testimonials: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle empty strings for optional fields', () => {
    const mockData = createSanityDoc({
      displayTitle: '',
      description: '',
      testimonials: [
        {
          _type: 'testimonial',
          _key: 'testimonial-1',
          quote: '',
          name: '',
          role: '',
        },
      ],
    });

    const result = transformTestimonialSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      testimonials: [
        {
          _key: 'testimonial-1',
          quote: '',
          name: '',
          role: '',
          image: undefined,
        },
      ],
      background: undefined,
      border: undefined,
    });
  });

  it('should throw error for invalid section data', () => {
    const mockData = {
      _type: 'invalidSection',
    };

    expect(() => transformTestimonialSection(mockData)).toThrow(
      'Invalid testimonial section data'
    );
  });
});

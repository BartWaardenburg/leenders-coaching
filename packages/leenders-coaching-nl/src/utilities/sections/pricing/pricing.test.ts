import { describe, it, expect } from 'vitest';
import { transformPricingSection } from './';
import type { SectionPricing as SanitySectionPricing } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionPricing> = {}
): SanitySectionPricing => ({
  _id: 'test-id',
  _type: 'sectionPricing',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

/**
 * Test suite for pricing section utility
 */
describe('transformPricingSection', () => {
  it('should transform valid pricing section data with all fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Pricing Section',
      description: 'Choose your plan',
      background: 'blue',
      border: false,
      packages: [
        {
          _type: 'pricingCard',
          _key: 'package-1',
          title: 'Basic Plan',
          description: 'Basic features',
          price: '€50/month',
          features: [
            {
              _type: 'feature',
              _key: 'feature-1',
              text: 'Feature 1',
            },
            {
              _type: 'feature',
              _key: 'feature-2',
              text: 'Feature 2',
            },
          ],
          isPopular: false,
          ctaLabel: 'Get Started',
          variant: 'blue',
        },
        {
          _type: 'pricingCard',
          _key: 'package-2',
          title: 'Pro Plan',
          description: 'Pro features',
          price: '€100/month',
          features: [
            {
              _type: 'feature',
              _key: 'feature-3',
              text: 'Pro Feature 1',
            },
          ],
          isPopular: true,
          ctaLabel: 'Get Pro',
          variant: 'purple',
        },
      ],
    });

    const result = transformPricingSection(mockData);

    expect(result).toEqual({
      title: 'Pricing Section',
      description: 'Choose your plan',
      packages: [
        {
          _key: 'package-1',
          title: 'Basic Plan',
          description: 'Basic features',
          price: '€50/month',
          features: [
            {
              _key: 'feature-1',
              text: 'Feature 1',
            },
            {
              _key: 'feature-2',
              text: 'Feature 2',
            },
          ],
          isPopular: false,
          ctaLabel: 'Get Started',
          variant: 'blue',
        },
        {
          _key: 'package-2',
          title: 'Pro Plan',
          description: 'Pro features',
          price: '€100/month',
          features: [
            {
              _key: 'feature-3',
              text: 'Pro Feature 1',
            },
          ],
          isPopular: true,
          ctaLabel: 'Get Pro',
          variant: 'purple',
        },
      ],
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc({
      packages: [],
    });

    const result = transformPricingSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      packages: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle missing packages array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Pricing Section',
    });

    const result = transformPricingSection(mockData);

    expect(result).toEqual({
      title: 'Pricing Section',
      description: '',
      packages: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle packages with missing optional fields', () => {
    const mockData = createSanityDoc({
      packages: [
        {
          _type: 'pricingCard',
          _key: 'package-1',
          title: 'Basic Plan',
          // Missing other fields
        },
      ],
    });

    const result = transformPricingSection(mockData);

    expect(result.packages).toHaveLength(1);
    expect(result.packages[0]).toEqual({
      _key: 'package-1',
      title: 'Basic Plan',
      description: '',
      price: '',
      features: [],
      isPopular: undefined,
      ctaLabel: '',
      variant: undefined,
    });
  });

  it('should handle packages with missing features array', () => {
    const mockData = createSanityDoc({
      packages: [
        {
          _type: 'pricingCard',
          _key: 'package-1',
          title: 'Basic Plan',
          description: 'Basic features',
          price: '€50/month',
          // Missing features array
        },
      ],
    });

    const result = transformPricingSection(mockData);

    expect(result.packages?.[0]?.features).toEqual([]);
  });

  it('should handle features with missing optional fields', () => {
    const mockData = createSanityDoc({
      packages: [
        {
          _type: 'pricingCard',
          _key: 'package-1',
          title: 'Basic Plan',
          features: [
            {
              _type: 'feature',
              _key: 'feature-1',
              // Missing text
            },
          ],
        },
      ],
    });

    const result = transformPricingSection(mockData);

    expect(result.packages?.[0]?.features?.[0]).toEqual({
      _key: 'feature-1',
      text: '',
    });
  });

  it('should handle empty packages array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Pricing Section',
      packages: [],
    });

    const result = transformPricingSection(mockData);

    expect(result).toEqual({
      title: 'Pricing Section',
      description: '',
      packages: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should throw error for invalid section data', () => {
    const mockData = {
      _type: 'invalidSection',
    };

    expect(() => transformPricingSection(mockData)).toThrow(
      'Invalid pricing section data'
    );
  });
});

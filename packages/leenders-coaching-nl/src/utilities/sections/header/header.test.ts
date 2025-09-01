import { describe, it, expect } from 'vitest';
import { transformHeaderSection } from './header';
import type { SectionHeader as SanitySectionHeader } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionHeader> = {}
): SanitySectionHeader => ({
  _id: 'test-id',
  _type: 'sectionHeader',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

/**
 * Test suite for header section utility
 */
describe('transformHeaderSection', () => {
  it('should transform valid header section data with all fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Header Section',
      description: 'Header section description',
      background: 'blue',
      border: false,
      primaryCta: {
        _type: 'callToAction',
        href: '/primary',
        label: 'Primary Action',
        isExternal: false,
        variant: 'blue',
      },
      secondaryCta: {
        _type: 'callToAction',
        href: '/secondary',
        label: 'Secondary Action',
        isExternal: true,
        variant: 'transparent',
      },
    });

    const result = transformHeaderSection(mockData);

    expect(result).toEqual({
      title: 'Header Section',
      description: 'Header section description',
      background: 'blue',
      border: false,
      primaryCta: {
        href: '/primary',
        label: 'Primary Action',
        isExternal: false,
        variant: 'blue',
      },
      secondaryCta: {
        href: '/secondary',
        label: 'Secondary Action',
        isExternal: true,
        variant: 'transparent',
      },
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc();

    const result = transformHeaderSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      background: undefined,
      border: undefined,
      primaryCta: undefined,
      secondaryCta: undefined,
    });
  });

  it('should handle primary CTA with missing optional fields', () => {
    const mockData = createSanityDoc({
      primaryCta: {
        _type: 'callToAction',
        href: '/test',
      },
    });

    const result = transformHeaderSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      background: undefined,
      border: undefined,
      primaryCta: {
        href: '/test',
        label: '',
        isExternal: undefined,
        variant: undefined,
      },
      secondaryCta: undefined,
    });
  });

  it('should handle secondary CTA with missing optional fields', () => {
    const mockData = createSanityDoc({
      secondaryCta: {
        _type: 'callToAction',
        label: 'Test Label',
      },
    });

    const result = transformHeaderSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      background: undefined,
      border: undefined,
      primaryCta: undefined,
      secondaryCta: {
        href: '',
        label: 'Test Label',
        isExternal: undefined,
        variant: undefined,
      },
    });
  });

  it('should throw error for invalid section data', () => {
    const invalidData = {
      _type: 'invalidType',
    };

    expect(() => transformHeaderSection(invalidData)).toThrow(
      'Invalid header section data'
    );
  });

  it('should handle empty strings for optional fields', () => {
    const mockData = createSanityDoc({
      displayTitle: '',
      description: '',
      primaryCta: {
        _type: 'callToAction',
        href: '',
        label: '',
      },
    });

    const result = transformHeaderSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      background: undefined,
      border: undefined,
      primaryCta: {
        href: '',
        label: '',
        isExternal: undefined,
        variant: undefined,
      },
      secondaryCta: undefined,
    });
  });
});

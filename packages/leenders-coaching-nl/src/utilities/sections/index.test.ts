import { describe, it, expect, vi } from 'vitest';

// Mock the sanity utilities to avoid environment variable issues
vi.mock('@/utilities/sanity', () => ({
  urlForImage: vi.fn(),
}));

import { sectionRegistry, isSectionType, sectionTransformers } from './index';

/**
 * Test suite for sections index utility
 */
describe('sectionRegistry', () => {
  it('should contain all expected section components', () => {
    const expectedSections = [
      'sectionBlog',
      'sectionCalendar',
      'sectionCards',
      'sectionContent',
      'sectionFAQ',
      'sectionFeatured',
      'sectionForm',
      'sectionHeader',
      'sectionPricing',
      'sectionTestimonial',
      'sectionTimeline',
    ];

    expectedSections.forEach((section) => {
      expect(sectionRegistry).toHaveProperty(section);
      expect(
        sectionRegistry[section as keyof typeof sectionRegistry]
      ).toBeDefined();
    });
  });

  it('should have the correct number of sections', () => {
    const sectionCount = Object.keys(sectionRegistry).length;
    expect(sectionCount).toBe(11);
  });
});

describe('isSectionType', () => {
  it('should return true for valid section types', () => {
    expect(isSectionType('sectionBlog')).toBe(true);
    expect(isSectionType('sectionHeader')).toBe(true);
    expect(isSectionType('sectionContent')).toBe(true);
    expect(isSectionType('sectionFAQ')).toBe(true);
    expect(isSectionType('sectionFeatured')).toBe(true);
    expect(isSectionType('sectionForm')).toBe(true);
    expect(isSectionType('sectionPricing')).toBe(true);
    expect(isSectionType('sectionTestimonial')).toBe(true);
    expect(isSectionType('sectionTimeline')).toBe(true);
    expect(isSectionType('sectionCalendar')).toBe(true);
    expect(isSectionType('sectionCards')).toBe(true);
  });

  it('should return false for invalid section types', () => {
    expect(isSectionType('invalidSection')).toBe(false);
    expect(isSectionType('sectionInvalid')).toBe(false);
    expect(isSectionType('')).toBe(false);
    expect(isSectionType('blog')).toBe(false);
    expect(isSectionType('header')).toBe(false);
  });

  it('should handle case sensitivity', () => {
    expect(isSectionType('SectionBlog')).toBe(false);
    expect(isSectionType('SECTIONBLOG')).toBe(false);
    expect(isSectionType('sectionblog')).toBe(false);
  });
});

describe('sectionTransformers', () => {
  it('should contain transformers for all section types', () => {
    const expectedTransformers = [
      'sectionBlog',
      'sectionCalendar',
      'sectionCards',
      'sectionContent',
      'sectionFAQ',
      'sectionFeatured',
      'sectionForm',
      'sectionHeader',
      'sectionPricing',
      'sectionTestimonial',
      'sectionTimeline',
    ];

    expectedTransformers.forEach((transformer) => {
      expect(sectionTransformers).toHaveProperty(transformer);
      expect(
        typeof sectionTransformers[
          transformer as keyof typeof sectionTransformers
        ]
      ).toBe('function');
    });
  });

  it('should have the correct number of transformers', () => {
    const transformerCount = Object.keys(sectionTransformers).length;
    expect(transformerCount).toBe(11);
  });

  it('should have transformers that match section registry keys', () => {
    const registryKeys = Object.keys(sectionRegistry).sort();
    const transformerKeys = Object.keys(sectionTransformers).sort();

    expect(transformerKeys).toEqual(registryKeys);
  });
});

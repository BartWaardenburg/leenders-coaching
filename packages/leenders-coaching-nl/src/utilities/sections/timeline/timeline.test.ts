import { describe, it, expect } from 'vitest';
import { transformTimelineSection } from './timeline';
import type { SectionTimeline as SanitySectionTimeline } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionTimeline> = {}
): SanitySectionTimeline => ({
  _id: 'test-id',
  _type: 'sectionTimeline',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

/**
 * Test suite for timeline section utility
 */
describe('transformTimelineSection', () => {
  it('should transform valid timeline section data with all fields', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Timeline Section',
      description: 'Our journey',
      background: 'blue',
      border: false,
      steps: [
        {
          _type: 'timelineEvent',
          _key: 'step-1',
          title: 'Step 1',
          description: 'First step description',
          variant: 'blue',
        },
        {
          _type: 'timelineEvent',
          _key: 'step-2',
          title: 'Step 2',
          description: 'Second step description',
          variant: 'purple',
        },
      ],
    });

    const result = transformTimelineSection(mockData);

    expect(result).toEqual({
      title: 'Timeline Section',
      description: 'Our journey',
      steps: [
        {
          _key: 'step-1',
          title: 'Step 1',
          description: 'First step description',
          variant: 'blue',
        },
        {
          _key: 'step-2',
          title: 'Step 2',
          description: 'Second step description',
          variant: 'purple',
        },
      ],
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc({
      steps: [],
    });

    const result = transformTimelineSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      steps: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle missing steps array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Timeline Section',
    });

    const result = transformTimelineSection(mockData);

    expect(result).toEqual({
      title: 'Timeline Section',
      description: '',
      steps: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle steps with missing optional fields', () => {
    const mockData = createSanityDoc({
      steps: [
        {
          _type: 'timelineEvent',
          _key: 'step-1',
          title: 'Step 1',
          // Missing description and variant
        },
      ],
    });

    const result = transformTimelineSection(mockData);

    expect(result.steps).toHaveLength(1);
    expect(result.steps[0]).toEqual({
      _key: 'step-1',
      title: 'Step 1',
      description: '',
      variant: undefined,
    });
  });

  it('should handle empty steps array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'Timeline Section',
      steps: [],
    });

    const result = transformTimelineSection(mockData);

    expect(result).toEqual({
      title: 'Timeline Section',
      description: '',
      steps: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle empty strings for optional fields', () => {
    const mockData = createSanityDoc({
      displayTitle: '',
      description: '',
      steps: [
        {
          _type: 'timelineEvent',
          _key: 'step-1',
          title: '',
          description: '',
        },
      ],
    });

    const result = transformTimelineSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      steps: [
        {
          _key: 'step-1',
          title: '',
          description: '',
          variant: undefined,
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

    expect(() => transformTimelineSection(mockData)).toThrow(
      'Invalid timeline section data'
    );
  });
});

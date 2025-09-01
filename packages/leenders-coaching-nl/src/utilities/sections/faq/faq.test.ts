import { describe, it, expect } from 'vitest';
import { transformFAQSection } from './faq';
import type { SectionFAQ as SanitySectionFAQ } from '@/types/sanity/schema';

// Helper function to create Sanity document properties
const createSanityDoc = (
  overrides: Partial<SanitySectionFAQ> = {}
): SanitySectionFAQ => ({
  _id: 'test-id',
  _type: 'sectionFAQ',
  _createdAt: '2024-01-01T00:00:00Z',
  _updatedAt: '2024-01-01T00:00:00Z',
  _rev: 'test-rev',
  ...overrides,
});

/**
 * Test suite for FAQ section utility
 */
describe('transformFAQSection', () => {
  it('should transform valid FAQ section data with all fields', () => {
    const mockAnswer: any[] = [
      {
        _type: 'block',
        _key: '1',
        children: [{ _type: 'span', _key: '1-1', text: 'Test answer' }],
      },
    ];

    const mockData = createSanityDoc({
      displayTitle: 'FAQ Section',
      description: 'Frequently asked questions',
      background: 'blue',
      border: false,
      items: [
        {
          _type: 'faqItem',
          _key: 'faq-1',
          question: 'What is this?',
          answer: mockAnswer,
        },
        {
          _type: 'faqItem',
          _key: 'faq-2',
          question: 'How does it work?',
          answer: mockAnswer,
        },
      ],
    });

    const result = transformFAQSection(mockData);

    expect(result).toEqual({
      title: 'FAQ Section',
      description: 'Frequently asked questions',
      items: [
        {
          _key: 'faq-1',
          question: 'What is this?',
          answer: mockAnswer,
        },
        {
          _key: 'faq-2',
          question: 'How does it work?',
          answer: mockAnswer,
        },
      ],
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockData = createSanityDoc({
      items: [],
    });

    const result = transformFAQSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      items: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should handle missing items array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'FAQ Section',
    });

    const result = transformFAQSection(mockData);

    expect(result).toEqual({
      title: 'FAQ Section',
      description: '',
      items: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should filter out invalid FAQ items', () => {
    const mockAnswer: any[] = [
      {
        _type: 'block',
        _key: '1',
        children: [{ _type: 'span', _key: '1-1', text: 'Test answer' }],
      },
    ];

    const mockData = createSanityDoc({
      items: [
        {
          _type: 'faqItem',
          _key: 'faq-1',
          question: 'Valid question',
          answer: mockAnswer,
        },
        {
          _type: 'faqItem',
          _key: 'faq-2',
          // Missing question
          answer: mockAnswer,
        },
        {
          _type: 'faqItem',
          _key: 'faq-3',
          question: 'Valid question 2',
          // Missing answer
        },
        {
          _type: 'faqItem',
          _key: 'faq-4',
          // Invalid item - missing both question and answer
        },
      ],
    });

    const result = transformFAQSection(mockData);

    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toEqual({
      _key: 'faq-1',
      question: 'Valid question',
      answer: mockAnswer,
    });
  });

  it('should handle empty items array', () => {
    const mockData = createSanityDoc({
      displayTitle: 'FAQ Section',
      items: [],
    });

    const result = transformFAQSection(mockData);

    expect(result).toEqual({
      title: 'FAQ Section',
      description: '',
      items: [],
      background: undefined,
      border: undefined,
    });
  });

  it('should throw error for invalid section data', () => {
    const mockData = {
      _type: 'invalidSection',
    };

    expect(() => transformFAQSection(mockData)).toThrow(
      'Invalid FAQ section data'
    );
  });
});

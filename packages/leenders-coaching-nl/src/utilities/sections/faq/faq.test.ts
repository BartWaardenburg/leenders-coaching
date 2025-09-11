import { describe, it, expect } from 'vitest';
import { transformFAQSection } from './';

describe('transformFAQSection', () => {
  const mockValidFAQData = {
    _type: 'sectionFAQ',
    displayTitle: 'Frequently Asked Questions',
    description: 'Find answers to common questions about our services.',
    items: [
      {
        _key: 'faq-1',
        question: 'What is your return policy?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We offer a 30-day return policy for all products in original condition.',
              },
            ],
          },
        ],
      },
      {
        _key: 'faq-2',
        question: 'How long does shipping take?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.',
              },
            ],
          },
        ],
      },
      {
        _key: 'faq-3',
        question: 'Do you offer international shipping?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.',
              },
            ],
          },
        ],
      },
    ],
    background: 'white',
    border: true,
  };

  const mockFAQDataWithoutItems = {
    _type: 'sectionFAQ',
    displayTitle: 'FAQ Without Items',
    description: 'This FAQ section has no items.',
    background: 'gray',
    border: false,
  };

  const mockFAQDataWithInvalidItems = {
    _type: 'sectionFAQ',
    displayTitle: 'FAQ With Invalid Items',
    description: 'This FAQ section has some invalid items.',
    items: [
      {
        _key: 'faq-1',
        question: 'Valid question?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Valid answer.',
              },
            ],
          },
        ],
      },
      {
        _key: 'faq-2',
        // Missing question
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Invalid answer without question.',
              },
            ],
          },
        ],
      },
      {
        _key: 'faq-3',
        question: 'Question without answer?',
        // Missing answer
      },
      {
        // Missing _key
        question: 'Question without key?',
        answer: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Answer without key.',
              },
            ],
          },
        ],
      },
    ],
    background: 'white',
    border: true,
  };

  const mockInvalidFAQData = {
    _type: 'invalidSection',
    displayTitle: 'Invalid Section',
    description: 'This should throw an error.',
  };

  it('should transform valid FAQ section data correctly', () => {
    const transformed = transformFAQSection(mockValidFAQData);

    expect(transformed).toEqual({
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about our services.',
      items: [
        {
          _key: 'faq-1',
          question: 'What is your return policy?',
          answer: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'We offer a 30-day return policy for all products in original condition.',
                },
              ],
            },
          ],
        },
        {
          _key: 'faq-2',
          question: 'How long does shipping take?',
          answer: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.',
                },
              ],
            },
          ],
        },
        {
          _key: 'faq-3',
          question: 'Do you offer international shipping?',
          answer: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.',
                },
              ],
            },
          ],
        },
      ],
      background: 'white',
      border: true,
    });
  });

  it('should handle FAQ section without items', () => {
    const transformed = transformFAQSection(mockFAQDataWithoutItems);

    expect(transformed).toEqual({
      title: 'FAQ Without Items',
      description: 'This FAQ section has no items.',
      items: [],
      background: 'gray',
      border: false,
    });
  });

  it('should filter out invalid FAQ items', () => {
    const transformed = transformFAQSection(mockFAQDataWithInvalidItems);

    expect(transformed).toEqual({
      title: 'FAQ With Invalid Items',
      description: 'This FAQ section has some invalid items.',
      items: [
        {
          _key: 'faq-1',
          question: 'Valid question?',
          answer: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Valid answer.',
                },
              ],
            },
          ],
        },
      ],
      background: 'white',
      border: true,
    });
  });

  it('should throw error for invalid section type', () => {
    expect(() => {
      transformFAQSection(mockInvalidFAQData);
    }).toThrow('Invalid FAQ section data');
  });

  it('should throw error for data without _type', () => {
    const dataWithoutType = {
      displayTitle: 'No Type',
      description: 'This has no _type field.',
    };

    expect(() => {
      transformFAQSection(dataWithoutType);
    }).toThrow('Invalid FAQ section data');
  });

  it('should handle missing displayTitle', () => {
    const dataWithoutTitle = {
      _type: 'sectionFAQ',
      description: 'No title section',
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithoutTitle);

    expect(transformed.title).toBeUndefined();
    expect(transformed.description).toBe('No title section');
  });

  it('should handle missing description', () => {
    const dataWithoutDescription = {
      _type: 'sectionFAQ',
      displayTitle: 'No Description',
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithoutDescription);

    expect(transformed.title).toBe('No Description');
    expect(transformed.description).toBe('');
  });

  it('should handle items with missing question', () => {
    const dataWithMissingQuestion = {
      _type: 'sectionFAQ',
      displayTitle: 'FAQ with Missing Question',
      items: [
        {
          _key: 'faq-1',
          // Missing question
          answer: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Answer without question.',
                },
              ],
            },
          ],
        },
      ],
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithMissingQuestion);

    expect(transformed.items).toHaveLength(0);
  });

  it('should handle items with missing answer', () => {
    const dataWithMissingAnswer = {
      _type: 'sectionFAQ',
      displayTitle: 'FAQ with Missing Answer',
      items: [
        {
          _key: 'faq-1',
          question: 'Question without answer?',
          // Missing answer
        },
      ],
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithMissingAnswer);

    expect(transformed.items).toHaveLength(0);
  });

  it('should handle items with missing _key', () => {
    const dataWithMissingKey = {
      _type: 'sectionFAQ',
      displayTitle: 'FAQ with Missing Key',
      items: [
        {
          // Missing _key
          question: 'Question without key?',
          answer: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Answer without key.',
                },
              ],
            },
          ],
        },
      ],
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithMissingKey);

    expect(transformed.items).toHaveLength(0);
  });

  it('should handle empty items array', () => {
    const dataWithEmptyItems = {
      _type: 'sectionFAQ',
      displayTitle: 'FAQ with Empty Items',
      items: [],
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithEmptyItems);

    expect(transformed.items).toHaveLength(0);
  });

  it('should handle null items', () => {
    const dataWithNullItems = {
      _type: 'sectionFAQ',
      displayTitle: 'FAQ with Null Items',
      items: null,
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithNullItems);

    expect(transformed.items).toHaveLength(0);
  });

  it('should handle undefined items', () => {
    const dataWithUndefinedItems = {
      _type: 'sectionFAQ',
      displayTitle: 'FAQ with Undefined Items',
      background: 'white',
      border: true,
    };

    const transformed = transformFAQSection(dataWithUndefinedItems);

    expect(transformed.items).toHaveLength(0);
  });
});

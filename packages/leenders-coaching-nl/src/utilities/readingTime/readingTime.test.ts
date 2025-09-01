import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from './readingTime';
import type { PortableTextBlock } from '@portabletext/types';

/**
 * Test suite for readingTime utility function
 */
describe('calculateReadingTime', () => {
  it('should calculate reading time for simple text blocks', () => {
    const blocks: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        children: [
          {
            _type: 'span',
            _key: '1-1',
            text: 'This is a test paragraph with some words.',
          },
        ],
      },
    ];

    const result = calculateReadingTime(blocks);
    expect(result).toBe('1 min read');
  });

  it('should calculate reading time for multiple blocks', () => {
    const blocks: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        children: [
          {
            _type: 'span',
            _key: '1-1',
            text: 'First paragraph with some content.',
          },
        ],
      },
      {
        _type: 'block',
        _key: '2',
        children: [
          {
            _type: 'span',
            _key: '2-1',
            text: 'Second paragraph with more content.',
          },
        ],
      },
    ];

    const result = calculateReadingTime(blocks);
    expect(result).toBe('1 min read');
  });

  it('should handle blocks without children', () => {
    const blocks: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        children: [],
      },
    ];

    const result = calculateReadingTime(blocks);
    expect(result).toBe('1 min read');
  });

  it('should handle non-block types', () => {
    const blocks: PortableTextBlock[] = [
      {
        _type: 'image',
        _key: '1',
        asset: { _ref: 'image-1', _type: 'reference' },
      } as unknown as PortableTextBlock,
    ];

    const result = calculateReadingTime(blocks);
    expect(result).toBe('1 min read');
  });

  it('should handle empty text', () => {
    const blocks: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        children: [{ _type: 'span', _key: '1-1', text: '' }],
      },
    ];

    const result = calculateReadingTime(blocks);
    expect(result).toBe('1 min read');
  });

  it('should handle custom words per minute', () => {
    const blocks: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        children: [
          {
            _type: 'span',
            _key: '1-1',
            text: 'This is a test with exactly ten words for calculation.',
          },
        ],
      },
    ];

    const result = calculateReadingTime(blocks, 10);
    expect(result).toBe('1 min read');
  });

  it('should handle large text that takes multiple minutes', () => {
    const longText = 'word '.repeat(300); // 300 words
    const blocks: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        children: [{ _type: 'span', _key: '1-1', text: longText }],
      },
    ];

    const result = calculateReadingTime(blocks, 200);
    expect(result).toBe('2 min read');
  });

  it('should handle mixed content types', () => {
    const blocks: PortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        children: [{ _type: 'span', _key: '1-1', text: 'Some text content.' }],
      },
      {
        _type: 'image',
        _key: '2',
        asset: { _ref: 'image-1', _type: 'reference' },
      } as unknown as PortableTextBlock,
      {
        _type: 'block',
        _key: '3',
        children: [{ _type: 'span', _key: '3-1', text: 'More text content.' }],
      },
    ];

    const result = calculateReadingTime(blocks);
    expect(result).toBe('1 min read');
  });
});

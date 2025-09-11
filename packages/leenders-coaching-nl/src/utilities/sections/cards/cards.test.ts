import { describe, it, expect } from 'vitest';
import { transformCardsSection } from './';

describe('transformCardsSection', () => {
  const mockValidCardsData = {
    _type: 'sectionCards',
    displayTitle: 'Our Services',
    description: 'Explore our range of professional services.',
    cards: [
      {
        _key: 'card-1',
        title: 'Web Development',
        description:
          'Custom web applications and websites built with modern technologies.',
        featured: true,
        date: '2024-01-15',
        categories: ['Development', 'Web'],
        slug: { current: 'web-development' },
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-abc123-800x600-jpg',
            _type: 'reference',
          },
          alt: 'Web development illustration',
        },
        variant: 'default',
        border: true,
        reverse: false,
      },
      {
        _key: 'card-2',
        title: 'Mobile Apps',
        description:
          'Native and cross-platform mobile applications for iOS and Android.',
        featured: false,
        date: '2024-01-20',
        categories: ['Development', 'Mobile'],
        slug: { current: 'mobile-apps' },
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-def456-800x600-jpg',
            _type: 'reference',
          },
          alt: 'Mobile app development illustration',
        },
        variant: 'default',
        border: true,
        reverse: true,
      },
    ],
    background: 'white',
    border: true,
  };

  const mockCardsDataWithoutCards = {
    _type: 'sectionCards',
    displayTitle: 'Empty Cards Section',
    description: 'This section has no cards.',
    background: 'gray',
    border: false,
  };

  const mockCardsDataWithPartialCards = {
    _type: 'sectionCards',
    displayTitle: 'Partial Cards Section',
    description: 'This section has some cards with missing data.',
    cards: [
      {
        _key: 'card-1',
        title: 'Complete Card',
        description: 'This card has all required fields.',
        featured: true,
        date: '2024-01-15',
        categories: ['Development'],
        slug: { current: 'complete-card' },
        image: {
          _type: 'image',
          asset: {
            _ref: 'image-abc123-800x600-jpg',
            _type: 'reference',
          },
          alt: 'Complete card image',
        },
        variant: 'default',
        border: true,
        reverse: false,
      },
      {
        _key: 'card-2',
        title: 'Minimal Card',
        // Missing description, date, categories, image
        featured: false,
        slug: { current: 'minimal-card' },
        variant: 'default',
        border: true,
        reverse: false,
      },
    ],
    background: 'white',
    border: true,
  };

  const mockInvalidCardsData = {
    _type: 'invalidSection',
    displayTitle: 'Invalid Section',
    description: 'This should throw an error.',
  };

  it('should transform valid cards section data correctly', () => {
    const transformed = transformCardsSection(mockValidCardsData);

    expect(transformed).toEqual({
      title: 'Our Services',
      description: 'Explore our range of professional services.',
      background: 'white',
      border: true,
      children: expect.any(Array),
    });

    expect(transformed.children).toHaveLength(2);
  });

  it('should handle cards section without cards array', () => {
    const transformed = transformCardsSection(mockCardsDataWithoutCards);

    expect(transformed).toEqual({
      title: 'Empty Cards Section',
      description: 'This section has no cards.',
      background: 'gray',
      border: false,
      children: undefined,
    });
  });

  it('should handle cards section with partial card data', () => {
    const transformed = transformCardsSection(mockCardsDataWithPartialCards);

    expect(transformed).toEqual({
      title: 'Partial Cards Section',
      description: 'This section has some cards with missing data.',
      background: 'white',
      border: true,
      children: expect.any(Array),
    });

    expect(transformed.children).toHaveLength(2);
  });

  it('should throw error for invalid section type', () => {
    expect(() => {
      transformCardsSection(mockInvalidCardsData);
    }).toThrow('Invalid cards section data');
  });

  it('should throw error for data without _type', () => {
    const dataWithoutType = {
      displayTitle: 'No Type',
      description: 'This has no _type field.',
    };

    expect(() => {
      transformCardsSection(dataWithoutType);
    }).toThrow('Invalid cards section data');
  });

  it('should handle missing displayTitle', () => {
    const dataWithoutTitle = {
      _type: 'sectionCards',
      description: 'No title section',
      background: 'white',
      border: true,
    };

    const transformed = transformCardsSection(dataWithoutTitle);

    expect(transformed.title).toBeUndefined();
    expect(transformed.description).toBe('No title section');
  });

  it('should handle missing description', () => {
    const dataWithoutDescription = {
      _type: 'sectionCards',
      displayTitle: 'No Description',
      background: 'white',
      border: true,
    };

    const transformed = transformCardsSection(dataWithoutDescription);

    expect(transformed.title).toBe('No Description');
    expect(transformed.description).toBe('');
  });

  it('should handle cards with missing optional fields', () => {
    const dataWithMinimalCards = {
      _type: 'sectionCards',
      displayTitle: 'Minimal Cards',
      cards: [
        {
          _key: 'minimal-card',
          title: 'Minimal Card',
          featured: false,
          slug: { current: 'minimal' },
          variant: 'default',
          border: true,
          reverse: false,
        },
      ],
      background: 'white',
      border: true,
    };

    const transformed = transformCardsSection(dataWithMinimalCards);

    expect(transformed.children).toHaveLength(1);
    expect(
      Array.isArray(transformed.children) && transformed.children[0]
    ).toBeDefined();
  });
});

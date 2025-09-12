import { describe, it, expect } from 'vitest';
import {
  generateWebsiteStructuredData,
  generateArticleStructuredData,
  generateOrganizationStructuredData,
  generateMetadata,
} from './';

/**
 * Test suite for metadata utility functions
 */
describe('generateWebsiteStructuredData', () => {
  it('should generate website structured data with all parameters', () => {
    const result = generateWebsiteStructuredData(
      'Test Website',
      'Test description',
      'https://example.com'
    );

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Test Website',
      description: 'Test description',
      url: 'https://example.com',
    });
  });

  it('should generate website structured data without optional parameters', () => {
    const result = generateWebsiteStructuredData('Test Website');

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Test Website',
      description: undefined,
      url: expect.any(String), // Will use default from config
    });
  });
});

describe('generateArticleStructuredData', () => {
  it('should generate article structured data with all parameters', () => {
    const result = generateArticleStructuredData({
      title: 'Test Article',
      description: 'Test article description',
      image: 'https://example.com/image.jpg',
      datePublished: '2024-01-01',
      dateModified: '2024-01-02',
      author: 'John Doe',
    });

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Test Article',
      description: 'Test article description',
      image: 'https://example.com/image.jpg',
      datePublished: '2024-01-01',
      dateModified: '2024-01-02',
      author: {
        '@type': 'Person',
        name: 'John Doe',
      },
      publisher: {
        '@type': 'Organization',
        name: expect.any(String), // From config
        logo: expect.any(Object), // From config
      },
    });
  });

  it('should generate article structured data without optional parameters', () => {
    const result = generateArticleStructuredData({
      title: 'Test Article',
    });

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Test Article',
      description: undefined,
      image: undefined,
      datePublished: undefined,
      dateModified: undefined,
      author: undefined,
      publisher: {
        '@type': 'Organization',
        name: expect.any(String), // From config
        logo: expect.any(Object), // From config
      },
    });
  });
});

describe('generateOrganizationStructuredData', () => {
  it('should generate organization structured data with all parameters', () => {
    const result = generateOrganizationStructuredData({
      name: 'Test Organization',
      description: 'Test organization description',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
      socialLinks: ['https://twitter.com/test', 'https://linkedin.com/test'],
    });

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
      description: 'Test organization description',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
      sameAs: ['https://twitter.com/test', 'https://linkedin.com/test'],
    });
  });

  it('should generate organization structured data without optional parameters', () => {
    const result = generateOrganizationStructuredData({
      name: 'Test Organization',
    });

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Organization',
      description: undefined,
      url: expect.any(String), // Will use default from config
      logo: undefined,
      sameAs: undefined,
    });
  });
});

describe('generateMetadata', () => {
  it('should generate metadata for website type', () => {
    const result = generateMetadata({
      title: 'Test Page',
      description: 'Test page description',
      type: 'website',
    });

    expect(result).toEqual({
      title: expect.stringContaining('Test Page'),
      description: 'Test page description',
      openGraph: {
        title: expect.stringContaining('Test Page'),
        description: 'Test page description',
        type: 'website',
        images: expect.any(Array),
        siteName: expect.any(String),
      },
      twitter: {
        card: 'summary_large_image',
        images: expect.any(Array),
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'script:ld+json': expect.any(String),
      },
    });
  });

  it('should generate metadata for article type', () => {
    const result = generateMetadata({
      title: 'Test Article',
      description: 'Test article description',
      type: 'article',
      images: [{ url: 'https://example.com/image.jpg' }],
    });

    expect(result).toEqual({
      title: expect.stringContaining('Test Article'),
      description: 'Test article description',
      openGraph: {
        title: expect.stringContaining('Test Article'),
        description: 'Test article description',
        type: 'article',
        images: [{ url: 'https://example.com/image.jpg' }],
        siteName: expect.any(String),
      },
      twitter: {
        card: 'summary_large_image',
        images: [{ url: 'https://example.com/image.jpg' }],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'script:ld+json': expect.any(String),
      },
    });
  });

  it('should generate metadata with noindex when specified', () => {
    const result = generateMetadata({
      title: 'Test Page',
      noindex: true,
    });

    expect(result.robots).toEqual({
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    });
  });

  it('should generate metadata with custom structured data', () => {
    const customStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'CustomType',
      name: 'Custom Data',
    };

    const result = generateMetadata({
      title: 'Test Page',
      structuredData: customStructuredData,
    });

    expect(result.other!['script:ld+json']).toBe(
      JSON.stringify(customStructuredData)
    );
  });

  it('should generate metadata without title', () => {
    const result = generateMetadata({
      description: 'Test description',
    });

    expect(typeof result.title).toBe('string'); // Should use default title
    expect(result.description).toBe('Test description');
  });
});

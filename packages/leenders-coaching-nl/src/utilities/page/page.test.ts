import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPageData, generatePageMetadata } from './';
import type { BasePage } from '@/types/Page';

// Mock the dependencies
vi.mock('@/groq/queries', () => ({
  getPage: vi.fn(),
}));

vi.mock('@/components/sections/SectionRenderer', () => ({
  SectionRenderer: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'section-renderer' }, children),
}));

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('page utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPageData', () => {
    it('should return page data when successful', async () => {
      const mockPageData = {
        _id: 'test-page',
        title: 'Test Page',
        metadata: {
          title: 'Test Page',
          description: 'Test description',
        },
      };

      const { getPage } = await import('@/groq/queries');
      vi.mocked(getPage).mockResolvedValue(mockPageData);

      const result = await getPageData('testPage');

      expect(getPage).toHaveBeenCalledWith('testPage');
      expect(result).toEqual(mockPageData);
    });

    it('should return null when getPage throws an error', async () => {
      const { getPage } = await import('@/groq/queries');
      vi.mocked(getPage).mockRejectedValue(new Error('Network error'));

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = await getPageData('testPage');

      expect(getPage).toHaveBeenCalledWith('testPage');
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching testPage data:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('generatePageMetadata', () => {
    it('should return fallback metadata when page is null', () => {
      const result = generatePageMetadata(null, 'Fallback Title');

      expect(result).toEqual({
        title: 'Fallback Title',
        description:
          'Professionele coaching voor persoonlijke en professionele groei.',
      });
    });

    it('should return fallback metadata when page has no metadata', () => {
      const page = {
        _id: 'test-page',
        _type: 'page',
        title: 'Test Page',
      } as BasePage;

      const result = generatePageMetadata(page, 'Fallback Title');

      expect(result).toEqual({
        title: 'Fallback Title',
        description:
          'Professionele coaching voor persoonlijke en professionele groei.',
      });
    });

    it('should return page metadata when available', () => {
      const page = {
        _id: 'test-page',
        _type: 'page',
        title: 'Test Page',
        metadata: {
          title: 'Page Title',
          description: 'Page description',
          keywords: ['coaching', 'development'],
        },
      } as BasePage;

      const result = generatePageMetadata(page, 'Fallback Title');

      expect(result).toEqual({
        title: 'Page Title',
        description: 'Page description',
        keywords: ['coaching', 'development'],
      });
    });

    it('should include OpenGraph metadata when available', () => {
      const page = {
        _id: 'test-page',
        _type: 'page',
        title: 'Test Page',
        metadata: {
          _type: 'metadata',
          title: 'Page Title',
          description: 'Page description',
          openGraph: {
            _type: 'openGraph',
            title: 'OG Title',
            description: 'OG Description',
            image: {
              _type: 'openGraphImage',
              url: {
                _type: 'image',
                asset: {
                  _ref: 'image-abc123-1200x630-jpg',
                  _type: 'reference',
                },
              },
              width: 1200,
              height: 630,
              alt: 'Test image',
            },
          },
        },
      } as BasePage;

      const result = generatePageMetadata(page, 'Fallback Title');

      expect(result).toEqual({
        title: 'Page Title',
        description: 'Page description',
        keywords: undefined,
        openGraph: {
          title: 'OG Title',
          description: 'OG Description',
          type: 'website',
          url: undefined,
          siteName: undefined,
          images: [
            {
              url: '',
              width: 1200,
              height: 630,
              alt: 'Test image',
            },
          ],
        },
      });
    });

    it('should use fallback title when page metadata has no title', () => {
      const page = {
        _id: 'test-page',
        _type: 'page',
        title: 'Test Page',
        metadata: {
          description: 'Page description',
        },
      } as BasePage;

      const result = generatePageMetadata(page, 'Fallback Title');

      expect(result).toEqual({
        title: 'Fallback Title',
        description: 'Page description',
      });
    });
  });
});

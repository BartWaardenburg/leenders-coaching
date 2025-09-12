import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the dependencies
vi.mock('@/lib/api/sanity', () => ({
  sanityFetch: vi.fn(),
  sanityFetchDraft: vi.fn(),
}));

vi.mock('next/headers', () => ({
  draftMode: vi.fn(),
}));

describe('queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPage', () => {
    it('should be defined', async () => {
      const { getPage } = await import('./queries');
      expect(getPage).toBeDefined();
      expect(typeof getPage).toBe('function');
    });

    it('should call sanityFetch when draft mode is disabled', async () => {
      const { draftMode } = await import('next/headers');
      const { sanityFetch } = await import('@/lib/api/sanity');

      vi.mocked(draftMode).mockResolvedValue({
        isEnabled: false,
        enable: vi.fn(),
        disable: vi.fn(),
      });
      vi.mocked(sanityFetch).mockResolvedValue({ title: 'Test Page' });

      const { getPage } = await import('./queries');
      const result = await getPage('homePage');

      expect(draftMode).toHaveBeenCalled();
      expect(sanityFetch).toHaveBeenCalled();
      expect(result).toEqual({ title: 'Test Page' });
    });

    it('should call sanityFetchDraft when draft mode is enabled', async () => {
      const { draftMode } = await import('next/headers');
      const { sanityFetchDraft } = await import('@/lib/api/sanity');

      vi.mocked(draftMode).mockResolvedValue({
        isEnabled: true,
        enable: vi.fn(),
        disable: vi.fn(),
      });
      vi.mocked(sanityFetchDraft).mockResolvedValue({ title: 'Draft Page' });

      const { getPage } = await import('./queries');
      const result = await getPage('aboutPage');

      expect(draftMode).toHaveBeenCalled();
      expect(sanityFetchDraft).toHaveBeenCalled();
      expect(result).toEqual({ title: 'Draft Page' });
    });
  });

  describe('getGlobalData', () => {
    it('should be defined', async () => {
      const { getGlobalData } = await import('./queries');
      expect(getGlobalData).toBeDefined();
      expect(typeof getGlobalData).toBe('function');
    });

    it('should call sanityFetch when draft mode is disabled', async () => {
      const { draftMode } = await import('next/headers');
      const { sanityFetch } = await import('@/lib/api/sanity');

      vi.mocked(draftMode).mockResolvedValue({
        isEnabled: false,
        enable: vi.fn(),
        disable: vi.fn(),
      });
      vi.mocked(sanityFetch).mockResolvedValue({
        siteName: 'Test Site',
        navigation: [],
      });

      const { getGlobalData } = await import('./queries');
      const result = await getGlobalData();

      expect(draftMode).toHaveBeenCalled();
      expect(sanityFetch).toHaveBeenCalled();
      expect(result).toEqual({
        siteName: 'Test Site',
        navigation: [],
      });
    });

    it('should call sanityFetchDraft when draft mode is enabled', async () => {
      const { draftMode } = await import('next/headers');
      const { sanityFetchDraft } = await import('@/lib/api/sanity');

      vi.mocked(draftMode).mockResolvedValue({
        isEnabled: true,
        enable: vi.fn(),
        disable: vi.fn(),
      });
      vi.mocked(sanityFetchDraft).mockResolvedValue({
        siteName: 'Draft Site',
        navigation: [],
      });

      const { getGlobalData } = await import('./queries');
      const result = await getGlobalData();

      expect(draftMode).toHaveBeenCalled();
      expect(sanityFetchDraft).toHaveBeenCalled();
      expect(result).toEqual({
        siteName: 'Draft Site',
        navigation: [],
      });
    });
  });

  describe('getBlogPosts', () => {
    it('should be defined', async () => {
      const { getBlogPosts } = await import('./queries');
      expect(getBlogPosts).toBeDefined();
      expect(typeof getBlogPosts).toBe('function');
    });

    it('should call sanityFetch when draft mode is disabled', async () => {
      const { draftMode } = await import('next/headers');
      const { sanityFetch } = await import('@/lib/api/sanity');

      vi.mocked(draftMode).mockResolvedValue({
        isEnabled: false,
        enable: vi.fn(),
        disable: vi.fn(),
      });
      vi.mocked(sanityFetch).mockResolvedValue([]);

      const { getBlogPosts } = await import('./queries');
      const result = await getBlogPosts();

      expect(draftMode).toHaveBeenCalled();
      expect(sanityFetch).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should call sanityFetchDraft when draft mode is enabled', async () => {
      const { draftMode } = await import('next/headers');
      const { sanityFetchDraft } = await import('@/lib/api/sanity');

      vi.mocked(draftMode).mockResolvedValue({
        isEnabled: true,
        enable: vi.fn(),
        disable: vi.fn(),
      });
      vi.mocked(sanityFetchDraft).mockResolvedValue([
        { title: 'Draft Post', slug: 'draft-post' },
      ]);

      const { getBlogPosts } = await import('./queries');
      const result = await getBlogPosts();

      expect(draftMode).toHaveBeenCalled();
      expect(sanityFetchDraft).toHaveBeenCalled();
      expect(result).toEqual([{ title: 'Draft Post', slug: 'draft-post' }]);
    });
  });
});

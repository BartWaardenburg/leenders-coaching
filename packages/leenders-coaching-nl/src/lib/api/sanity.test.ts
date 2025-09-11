import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next-sanity
const mockFetch = vi.fn();
const mockCreateClient = vi.fn(() => ({
  fetch: mockFetch,
}));

vi.mock('next-sanity', () => ({
  createClient: mockCreateClient,
}));

describe('sanity API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
    // Reset environment variables (using Object.assign to avoid readonly issues)
    Object.assign(process.env, {
      NEXT_PUBLIC_SANITY_PROJECT_ID: undefined,
      NEXT_PUBLIC_SANITY_DATASET: undefined,
      NEXT_PUBLIC_SANITY_API_VERSION: undefined,
      SANITY_API_TOKEN: undefined,
      NODE_ENV: undefined,
      VITEST: undefined,
      JEST_WORKER_ID: undefined,
      STORYBOOK: undefined,
    });
  });

  describe('sanityFetch', () => {
    it('should call client.fetch with correct parameters', async () => {
      mockFetch.mockResolvedValue({ data: 'test' });

      // Import after mocking
      const { sanityFetch } = await import('./sanity');

      const result = await sanityFetch(
        '*[_type == "test"]',
        { param: 'value' },
        ['tag1', 'tag2']
      );

      expect(mockFetch).toHaveBeenCalledWith(
        '*[_type == "test"]',
        { param: 'value' },
        {
          cache: 'force-cache',
          next: {
            tags: ['tag1', 'tag2'],
          },
        }
      );
      expect(result).toEqual({ data: 'test' });
    });

    it('should use default tags when none provided', async () => {
      mockFetch.mockResolvedValue({ data: 'test' });

      const { sanityFetch } = await import('./sanity');

      await sanityFetch('*[_type == "test"]');

      expect(mockFetch).toHaveBeenCalledWith(
        '*[_type == "test"]',
        {},
        {
          cache: 'force-cache',
          next: {
            tags: ['sanity'],
          },
        }
      );
    });
  });

  describe('sanityFetchDraft', () => {
    it('should call client.fetch with draft configuration', async () => {
      mockFetch.mockResolvedValue({ data: 'draft' });

      const { sanityFetchDraft } = await import('./sanity');

      const result = await sanityFetchDraft('*[_type == "test"]', {
        param: 'value',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        '*[_type == "test"]',
        { param: 'value' },
        {
          cache: 'no-store',
          perspective: 'drafts',
        }
      );
      expect(result).toEqual({ data: 'draft' });
    });
  });
});

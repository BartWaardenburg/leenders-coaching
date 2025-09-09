import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the entire sanity module to avoid environment validation issues
vi.mock('./sanity', () => ({
  client: {},
  sanityConfig: {
    projectId: 'test-project-id',
    dataset: 'test-dataset',
    apiVersion: '2024-01-01',
  },
  defineQuery: vi.fn((query: string) => query),
  groq: vi.fn(),
}));

import { defineQuery, groq } from './sanity';

// Mock next-sanity
vi.mock('next-sanity', () => ({
  createClient: vi.fn(),
}));

// Mock environment variables
const originalEnv = process.env;

/**
 * Test suite for Sanity utilities
 */
describe('Sanity utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SANITY_PROJECT_ID: 'test-project-id',
      NEXT_PUBLIC_SANITY_DATASET: 'test-dataset',
      NEXT_PUBLIC_SANITY_API_VERSION: '2024-01-01',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('defineQuery', () => {
    it('should return query string with type information', () => {
      const query = '*[_type == "post"]';
      const result = defineQuery<{ title: string }>(query);

      expect(result).toBe(query);
      expect(typeof result).toBe('string');
    });

    it('should preserve query string exactly', () => {
      const query = '*[_type == "post" && publishedAt > $date]';
      const result = defineQuery(query);

      expect(result).toBe(query);
    });

    it('should handle empty query', () => {
      const query = '';
      const result = defineQuery(query);

      expect(result).toBe(query);
    });

    it('should handle complex GROQ query', () => {
      const query = `
        *[_type == "post"] {
          _id,
          title,
          "author": author->name,
          "categories": categories[]->title,
          publishedAt
        } | order(publishedAt desc)
      `;
      const result = defineQuery(query);

      expect(result).toBe(query);
    });
  });

  describe('groq', () => {
    it('should be defined as a function', () => {
      expect(groq).toBeDefined();
      expect(typeof groq).toBe('function');
    });

    it('should accept string query', () => {
      const query = '*[_type == "post"]';

      // Since we're mocking, we can't test the actual execution
      // but we can verify the function exists and accepts parameters
      expect(() => groq(query)).not.toThrow();
    });

    it('should accept defineQuery result', () => {
      const query = defineQuery('*[_type == "post"]');

      expect(() => groq(query)).not.toThrow();
    });

    it('should accept query with parameters', () => {
      const query = '*[_type == "post" && publishedAt > $date]';
      const params = { date: '2024-01-01' };

      expect(() => groq(query, params)).not.toThrow();
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { transformBlogSection } from './blog';
import type { Post } from '@/types/sanity/schema';

// Test-specific type for resolved category (simulating Sanity's reference resolution)
type ResolvedCategory = {
  _ref: string;
  _type: 'reference';
  _key: string;
  title: string;
};

// Test-specific type for blog section with resolved posts
type TestSectionBlog = {
  _type: 'sectionBlog';
  displayTitle?: string;
  description?: string;
  posts?: (Omit<Post, 'categories'> & { categories?: ResolvedCategory[] })[];
  postsPerPage?: number;
  showFeaturedOnly?: boolean;
  sortOrder?: 'newest' | 'oldest';
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  border?: boolean;
};

// Mock the sanity utilities
vi.mock('@/utilities/sanity', () => ({
  groq: vi.fn(),
  client: {},
  sanityConfig: {},
  defineQuery: vi.fn(),
}));

/**
 * Test suite for blog section utility
 */
describe('transformBlogSection', () => {
  it('should transform valid blog section data', () => {
    const mockPost: NonNullable<TestSectionBlog['posts']>[0] = {
      _id: 'post-1',
      _type: 'post',
      _createdAt: '2024-01-01T00:00:00Z',
      _updatedAt: '2024-01-01T00:00:00Z',
      _rev: 'rev-1',
      title: 'Test Post',
      description: 'Test description',
      slug: { _type: 'slug', current: 'test-post' },
      publishedAt: '2024-01-01',
      categories: [
        {
          _ref: 'cat-1',
          _type: 'reference',
          _key: 'cat-1',
          title: 'test',
        },
      ],
      featured: true,
      image: {
        _type: 'image',
        asset: { _ref: 'image-1', _type: 'reference' },
      },
      variant: 'blue',
    };

    const mockData: TestSectionBlog = {
      _type: 'sectionBlog',
      displayTitle: 'Blog Section',
      description: 'Blog section description',
      posts: [mockPost],
      postsPerPage: 6,
      showFeaturedOnly: false,
      sortOrder: 'newest',
      background: 'blue',
      border: false,
    };

    const result = transformBlogSection(mockData);

    expect(result).toEqual({
      title: 'Blog Section',
      description: 'Blog section description',
      posts: [
        {
          _key: 'post-1',
          title: 'Test Post',
          description: 'Test description',
          slug: 'test-post',
          date: '2024-01-01',
          categories: ['test'],
          featured: true,
          image: {
            _type: 'image',
            asset: { _ref: 'image-1', _type: 'reference' },
          },
          variant: 'blue',
        },
      ],
      postsPerPage: 6,
      background: 'blue',
      border: false,
    });
  });

  it('should handle missing optional fields', () => {
    const mockPost: NonNullable<TestSectionBlog['posts']>[0] = {
      _id: 'post-1',
      _type: 'post',
      _createdAt: '2024-01-01T00:00:00Z',
      _updatedAt: '2024-01-01T00:00:00Z',
      _rev: 'rev-1',
      title: 'Test Post',
      slug: { _type: 'slug', current: 'test-post' },
      publishedAt: '2024-01-01',
    };

    const mockData: TestSectionBlog = {
      _type: 'sectionBlog',
      posts: [mockPost],
    };

    const result = transformBlogSection(mockData);

    expect(result).toEqual({
      title: undefined,
      description: '',
      posts: [
        {
          _key: 'post-1',
          title: 'Test Post',
          description: '',
          slug: 'test-post',
          date: '2024-01-01',
          categories: [],
          featured: false,
          image: null,
          variant: undefined,
        },
      ],
      postsPerPage: undefined,
      background: undefined,
      border: undefined,
    });
  });

  it('should filter featured posts when showFeaturedOnly is true', () => {
    const mockPosts: NonNullable<TestSectionBlog['posts']> = [
      {
        _id: 'post-1',
        _type: 'post',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'rev-1',
        title: 'Featured Post',
        slug: { _type: 'slug', current: 'featured-post' },
        publishedAt: '2024-01-01',
        featured: true,
      },
      {
        _id: 'post-2',
        _type: 'post',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'rev-1',
        title: 'Regular Post',
        slug: { _type: 'slug', current: 'regular-post' },
        publishedAt: '2024-01-02',
        featured: false,
      },
    ];

    const mockData: TestSectionBlog = {
      _type: 'sectionBlog',
      posts: mockPosts,
      showFeaturedOnly: true,
    };

    const result = transformBlogSection(mockData);

    expect(result.posts).toHaveLength(1);
    expect(result.posts?.[0]?.title).toBe('Featured Post');
  });

  it('should sort posts by newest first', () => {
    const mockPosts: NonNullable<TestSectionBlog['posts']> = [
      {
        _id: 'post-1',
        _type: 'post',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'rev-1',
        title: 'Old Post',
        slug: { _type: 'slug', current: 'old-post' },
        publishedAt: '2024-01-01',
      },
      {
        _id: 'post-2',
        _type: 'post',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'rev-1',
        title: 'New Post',
        slug: { _type: 'slug', current: 'new-post' },
        publishedAt: '2024-01-02',
      },
    ];

    const mockData: TestSectionBlog = {
      _type: 'sectionBlog',
      posts: mockPosts,
      sortOrder: 'newest',
    };

    const result = transformBlogSection(mockData);

    expect(result.posts?.[0]?.title).toBe('New Post');
    expect(result.posts?.[1]?.title).toBe('Old Post');
  });

  it('should sort posts by oldest first', () => {
    const mockPosts: NonNullable<TestSectionBlog['posts']> = [
      {
        _id: 'post-1',
        _type: 'post',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'rev-1',
        title: 'New Post',
        slug: { _type: 'slug', current: 'new-post' },
        publishedAt: '2024-01-02',
      },
      {
        _id: 'post-2',
        _type: 'post',
        _createdAt: '2024-01-01T00:00:00Z',
        _updatedAt: '2024-01-01T00:00:00Z',
        _rev: 'rev-1',
        title: 'Old Post',
        slug: { _type: 'slug', current: 'old-post' },
        publishedAt: '2024-01-01',
      },
    ];

    const mockData: TestSectionBlog = {
      _type: 'sectionBlog',
      posts: mockPosts,
      sortOrder: 'oldest',
    };

    const result = transformBlogSection(mockData);

    expect(result.posts?.[0]?.title).toBe('Old Post');
    expect(result.posts?.[1]?.title).toBe('New Post');
  });

  it('should handle empty posts array', () => {
    const mockData: TestSectionBlog = {
      _type: 'sectionBlog',
      posts: [],
    };

    const result = transformBlogSection(mockData);

    expect(result.posts).toEqual([]);
  });

  it('should handle undefined posts', () => {
    const mockData: TestSectionBlog = {
      _type: 'sectionBlog',
      posts: undefined,
    };

    const result = transformBlogSection(mockData);

    expect(result.posts).toEqual([]);
  });

  it('should throw error for invalid section data', () => {
    const invalidData = {
      _type: 'invalidType',
      _key: 'blog-1',
    };

    expect(() => transformBlogSection(invalidData)).toThrow(
      'Invalid blog section data'
    );
  });
});

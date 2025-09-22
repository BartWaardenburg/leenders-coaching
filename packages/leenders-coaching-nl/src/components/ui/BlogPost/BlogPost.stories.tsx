import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BlogPost, type BlogPostData } from './BlogPost';
import {
  mockResolvedBlogPost,
  mockResolvedBlogPosts,
} from '@/mocks/blog-mocks';

const meta: Meta<typeof BlogPost> = {
  title: 'UI/BlogPost',
  component: BlogPost,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A component for displaying individual blog post content with header, image, content, and metadata.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    post: {
      description: 'The blog post data to display',
      control: false,
    },
    className: {
      description: 'Optional className for styling',
      control: 'text',
    },
    testid: {
      description: 'Test ID for testing',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Transform mock data to BlogPostData format
 */
const transformToBlogPostData = (mockPost: BlogPostData): BlogPostData => ({
  _id: mockPost._id,
  title: mockPost.title,
  description: mockPost.description,
  slug: mockPost.slug || { current: 'unknown' },
  publishedAt: mockPost.publishedAt,
  categories: mockPost.categories,
  // For Storybook, we'll remove the image to avoid Sanity asset reference issues
  image: undefined,
  featured: mockPost.featured,
  variant: mockPost.variant,
  content: mockPost.content,
  metadata: mockPost.metadata,
});

/**
 * Default blog post with all features
 */
export const Default: Story = {
  args: {
    post: transformToBlogPostData(mockResolvedBlogPost),
    testid: 'blog-post-default',
  },
};

/**
 * Blog post with green variant
 */
export const GreenVariant: Story = {
  args: {
    post: transformToBlogPostData(mockResolvedBlogPosts[1]!), // Green variant post
    testid: 'blog-post-green',
  },
};

/**
 * Blog post with purple variant
 */
export const PurpleVariant: Story = {
  args: {
    post: transformToBlogPostData(mockResolvedBlogPosts[2]!), // Purple variant post
    testid: 'blog-post-purple',
  },
};

/**
 * Blog post without image
 */
export const WithoutImage: Story = {
  args: {
    post: transformToBlogPostData({
      ...mockResolvedBlogPost,
      image: undefined,
    }),
    testid: 'blog-post-no-image',
  },
};

/**
 * Blog post without categories
 */
export const WithoutCategories: Story = {
  args: {
    post: transformToBlogPostData({
      ...mockResolvedBlogPost,
      categories: [],
    }),
    testid: 'blog-post-no-categories',
  },
};

/**
 * Blog post without description
 */
export const WithoutDescription: Story = {
  args: {
    post: transformToBlogPostData({
      ...mockResolvedBlogPost,
      description: undefined,
    }),
    testid: 'blog-post-no-description',
  },
};

/**
 * Blog post with minimal content
 */
export const MinimalContent: Story = {
  args: {
    post: transformToBlogPostData({
      ...mockResolvedBlogPost,
      description: undefined,
      categories: [],
      image: undefined,
    }),
    testid: 'blog-post-minimal',
  },
};

/**
 * Blog post with long content
 */
export const LongContent: Story = {
  args: {
    post: transformToBlogPostData({
      ...mockResolvedBlogPost,
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-1',
              text: 'This is a blog post with extensive content to demonstrate how the component handles longer text. Personal coaching is a transformative process that helps individuals unlock their potential and achieve their goals.',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span-2',
              text: 'Understanding Personal Coaching',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block-3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-3',
              text: 'Personal coaching is a collaborative process between a coach and a client. The coach provides support, guidance, and accountability to help the client achieve their personal and professional goals. This process involves identifying strengths, addressing challenges, and creating actionable plans for growth.',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block-4',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-4',
              text: 'Key Benefits of Coaching',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'block-5',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-5',
              text: 'Coaching offers numerous benefits including improved self-awareness, enhanced decision-making skills, increased confidence, better work-life balance, and accelerated personal growth. These benefits extend beyond the coaching relationship and create lasting positive changes in all areas of life.',
            },
          ],
        },
      ],
    }),
    testid: 'blog-post-long-content',
  },
};

/**
 * Blog post with image (using placeholder data)
 * Note: In a real application, this would use actual Sanity image data
 */
export const WithImage: Story = {
  args: {
    post: {
      _id: 'post-with-image',
      title: 'Blog Post with Image',
      description:
        'This story demonstrates how the component would look with an image.',
      slug: { current: 'blog-post-with-image' },
      publishedAt: '2024-01-15T10:00:00Z',
      categories: [
        {
          _id: 'category-1',
          title: 'Personal Development',
          slug: { current: 'personal-development' },
          color: 'blue',
        },
      ],
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
          _type: 'reference',
        },
        hotspot: {
          _type: 'sanity.imageHotspot',
          x: 0.5,
          y: 0.5,
          height: 0.5,
          width: 0.5,
        },
        crop: {
          _type: 'sanity.imageCrop',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        alt: 'A placeholder image for the blog post',
      },
      featured: true,
      variant: 'blue',
      content: [
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-1',
              text: 'This blog post demonstrates how the component handles images. In a real application, this would be a properly formatted Sanity image asset.',
            },
          ],
        },
      ],
    },
    testid: 'blog-post-with-image',
  },
};

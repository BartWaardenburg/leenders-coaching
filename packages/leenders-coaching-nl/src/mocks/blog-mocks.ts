import type { Post, Category } from '@/types/sanity/schema';

/**
 * Mock blog post data that matches the Sanity schema format
 */
export const mockBlogPost: Post = {
  _id: 'post-1',
  _type: 'post',
  _createdAt: '2024-01-15T10:00:00Z',
  _updatedAt: '2024-01-15T10:00:00Z',
  _rev: 'rev-1',
  title: 'Getting Started with Personal Coaching',
  description:
    'Discover the fundamentals of personal coaching and how it can transform your life. Learn about the key principles and techniques used by professional coaches.',
  slug: {
    _type: 'slug',
    current: 'getting-started-personal-coaching',
  },
  publishedAt: '2024-01-15T10:00:00Z',
  categories: [
    {
      _ref: 'category-1',
      _type: 'reference',
      _key: 'category-1',
    },
    {
      _ref: 'category-2',
      _type: 'reference',
      _key: 'category-2',
    },
  ],
  image: {
    _type: 'accessibleImage',
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
    },
    alt: 'A person sitting in a peaceful environment during a coaching session',
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
          text: 'Personal coaching is a powerful tool for personal development and growth. It involves working with a trained professional who helps you identify your goals, overcome obstacles, and create a plan for achieving your desired outcomes.',
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
          text: 'What is Personal Coaching?',
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
          text: 'Personal coaching is a collaborative process between a coach and a client. The coach provides support, guidance, and accountability to help the client achieve their personal and professional goals.',
        },
      ],
    },
  ],
  metadata: {
    _type: 'metadata',
    title: 'Getting Started with Personal Coaching | Leenders Coaching',
    description:
      'Discover the fundamentals of personal coaching and how it can transform your life.',
  },
};

/**
 * Mock blog post with different variant
 */
export const mockBlogPostGreen: Post = {
  _id: 'post-2',
  _type: 'post',
  _createdAt: '2024-01-10T14:30:00Z',
  _updatedAt: '2024-01-10T14:30:00Z',
  _rev: 'rev-2',
  title: 'Building Confidence Through Coaching',
  description:
    'Learn how coaching can help you build unshakeable confidence and overcome self-doubt. Practical strategies and real-world examples.',
  slug: {
    _type: 'slug',
    current: 'building-confidence-through-coaching',
  },
  publishedAt: '2024-01-10T14:30:00Z',
  categories: [
    {
      _ref: 'category-2',
      _type: 'reference',
      _key: 'category-2',
    },
  ],
  image: {
    _type: 'accessibleImage',
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
    },
    alt: 'A confident person standing tall with a positive expression',
  },
  featured: false,
  variant: 'green',
  content: [
    {
      _type: 'block',
      _key: 'block-1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span-1',
          text: 'Confidence is not something you are born with - it is something you can develop and strengthen over time. Through coaching, you can learn practical strategies to build your confidence and overcome self-doubt.',
        },
      ],
    },
  ],
};

/**
 * Mock blog post with purple variant
 */
export const mockBlogPostPurple: Post = {
  _id: 'post-3',
  _type: 'post',
  _createdAt: '2024-01-05T09:15:00Z',
  _updatedAt: '2024-01-05T09:15:00Z',
  _rev: 'rev-3',
  title: 'The Power of Goal Setting',
  description:
    'Discover the science behind effective goal setting and how it can accelerate your personal and professional growth.',
  slug: {
    _type: 'slug',
    current: 'power-of-goal-setting',
  },
  publishedAt: '2024-01-05T09:15:00Z',
  categories: [
    {
      _ref: 'category-1',
      _type: 'reference',
      _key: 'category-1',
    },
    {
      _ref: 'category-3',
      _type: 'reference',
      _key: 'category-3',
    },
  ],
  image: {
    _type: 'accessibleImage',
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
    },
    alt: 'A vision board with goals and aspirations',
  },
  featured: true,
  variant: 'purple',
  content: [
    {
      _type: 'block',
      _key: 'block-1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span-1',
          text: 'Goal setting is one of the most powerful tools for personal development. When done correctly, it can provide direction, motivation, and a clear path to success.',
        },
      ],
    },
  ],
};

/**
 * Mock category data
 */
export const mockCategories: Category[] = [
  {
    _id: 'category-1',
    _type: 'category',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'rev-cat-1',
    title: 'Personal Development',
    slug: {
      _type: 'slug',
      current: 'personal-development',
    },
    color: 'blue',
  },
  {
    _id: 'category-2',
    _type: 'category',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'rev-cat-2',
    title: 'Confidence Building',
    slug: {
      _type: 'slug',
      current: 'confidence-building',
    },
    color: 'green',
  },
  {
    _id: 'category-3',
    _type: 'category',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'rev-cat-3',
    title: 'Goal Setting',
    slug: {
      _type: 'slug',
      current: 'goal-setting',
    },
    color: 'purple',
  },
];

/**
 * Array of all mock blog posts
 */
export const mockBlogPosts: Post[] = [
  mockBlogPost,
  mockBlogPostGreen,
  mockBlogPostPurple,
];

/**
 * Mock resolved blog post data (as it would come from GROQ query)
 */
export const mockResolvedBlogPost = {
  ...mockBlogPost,
  categories: [
    {
      _id: 'category-1',
      title: 'Personal Development',
      slug: {
        _type: 'slug',
        current: 'personal-development',
      },
      color: 'blue',
    },
    {
      _id: 'category-2',
      title: 'Confidence Building',
      slug: {
        _type: 'slug',
        current: 'confidence-building',
      },
      color: 'green',
    },
  ],
};

/**
 * Mock resolved blog posts array
 */
export const mockResolvedBlogPosts = [
  {
    ...mockBlogPost,
    categories: [
      {
        _id: 'category-1',
        title: 'Personal Development',
        slug: {
          _type: 'slug',
          current: 'personal-development',
        },
        color: 'blue',
      },
      {
        _id: 'category-2',
        title: 'Confidence Building',
        slug: {
          _type: 'slug',
          current: 'confidence-building',
        },
        color: 'green',
      },
    ],
  },
  {
    ...mockBlogPostGreen,
    categories: [
      {
        _id: 'category-2',
        title: 'Confidence Building',
        slug: {
          _type: 'slug',
          current: 'confidence-building',
        },
        color: 'green',
      },
    ],
  },
  {
    ...mockBlogPostPurple,
    categories: [
      {
        _id: 'category-1',
        title: 'Personal Development',
        slug: {
          _type: 'slug',
          current: 'personal-development',
        },
        color: 'blue',
      },
      {
        _id: 'category-3',
        title: 'Goal Setting',
        slug: {
          _type: 'slug',
          current: 'goal-setting',
        },
        color: 'purple',
      },
    ],
  },
];

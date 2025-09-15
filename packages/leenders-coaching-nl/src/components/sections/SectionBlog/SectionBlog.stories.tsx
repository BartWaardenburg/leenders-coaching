import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionBlog, type BlogPost } from './SectionBlog';
import { mockBlogSection } from '@/mocks';

const meta = {
  title: 'Sections/SectionBlog',
  component: SectionBlog,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SectionBlog>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Use centralized mocks for different post counts */
const getPosts = (count: number): BlogPost[] => {
  return mockBlogSection.posts.slice(0, count);
};

export const Default: Story = {
  args: {
    title: mockBlogSection.displayTitle,
    description: mockBlogSection.description,
    posts: getPosts(3),
    postsPerPage: 6,
  },
};

export const WithPagination: Story = {
  args: {
    ...Default.args,
    posts: getPosts(8), // Use all 8 posts from centralized mocks
    postsPerPage: 4,
  },
};

export const ManyPosts: Story = {
  args: {
    ...Default.args,
    posts: getPosts(8), // Use all 8 posts from centralized mocks
    postsPerPage: 6,
  },
};

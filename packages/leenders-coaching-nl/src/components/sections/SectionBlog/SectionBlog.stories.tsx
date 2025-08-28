import type { Meta, StoryObj } from '@storybook/nextjs'
import { SectionBlog } from './SectionBlog'

const meta = {
  title: 'Sections/SectionBlog',
  component: SectionBlog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionBlog>

export default meta
type Story = StoryObj<typeof meta>

/* Generate more posts for pagination demo */
const generatePosts = (count: number) => {
  const variants = ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as const
  return Array.from({ length: count }, (_, i) => ({
    title: `Blog Post ${i + 1}: ${i % 2 === 0 ? 'Persoonlijke Groei' : 'Professionele Ontwikkeling'}`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    slug: `blog-post-${i + 1}`,
    date: `${i + 1} maart 2024`,
    categories: [i % 2 === 0 ? 'Persoonlijke Groei' : 'Professionele Ontwikkeling'],
    image: `https://picsum.photos/800/600?random=${i + 1}`,
    featured: i === 0,
    variant: variants[i % variants.length],
  }))
}

export const Default: Story = {
  args: {
    title: 'Blog Artikelen',
    description:
      'Ontdek praktische tips, inzichten en tools voor persoonlijke groei en professionele ontwikkeling.',
    posts: generatePosts(3),
    postsPerPage: 6,
  },
}

export const WithPagination: Story = {
  args: {
    ...Default.args,
    posts: generatePosts(10),
    postsPerPage: 4,
  },
}

export const ManyPosts: Story = {
  args: {
    ...Default.args,
    posts: generatePosts(20),
    postsPerPage: 6,
  },
}
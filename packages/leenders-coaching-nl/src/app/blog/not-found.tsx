import { SectionHeader } from '@/components/sections/SectionHeader';

/**
 * 404 page for blog posts
 */
export default function NotFound() {
  return (
    <SectionHeader
      title="Blog Post Not Found"
      description="The blog post you're looking for doesn't exist or has been moved."
      primaryCta={{
        href: '/blog',
        label: 'Back to Blog',
      }}
    />
  );
}

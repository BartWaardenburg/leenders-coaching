import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Blog Section */
export const sectionBlog = defineType({
  name: 'sectionBlog',
  title: 'Blog Section',
  type: 'document',
  description:
    'A section for displaying blog posts in a grid layout with pagination',
  fields: [
    ...baseSectionFields,
    {
      name: 'posts',
      title: 'Blog Posts',
      type: 'array',
      description: 'Select blog posts to display in this section',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    },
    {
      name: 'postsPerPage',
      title: 'Posts Per Page',
      type: 'number',
      description: 'Number of posts to display per page',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(12),
    },
    {
      name: 'showFeaturedOnly',
      title: 'Show Featured Posts Only',
      type: 'boolean',
      description: 'Show only posts marked as featured',
      initialValue: false,
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'string',
      description: 'How to sort the displayed posts',
      options: {
        list: [
          { title: 'Newest First', value: 'newest' },
          { title: 'Oldest First', value: 'oldest' },
        ],
      },
      initialValue: 'newest',
    },
  ],
});

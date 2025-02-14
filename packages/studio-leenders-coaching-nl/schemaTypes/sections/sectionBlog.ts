import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';

/* Blog Section */
export const sectionBlog = defineType({
  name: 'sectionBlog',
  title: 'Blog Section',
  type: 'document',
  fields: [
    ...baseSectionFields,
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'postsToShow',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 3,
    },
    {
      name: 'showFeaturedOnly',
      title: 'Show Featured Posts Only',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'string',
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
